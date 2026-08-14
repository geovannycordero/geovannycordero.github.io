const fs = require('fs');
const path = require('path');
const { writePage, writeFile, outDir } = require('./write');
const { renderHomePage } = require('./pages/home');
const { renderBlogIndexPage } = require('./pages/blog-index');
const { renderBlogPostPage } = require('./pages/blog-post');
const { renderProjectsPage } = require('./pages/projects');
const { renderNotFoundPage } = require('./pages/not-found');
const { getAllPostSlugs, getPostBySlug } = require('./content/blog');
const { generateRSSFeed } = require('./content/rss');
const { generateSitemapXml } = require('./content/sitemap');
const { generateRobotsTxt } = require('./content/robots');
const { generateHealthJson } = require('./content/health');
const { renderOgImagePng } = require('./og-image');

async function build() {
  const out = outDir();
  console.log(`Building to ${out}`);

  // Start clean so a renamed or deleted slug can't leave a stale page behind.
  fs.rmSync(out, { recursive: true, force: true });

  // 1. public/* copies straight to the site root, same as Next's static export.
  fs.cpSync(path.join(process.cwd(), 'public'), out, { recursive: true });

  // 2. Compiled client asset — the Tailwind CSS build is a separate step
  // (see package.json's "build" script); this only copies the hand-written JS.
  fs.cpSync(
    path.join(process.cwd(), 'assets', 'js', 'main.js'),
    path.join(out, 'assets', 'js', 'main.js')
  );

  // 3. Pages.
  writePage('/', renderHomePage());
  writePage('/blog', renderBlogIndexPage());
  writePage('/projects', renderProjectsPage());
  writeFile('404.html', renderNotFoundPage());

  // Parsed once here and reused for the OG images below — the remark
  // pipeline is the slowest part of the build.
  const slugs = getAllPostSlugs();
  const posts = [];
  for (const slug of slugs) {
    const post = await getPostBySlug(slug);
    posts.push(post);
    writePage(`/blog/${slug}`, renderBlogPostPage(post));
  }

  // 4. RSS, sitemap, robots, health.
  writeFile('rss.xml', generateRSSFeed());
  writeFile('sitemap.xml', generateSitemapXml());
  writeFile('robots.txt', generateRobotsTxt());
  writeFile('health.json', generateHealthJson());

  // 5. OG images — one per route shape, plus one per blog post.
  writeFile(
    'opengraph-image.png',
    await renderOgImagePng({
      eyebrow: 'Portfolio',
      title: 'Full-Stack Software Engineer',
      meta: 'Golang · Ruby on Rails · JavaScript',
    })
  );
  writeFile(
    'blog/opengraph-image.png',
    await renderOgImagePng({
      eyebrow: 'Blog',
      title: 'Software development, technology & leadership',
    })
  );
  writeFile(
    'projects/opengraph-image.png',
    await renderOgImagePng({
      eyebrow: 'Projects',
      title: 'Full-stack applications, APIs & web solutions',
    })
  );
  for (const post of posts) {
    writeFile(
      `blog/${post.slug}/opengraph-image.png`,
      await renderOgImagePng({
        eyebrow: 'Blog',
        title: post.title,
        meta: `${post.author} · ${post.readTime}`,
      })
    );
  }

  console.log(`Built ${slugs.length} blog posts + 3 static pages to ${out}`);
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
