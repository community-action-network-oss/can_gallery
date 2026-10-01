// Server only, build time: the document INDEX (paths, titles, sections). Never document text.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type DocEntry = { path: string; slug: string; section: string; title: string };

let cache: DocEntry[] | null = null;
export function manifest(): DocEntry[] {
  if (!cache) {
    try { cache = JSON.parse(readFileSync(join(process.cwd(), ".generated", "manifest.json"), "utf8")); }
    catch { throw new Error("docs index missing: run `npm run sync:docs` (dev and build do this first)"); }
  }
  return cache!;
}
