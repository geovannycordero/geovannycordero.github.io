import robots from '@/app/robots';

describe('robots.txt', () => {
  it('allows crawling and points at the sitemap', () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: '*', allow: '/' });
    expect(result.sitemap).toBe('https://geovannycordero.com/sitemap.xml');
  });

  it('does not disallow a real, published route', () => {
    const result = robots();
    const disallow = ([] as string[]).concat(
      (result.rules as { disallow?: string | string[] }).disallow ?? []
    );
    ['/blog', '/projects', '/rss.xml'].forEach(route => {
      expect(disallow.some(d => route.startsWith(d))).toBe(false);
    });
  });
});
