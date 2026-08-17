const { axe, toHaveNoViolations } = require('jest-axe');
const { renderProjectsPage } = require('../../build/pages/projects');

expect.extend(toHaveNoViolations);

function parse() {
  return new DOMParser().parseFromString(renderProjectsPage(), 'text/html');
}

// Same improvement over the original as blog.a11y.test.js: no async
// Suspense boundary to work around, so the real project grid is scanned,
// not just the page's static shell.
describe('/projects accessibility (full page)', () => {
  it('has no axe violations, including the rendered project cards', async () => {
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
