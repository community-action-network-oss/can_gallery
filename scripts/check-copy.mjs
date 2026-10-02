// Copy guard for src/: no dashes, no liveness phrases, no unlisted URLs.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|mjs|json|css|html|txt)$/.test(p) ? [p] : []; });

// One phrase per line. Matched case-insensitively.
const BANNED = [
  "sign up", "signup", "join now", "launching", "our users", "report your problem", "get help",
  "go live", "now live", "we are live", "download the app", "register now",
];
// 06-u19: the old human-only moderation model and retired vocabulary (D-51, D-59, D-76). Checked in src/ AND
// the rendered out/. Pages and synced files that quote the public record (log, changelog, catalog, open
// questions) show history verbatim, so they are exempt from this list only.
const RETIRED = [
  "people make and answer for every decision", "nothing is published until a person has said yes",
  "ai assistance is planned", "rules-based checks and human review", "resolution records", "awaiting review",
];
const HISTORY = /(decisions|changelog|catalog|open-questions)\.json$|^out\/(.*\/)?(whats-new|how-decisions-are-made|tasks|docs)\//;
// Allowed hosts: GitHub only (D-67, D-68).
const HOSTS = ["github.com", "api.github.com", "raw.githubusercontent.com"];

const errs = [];
const scan = (p, banned, hosts) => {
  const rel = p.slice(root.length + 1);
  readFileSync(p, "utf8").split("\n").forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    const low = line.toLowerCase();
    if (hosts && /[–—]/.test(line)) errs.push(`${at}: em or en dash`);
    for (const b of banned) if (low.includes(b)) errs.push(`${at}: banned phrase "${b}"`);
    if (hosts) for (const m of line.matchAll(/https?:\/\/([^\/\s"'`)<>]+)/g)) {
      if (!HOSTS.includes(m[1])) errs.push(`${at}: host not allowed: ${m[1]}`);
    }
  });
};
for (const p of walk(join(root, "src"))) {
  const rel = p.slice(root.length + 1);
  scan(p, HISTORY.test(rel) ? BANNED : [...BANNED, ...RETIRED], true);
}
if (existsSync(join(root, "out"))) for (const p of walk(join(root, "out"))) {
  if (!HISTORY.test(p.slice(root.length + 1))) scan(p, RETIRED, false);
}
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log("check:copy ok.");
