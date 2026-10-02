// Generates src/content/changelog.json from the superproject git history (read only: git log, nothing else).
// Never hand edit the JSON. Runs inside sync:content (standing rule) and is NOT freshness-checked in
// verify: the superproject log changes every few minutes during night runs, so check:changelog is shape only.
// Only short sha, date and a cleaned subject are kept. Author names and emails are never read.
import { existsSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = join(dirname(fileURLToPath(import.meta.url)), "..");
const sup = join(here, "..");
// The published site should reflect what has been merged, so read main, not the checked out night branch.
// Reverse: change REF to "HEAD".
const REF = "main";
const MAX = 400;

const git = (...a) => execFileSync("git", ["-C", sup, ...a], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
let head, raw;
try {
  if (!existsSync(join(sup, ".git"))) throw new Error("no git");
  head = git("rev-parse", "--short=7", REF);
  raw = git("log", REF, "--no-merges", "--format=%h%x09%as%x09%s", "-n", String(MAX));
} catch {
  console.log("sync:changelog skipped: superproject history or ref not available, keeping the committed file.");
  process.exit(0);
}

// Subjects that are bookkeeping, not work a visitor would recognise. Matched on the cleaned text.
const NOISE = /\b(bump|pointer|regenerate[sd]?|lint|status|planner|defaults?|new plans|PLAN\.md)\b|\bPLAN\.md|\bT\d\d\b|\b(live|launch\w*|released?|shipped)\b/i;

// A subject that names a unit id in the middle of the sentence reads broken once the id is removed, so it is left out.
const midId = (s) => /\b\d{2}-u\d+\b/i.test(s.replace(/^W\d+ P\d+:\s*/i, "").replace(/^\d{2}-u\d+\s+/i, ""));
const clean = (s) => {
  let t = s
    .replace(/^W\d+ P\d+:\s*/i, "")
    .replace(/^(\d{2}-u\d+|D-\d+)[:,]?\s+/i, "")
    .replace(/(,\s*)?\b\d{2}-u\d+\b(\s+(to|on)\s+\d{2}-u\d+\b)?/gi, "")
    .replace(/\b[0-9a-f]{7,40}\b(?=\W|$)/g, (m) => (/\d/.test(m) && /[a-f]/.test(m) ? "" : m))
    .replace(/\s*[–—]\s*|\s+-\s+/g, ", ")
    .replace(/`/g, "")
    .replace(/sign[- ]?ups?\b/gi, "account creation")
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",").replace(/,\s*(on|and|to),/g, ",").replace(/^Npm\b/, "npm")
    .replace(/[.:,]+$/, "")
    .trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
};

// ISO week: Monday start, week number by the Thursday rule.
const week = (iso) => {
  const d = new Date(iso + "T00:00:00Z");
  const day = (d.getUTCDay() + 6) % 7;
  const mon = new Date(d); mon.setUTCDate(d.getUTCDate() - day);
  const thu = new Date(mon); thu.setUTCDate(mon.getUTCDate() + 3);
  const y = thu.getUTCFullYear();
  const jan4 = new Date(Date.UTC(y, 0, 4));
  const w = 1 + Math.round((thu - jan4) / 6048e5 - ((jan4.getUTCDay() + 6) % 7 - 3) / 7);
  return { id: `${y}-W${String(w).padStart(2, "0")}`, start: mon.toISOString().slice(0, 10) };
};

const entries = raw.split("\n").filter(Boolean).map((l) => {
  const [sha, date, ...s] = l.split("\t");
  const subj = s.join("\t");
  return { sha, date, text: clean(subj), bad: midId(subj) };
}).filter((e) => !e.bad && e.text.length > 3 && !NOISE.test(e.text));

const groups = [];
for (const e of entries) {
  const w = week(e.date);
  let g = groups[groups.length - 1];
  if (!g || g.week !== w.id) { g = { week: w.id, start: w.start, entries: [] }; groups.push(g); }
  g.entries.push({ sha: e.sha, date: e.date, text: e.text });
}
const out = { source: `git log ${REF}`, head, count: entries.length, weeks: groups };
writeFileSync(join(here, "src/content/changelog.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`sync:changelog wrote ${entries.length} entries in ${groups.length} weeks from ${REF} at ${head}.`);
