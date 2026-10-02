// Seed framings equal D-56 in DECISIONS.md, full texts equal the seed-bootstrap flow doc, label is exact.
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sup = join(root, "..");
const { SEEDS, SEED_LABEL } = await import("../src/content/seeds.ts");
const errs = [];
if (SEED_LABEL !== "Seed problem, synthetic evidence") errs.push("label text changed");
if (SEEDS.length !== 4) errs.push("expected four seeds");
const page = readFileSync(join(root, "src/app/proof/page.tsx"), "utf8");
if (!page.includes("{SEED_LABEL}")) errs.push("page does not render the label on each card");
const dec = join(sup, "DECISIONS.md");
if (!existsSync(dec)) console.log("check:seeds: no superproject, framings not compared.");
else {
  const d = readFileSync(dec, "utf8");
  const at = d.indexOf("- **D-56");
  const block = d.slice(at, d.indexOf("- **D-57", at));
  const lines = block.split("\n").map((l) => l.trim());
  const start = lines.findIndex((l) => l.startsWith("- The four framings"));
  const bullets = lines.slice(start + 1, start + 5).map((l) => l.replace(/^- /, ""));
  SEEDS.forEach((s, i) => { if (s.framing !== bullets[i]) errs.push(`seed ${s.n}: framing differs from D-56 ("${bullets[i]}")`); });
  const flow = join(sup, "docs/design/flows/seed-bootstrap.md");
  if (existsSync(flow)) {
    const f = readFileSync(flow, "utf8");
    for (const s of SEEDS) if (s.full && !f.includes(`"${s.full}"`)) errs.push(`seed ${s.n}: full text not verbatim in seed-bootstrap.md`);
  }
}
if (errs.length) { console.error("check:seeds failed:\n" + errs.join("\n")); process.exit(1); }
console.log("check:seeds ok");
