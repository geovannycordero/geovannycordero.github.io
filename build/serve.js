// Local preview only — `yarn build && yarn preview`. Not part of the
// deploy path (GitHub Pages serves docs/ as plain static files).
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), 'docs');
const PORT = process.env.PORT || 3000;

const CONTENT_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
};

http
  .createServer((req, res) => {
    let reqPath;
    try {
      reqPath = decodeURIComponent(req.url.split('?')[0]);
    } catch {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Bad request');
      return;
    }

    // path.join normalizes, so `..` segments are resolved here — anything
    // that lands outside docs/ is a traversal attempt, not a real route.
    let filePath = path.join(ROOT, reqPath);

    // Every real file under docs/ has an extension, so an extensionless
    // path is a directory route (/blog, /blog/, /blog/some-post).
    if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html');

    // Re-checked here, right before the path is used, so no reassignment
    // above can slip an unchecked value past this guard.
    if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Mirrors GitHub Pages, which serves /404.html for unknown paths.
        fs.readFile(path.join(ROOT, '404.html'), (notFoundErr, notFound) => {
          res.writeHead(404, {
            'Content-Type': notFoundErr ? 'text/plain' : 'text/html',
          });
          res.end(notFoundErr ? 'Not found' : notFound);
        });
        return;
      }
      const type = CONTENT_TYPES[path.extname(filePath)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': type });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`Serving docs/ at http://localhost:${PORT}`);
  });
