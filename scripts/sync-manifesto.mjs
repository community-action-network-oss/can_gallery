// Generates src/content/manifesto.json from ../manifesto.md: the four sections the gallery quotes.
// Runs inside sync:content (standing rule). The superproject manifesto changes whenever the root lane edits
// it, so --check is SHAPE ONLY (four sections, non-empty), never freshness: a freshness gate would go red on
// every root edit. check:out forbids manifesto sentences in out/, so no page renders this JSON verbatim;
// pages carry their own wording and this file is the reference for claims and drift review.
// Dashes become commas, as in the open-questions sync.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(here, "..", "manifesto.md");
const out = join(here, "src", "content", "manifesto.json");
const WANT = ["Core promise", "Core principles", "Moderation model", "Open source, and how to contribute"];

if (process.argv.includes("--check")) {
  const j = JSON.parse(readFileSync(out, "utf8"));
  const bad = WANT.filter((t) => !j.sections?.some((s) => s.title === t && s.text.length > 0));
  if (bad.length) { console.error(`sync:manifesto shape: missing or empty: ${bad.join(", ")}`); process.exit(1); }
  console.log("sync:manifesto shape ok.");
  process.exit(0);
}
if (!existsSync(src)) { console.log("sync:manifesto skipped: ../manifesto.md not found."); process.exit(0); }

const clean = (s) => s.replace(/\s*[–—]\s*/g, ", ").replace(/`/g, "");
const lines = readFileSync(src, "utf8").split("\n");
const sections = WANT.map((title) => {
  const i = lines.findIndex((l) => l.replace(/^##\s+/, "").trim() === title && l.startsWith("## "));
  if (i < 0) { console.error(`sync:manifesto: section not found: ${title}`); process.exit(1); }
  let j = i + 1;
  while (j < lines.length && !lines[j].startsWith("## ")) j++;
  return { title, text: clean(lines.slice(i + 1, j).join("\n").trim()) };
});
writeFileSync(out, JSON.stringify({ generated: "from manifesto.md by scripts/sync-manifesto.mjs, do not hand edit", sections }, null, 2) + "\n");
console.log("sync:manifesto wrote src/content/manifesto.json");
