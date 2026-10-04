/**
 * Minimal static server for local preview.
 * Usage: node build/serve.js [port]
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const PORT = Number(process.argv[2] || process.env.PORT || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
};

function safeJoin(base, urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  return path.join(base, clean);
}

createServer(async (req, res) => {
  try {
    const urlPath = new URL(req.url, 'http://localhost').pathname;
    let file = safeJoin(ROOT, urlPath);
    if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
    if (!path.extname(file)) file += '.html';
    let body;
    try {
      body = await readFile(file);
    } catch {
      file = path.join(ROOT, '404.html');
      body = await readFile(file);
      res.writeHead(404, { 'content-type': MIME['.html'] });
      res.end(body);
      return;
    }
    res.writeHead(200, {
      'content-type': MIME[path.extname(file)] || 'application/octet-stream',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'SAMEORIGIN',
      'referrer-policy': 'strict-origin-when-cross-origin',
    });
    res.end(body);
  } catch (err) {
    res.writeHead(500).end('Erreur serveur');
    console.error(err);
  }
}).listen(PORT, () => console.log(`Démo disponible sur http://localhost:${PORT}`));
