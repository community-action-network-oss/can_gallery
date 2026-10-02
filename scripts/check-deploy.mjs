// Deploy readiness of out/ (06-u13). Host-neutral: no vendor, no domain. Needs `npm run build`.
// Localhost URLs are the known SITE_URL default (OQ-domain), so they warn; `--release` makes them fail.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
const release = process.argv.includes("--release");
const fails = [], warns = [];
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });

if (!existsSync(out)) { console.error("check:deploy: out/ missing, run npm run build"); process.exit(1); }
if (!existsSync(join(out, "404.html"))) fails.push("out/404.html missing");

// Headers file
const hp = join(root, "deploy", "headers.txt");
const headers = existsSync(hp) ? Object.fromEntries(readFileSync(hp, "utf8").split("\n").filter((l) => l.trim() && !l.startsWith("#") && l.includes(":")).map((l) => { const i = l.indexOf(":"); return [l.slice(0, i).trim().toLowerCase(), l.slice(i + 1).trim()]; })) : {};
if (!existsSync(hp)) fails.push("deploy/headers.txt missing");
for (const h of ["content-security-policy", "x-content-type-options", "referrer-policy", "permissions-policy"]) if (!(h in headers)) fails.push(`headers.txt lacks ${h}`);
const csp = headers["content-security-policy"] || "";
for (const d of ["default-src 'self'", "frame-ancestors 'none'"]) if (!csp.includes(d)) fails.push(`CSP lacks ${d}`);
if (headers["referrer-policy"] && headers["referrer-policy"] !== "no-referrer") fails.push("Referrer-Policy must be no-referrer");
if (headers["x-content-type-options"] && headers["x-content-type-options"] !== "nosniff") fails.push("X-Content-Type-Options must be nosniff");

const scriptSrc = (csp.match(/script-src ([^;]*)/) || [, ""])[1];
const inlineOk = /'unsafe-inline'|'sha256-|'nonce-/.test(scriptSrc);
const VENDOR = /\b[\w-]+\.(pages\.dev|netlify\.app|vercel\.app|github\.io|amazonaws\.com|cloudfront\.net|web\.app|firebaseapp\.com|azurestaticapps\.net|onrender\.com|surge\.sh)\b/;
const siteUrl = process.env.SITE_URL || "";
let inline = 0, local = 0;
for (const p of walk(out).filter((f) => /\.(html|js|css)$/.test(f))) {
  const rel = p.slice(root.length + 1), s = readFileSync(p, "utf8");
  if (p.endsWith(".html") && /localhost|127\.0\.0\.1/.test(s)) local++;
  const v = s.match(VENDOR); if (v) fails.push(`${rel}: vendor host ${v[0]}`);
  if (p.endsWith(".html")) inline += (s.match(/<script(?![^>]*\ssrc=)[^>]*>/g) || []).length;
}
if (local) (release || siteUrl ? fails : warns).push(`${local} built files mention localhost (set SITE_URL for the real build; OQ-domain)`);
if (inline && !inlineOk) fails.push(`${inline} inline scripts but CSP script-src has no 'unsafe-inline', hash or nonce`);

warns.forEach((w) => console.warn("check:deploy warn:", w));
if (fails.length) { console.error("check:deploy FAILED:\n- " + fails.join("\n- ")); process.exit(1); }
console.log(`check:deploy ok (404.html, headers, ${inline} inline scripts covered by CSP${release ? ", release mode" : ""})`);
