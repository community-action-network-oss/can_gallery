// Which repository paths the gallery may render. Used by the build script, the live
// loader and the unit test. Deny by default: anything not matched here is never fetched.
const ROOT_FILES = new Set(["manifesto.md", "DECISIONS.md"]);
const ROOT_DIRS = ["docs/open-questions/", "docs/spec/", "docs/design/", "docs/adr/", "can_policy/"];
const DENY_SEGMENT = new Set(["plans", ".claude", "tools", "scripts", "node_modules", ".git"]);

/** @param {unknown} p */
export function isPublicPath(p) {
  if (typeof p !== "string" || p.length === 0 || p.length > 300) return false;
  if (/[\\:%?#\0]/.test(p) || p.startsWith("/")) return false; // no schemes, queries, encodings, absolute
  const segs = p.split("/");
  if (segs.some((s) => s === "" || s === "." || s === ".." || s.startsWith(".") || DENY_SEGMENT.has(s))) return false;
  if (ROOT_FILES.has(p)) return true;
  if (!ROOT_DIRS.some((d) => p.startsWith(d))) return false;
  if (p.startsWith("can_policy/")) return /\.(md|json|ya?ml)$/.test(p) && !/(^|\/)(package(-lock)?|tsconfig)\.json$/.test(p);
  return p.endsWith(".md");
}

export const isMarkdown = (p) => p.endsWith(".md");

export function slugOf(p) {
  let s = p.startsWith("docs/") ? p.slice(5) : p.startsWith("can_policy/") ? "policy/" + p.slice(11) : p;
  s = s.replace(/\.[^./]+$/, "").replace(/\/README$/, "");
  return p.includes("/") ? s : s.toLowerCase();
}

export function sectionOf(p) {
  if (p === "manifesto.md") return "manifesto";
  if (p === "DECISIONS.md") return "decisions";
  if (p.startsWith("docs/spec/constitution/")) return "constitution";
  if (p.startsWith("docs/open-questions/")) return "open-questions";
  if (p.startsWith("docs/design/")) return "design";
  if (p.startsWith("docs/adr/")) return "adr";
  if (p.startsWith("can_policy/")) return "policy";
  return "spec";
}

/** Title for a file we have not read (new files found live). */
export const titleOf = (p) => p.split("/").pop().replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
