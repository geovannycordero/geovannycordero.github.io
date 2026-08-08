import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import BlogPage from '@/app/blog/page';

expect.extend(toHaveNoViolations);

// lib/blog.ts pulls in the ESM-only remark/remark-parse packages, which
// Jest's default CJS transform can't parse. Mocking here instead of
// fighting transformIgnorePatterns for a test that only needs the page's
// static shell (getAllPosts's real output isn't used by these assertions).
jest.mock('@/lib/blog', () => ({
  getAllPosts: jest.fn().mockResolvedValue([]),
}));

// The page's async, Suspense-wrapped post list doesn't resolve inside
// jsdom/RTL (no Flight runtime here), so these checks target the page's
// synchronous shell — the h1 and the closer section render unconditionally
// regardless of Suspense state, which is exactly where the heading-order
// bug lived. Card-title heading semantics are covered directly by
// BlogPostCard.test.tsx instead of through this page.
describe('/blog accessibility (static shell)', () => {
  it('has no axe violations in the initial render', async () => {
    const element = await BlogPage();
    const { container } = render(element);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has exactly one h1 and no heading level skip', async () => {
    const element = await BlogPage();
    render(element);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    // Regression guard: the page used to jump straight from h1 to h3
    // ("Stay Connected"), skipping h2 entirely.
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(
      0
    );
  });
});
