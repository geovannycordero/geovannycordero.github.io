const { getAllPosts, getAllPostSlugs } = require('../../../build/content/blog');

// getPostBySlug isn't tested here: it dynamically import()s remark/
// remark-gfm/remark-html, which ship ESM-only, and Jest's transform (even
// with next/jest) can't load them — the original React codebase hit the
// same wall and mocked lib/blog.ts away in every test that touched it. Real
// coverage of the Markdown pipeline lives in the runnable self-check at the
// bottom of build/content/blog.js instead (`node build/content/blog.js`),
// which every `yarn build` also exercises for real.
describe('getAllPosts', () => {
  it('returns every post sorted newest first', () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    const dates = posts.map(p => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('each post has the expected front-matter fields', () => {
    getAllPosts().forEach(post => {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.author).toBeTruthy();
    });
  });
});

describe('getAllPostSlugs', () => {
  it('matches the number of .md files in content/blog and getAllPosts', () => {
    const slugs = getAllPostSlugs();
    expect(slugs.length).toBe(getAllPosts().length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
