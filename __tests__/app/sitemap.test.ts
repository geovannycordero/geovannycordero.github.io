jest.mock('@/lib/blog', () => ({
  getAllPosts: jest.fn().mockResolvedValue([
    { slug: 'post-a', date: '2026-01-01' },
    { slug: 'post-b', date: '2026-02-01' },
  ]),
}));

import sitemap from '@/app/sitemap';

describe('sitemap.xml', () => {
  it('includes home, blog index, and projects with priority <= 1', async () => {
    const entries = await sitemap();
    const urls = entries.map(e => e.url);

    expect(urls).toEqual(
      expect.arrayContaining([
        'https://geovannycordero.com',
        'https://geovannycordero.com/blog',
        'https://geovannycordero.com/projects',
      ])
    );
    entries.forEach(e => expect(e.priority ?? 0).toBeLessThanOrEqual(1));
  });

  it('emits one entry per blog post with a valid lastModified date', async () => {
    const entries = await sitemap();
    const postEntry = entries.find(
      e => e.url === 'https://geovannycordero.com/blog/post-a'
    );

    expect(postEntry).toBeDefined();
    expect(postEntry?.lastModified).toBeInstanceOf(Date);
  });
});
