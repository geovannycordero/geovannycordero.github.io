const { axe, toHaveNoViolations } = require('jest-axe');
const { renderBlogIndexPage } = require('../../build/pages/blog-index');

expect.extend(toHaveNoViolations);

function parse() {
  return new DOMParser().parseFromString(renderBlogIndexPage(), 'text/html');
}

// Unlike the original React version — whose async, Suspense-wrapped post
// list never actually resolved under jsdom/RTL, forcing these checks down
// to the page's static shell only — this page renders synchronously with
// no client framework in the way, so the full post list (real card
// headings and all) is scanned here too, not just the shell.
describe('/blog accessibility (full page)', () => {
  it('has no axe violations, including the rendered post cards', async () => {
    const doc = parse();
    const results = await axe(doc.documentElement);
    expect(results).toHaveNoViolations();
  });

  it('has exactly one h1 and no heading level skip', () => {
    const doc = parse();
    expect(doc.querySelectorAll('h1')).toHaveLength(1);
    expect(doc.querySelectorAll('h2').length).toBeGreaterThan(0);
  });
});
