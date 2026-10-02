// Generates src/content/decisions.json from ../DECISIONS.md headlines and the ../docs/adr/README.md table.
// Never hand edit the JSON. Runs inside sync:content (standing rule), and is NOT freshness-checked in
// verify: DECISIONS.md grows all night, so check:decisions validates shape only.
// Only headlines are published. Why and Reverse text is never read into the output.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = join(dirname(fileURLToPath(import.meta.url)), "..");
const sup = join(here, "..");
const src = join(sup, "DECISIONS.md");
const adrSrc = join(sup, "docs", "adr", "README.md");
if (!existsSync(src) || !existsSync(adrSrc)) { console.log("sync:decisions skipped: DECISIONS.md or docs/adr not found next to this checkout."); process.exit(0); }

// Entries left out because the log wording is internal chatter, build status or a commit report, which
// reads as noise to a visitor. The log is never rewritten, so an entry is shown as written or left out.
// Reverse: delete the id here and run sync:content.
const EXCLUDE = new Set([
  21, 24, 25, 26, 27, 28, // night-run mechanics and a superseded "no licence yet" note
  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, // scaffold and spec progress reports with commit ids
  42, 43, 44, 45, 46, // run mechanics and plan-flag housekeeping
  62, 63, 64, 69, 71, 74, 75, 77, 78, // landing notes, planner defaults and a status note
]);

// Dashes in the log become commas (the site guards forbid them); backticks are dropped.
const clean = (s) => s.replace(/\s*[–—]\s*/g, ", ").replace(/`/g, "").replace(/\s+/g, " ").replace(/[.:]+$/, "").trim();

const lines = readFileSync(src, "utf8").split("\n");
const adrRows = readFileSync(adrSrc, "utf8").split("\n").map((l) => l.match(/^\| \[(\d{4})\]\(([^)]+\.md)\) \| (.+?) \| (.+?) \|$/)).filter(Boolean);
const adrs = adrRows.map((m) => ({ n: m[1], title: clean(m[3]), status: clean(m[4]), path: `docs/adr/${m[2]}` }));
const adrSet = new Set(adrs.map((a) => a.n));

// An entry is a line starting "- **D-<n>", with its indented body up to the next entry or heading.
const starts = lines.map((l, i) => (/^- \*\*D-\d+/.test(l) ? i : -1)).filter((i) => i >= 0);
const headingCount = starts.length;
const parsed = [], unreadable = [];
starts.forEach((i, k) => {
  const m = lines[i].match(/^- \*\*D-(\d+) · (W\d+) · (.+?)\*\*/);
  if (!m) { unreadable.push(lines[i].slice(0, 80)); return; }
  let end = starts[k + 1] ?? lines.length;
  for (let j = i + 1; j < end; j++) if (/^#{1,3} /.test(lines[j])) { end = j; break; }
  const adr = [...new Set([...lines.slice(i, end).join("\n").matchAll(/ADRs? (\d{4})/g)].map((x) => x[1]))].filter((n) => adrSet.has(n)).sort();
  parsed.push({ n: Number(m[1]), headline: clean(m[3]), adr });
});
if (unreadable.length) { console.error(`sync:decisions: ${unreadable.length} entries could not be read:\n${unreadable.join("\n")}`); process.exit(1); }
if (parsed.length !== headingCount) { console.error(`sync:decisions: parsed ${parsed.length} but found ${headingCount} headings`); process.exit(1); }
if (new Set(parsed.map((d) => d.n)).size !== parsed.length) { console.error("sync:decisions: duplicate decision numbers"); process.exit(1); }

const decisions = parsed.filter((d) => !EXCLUDE.has(d.n)).sort((a, b) => a.n - b.n)
  .map((d) => ({ id: `D-${d.n}`, headline: d.headline, adr: d.adr }));
const out = { source: "DECISIONS.md", adrIndex: "docs/adr/README.md", total: parsed.length, excluded: [...EXCLUDE].sort((a, b) => a - b).map((n) => `D-${n}`), decisions, adrs };
writeFileSync(join(here, "src/content/decisions.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`sync:decisions wrote ${decisions.length} of ${parsed.length} decisions, ${adrs.length} ADRs.`);
