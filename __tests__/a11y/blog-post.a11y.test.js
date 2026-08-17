const { axe, toHaveNoViolations } = require('jest-axe');
const { renderBlogPostPage } = require('../../build/pages/blog-post');

expect.extend(toHaveNoViolations);

// Fixture, not a real post via getPostBySlug: that function dynamic-
// import()s remark (ESM-only), which Jest can't load — same constraint
// noted in __tests__/build/content/blog.test.js. renderBlogPostPage itself
// has no such dependency, so it's fully testable with fixture data.
const post = {
  slug: 'test-post',
  title: 'Test Post',
  excerpt: 'A test excerpt.',
  date: '2026-01-01',
  tags: ['Golang', 'Testing'],
  author: 'Geovanny Cordero Valverde',
  content: '<p>Body paragraph.</p><h2>A subheading</h2><p>More body.</p>',
  readTime: '3 min read',
};

// New coverage — the original suite had no dedicated a11y test for
// /blog/[slug] at all.
describe('/blog/[slug] accessibility', () => {
  it('has no axe violations', async () => {
    const doc = new DOMParser().parseFromString(
      renderBlogPostPage(post),
      'text/html'
    );
    const results = await axe(doc.documentElement);
    expect(results).toHaveNoViolations();
  });
});
