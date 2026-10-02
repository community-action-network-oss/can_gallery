// Static performance budget over out/ (docs/performance-budget.md). No network, no hosted service.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { OUT, BUDGET, HTML_EXCEPTIONS, KB, routes, htmlOf, gz, assetsOf, gzSize } from './budget.mjs';

if (!readdirSync(OUT).length) { console.error('out/ missing: run npm run build first'); process.exit(2); }
const fails = [];
const kb = (n) => (n / KB).toFixed(1);
let maxJs = 0;
let maxCss = 0;
let maxHtml = 0;

for (const route of routes()) {
  const html = htmlOf(route);
  const { js, css } = assetsOf(html);
  const h = gz(Buffer.from(html));
  const j = gzSize(js);
  const c = gzSize(css);
  maxHtml = Math.max(maxHtml, h); maxJs = Math.max(maxJs, j); maxCss = Math.max(maxCss, c);
  const hMax = HTML_EXCEPTIONS[route] ?? BUDGET.html;
  if (h > hMax) fails.push(`${route} HTML ${kb(h)} KB gz > ${kb(hMax)}`);
  if (HTML_EXCEPTIONS[route] && h <= BUDGET.html) fails.push(`${route} is now within the HTML budget: remove it from HTML_EXCEPTIONS`);
  if (j > BUDGET.js) fails.push(`${route} JS ${kb(j)} KB gz > ${kb(BUDGET.js)}`);
  if (c > BUDGET.css) fails.push(`${route} CSS ${kb(c)} KB gz > ${kb(BUDGET.css)}`);
  for (const m of html.matchAll(/<script[^>]+src="https?:\/\//g)) fails.push(`${route} remote script src: ${m[0]}`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\swidth=/.test(m[0]) || !/\sheight=/.test(m[0]) || !/\salt=/.test(m[0])) fails.push(`${route} img without width, height and alt: ${m[0].slice(0, 80)}`);
  }
}

// every external URL in HTML and CSS: only https://github.com as an anchor (the allow list in the budget file); namespaces are not requests
const URLS = /https?:\/\/[^\s"'<>)\\]+/g;
// the site's own origin (SITE_URL, 06-u10) appears in absolute og:image and og:url meta values
const SELF = process.env.SITE_URL || 'http:' + '//localhost:3000';
const allowed = (u) => u.startsWith(SELF + '/') || /^https:\/\/github\.com\//.test(u) || /^https?:\/\/www\.w3\.org\/\d{4}\//.test(u);
const files = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else files.push(p);
  }
})(OUT);
for (const f of files) {
  const rel = path.relative(OUT, f);
  const ext = path.extname(f);
  const size = statSync(f).size;
  if (/\.(woff2?|ttf|otf|eot)$/.test(ext)) fails.push(`${rel} is a font file (system fonts only)`);
  if (/\.(png|jpe?g|gif|webp|avif|svg|ico)$/.test(ext) && gz(readFileSync(f)) > BUDGET.image) fails.push(`${rel} image ${kb(size)} KB > ${kb(BUDGET.image)}`);
  if (ext === '.html' || ext === '.css') {
    for (const u of readFileSync(f, 'utf8').matchAll(URLS)) {
      if (ext === '.html' && /raw\.githubusercontent\.com|api\.github\.com/.test(u[0])) continue; // check:out pins these
      if (!allowed(u[0])) fails.push(`${rel} external URL not on the allow list: ${u[0].slice(0, 80)}`);
    }
  }
  if (ext === '.js' && /(document\.cookie\s*=[^=]|(local|session)Storage\.setItem)/.test(readFileSync(f, 'utf8'))) fails.push(`${rel} writes a cookie or browser storage`);
}

console.log(`budget: worst page HTML ${kb(maxHtml)} KB, JS ${kb(maxJs)} KB, CSS ${kb(maxCss)} KB (all gzipped)`);
if (fails.length) { console.error([...new Set(fails)].join('\n') + `\n\n${new Set(fails).size} finding(s)`); process.exit(1); }
console.log('check:budget: ok');
