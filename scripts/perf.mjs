// Lighthouse-style check, offline: serve out/, drive Chromium with CDP throttling (slow 4G, 4x CPU) and read
// LCP, CLS, transferred bytes and console errors per route. No hosted service. Needs `npm run build` first.
// Usage: node scripts/perf.mjs [--all]   (default: every non-docs route plus a sample of docs routes)
import { BUDGET, KB, routes } from './budget.mjs';
import { serveOut } from './serve-out.mjs';

const ALL = process.argv.includes('--all');
const SLOW_4G = { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 };
const GITHUB_DOC_HOSTS = ['raw.githubusercontent.com', 'api.github.com']; // live document fetches, D-67/D-68, docs routes only

const all = routes();
const docs = all.filter((r) => r.startsWith('/docs/'));
const step = Math.max(1, Math.floor(docs.length / 6));
const list = ALL ? all : all.filter((r) => !docs.includes(r) || r === '/docs/' || r === '/docs/view/' || docs.indexOf(r) % step === 0);

const { chromium } = await import('@playwright/test');
const { server, url } = await serveOut(0);
const browser = await chromium.launch();
const fails = [];
const rows = [];
try {
  for (const route of list) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const blocked = new Set();
    const consoleErrors = [];
    await ctx.route((u) => !['127.0.0.1', 'localhost'].includes(u.hostname), (r) => { blocked.add(new URL(r.request().url()).hostname); r.abort(); });
    const page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource|net::ERR_/.test(m.text())) consoleErrors.push(m.text().slice(0, 120)); });
    page.on('pageerror', (e) => consoleErrors.push(String(e).slice(0, 120)));
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', SLOW_4G);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    let bytes = 0;
    cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength; });
    await page.addInitScript(() => {
      window.__m = { lcp: 0, cls: 0 };
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__m.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(url + route, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange'))); // flush
    const m = await page.evaluate(() => window.__m);
    const thirdParty = [...blocked].filter((h) => !(route.startsWith('/docs/') && GITHUB_DOC_HOSTS.includes(h)));
    if (m.lcp > BUDGET.lcpMs) fails.push(`${route} LCP ${Math.round(m.lcp)} ms > ${BUDGET.lcpMs}`);
    if (m.cls > BUDGET.cls) fails.push(`${route} CLS ${m.cls.toFixed(3)} > ${BUDGET.cls}`);
    if (thirdParty.length) fails.push(`${route} third-party request(s): ${thirdParty.join(', ')}`);
    for (const e of consoleErrors) fails.push(`${route} console error: ${e}`);
    rows.push(`${route.padEnd(58)} LCP ${String(Math.round(m.lcp)).padStart(5)} ms  CLS ${m.cls.toFixed(3)}  ${(bytes / KB).toFixed(0).padStart(5)} KB raw`);
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(rows.join('\n'));
if (fails.length) { console.error('\n' + fails.join('\n') + `\n\n${fails.length} finding(s)`); process.exit(1); }
console.log(`\nperf: ${rows.length} routes ok (slow 4G, 4x CPU throttle, no third-party requests)`);
