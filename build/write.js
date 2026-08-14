const fs = require('fs');
const path = require('path');

function outDir() {
  return process.env.BUILD_OUT_DIR || path.join(process.cwd(), 'docs');
}

// Mirrors next.config.mjs's trailingSlash: true — every route becomes a
// directory with an index.html, e.g. /blog/hello -> blog/hello/index.html.
function writePage(routePath, htmlString) {
  const segments = routePath.split('/').filter(Boolean);
  const dir = path.join(outDir(), ...segments);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), htmlString);
}

// For non-HTML static files that don't get the /index.html treatment,
// e.g. rss.xml, sitemap.xml, robots.txt, opengraph-image.png.
function writeFile(routePath, contents) {
  const fullPath = path.join(outDir(), routePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, contents);
}

module.exports = { outDir, writePage, writeFile };
