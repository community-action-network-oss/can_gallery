// Post-build guards on out/: no forms, no analytics, no external hosts, no em/en dashes in text.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { DOCS_ORIGIN, TREE_ORIGIN, ORG, MAIN_REPO, POLICY_REPO } from "../src/config/docs-origin.mjs";

const out = new URL("../out", import.meta.url).pathname;
const files = [];
const js = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
    else if (p.endsWith(".js")) js.push(p);
  }
})(out);

const problems = [];
const analytics = /gtag|google-analytics|googletagmanager|plausible|matomo|segment\.com|mixpanel|hotjar|fbq\(/i;
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const rel = f.slice(out.length + 1);
  if (/<form[\s>]/i.test(html)) problems.push(`${rel}: <form found`);
  if (analytics.test(html)) problems.push(`${rel}: analytics reference`);
  // The only external host allowed is github.com, and only as an <a href> over https.
  for (const m of html.matchAll(/<(?:a|link|script|img|iframe|source)\b[^>]*?\s(?:href|src)="(https?:)?\/\/[^"]*"/gi)) {
    if (/^<a\s/i.test(m[0]) && /\shref="https:\/\/github\.com\//.test(m[0])) continue;
    problems.push(`${rel}: external reference ${m[0].slice(0, 80)}`);
  }
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  if (/[–—]/.test(text)) problems.push(`${rel}: em or en dash in rendered HTML`);
}
// D-67/D-68: the only runtime third-party requests are the live document fetches, to exactly two
// GitHub hosts and two repositories. Pin the config, then make sure no other fetch host is in built JS.
if (DOCS_ORIGIN !== "https://raw.githubusercontent.com") problems.push(`DOCS_ORIGIN is ${DOCS_ORIGIN}`);
if (TREE_ORIGIN !== "https://api.github.com/repos") problems.push(`TREE_ORIGIN is ${TREE_ORIGIN}`);
if (ORG !== "community-action-network-oss" || MAIN_REPO !== "community_action_network_oss" || POLICY_REPO !== "can_policy") {
  problems.push("docs-origin.mjs org or repositories changed; update this check deliberately");
}
for (const f of js) {
  const code = readFileSync(f, "utf8");
  for (const m of code.matchAll(/(?:raw\.githubusercontent\.com|api\.github\.com)[^"'`\s]*/g)) {
    const ok = [/^raw\.githubusercontent\.com$/, /^api\.github\.com\/repos$/,
      /^raw\.githubusercontent\.com(\/\$\{\w+\}){2}\/main\/\$\{\w+\}$/,
      /^api\.github\.com\/repos(\/\$\{\w+\}){2}\/git\/trees\/main\?recursive=1$/];
    if (!ok.some((r) => r.test(m[0]))) problems.push(`${f.slice(out.length + 1)}: unexpected GitHub host reference ${m[0].slice(0, 60)}`);
  }
}
for (const f of files) {
  if (/raw\.githubusercontent\.com|api\.github\.com/.test(readFileSync(f, "utf8"))) problems.push(`${f.slice(out.length + 1)}: GitHub fetch host in HTML (belongs in JS only)`);
}

// D-68: no document text in out/. The index of documents is fine; their words are not.
const manifestFile = new URL("../.generated/manifest.json", import.meta.url).pathname;
const manifest = existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, "utf8")) : null;
if (!manifest) problems.push("missing .generated/manifest.json");
else {
  const docPages = files.map((f) => f.slice(out.length + 1)).filter((r) => r.startsWith("docs/") && r !== "docs/index.html" && r !== "docs/view/index.html");
  if (docPages.length !== manifest.length) problems.push(`docs pages ${docPages.length} do not match manifest ${manifest.length}`);
  for (const e of manifest) if (!docPages.includes(`docs/${e.slug}/index.html`)) problems.push(`missing docs page for ${e.path}`);
  const everything = [...files, ...js];
  const sup = new URL("../..", import.meta.url).pathname;
  for (const src of ["manifesto.md", "DECISIONS.md", "docs/spec/00-index.md"]) {
    const p = join(sup, src);
    if (!existsSync(p)) continue;
    const line = readFileSync(p, "utf8").split("\n").find((l) => l.length > 90 && !/^[#>|\-*\d`]/.test(l) && !/[*_`\[\]<&]/.test(l.slice(0, 70)));
    if (!line) continue;
    const needle = line.slice(0, 70);
    for (const f of everything) if (readFileSync(f, "utf8").includes(needle)) problems.push(`${f.slice(out.length + 1)}: contains document text from ${src}`);
  }
}
for (const must of ["index.html", "how-it-works/index.html", "contribute/index.html", "contribute/tasks/index.html", "contribute/roles/index.html", "contribute/roles/engineers/index.html", "contribute/roles/legal-policy/index.html", "contribute/roles/translators/index.html", "contribute/roles/researchers/index.html", "contribute/roles/documentation/index.html", "open-questions/index.html", "roadmap/index.html", "principles/index.html", "where-you-fit/index.html", "how-decisions-are-made/index.html", "docs/index.html", "docs/view/index.html"]) {
  if (!files.some((f) => f.endsWith("/" + must))) problems.push(`missing route ${must}`);
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(`check:out ok (${files.length} html files)`);
