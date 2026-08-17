const { axe, toHaveNoViolations } = require('jest-axe');
const { renderHomePage } = require('../../build/pages/home');

expect.extend(toHaveNoViolations);

function parse() {
  return new DOMParser().parseFromString(renderHomePage(), 'text/html');
}

describe('homepage accessibility', () => {
  it('has no axe violations on the fully composed page', async () => {
    const doc = parse();
    const results = await axe(doc.documentElement);
    expect(results).toHaveNoViolations();
  });

  it('has exactly one main, one nav, and one h1', () => {
    const doc = parse();
    expect(doc.querySelectorAll('main')).toHaveLength(1);
    expect(doc.querySelectorAll('nav')).toHaveLength(1);
    expect(doc.querySelectorAll('h1')).toHaveLength(1);
  });

  it('renders the skip link as the first focusable element, targeting #main', () => {
    const doc = parse();
    const skipLink = doc.querySelector('a[href="#main"]');
    expect(skipLink).toBeTruthy();
    expect(skipLink.textContent).toMatch(/skip to/i);

    const focusable = doc.body.querySelectorAll(
      'a[href], button, input, [tabindex]'
    );
    expect(focusable[0]).toBe(skipLink);
  });
});
