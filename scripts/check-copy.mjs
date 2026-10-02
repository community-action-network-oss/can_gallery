// Copy guard for src/: no dashes, no liveness phrases, no unlisted URLs.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|mjs|json|css)$/.test(p) ? [p] : []; });

// One phrase per line. Matched case-insensitively.
const BANNED = [
  "sign up", "signup", "join now", "launching", "our users", "report your problem", "get help",
  "go live", "now live", "we are live", "download the app", "register now",
];
// Allowed hosts: GitHub only (D-67, D-68).
const HOSTS = ["github.com", "api.github.com", "raw.githubusercontent.com"];

const errs = [];
for (const p of walk(join(root, "src"))) {
  const rel = p.slice(root.length + 1);
  readFileSync(p, "utf8").split("\n").forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    if (/[–—]/.test(line)) errs.push(`${at}: em or en dash`);
    const low = line.toLowerCase();
    for (const b of BANNED) if (low.includes(b)) errs.push(`${at}: banned phrase "${b}"`);
    for (const m of line.matchAll(/https?:\/\/([^\/\s"'`)<>]+)/g)) {
      if (!HOSTS.includes(m[1])) errs.push(`${at}: host not allowed: ${m[1]}`);
    }
  });
}
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log("check:copy ok.");
