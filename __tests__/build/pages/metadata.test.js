const { renderHomePage } = require('../../../build/pages/home');
const { renderBlogIndexPage } = require('../../../build/pages/blog-index');
const { renderProjectsPage } = require('../../../build/pages/projects');

function parse(html) {
  return new DOMParser().parseFromString(html, 'text/html');
}

describe('static route metadata', () => {
  it.each([
    ['home', renderHomePage, 'https://geovannycordero.com/'],
    ['blog', renderBlogIndexPage, 'https://geovannycordero.com/blog/'],
    ['projects', renderProjectsPage, 'https://geovannycordero.com/projects/'],
  ])('%s has a title, description, canonical, and matching OG/Twitter', (_name, render, canonicalUrl) => {
    const doc = parse(render());

    expect(doc.title).toBeTruthy();
    expect(doc.querySelector('meta[name="description"]').getAttribute('content')).toBeTruthy();
    expect(doc.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(canonicalUrl);
    expect(doc.querySelector('meta[property="og:url"]').getAttribute('content')).toBe(canonicalUrl);
    expect(doc.querySelector('meta[name="twitter:card"]').getAttribute('content')).toBe(
      'summary_large_image'
    );
  });
});
