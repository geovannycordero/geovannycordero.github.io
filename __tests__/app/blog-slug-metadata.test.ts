// lib/blog.ts pulls in the ESM-only remark/remark-parse packages, which
// Jest's default CJS transform can't parse. Mocked here for the same reason
// __tests__/a11y/blog.a11y.test.tsx mocks it.
jest.mock('@/lib/blog', () => ({
  getPostBySlug: jest.fn().mockResolvedValue({
    slug: 'test-post',
    title: 'Test Post',
    excerpt: 'A test excerpt.',
    date: '2026-01-01',
    tags: ['Golang', 'Testing'],
    author: 'Geovanny Cordero Valverde',
    content: '<p>body</p>',
    readTime: '3 min read',
  }),
  getAllPostSlugs: jest.fn().mockResolvedValue(['test-post']),
}));

import { generateMetadata } from '@/app/blog/[slug]/page';

describe('/blog/[slug] generateMetadata', () => {
  it('builds canonical, OG article type, and published time from post data', async () => {
    const result = await generateMetadata({
      params: Promise.resolve({ slug: 'test-post' }),
    });

    expect(result.title).toBe('Test Post');
    expect(result.alternates?.canonical).toBe(
      'https://geovannycordero.com/blog/test-post'
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openGraph = result.openGraph as any;
    expect(openGraph?.type).toBe('article');
    expect(openGraph?.publishedTime).toBe('2026-01-01T00:00:00.000Z');
  });

  it('falls back to a bare "Post Not Found" title when the slug does not resolve', async () => {
    const { getPostBySlug } = jest.requireMock('@/lib/blog') as {
      getPostBySlug: jest.Mock;
    };
    getPostBySlug.mockResolvedValueOnce(undefined);

    const result = await generateMetadata({
      params: Promise.resolve({ slug: 'missing' }),
    });
    expect(result.title).toBe('Post Not Found');
  });
});
