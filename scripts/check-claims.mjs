// Checks docs/claims.md against src/ and the superproject docs.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sup = join(root, "..");
if (!existsSync(join(sup, "docs"))) {
  console.log("check:claims skipped: no superproject docs folder next to this checkout.");
  process.exit(0);
}
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|json)$/.test(p) ? [p] : []; });
const src = walk(join(root, "src")).map((p) => readFileSync(p, "utf8")).join("\n");
const rows = readFileSync(join(root, "docs/claims.md"), "utf8").split("\n")
  .filter((l) => /^\| C-\d+ /.test(l)).map((l) => l.split("|").slice(1, -1).map((c) => c.trim()));
const errs = [], seen = new Set();
for (const [id, page, text, source, status] of rows) {
  if (seen.has(id)) errs.push(`${id}: duplicate id`);
  seen.add(id);
  if (!existsSync(join(sup, source))) errs.push(`${id}: source missing: ${source}`);
  if (!["supported", "softened", "removed"].includes(status)) errs.push(`${id}: bad status ${status}`);
  const has = src.includes(text);
  if (status === "removed" ? has : !has) errs.push(`${id} (${status}): ${has ? "removed text still in src" : "text not found in src"}: ${text}`);
}
if (!rows.length) errs.push("no claim rows found");
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log(`check:claims ok: ${rows.length} claims.`);
