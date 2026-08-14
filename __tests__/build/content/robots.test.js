const { getRobots, generateRobotsTxt } = require('../../../build/content/robots');

describe('robots', () => {
  it('allows crawling and points at the sitemap', () => {
    const result = getRobots();
    expect(result.rules).toMatchObject({ userAgent: '*', allow: '/' });
    expect(result.sitemap).toBe('https://geovannycordero.com/sitemap.xml');
  });

  it('does not disallow a real, published route', () => {
    const { rules } = getRobots();
    const disallow = [].concat(rules.disallow ?? []);
    ['/blog', '/projects', '/rss.xml'].forEach(route => {
      expect(disallow.some(d => route.startsWith(d))).toBe(false);
    });
  });

  it('renders a plain-text robots.txt with Allow/Disallow/Sitemap lines', () => {
    const txt = generateRobotsTxt();
    expect(txt).toContain('User-Agent: *');
    expect(txt).toContain('Allow: /');
    expect(txt).toContain('Disallow: /private/');
    expect(txt).toContain('Sitemap: https://geovannycordero.com/sitemap.xml');
  });
});
