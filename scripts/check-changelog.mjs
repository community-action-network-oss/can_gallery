// Shape check only (not freshness): the superproject log changes constantly and sync:changelog runs inside
// sync:content, so a freshness gate would go red. Stale is allowed; a rewritten history is not.
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errs = [];
const j = JSON.parse(readFileSync(join(root, "src/content/changelog.json"), "utf8"));
if (!/^[0-9a-f]{7}$/.test(j.head ?? "")) errs.push("bad head sha");
if (!Array.isArray(j.weeks) || !j.weeks.length) errs.push("no weeks");
let n = 0, prevStart = "9999", prevDate = "9999";
for (const w of j.weeks ?? []) {
  if (!/^\d{4}-W\d{2}$/.test(w.week) || !/^\d{4}-\d{2}-\d{2}$/.test(w.start)) errs.push(`bad week ${w.week}`);
  if (w.start >= prevStart) errs.push(`week ${w.week} out of order`);
  prevStart = w.start;
  if (!w.entries?.length) errs.push(`week ${w.week} empty`);
  for (const e of w.entries ?? []) {
    n++;
    if (!/^[0-9a-f]{7,12}$/.test(e.sha) || !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) errs.push(`bad entry ${e.sha}`);
    if (Object.keys(e).sort().join() !== "date,sha,text") errs.push(`${e.sha}: unexpected field`);
    if (e.date > prevDate) errs.push(`${e.sha}: not newest first`);
    prevDate = e.date;
    if (typeof e.text !== "string" || e.text.length < 4) errs.push(`${e.sha}: empty text`);
    if (/[–—`]/.test(e.text)) errs.push(`${e.sha}: dash or tick in text`);
    if (/@|\bW\d+ P\d+\b|\b\d{2}-u\d+\b/.test(e.text)) errs.push(`${e.sha}: email or internal token in text`);
    if (/sign[- ]?up|now live|launch|\blive\b/i.test(e.text)) errs.push(`${e.sha}: liveness or banned phrase`);
  }
}
if (j.count !== n) errs.push("count does not match entries");
// Rewritten history is the only failure: the recorded head must still be an ancestor of the ref it came from.
const sup = join(root, "..");
if (existsSync(join(sup, ".git"))) {
  const ref = String(j.source).replace(/^git log /, "");
  let known = true;
  try { execFileSync("git", ["-C", sup, "rev-parse", "--verify", "-q", ref], { stdio: "ignore" }); } catch { known = false; }
  if (known) {
    try { execFileSync("git", ["-C", sup, "merge-base", "--is-ancestor", j.head, ref], { stdio: "ignore" }); }
    catch { errs.push(`head ${j.head} is not an ancestor of ${ref}: history was rewritten`); }
  }
}
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log(`check:changelog ok (${n} entries, ${j.weeks.length} weeks, head ${j.head}).`);
