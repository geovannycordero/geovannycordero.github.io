import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import RootLayout from '@/app/layout';
import Home from '@/app/page';

expect.extend(toHaveNoViolations);

describe('homepage accessibility', () => {
  it('has no axe violations on the fully composed page', async () => {
    const { container } = render(
      <RootLayout>
        <Home />
      </RootLayout>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has exactly one main, one nav, and one h1', () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>
    );

    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('navigation')).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders the skip link as the first focusable element, targeting #main', () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>
    );

    const skipLink = screen.getByRole('link', { name: /skip to/i });
    expect(skipLink).toHaveAttribute('href', '#main');

    const focusable = document.body.querySelectorAll(
      'a[href], button, input, [tabindex]'
    );
    expect(focusable[0]).toBe(skipLink);
  });
});
