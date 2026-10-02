// Shape check only (not freshness): DECISIONS.md gains entries all night and sync:decisions runs inside
// sync:content, so a freshness gate would go red. Also checks that the page shows only headlines.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errs = [];
const j = JSON.parse(readFileSync(join(root, "src/content/decisions.json"), "utf8"));
const ids = (j.decisions ?? []).map((d) => d.id);
if (!ids.length) errs.push("no decisions");
if (new Set(ids).size !== ids.length) errs.push("duplicate decision ids");
for (const d of j.decisions ?? []) {
  if (!/^D-\d+$/.test(d.id)) errs.push(`bad id ${d.id}`);
  if (typeof d.headline !== "string" || !d.headline) errs.push(`${d.id}: empty headline`);
  if (/[–—·`]/.test(d.headline)) errs.push(`${d.id}: dash, separator or tick in headline`);
  if (/\b(why|reverse):/i.test(d.headline) || Object.keys(d).some((k) => !["id", "headline", "adr"].includes(k))) errs.push(`${d.id}: unexpected field or Why/Reverse text`);
}
if (j.total !== ids.length + (j.excluded ?? []).length) errs.push("total does not equal shown plus excluded");
const sorted = [...ids].sort((a, b) => Number(a.slice(2)) - Number(b.slice(2)));
if (sorted.join() !== ids.join()) errs.push("decisions not in id order");
for (const a of j.adrs ?? []) if (!/^docs\/adr\/\d{4}-.+\.md$/.test(a.path)) errs.push(`bad ADR path ${a.path}`);
if (!(j.adrs ?? []).length) errs.push("no ADRs");
const adrNums = new Set((j.adrs ?? []).map((a) => a.n));
for (const d of j.decisions ?? []) for (const n of d.adr) if (!adrNums.has(n)) errs.push(`${d.id}: unknown ADR ${n}`);
// If the source is here, every logged decision id must be either shown or excluded (never dropped silently).
const log = join(root, "..", "DECISIONS.md");
if (existsSync(log) && existsSync(join(root, "..", "docs"))) {
  const headings = readFileSync(log, "utf8").split("\n").filter((l) => /^- \*\*D-\d+/.test(l)).length;
  // New entries land after generation; only fewer headings than recorded means something was lost.
  if (headings < j.total) errs.push(`DECISIONS.md has ${headings} entries, fewer than the ${j.total} recorded`);
}
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log(`check:decisions ok (${ids.length} shown, ${j.excluded.length} excluded, ${j.adrs.length} ADRs).`);
