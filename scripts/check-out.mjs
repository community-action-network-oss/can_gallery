// Post-build guards on out/: no forms, no analytics, no external hosts, no em/en dashes in text.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const out = new URL("../out", import.meta.url).pathname;
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && files.push(p);
  }
})(out);

const problems = [];
const analytics = /gtag|google-analytics|googletagmanager|plausible|matomo|segment\.com|mixpanel|hotjar|fbq\(/i;
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const rel = f.slice(out.length + 1);
  if (/<form[\s>]/i.test(html)) problems.push(`${rel}: <form found`);
  if (analytics.test(html)) problems.push(`${rel}: analytics reference`);
  for (const m of html.matchAll(/<(?:a|link|script|img|iframe|source)\b[^>]*?\s(?:href|src)="(https?:)?\/\/[^"]*"/gi)) problems.push(`${rel}: external reference ${m[0].slice(0, 80)}`);
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  if (/[–—]/.test(text)) problems.push(`${rel}: em or en dash in rendered HTML`);
}
for (const must of ["index.html", "how-it-works/index.html", "contribute/index.html", "open-questions/index.html", "roadmap/index.html", "principles/index.html"]) {
  if (!files.some((f) => f.endsWith("/" + must))) problems.push(`missing route ${must}`);
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(`check:out ok (${files.length} html files)`);
