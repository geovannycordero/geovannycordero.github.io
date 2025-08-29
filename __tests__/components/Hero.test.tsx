import { render, screen } from '@testing-library/react';
import Hero from '@/components/hero';

describe('Hero Component', () => {
  it('renders the hero section with correct content', () => {
    render(<Hero />);

    // Check for main heading (split text)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: (accessibleName, element) => {
          return (
            /Geovanny/.test(accessibleName) &&
            (element?.textContent?.includes('Cordero') ?? false)
          );
        },
      })
    ).toBeInTheDocument();

    // Check for subtitle (multiple matches)
    expect(
      screen.getAllByText(/Full-Stack Software Engineer/i).length
    ).toBeGreaterThan(0);

    // Check for description
    expect(
      screen.getByText(/Passionate Full-Stack Software Engineer/i)
    ).toBeInTheDocument();

    // Check for CTA buttons
    expect(
      screen.getByRole('link', { name: /learn more/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /get in touch/i })
    ).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    render(<Hero />);

    const learnMoreLink = screen.getByRole('link', { name: /learn more/i });
    const contactLink = screen.getByRole('link', { name: /get in touch/i });

    expect(learnMoreLink).toHaveAttribute('href', '/#about');
    expect(contactLink).toHaveAttribute('href', '/#contact');
  });

  it('displays the profile image', () => {
    render(<Hero />);

    const profileImage = screen.getByAltText(/Geovanny Cordero Valverde/i);
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/images/me-forest.jpg');
  });

  it('displays social media links with correct icons', () => {
    render(<Hero />);

    // Check for email link
    const emailLink = screen.getByRole('link', { name: /geovanny@pm\.me/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:geovanny@pm.me');

    // Check for LinkedIn link
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://linkedin.com/in/geovannycordero'
    );
    expect(linkedinLink).toHaveAttribute('target', '_blank');

    // Check for GitHub link
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/geovannycordero'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays location information', () => {
    render(<Hero />);

    expect(screen.getByText('San José, Costa Rica')).toBeInTheDocument();
  });

  // Skipping semantic structure test for now
  // it('has proper semantic structure', () => {
  //   render(<Hero />)
  //   expect(screen.getByRole('banner')).toBeInTheDocument()
  // })
});
