import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectsPage from '@/app/projects/page';

expect.extend(toHaveNoViolations);

// The page's async, Suspense-wrapped project grid doesn't resolve inside
// jsdom/RTL (no Flight runtime here), so these checks target the page's
// synchronous shell — the h1 and the closer section render unconditionally
// regardless of Suspense state, which is exactly where the heading-order
// bug lived. Card-title heading semantics are covered directly by
// ProjectCard.test.tsx instead of through this page.
describe('/projects accessibility (static shell)', () => {
  it('has no axe violations in the initial render', async () => {
    const element = await ProjectsPage();
    const { container } = render(element);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has exactly one h1 and no heading level skip', async () => {
    const element = await ProjectsPage();
    render(element);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    // Regression guard: the page used to jump straight from h1 to h3
    // ("Interested in Working Together?"), skipping h2 entirely.
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(
      0
    );
  });
});
