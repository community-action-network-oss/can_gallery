// Tiny static server for out/ (trailingSlash export). Binds localhost only.
// Usage: node scripts/serve-out.mjs [port]   or   import { serveOut }.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.ico': 'image/x-icon', '.png': 'image/png', '.woff2': 'font/woff2' };

async function resolveFile(urlPath) {
  const rel = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  const full = path.join(OUT, rel);
  if (full !== OUT && !full.startsWith(OUT + path.sep)) return null;
  try {
    const s = await stat(full);
    if (s.isDirectory()) return path.join(full, 'index.html');
    return full;
  } catch {
    return null;
  }
}

export function serveOut(port = 0) {
  const server = http.createServer(async (req, res) => {
    const file = await resolveFile(new URL(req.url, 'http://localhost').pathname);
    let status = 200;
    let target = file;
    if (!target) { status = 404; target = path.join(OUT, '404.html'); }
    try {
      const body = await readFile(target);
      res.writeHead(status, { 'content-type': TYPES[path.extname(target)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { url } = await serveOut(Number(process.argv[2] ?? 0));
  console.log(`serving out/ at ${url}`);
}
