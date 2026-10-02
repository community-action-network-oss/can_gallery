// Contributor pitch: every link resolves, every profession has a link, urgency order holds, no dashes.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sup = join(root, "..");
const { PITCH, PITCH_TWO, HARDENING_NOTE } = await import("../src/content/pitch.ts");
const { ROLES } = await import("../src/content/roles/data.ts");
const oq = JSON.parse(readFileSync(join(root, "src/content/open-questions.json"), "utf8"));
const errs = [];
const order = ["most-urgent-now", "needed-now", "welcome"];
let last = 0;
const hasPlans = existsSync(join(sup, "plans"));
if (!hasPlans) console.log("check:pitch: no superproject plans folder, unit ids not checked.");
for (const p of PITCH) {
  const at = order.indexOf(p.urgency);
  if (at < 0) errs.push(`${p.profession}: unknown urgency`);
  if (at < last) errs.push(`${p.profession}: urgency out of order`);
  last = Math.max(last, at);
  if (!p.ask?.trim() || !p.why?.trim()) errs.push(`${p.profession}: ask and why required`);
  if (!p.links?.length) errs.push(`${p.profession}: needs at least one link`);
  for (const l of p.links ?? []) {
    if (l.kind === "oq" && !oq.some((q) => q.id === l.id)) errs.push(`${p.profession}: no open question ${l.id}`);
    else if (l.kind === "role" && !ROLES.some((r) => r.slug === l.id)) errs.push(`${p.profession}: no role ${l.id}`);
    else if (l.kind === "unit" && hasPlans) {
      const [plan, u] = l.id.split("-");
      const dir = readdirSync(join(sup, "plans")).find((d) => d.startsWith(plan + "-"));
      const ok = dir && readdirSync(join(sup, "plans", dir)).some((f) => f.startsWith(u + "-") && f.endsWith(".md"));
      if (!ok) errs.push(`${p.profession}: no plan unit ${l.id}`);
    } else if (!["oq", "role", "unit"].includes(l.kind)) errs.push(`${p.profession}: bad link kind`);
  }
}
const urg = (u) => PITCH.filter((p) => p.urgency === u).length;
if (!urg("most-urgent-now") || !urg("needed-now") || !urg("welcome")) errs.push("all three urgency groups must be present");
for (const need of ["Engineers", "Designers", "Lawyers", "Activists", "Policy", "Rights"])
  if (!PITCH.some((p) => p.profession.includes(need))) errs.push(`missing profession: ${need}`);
if (/[–—]/.test(JSON.stringify([PITCH, PITCH_TWO, HARDENING_NOTE]))) errs.push("dash in pitch copy");
if (/\b(live|operating)\b|paid|salary|authority/i.test(JSON.stringify(PITCH.map((p) => p.ask + p.why)))) errs.push("pitch implies pay, authority or liveness");
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log(`check:pitch ok: ${PITCH.length} professions.`);
