const { renderBlogPostPage } = require('../../../build/pages/blog-post');

const post = {
  slug: 'test-post',
  title: 'Test Post',
  excerpt: 'A test excerpt.',
  date: '2026-01-01',
  tags: ['Golang', 'Testing'],
  author: 'Geovanny Cordero Valverde',
  content: '<p>body</p>',
  readTime: '3 min read',
};

function parse() {
  return new DOMParser().parseFromString(renderBlogPostPage(post), 'text/html');
}

function getJsonLd(doc, type) {
  const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
  const match = scripts.map(s => JSON.parse(s.textContent)).find(json => json['@type'] === type);
  if (!match) throw new Error(`No JSON-LD block found for @type "${type}"`);
  return match;
}

describe('renderBlogPostPage', () => {
  it('renders title, excerpt, tags, and the raw post content', () => {
    const doc = parse();
    expect(doc.querySelector('h1').textContent).toBe('Test Post');
    expect(doc.body.textContent).toContain('A test excerpt.');
    expect(doc.body.textContent).toContain('Golang');
    expect(doc.querySelector('.prose').innerHTML).toContain('<p>body</p>');
  });

  it('sets canonical url and article OG type', () => {
    const doc = parse();
    expect(doc.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://geovannycordero.com/blog/test-post/'
    );
    expect(doc.querySelector('meta[property="og:type"]').getAttribute('content')).toBe('article');
  });

  it('sets <title> to "Post Title - Geovanny Cordero Valverde"', () => {
    const doc = parse();
    expect(doc.title).toBe('Test Post - Geovanny Cordero Valverde');
  });

  it('includes BlogPosting JSON-LD with headline, url, and author', () => {
    const doc = parse();
    const posting = getJsonLd(doc, 'BlogPosting');
    expect(posting.headline).toBe('Test Post');
    expect(posting.url).toBe('https://geovannycordero.com/blog/test-post/');
    expect(posting.author).toEqual({ '@type': 'Person', name: 'Geovanny Cordero Valverde' });
  });

  it('includes BreadcrumbList JSON-LD ending on the post itself at position 3', () => {
    const doc = parse();
    const breadcrumbs = getJsonLd(doc, 'BreadcrumbList');
    const last = breadcrumbs.itemListElement.at(-1);
    expect(last.position).toBe(3);
    expect(last.item).toBe('https://geovannycordero.com/blog/test-post/');
  });
});
