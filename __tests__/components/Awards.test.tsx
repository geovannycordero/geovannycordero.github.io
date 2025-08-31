import { render, screen } from '@testing-library/react';
import Awards from '@/components/awards';

describe('Awards Component', () => {
  it('renders the main heading', () => {
    render(<Awards />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /awards & recognition/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      'text-3xl',
      'sm:text-4xl',
      'font-bold',
      'mb-4',
      'text-sage-900'
    );
  });

  it('renders the description text', () => {
    render(<Awards />);

    const description = screen.getByText(
      /recognition for excellence in software development and programming competitions/i
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass(
      'text-lg',
      'text-sage-700',
      'max-w-2xl',
      'mx-auto'
    );
  });

  it('renders the award card with correct content', () => {
    render(<Awards />);

    // Check for the award title
    const awardTitle = screen.getByText(
      /2020 Programathon Competition Winner/i
    );
    expect(awardTitle).toBeInTheDocument();

    // Check for the competition description
    const competitionDesc = screen.getByText(
      /Costa Rica's Most Prestigious Programming Competition/i
    );
    expect(competitionDesc).toBeInTheDocument();

    // Check for the detailed description
    const detailedDesc = screen.getByText(
      /Winner of the 2020 Programathon Competition, the most prestigious programming competition in Costa Rica, sponsored by Fiserv/i
    );
    expect(detailedDesc).toBeInTheDocument();

    // Check for the sponsor information (use getAllByText since it appears twice)
    const sponsorInfo = screen.getAllByText(/Sponsored by Fiserv/i)[0];
    expect(sponsorInfo).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Awards />);

    // Check for section element
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-20', 'bg-emerald-50/30');
  });

  it('renders icons correctly', () => {
    render(<Awards />);

    // Check for trophy icon (SVG with lucide-trophy class)
    const trophyIcon = document.querySelector('.lucide-trophy');
    expect(trophyIcon).toBeInTheDocument();

    // Check for star icon (SVG with lucide-star class)
    const starIcon = document.querySelector('.lucide-star');
    expect(starIcon).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    render(<Awards />);

    const card = document.querySelector('.card-elegant');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card-elegant', 'hover-lift');
  });

  it('renders the gradient background elements', () => {
    render(<Awards />);

    // Check for the gradient background div
    const gradientBg = document.querySelector(
      '.bg-gradient-to-br.from-emerald-200\\/40.to-emerald-300\\/40'
    );
    expect(gradientBg).toBeInTheDocument();
  });
});
