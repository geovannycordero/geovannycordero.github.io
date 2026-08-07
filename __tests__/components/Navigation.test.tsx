import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';

function renderNav() {
  return render(
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

describe('Navigation Component', () => {
  it('renders the navigation with correct content', () => {
    renderNav();

    // Check for navigation element
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has exactly this nav item set: Work, About, Skills, Experience, Credentials, Blog, Projects', () => {
    renderNav();

    const expected: Record<string, string> = {
      Work: '/#work',
      About: '/#about',
      Skills: '/#skills',
      Experience: '/#experience',
      Credentials: '/#credentials',
      Projects: '/projects',
    };

    Object.entries(expected).forEach(([label, href]) => {
      expect(
        screen.getByRole('link', { name: new RegExp(`^${label}$`, 'i') })
      ).toHaveAttribute('href', href);
    });

    // Blog is a button (client-side navigation handler), not a plain link.
    expect(
      screen.getAllByRole('button', { name: /^blog$/i }).length
    ).toBeGreaterThan(0);
  });

  it('does not link to the removed Education or Awards sections (regression guard)', () => {
    renderNav();
    expect(
      screen.queryByRole('link', { name: /^education$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /^awards$/i })
    ).not.toBeInTheDocument();
  });

  it('renders a persistent "Get in touch" CTA in the desktop bar, linking to #contact', () => {
    renderNav();
    const ctas = screen.getAllByRole('link', { name: /get in touch/i });
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach(cta => expect(cta).toHaveAttribute('href', '/#contact'));
  });

  it('displays logo or brand name', () => {
    renderNav();

    // Check for logo or brand
    expect(screen.getByText(/geovanny cordero/i)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    renderNav();

    // Check for nav element
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays mobile menu button on small screens', () => {
    renderNav();

    // Check for mobile menu button (it has no accessible name, just an icon)
    const menuButton = screen.getAllByRole('button')[1]; // Second button is the menu button
    expect(menuButton).toBeInTheDocument();
    // The button itself doesn't have lg:hidden class, but its container does
    expect(menuButton.closest('.lg\\:hidden')).toBeInTheDocument();
  });

  it('renders a theme switch', () => {
    renderNav();
    expect(screen.getAllByRole('switch').length).toBeGreaterThan(0);
  });

  it('uses the lg breakpoint (not md) for the desktop/mobile nav split', () => {
    renderNav();
    const brand = screen.getByRole('link', { name: /geovanny cordero/i });
    const desktopLinksContainer =
      brand.parentElement?.querySelector('.hidden.lg\\:flex');
    expect(desktopLinksContainer).toBeInTheDocument();

    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    expect(menuButton.closest('.lg\\:hidden')).toBeInTheDocument();
  });

  it('locks body scroll while the mobile menu is open, and restores it on close', () => {
    renderNav();
    const menuButton = screen.getByRole('button', { name: 'Open menu' });

    fireEvent.click(menuButton);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(document.body.style.overflow).toBe('');
  });

  it('unmounting with the menu open still restores body scroll', () => {
    const { unmount } = renderNav();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
