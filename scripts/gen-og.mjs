// Social cards, one 1200x630 PNG per route, rendered offline with Playwright Chromium into public/og/<slug>.png.
// The route table is read from the literal pageMetadata("/path/", "Title", "Description") calls in src/app (06-u10).
// Public Pictograms world (D-80): paper, ink, three pictogram inks, system fonts. Text only; every card says "Concept stage".
// ponytail: glyph shapes come from the machine's system fonts, so bytes can differ between machines; same machine, same bytes.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'og');
const STR = '"((?:[^"\\\\]|\\\\.)*)"';
const CALL = new RegExp(`pageMetadata\\(${STR},\\s*${STR},\\s*${STR}\\)`, 'g');
export const ogSlug = (p) => p.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';

export function routeTable() {
  const files = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/^(page|layout)\.tsx$/.test(e.name)) files.push(p);
    }
  })(path.join(ROOT, 'src', 'app'));
  const rows = new Map();
  for (const f of files.sort()) {
    for (const m of readFileSync(f, 'utf8').matchAll(CALL)) rows.set(m[1], { path: m[1], title: JSON.parse(`"${m[2]}"`), description: JSON.parse(`"${m[3]}"`) });
  }
  return [...rows.values()].sort((a, b) => a.path.localeCompare(b.path));
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const html = (r) => {
  const size = r.title.length > 40 ? 64 : r.title.length > 24 ? 80 : 96;
  return `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#E9EEF2;color:#1A1A1A;font-family:system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans',sans-serif;padding:36px}
.plate{width:100%;height:100%;background:#F4F7F9;border:4px solid #1A1A1A;padding:48px 56px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:20px}
.mark{font-weight:800;font-size:44px;letter-spacing:.04em}
.chip{font-weight:800;font-size:26px;padding:6px 18px;border:3px solid #A87413;color:#7A5300;background:#F4F7F9}
.dots{margin-left:auto;display:flex;gap:12px}.dots i{display:block;width:36px;height:36px}
h1{font-weight:800;font-size:${size}px;line-height:1.05;margin-top:56px;overflow-wrap:anywhere}
p{font-size:32px;line-height:1.35;color:#3F4A52;margin-top:28px;max-width:1000px}
.foot{margin-top:auto;font-size:24px;color:#3F4A52;border-top:2px solid #BFC9D1;padding-top:16px}
</style><div class="plate"><div class="top"><span class="mark">CAN</span><span class="chip">Concept stage</span>
<span class="dots"><i style="background:#1F4FA3"></i><i style="background:#A87413"></i><i style="background:#2F7D4F"></i></span></div>
<h1>${esc(r.title)}</h1><p>${esc(r.description.length > 150 ? r.description.slice(0, r.description.lastIndexOf(' ', 147)).replace(/[,.;:]$/, '') + '...' : r.description)}</p>
<div class="foot">Nothing here handles real problems yet.</div></div>`;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const rows = routeTable();
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const r of rows) {
    await page.setContent(html(r), { waitUntil: 'load' });
    writeFileSync(path.join(OUT, `${ogSlug(r.path)}.png`), await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } }));
  }
  await browser.close();
  console.log(`gen:og wrote ${rows.length} cards to public/og/`);
}
