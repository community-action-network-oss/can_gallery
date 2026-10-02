// Shape check only (not freshness): unit statuses change all night, so a freshness gate would go red.
// Also checks the page keeps owner, review and acceptance text on every card.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errs = [];
const cat = JSON.parse(readFileSync(join(root, "src/content/catalog.json"), "utf8"));
if (!Array.isArray(cat)) errs.push("catalog.json is not an array");
for (const u of Array.isArray(cat) ? cat : []) {
  for (const k of ["id", "title", "repo", "area", "objective", "path"]) if (typeof u[k] !== "string" || !u[k]) errs.push(`${u.id}: missing ${k}`);
  if (typeof u.est_hours !== "number") errs.push(`${u.id}: est_hours`);
  if (!Array.isArray(u.acceptance) || !u.acceptance.length) errs.push(`${u.id}: no acceptance`);
  if ("status" in u) errs.push(`${u.id}: status must not be embedded (drifts)`);
}
const page = readFileSync(join(root, "src/components/TaskCard.tsx"), "utf8");
for (const need of ["Owner", "Review", "Expected outcome"]) if (!page.includes(need)) errs.push(`TaskCard lacks "${need}" text`);
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log(`check:catalog ok (${cat.length} units).`);
