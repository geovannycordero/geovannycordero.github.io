const { getAllPosts } = require('./blog');
const { SITE_URL } = require('../layout');

function getSitemapEntries() {
  const posts = getAllPosts();

  // Trailing slashes throughout — they must match each page's own
  // <link rel="canonical">, or crawlers get redirecting <loc>s.
  const blogPosts = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogPosts,
  ];
}

function generateSitemapXml() {
  const entries = getSitemapEntries();
  const urlTags = entries
    .map(
      e => `
  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastModified.toISOString()}</lastmod>
    <changefreq>${e.changeFrequency}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlTags}
</urlset>`;
}

module.exports = { getSitemapEntries, generateSitemapXml };
