/**
 * @jest-environment node
 */
jest.mock('@/lib/blog', () => ({
  getPostBySlug: jest.fn().mockResolvedValue({
    slug: 'test-post',
    title: 'Test Post',
    author: 'Geovanny Cordero Valverde',
    readTime: '3 min read',
  }),
  getAllPostSlugs: jest.fn().mockResolvedValue(['test-post']),
}));

import HomeImage from '@/app/opengraph-image';
import BlogImage from '@/app/blog/opengraph-image';
import ProjectsImage from '@/app/projects/opengraph-image';
import BlogPostImage from '@/app/blog/[slug]/opengraph-image';

describe('dynamic OG image generation', () => {
  it.each([
    ['home', () => HomeImage()],
    ['blog', () => BlogImage()],
    ['projects', () => ProjectsImage()],
  ])(
    '%s route renders without throwing and returns an image response',
    async (_name, generate) => {
      const response = await generate();
      expect(response).toBeInstanceOf(Response);
      expect(response.headers.get('content-type')).toMatch(/image/);
    }
  );

  it('blog post route renders per-slug content without throwing', async () => {
    const response = await BlogPostImage({
      params: Promise.resolve({ slug: 'test-post' }),
    });
    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get('content-type')).toMatch(/image/);
  });
});
