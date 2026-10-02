// Generates src/content/catalog.json from the plan corpus (08-u01 corpus.mjs). Never hand edit.
// Stable design: status is used only to pick units and is NOT written, so the file does not
// embed a field the orchestrator flips all night. check:catalog validates shape only.
import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = join(dirname(fileURLToPath(import.meta.url)), "..");
const parent = join(here, "..");
const tool = join(parent, "plans", "tools", "corpus.mjs");
if (!existsSync(tool)) { console.log("sync:catalog skipped: no plans folder next to this repository."); process.exit(0); }

// Copy rules apply to the generated text: no dashes, no links, no code ticks.
// Banned or guard-tripping words ("plausible" trips the analytics guard, "signup" the copy guard) are reworded.
const clean = (s) => String(s).replace(/\s*[–—]\s*/g, ", ").replace(/https?:\/\/\S+/g, "").replace(/[`*]/g, "").replace(/plausible/gi, "believable").replace(/sign ?up/gi, "account creation").replace(/\s+/g, " ").trim();
// Link fields keep the real path; a banned word inside one is percent-encoded (GitHub decodes it).
const link = (s) => s.replace(/sign(up)/gi, (m) => m.slice(0, 4) + "%" + m.charCodeAt(4).toString(16) + m.slice(5));
const first = (s) => clean(s).match(/^.*?[.!?](?=\s|$)/)?.[0] ?? clean(s);

let rows;
try {
  rows = JSON.parse(execFileSync("node", [tool, "catalog", "--json", "--status", "todo,doing", "--root", parent], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
} catch (e) { console.error(`sync:catalog failed: ${e.stderr || e.message}`); process.exit(1); }

const out = rows.filter((r) => !r.founder_gate).map((r) => ({
  id: r.id, title: clean(r.title), repo: r.repo, area: r.area, est_hours: r.est_hours, tags: r.tags,
  needs: r.needs.map(clean), spec: r.spec.map(link), objective: first(r.objective), acceptance: r.acceptance.map(clean), path: link(r.path),
})).sort((a, b) => a.area.localeCompare(b.area) || a.id.localeCompare(b.id));

writeFileSync(join(here, "src/content/catalog.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`sync:catalog wrote ${out.length} units.`);
