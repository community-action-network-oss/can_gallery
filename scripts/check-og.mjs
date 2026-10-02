// Every route has a 1200x630 PNG within the image budget, and its built page points at it (06-u10). Needs `npm run build`.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeTable, ogSlug } from './gen-og.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAX = 100 * 1024;
const fails = [];
const rows = routeTable();
if (rows.length < 17) fails.push(`only ${rows.length} routes found in pageMetadata calls`);
for (const r of rows) {
  const slug = ogSlug(r.path);
  const f = path.join(ROOT, 'public', 'og', `${slug}.png`);
  if (!existsSync(f)) { fails.push(`${r.path}: missing public/og/${slug}.png (run npm run gen:og)`); continue; }
  const b = readFileSync(f);
  if (b.length > MAX) fails.push(`${slug}.png is ${b.length} bytes > ${MAX}`);
  if (b.toString('latin1', 1, 4) !== 'PNG' || b.readUInt32BE(16) !== 1200 || b.readUInt32BE(20) !== 630) fails.push(`${slug}.png is not a 1200x630 PNG`);
  const page = path.join(ROOT, 'out', r.path === '/' ? '' : r.path, 'index.html');
  if (!existsSync(page)) { fails.push(`${r.path}: built page missing (run npm run build)`); continue; }
  const h = readFileSync(page, 'utf8');
  const meta = (key) => new RegExp(`<meta[^>]+(?:property|name)="${key}"[^>]+content="[^"]*/og/${slug}\\.png"`).test(h);
  for (const k of ['og:image', 'twitter:image']) if (!meta(k)) fails.push(`${r.path}: ${k} does not point at /og/${slug}.png`);
  if (!/<meta[^>]+name="twitter:card"[^>]+content="summary_large_image"/.test(h)) fails.push(`${r.path}: twitter:card is not summary_large_image`);
  if (!new RegExp(`<meta[^>]+property="og:image:alt"`).test(h)) fails.push(`${r.path}: no og:image:alt`);
}
// pages without a card of their own (roles, documents) borrow the parent card, which must exist
const extra = readdirSync(path.join(ROOT, 'public', 'og')).filter((n) => !rows.some((r) => ogSlug(r.path) + '.png' === n));
if (extra.length) fails.push(`stale files in public/og: ${extra.join(', ')}`);
if (fails.length) { console.error(fails.join('\n')); process.exit(1); }
console.log(`check:og ok (${rows.length} cards).`);
