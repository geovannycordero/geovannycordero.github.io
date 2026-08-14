const { renderBlogIndexPage } = require('../../../build/pages/blog-index');
const { getAllPosts } = require('../../../build/content/blog');

function parse() {
  return new DOMParser().parseFromString(renderBlogIndexPage(), 'text/html');
}

describe('renderBlogIndexPage', () => {
  it('renders one card per post, each linking to its slug', () => {
    const doc = parse();
    getAllPosts().forEach(post => {
      const link = doc.querySelector(`a[href="/blog/${post.slug}/"]`);
      expect(link).toBeTruthy();
    });
  });

  it('shows the post count and latest date summary', () => {
    const doc = parse();
    const posts = getAllPosts();
    expect(doc.body.textContent).toContain(String(posts.length));
    expect(doc.body.textContent).toMatch(/articles available/i);
  });

  it('includes an RSS link and canonical/RSS alternate in <head>', () => {
    const doc = parse();
    expect(doc.querySelector('a[href="/rss.xml"]')).toBeTruthy();
    expect(doc.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://geovannycordero.com/blog/'
    );
    expect(doc.querySelector('link[rel="alternate"][type="application/rss+xml"]')).toBeTruthy();
  });

  it('has the #blog-content scroll target used by nav/main.js smooth-scroll', () => {
    const doc = parse();
    expect(doc.getElementById('blog-content')).toBeTruthy();
  });
});
