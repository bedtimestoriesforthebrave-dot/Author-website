// Read-only, loopback-only browser test server. Never exposes API or private files.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const base = resolve('.');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.vtt': 'text/vtt; charset=utf-8' };
async function notFound(res, finnish = false) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(await readFile(resolve(base, finnish ? 'fi/404.html' : '404.html')).catch(() => 'Page not found'));
}
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end(); return; }
  if (pathname === '/') pathname = '/portfolio.html';
  if (pathname === '/portfolio') pathname = '/portfolio.html';
  if (pathname === '/fi/portfolio') pathname = '/fi/portfolio.html';
  if (/^\/(fi\/)?case-studies\/[a-z-]+$/.test(pathname)) pathname += '.html';
  if (pathname === '/docs/reorderops' || pathname === '/docs/reorderops/') pathname = '/docs/reorderops/index.html';
  if (/^\/docs\/reorderops\/[a-z-]+$/.test(pathname)) pathname += '.html';
  if (!/^\/((fi\/)?(portfolio\.html|404\.html|case-studies\/[a-z-]+\.html)|docs\/reorderops\/(index|reviewer-guide|architecture|planning-rules|ai-evaluation|public-demo)\.html|css\/portfolio\.css|assets\/portfolio\/[a-zA-Z0-9/_.-]+|data\/cv\.pdf)$/.test(pathname)) {
    await notFound(res, pathname.startsWith('/fi/')); return;
  }
  const file = resolve(base, `.${pathname}`);
  if (!file.startsWith(`${base}\\`) && !file.startsWith(`${base}/`)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' }).end(await readFile(file)); }
  catch { await notFound(res, pathname.startsWith('/fi/')); }
}).listen(4173, '127.0.0.1', () => console.log('Portfolio test preview: http://127.0.0.1:4173'));
