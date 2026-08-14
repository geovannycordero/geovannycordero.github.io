const { getSitemapEntries, generateSitemapXml } = require('../../../build/content/sitemap');

describe('sitemap', () => {
  it('includes home, blog index, and projects with priority <= 1', () => {
    const entries = getSitemapEntries();
    const urls = entries.map(e => e.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        'https://geovannycordero.com/',
        'https://geovannycordero.com/blog/',
        'https://geovannycordero.com/projects/',
      ])
    );
    entries.forEach(e => expect(e.priority ?? 0).toBeLessThanOrEqual(1));
  });

  // Pages set trailing-slash canonicals, so <loc>s without one would be
  // redirects that contradict the canonical tag.
  it('emits trailing-slash URLs to match the pages own canonicals', () => {
    getSitemapEntries().forEach(e => expect(e.url.endsWith('/')).toBe(true));
  });

  it('emits one entry per blog post with a valid lastModified date', () => {
    const entries = getSitemapEntries();
    const postEntries = entries.filter(e => e.url.includes('/blog/') && e.url !== 'https://geovannycordero.com/blog/');
    expect(postEntries.length).toBeGreaterThan(0);
    postEntries.forEach(e => expect(e.lastModified).toBeInstanceOf(Date));
  });

  it('renders valid <urlset> XML with one <url> per entry', () => {
    const xml = generateSitemapXml();
    const urlCount = (xml.match(/<url>/g) || []).length;
    expect(urlCount).toBe(getSitemapEntries().length);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  });
});
