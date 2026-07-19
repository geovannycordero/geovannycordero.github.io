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

  it('displays navigation links', () => {
    renderNav();

    // Check for navigation links
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skills/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /education/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('has correct href attributes for navigation links', () => {
    renderNav();

    // Check href attributes
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const skillsLink = screen.getByRole('link', { name: /skills/i });
    const experienceLink = screen.getByRole('link', { name: /experience/i });
    const educationLink = screen.getByRole('link', { name: /education/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });

    expect(aboutLink).toHaveAttribute('href', '/#about');
    expect(skillsLink).toHaveAttribute('href', '/#skills');
    expect(experienceLink).toHaveAttribute('href', '/#experience');
    expect(educationLink).toHaveAttribute('href', '/#education');
    expect(contactLink).toHaveAttribute('href', '/#contact');
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
