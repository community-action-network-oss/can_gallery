// Build-time INDEX for /docs: paths, titles and sections only. Document text is never bundled
// (D-68); pages fetch it live from GitHub in the browser.
//   node scripts/sync-docs.mjs            refresh scripts/docs-manifest.json from ../ (if present) and write .generated/manifest.json
//   node scripts/sync-docs.mjs --check    exit 1 if the committed path list is out of date (skips standalone)
// Titles come from ../ when present, else from raw.githubusercontent.com (build time only, never shipped as body text).
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isPublicPath, sectionOf, slugOf, titleOf } from "../src/lib/whitelist.mjs";
import { rawUrl } from "../src/config/docs-origin.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sup = join(root, "..");
const check = process.argv.includes("--check");
const manifestFile = join(root, "scripts", "docs-manifest.json");
const local = existsSync(join(sup, "docs", "spec", "00-index.md"));

const walk = (rel) => {
  const abs = join(sup, rel);
  if (!existsSync(abs)) return [];
  return readdirSync(abs).sort().flatMap((n) => {
    const r = `${rel}/${n}`;
    if (n.startsWith(".") || n === "node_modules") return [];
    return statSync(join(sup, r)).isDirectory() ? walk(r) : [r];
  });
};

let paths;
if (local) {
  // can_policy is listed only when checked out beside the docs; otherwise it is found live.
  paths = ["manifesto.md", "DECISIONS.md", ...["docs/open-questions", "docs/spec", "docs/design", "docs/adr", "can_policy"].flatMap(walk)]
    .filter((p) => isPublicPath(p) && existsSync(join(sup, p)));
  const next = JSON.stringify(paths, null, 2) + "\n";
  const prev = existsSync(manifestFile) ? readFileSync(manifestFile, "utf8") : null;
  if (prev !== next) {
    if (check) { console.error("sync-docs: scripts/docs-manifest.json is out of date, run npm run sync:content"); process.exit(1); }
    writeFileSync(manifestFile, next);
    console.log(`sync-docs: wrote scripts/docs-manifest.json (${paths.length} docs)`);
  }
} else {
  if (check) { console.log("sync-docs: ../ not found (standalone checkout), skipping check"); process.exit(0); }
  paths = JSON.parse(readFileSync(manifestFile, "utf8"));
}
if (check) { console.log("sync-docs: manifest up to date"); process.exit(0); }

const clean = (s) => s.replace(/\s*[–—]\s*/g, ", ");
const titleFrom = (p, text) => {
  const h1 = p.endsWith(".md") ? text.match(/^#\s+(.+)$/m) : null;
  return clean((h1 ? h1[1].replace(/[*`]/g, "") : titleOf(p)).trim());
};
const entries = [];
for (const p of paths) {
  let text;
  try {
    if (local) text = readFileSync(join(sup, p), "utf8");
    else {
      const r = await fetch(rawUrl(p));
      if (!r.ok) throw new Error(`${r.status} for ${rawUrl(p)}`);
      text = await r.text();
    }
  } catch (e) { console.error(`sync-docs: cannot read ${p}: ${e.message}`); process.exit(1); }
  entries.push({ path: p, slug: slugOf(p), section: sectionOf(p), title: titleFrom(p, text) });
}
const seen = new Set();
for (const e of entries) {
  if (seen.has(e.slug)) { console.error(`sync-docs: duplicate slug ${e.slug}`); process.exit(1); }
  seen.add(e.slug);
}
mkdirSync(join(root, ".generated"), { recursive: true });
writeFileSync(join(root, ".generated", "manifest.json"), JSON.stringify(entries, null, 1));
console.log(`sync-docs: ${entries.length} docs indexed from ${local ? "superproject checkout" : "raw.githubusercontent.com"}`);
