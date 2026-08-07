import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

describe('RootLayout skip link', () => {
  it('renders a skip link targeting #main as the first focusable element in the body', () => {
    render(
      <RootLayout>
        <main id='main' data-testid='page-main'>
          content
        </main>
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
