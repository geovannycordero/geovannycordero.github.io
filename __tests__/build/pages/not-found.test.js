const { renderNotFoundPage } = require('../../../build/pages/not-found');

function parse() {
  return new DOMParser().parseFromString(renderNotFoundPage(), 'text/html');
}

describe('renderNotFoundPage', () => {
  it('renders a full document with a 404 heading', () => {
    const doc = parse();
    expect(doc.querySelector('h1').textContent).toBe('Page not found');
    expect(doc.title).toContain('Page not found');
  });

  it('offers a way back into the site', () => {
    const hrefs = [...parse().querySelectorAll('main a')].map(a => a.getAttribute('href'));
    expect(hrefs).toContain('/');
  });

  it('keeps the shared chrome (skip link, nav, main landmark)', () => {
    const doc = parse();
    expect(doc.querySelector('a[href="#main"]')).toBeTruthy();
    expect(doc.querySelector('nav')).toBeTruthy();
    expect(doc.querySelector('main#main')).toBeTruthy();
  });
});
