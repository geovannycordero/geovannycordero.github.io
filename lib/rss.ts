import { getAllPosts } from "./blog"

export async function generateRSSFeed() {
  const posts = await getAllPosts()
  const siteUrl = "https://geovannycordero.com"
  const feedUrl = `${siteUrl}/rss.xml`

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>geovanny@pm.me (Geovanny Cordero Valverde)</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("")}
    </item>`
    })
    .join("")

  const latestPostDate = posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Geovanny Cordero Valverde - Blog</title>
    <description>Insights, articles, and updates on software development, technology, and leadership from Geovanny Cordero Valverde, a Full-Stack Software Engineer based in Costa Rica.</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <managingEditor>geovanny@pm.me (Geovanny Cordero Valverde)</managingEditor>
    <webMaster>geovanny@pm.me (Geovanny Cordero Valverde)</webMaster>
    <lastBuildDate>${latestPostDate}</lastBuildDate>
    <pubDate>${latestPostDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/favicon.ico</url>
      <title>Geovanny Cordero Valverde - Blog</title>
      <link>${siteUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>
    ${rssItems}
  </channel>
</rss>`
}
