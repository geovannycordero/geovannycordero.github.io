import { render, screen } from '@testing-library/react';
import Footer from '@/components/footer';

describe('Footer Component', () => {
  it('renders the footer with correct content', () => {
    render(<Footer />);

    // Check for main heading
    expect(screen.getByText('Geovanny Cordero Valverde')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(
        /Full-Stack Software Engineer passionate about creating innovative solutions/i
      )
    ).toBeInTheDocument();
  });

  it('displays social media links with correct icons', () => {
    render(<Footer />);

    // Check for email link
    const emailLink = screen
      .getAllByRole('link')
      .find(link => link.getAttribute('href') === 'mailto:geovanny@pm.me');
    expect(emailLink).toBeInTheDocument();

    // Check for LinkedIn link
    const linkedinLink = screen
      .getAllByRole('link')
      .find(
        link =>
          link.getAttribute('href') ===
          'https://linkedin.com/in/geovannycordero'
      );
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('target', '_blank');

    // Check for GitHub link
    const githubLink = screen
      .getAllByRole('link')
      .find(
        link =>
          link.getAttribute('href') === 'https://github.com/geovannycordero'
      );
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders SVG icons for social media links', () => {
    render(<Footer />);

    // Check that SVG icons are present
    const svgIcons = document.querySelectorAll('svg');
    expect(svgIcons.length).toBeGreaterThanOrEqual(3); // At least email, LinkedIn, and GitHub icons

    // Check for specific icon classes
    const mailIcon = document.querySelector('.lucide-mail');
    const linkedinIcon = document.querySelector('.lucide-linkedin');
    const githubIcon = document.querySelector('.lucide-github');

    expect(mailIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
  });

  it('displays quick navigation links', () => {
    render(<Footer />);

    const quickLinks = [
      'About',
      'Skills',
      'Experience',
      'Education',
      'Contact',
    ];
    quickLinks.forEach(linkText => {
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toBeInTheDocument();
    });
  });

  it('displays services section', () => {
    render(<Footer />);

    const services = [
      'Full-Stack Development',
      'Team Leadership',
      'Project Management',
      'Technical Consulting',
      'Code Review & Mentoring',
    ];

    services.forEach(service => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  it('displays copyright information', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(`© ${currentYear} Geovanny Cordero Valverde`)
      )
    ).toBeInTheDocument();
  });

  it('includes RSS link', () => {
    render(<Footer />);

    // The RSSLink component should be rendered
    expect(screen.getByText(/RSS/i)).toBeInTheDocument();
  });
});
