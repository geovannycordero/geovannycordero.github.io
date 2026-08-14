const { getAllPosts } = require('./blog');
const { SITE_URL } = require('../layout');

function generateRSSFeed() {
  const posts = getAllPosts();
  const feedUrl = `${SITE_URL}/rss.xml`;

  const rssItems = posts
    .map(post => {
      const postUrl = `${SITE_URL}/blog/${post.slug}/`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>geovanny@pm.me (Geovanny Cordero Valverde)</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>`;
    })
    .join('');

  const latestPostDate =
    posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Geovanny Cordero Valverde - Blog</title>
    <description>Insights, articles, and updates on software development, technology, and leadership from Geovanny Cordero Valverde, a Full-Stack Software Engineer based in Costa Rica.</description>
    <link>${SITE_URL}</link>
    <language>en-us</language>
    <managingEditor>geovanny@pm.me (Geovanny Cordero Valverde)</managingEditor>
    <webMaster>geovanny@pm.me (Geovanny Cordero Valverde)</webMaster>
    <lastBuildDate>${latestPostDate}</lastBuildDate>
    <pubDate>${latestPostDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/icons/android-chrome-512x512.png</url>
      <title>Geovanny Cordero Valverde - Blog</title>
      <link>${SITE_URL}</link>
      <width>512</width>
      <height>512</height>
    </image>
    ${rssItems}
  </channel>
</rss>`;
}

module.exports = { generateRSSFeed };
