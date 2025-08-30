import { render, screen } from '@testing-library/react';
import Navigation from '@/components/navigation';

describe('Navigation Component', () => {
  it('renders the navigation with correct content', () => {
    render(<Navigation />);

    // Check for navigation element
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    render(<Navigation />);

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
    render(<Navigation />);

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
    render(<Navigation />);

    // Check for logo or brand
    expect(screen.getByText(/geovanny cordero/i)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Navigation />);

    // Check for nav element
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays mobile menu button on small screens', () => {
    render(<Navigation />);

    // Check for mobile menu button (it has no accessible name, just an icon)
    const menuButton = screen.getAllByRole('button')[1]; // Second button is the menu button
    expect(menuButton).toBeInTheDocument();
    // The button itself doesn't have md:hidden class, but its container does
    expect(menuButton.closest('.md\\:hidden')).toBeInTheDocument();
  });
});
