// Offline accessibility audit of the static export (out/). Usage:
//   node scripts/a11y.mjs            axe (wcag2a, 2aa, 21aa, 22aa) light and dark + structural checks
//   node scripts/a11y.mjs --perf     JS budget per page (130 KB gzipped, script tags in the HTML)
// Needs `npm run build` first and Chromium (npx playwright install chromium).
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serveOut } from './serve-out.mjs';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const BUDGET = 130 * 1024;
const DOC_SAMPLE = 8;

function pages() {
  const all = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') all.push('/' + path.relative(OUT, path.dirname(p)).split(path.sep).join('/'));
    }
  })(OUT);
  const routes = all.map((r) => (r === '/' ? '/' : r + '/')).filter((r) => !r.startsWith('/_not-found')).sort();
  const docs = routes.filter((r) => r.startsWith('/docs/') && r !== '/docs/' && r !== '/docs/view/');
  const step = Math.max(1, Math.floor(docs.length / DOC_SAMPLE));
  const sample = new Set(docs.filter((_, i) => i % step === 0).slice(0, DOC_SAMPLE));
  return routes.filter((r) => !docs.includes(r) || sample.has(r));
}

if (!existsSync(path.join(OUT, 'index.html'))) { console.error('out/ missing: run npm run build first'); process.exit(2); }

if (process.argv.includes('--perf')) {
  let bad = 0;
  for (const route of pages()) {
    const html = readFileSync(path.join(OUT, route, 'index.html'), 'utf8');
    const srcs = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]))];
    let total = 0;
    for (const s of srcs) {
      const f = path.join(OUT, s.split('?')[0]);
      if (existsSync(f) && statSync(f).isFile()) total += gzipSync(readFileSync(f)).length;
    }
    const ok = total <= BUDGET;
    if (!ok) bad++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${route} ${(total / 1024).toFixed(1)} KB gz`);
  }
  if (bad) { console.error(`${bad} page(s) over the 130 KB budget`); process.exit(1); }
  process.exit(0);
}

const { chromium } = await import('@playwright/test');
const { AxeBuilder } = await import('@axe-core/playwright');
const { server, url } = await serveOut(0);
const stop = () => server.close();
const fails = [];
const summary = [];
const fail = (route, scheme, msg) => fails.push(`${route} [${scheme}] ${msg}`);
const NO_ANIM = '*,*::before,*::after{animation:none!important;transition:none!important}';

let browser;
try {
  browser = await chromium.launch();
  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 800 } });
    // offline and repeatable: nothing leaves localhost (live doc fetches fail into their error state)
    await ctx.route((u) => !['127.0.0.1', 'localhost'].includes(u.hostname), (r) => r.abort());
    const page = await ctx.newPage();
    for (const route of pages()) {
      await page.goto(url + route, { waitUntil: 'load' });
      await page.waitForTimeout(150);
      const h1 = await page.locator('h1').count();
      if (h1 !== 1) fail(route, scheme, `expected one h1, found ${h1}`);
      if (!(await page.locator('html').getAttribute('lang'))) fail(route, scheme, 'html lang missing');

      if (scheme === 'light') {
        // skip link: first Tab lands on an in-page anchor whose target exists and takes focus on Enter
        await page.keyboard.press('Tab');
        const skip = await page.evaluate(() => {
          const a = document.activeElement;
          const id = a?.getAttribute?.('href');
          return { ok: a?.tagName === 'A' && id?.startsWith('#') && !!document.querySelector(id), href: id };
        });
        if (!skip.ok) fail(route, scheme, `first Tab is not a working skip link (${skip.href})`);
        // visible focus: walk the real Tab order (capped) so :focus-visible matches as for a keyboard user
        const noTr = await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important}' });
        const bare = await page.evaluate(() => { document.activeElement?.blur?.(); return []; });
        const seen = new Set();
        for (let i = 0; i < 150; i++) {
          await page.keyboard.press('Tab');
          const r = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return { end: true };
            const cs = getComputedStyle(el);
            const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
            return { key: el.outerHTML.slice(0, 80), ring, fv: el.matches(':focus-visible') };
          });
          if (r.end || seen.has(r.key)) break;
          seen.add(r.key);
          if (!r.ring || !r.fv) bare.push(r.key);
        }
        await noTr.evaluate((n) => n.remove());
        for (const b of bare) fail(route, scheme, `no visible focus style: ${b}`);
        // reduced motion
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const moving = await page.evaluate(() => [...document.querySelectorAll('*')].filter((e) => {
          const c = getComputedStyle(e);
          const d = Math.max(...c.animationDuration.split(',').map(parseFloat));
          return c.animationName !== 'none' && d > 0.01 && c.animationIterationCount !== '1' ;
        }).length);
        if (moving) fail(route, scheme, `${moving} element(s) keep looping animation under prefers-reduced-motion`);
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        // reflow: 320 px width, and 200 percent zoom of a 1280 window (640 css px)
        for (const w of [320, 640]) {
          await page.setViewportSize({ width: w, height: 800 });
          const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          if (over > 0) fail(route, scheme, `horizontal scroll at ${w}px (+${over}px)`);
        }
        await page.setViewportSize({ width: 1280, height: 800 });
        // link text unique enough: same visible text must not point to different places
        const dupes = await page.evaluate(() => {
          const m = new Map();
          for (const a of document.querySelectorAll('a[href]')) {
            const t = (a.getAttribute('aria-label') || a.textContent).trim().replace(/\s+/g, ' ').toLowerCase();
            if (!t) continue;
            const s = m.get(t) ?? new Set();
            s.add(a.getAttribute('href'));
            m.set(t, s);
          }
          return [...m].filter(([, s]) => s.size > 1).map(([t]) => t);
        });
        for (const t of dupes) fail(route, scheme, `link text "${t}" goes to different places`);
      }

      await page.addStyleTag({ content: NO_ANIM });
      const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      for (const v of res.violations) {
        fail(route, scheme, `axe ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0].target.join(' ')}`);
        summary.push(`${route}\t${scheme}\t${v.id}\t${v.impact}\t${v.nodes.length}`);
      }
    }
    await ctx.close();
  }
} finally {
  await browser?.close();
  stop();
}
if (fails.length) {
  console.error(fails.join('\n'));
  console.error(`\n${fails.length} finding(s)`);
  process.exit(1);
}
console.log('a11y: no findings (light and dark)');
process.exit(0);
