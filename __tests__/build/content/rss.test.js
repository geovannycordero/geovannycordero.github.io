const { generateRSSFeed } = require('../../../build/content/rss');
const { getAllPosts } = require('../../../build/content/blog');

// New coverage — see the migration plan's Phase 6 "gap to close" note: no
// test exercised lib/rss.ts's generator directly, only indirectly via the
// route handler.
describe('generateRSSFeed', () => {
  it('is well-formed enough to parse: one <item> per post', () => {
    const xml = generateRSSFeed();
    const itemCount = (xml.match(/<item>/g) || []).length;
    expect(itemCount).toBe(getAllPosts().length);
  });

  it('includes required channel fields', () => {
    const xml = generateRSSFeed();
    expect(xml).toContain('<title>Geovanny Cordero Valverde - Blog</title>');
    expect(xml).toContain('<link>https://geovannycordero.com</link>');
    expect(xml).toContain('rel="self"');
  });

  it('wraps each post title/excerpt in CDATA and links to the post', () => {
    const xml = generateRSSFeed();
    const [first] = getAllPosts();
    expect(xml).toContain(`<title><![CDATA[${first.title}]]></title>`);
    expect(xml).toContain(`<link>https://geovannycordero.com/blog/${first.slug}/</link>`);
  });
});
