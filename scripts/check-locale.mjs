// Fails on literal internal hrefs outside src/lib/paths.ts and on a hard-coded lang in the layout.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|mjs)$/.test(p) ? [p] : []; });
const errs = [];
for (const p of walk(join(root, "src"))) {
  if (p.endsWith("src/lib/paths.ts")) continue;
  const t = readFileSync(p, "utf8");
  if (/href=(?:"\/|\{?`\/)/.test(t)) errs.push(`${p}: literal internal href, use localePath()`);
}
if (/<html[^>]*\blang=["'{]\s*["']/.test(readFileSync(join(root, "src/app/layout.tsx"), "utf8"))) errs.push("layout.tsx hard-codes lang, use htmlAttrs()");
// every route must be in the locale-ready path map (routes exist as pages)
const ROUTES = ["/", "/how-it-works/", "/where-you-fit/", "/contribute/", "/principles/", "/open-questions/", "/roadmap/", "/docs/", "/contribute/tasks/", "/contribute/roles/", "/how-decisions-are-made/"];
for (const r of ROUTES) {
  const f = join(root, "src/app", r === "/" ? "" : r, "page.tsx");
  if (!existsSync(f)) errs.push(`route ${r} has no page.tsx`);
}
// ponytail: planned routes (06-u23..u25: /archive-and-reuse, /private-location, /archive) are not listed until those pages exist.
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log("check:locale ok.");
