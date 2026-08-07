import { render, screen } from '@testing-library/react';
import Hero from '@/components/hero';

describe('Hero', () => {
  it('renders exactly one h1 containing the promise copy', () => {
    render(<Hero />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/production systems/i);
  });

  it('wraps the accent word inside h1 in an underline element', () => {
    render(<Hero />);
    const h1 = screen.getByRole('heading', { level: 1 });
    const accentWord = screen.getByText(/production systems/i);
    expect(h1).toContainElement(accentWord);
    expect(accentWord.className).toMatch(/underline/);
  });

  it('shows a mono eyebrow with role and location', () => {
    render(<Hero />);
    expect(screen.getByTestId('hero-eyebrow')).toHaveTextContent(
      /full-stack software engineer/i
    );
    expect(screen.getByTestId('hero-eyebrow')).toHaveTextContent(
      /san josé, costa rica/i
    );
  });

  it('has exactly one primary CTA linking to #contact', () => {
    render(<Hero />);
    const ctas = screen.getAllByRole('link', { name: /get in touch/i });
    expect(ctas).toHaveLength(1);
    expect(ctas[0]).toHaveAttribute('href', '/#contact');
  });

  it('has a résumé download link', () => {
    render(<Hero />);
    const resumeLink = screen.getByRole('link', { name: /résumé|resume/i });
    expect(resumeLink).toHaveAttribute(
      'href',
      '/resume/geovanny-cordero-cv.pdf'
    );
    expect(resumeLink).toHaveAttribute('download');
  });

  it('does not render a "Learn More" button', () => {
    render(<Hero />);
    expect(
      screen.queryByRole('link', { name: /learn more/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /learn more/i })
    ).not.toBeInTheDocument();
  });

  it('exposes email, LinkedIn, and GitHub in the meta row with correct attributes', () => {
    render(<Hero />);

    const email = screen.getByRole('link', { name: /geovanny@pm\.me/i });
    expect(email).toHaveAttribute('href', 'mailto:geovanny@pm.me');

    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedin).toHaveAttribute(
      'href',
      'https://linkedin.com/in/geovannycordero'
    );
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');

    const github = screen.getByRole('link', { name: /github/i });
    expect(github).toHaveAttribute(
      'href',
      'https://github.com/geovannycordero'
    );
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the terminal card decoratively, hidden below lg', () => {
    render(<Hero />);
    const terminal = screen.getByTestId('terminal-card-wrapper');
    expect(terminal).toHaveAttribute('aria-hidden', 'true');
    expect(terminal.className).toMatch(/hidden/);
    expect(terminal.className).toMatch(/lg:block/);
  });

  it('does not render a portrait image', () => {
    render(<Hero />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
