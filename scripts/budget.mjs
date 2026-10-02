// Shared by check-budget.mjs and perf.mjs. The numbers and their reasons live in docs/performance-budget.md.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
export const KB = 1024;
export const BUDGET = { html: 30 * KB, js: 135 * KB, css: 30 * KB, image: 100 * KB, lcpMs: 2500, cls: 0.1 };

export function routes() {
  const all = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') all.push('/' + path.relative(OUT, path.dirname(p)).split(path.sep).join('/'));
    }
  })(OUT);
  return all.map((r) => (r === '/' ? '/' : r + '/')).filter((r) => !r.startsWith('/_not-found')).sort();
}

export const htmlOf = (route) => readFileSync(path.join(OUT, route, 'index.html'), 'utf8');
export const gz = (buf) => gzipSync(buf).length;

/** Files a browser fetches for this page: module scripts and stylesheets. nomodule scripts (Next's legacy polyfills) are never fetched by a browser that runs modules, so they do not count. */
export function assetsOf(html) {
  const js = [...new Set([...html.matchAll(/<script([^>]+)>/g)].filter((m) => !/nomodule/i.test(m[1])).map((m) => /src="([^"]+)"/.exec(m[1])?.[1]).filter(Boolean))];
  const css = [...new Set([...html.matchAll(/<link([^>]+)>/g)].filter((m) => /rel="stylesheet"/.test(m[1])).map((m) => /href="([^"]+)"/.exec(m[1])?.[1]).filter(Boolean))];
  return { js, css };
}

export function gzSize(files) {
  let t = 0;
  for (const s of files) {
    const f = path.join(OUT, s.split('?')[0]);
    if (existsSync(f) && statSync(f).isFile()) t += gz(readFileSync(f));
  }
  return t;
}

/** Pages whose HTML is over BUDGET.html because Next embeds the whole page a second time as inline RSC data and the page is one long generated list.
 * Ratchet only: the ceiling may go down, never up. Listed in docs/performance-budget.md as an open founder review item. */
export const HTML_EXCEPTIONS = { '/contribute/tasks/': 225 * KB, '/docs/': 52 * KB, '/open-questions/': 52 * KB };
