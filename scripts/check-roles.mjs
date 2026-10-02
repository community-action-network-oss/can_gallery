// Role pages: every template field present and non-empty, links resolve, ids exist, no dashes.
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { ROLES } = await import("../src/content/roles/data.ts");
const { URGENT_SENTENCE, NO_AUTHORITY } = await import("../src/content/roles/types.ts");
const catalog = JSON.parse(readFileSync(join(root, "src/content/catalog.json"), "utf8"));
const hasSup = existsSync(join(root, "..", "docs"));
const errs = [];
const text = (v) => (Array.isArray(v) ? v.every((x) => typeof x === "string" && x.trim()) && v.length > 0 : typeof v === "string" && !!v.trim());
if (ROLES.length < 4) errs.push("fewer than four roles");
for (const r of ROLES) {
  for (const f of ["slug", "name", "summary", "doNow", "prerequisites", "time", "privacyAndConflict", "prohibited", "review", "decisions", "links"])
    if (f === "links" ? !r.links?.length : !text(r[f])) errs.push(`${r.slug}: field ${f} missing or empty`);
  if (r.stage !== "founding") errs.push(`${r.slug}: stage must be founding`);
  if (r.urgency !== "most-urgent-now") errs.push(`${r.slug}: urgency must be most-urgent-now for founding technical roles`);
  if (!r.tasks?.areas?.length && !r.tasks?.ids?.length && !text(r.tasks?.note)) errs.push(`${r.slug}: tasks needs areas, ids or an honest note`);
  for (const id of r.tasks?.ids ?? []) if (!catalog.some((t) => t.id === id)) errs.push(`${r.slug}: task id ${id} not in catalog`);
  for (const l of r.links) {
    if (!l.internal === !l.doc) errs.push(`${r.slug}: link "${l.label}" needs exactly one of internal or doc`);
    if (l.internal && !existsSync(join(root, "src/app", l.internal.split("#")[0], "page.tsx"))) errs.push(`${r.slug}: no route ${l.internal}`);
    if (l.doc && hasSup && !existsSync(join(root, "..", l.doc))) errs.push(`${r.slug}: missing doc ${l.doc}`);
  }
  if (/[–—]/.test(JSON.stringify(r))) errs.push(`${r.slug}: dash in copy`);
}
if (/[–—]/.test(URGENT_SENTENCE + NO_AUTHORITY)) errs.push("dash in fixed text");
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log(`check:roles ok: ${ROLES.length} roles.`);
