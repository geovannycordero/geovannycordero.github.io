import { render, screen } from '@testing-library/react';
import Contact from '@/components/contact';

describe('Contact', () => {
  it('renders a single h2 with the serif headline copy', () => {
    render(<Contact />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/talk about what you're building/i);
  });

  it('has proper semantic structure with id="contact"', () => {
    render(<Contact />);
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('renders an inline link row: email, LinkedIn, GitHub, Upwork', () => {
    render(<Contact />);

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

    const upwork = screen.getByRole('link', { name: /upwork/i });
    expect(upwork).toHaveAttribute(
      'href',
      'https://www.upwork.com/freelancers/~013cc6068c4bfca093'
    );
    expect(upwork).toHaveAttribute('target', '_blank');
    expect(upwork).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render a form — static export has no route to POST to', () => {
    render(<Contact />);
    expect(document.querySelector('form')).not.toBeInTheDocument();
  });
});
