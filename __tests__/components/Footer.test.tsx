import { render, screen } from '@testing-library/react';
import Footer from '@/components/footer';

describe('Footer', () => {
  it('renders a single footer landmark', () => {
    render(<Footer />);
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  });

  it('displays copyright information', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Geovanny Cordero Valverde`))
    ).toBeInTheDocument();
  });

  it('includes the RSS link', () => {
    render(<Footer />);
    expect(screen.getByText(/RSS/i)).toBeInTheDocument();
  });

  it('does not duplicate the email/LinkedIn/GitHub/Upwork social links already in Contact', () => {
    render(<Footer />);
    expect(
      screen.queryByRole('link', { name: /geovanny@pm\.me/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /^linkedin$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /^github$/i })
    ).not.toBeInTheDocument();
  });

  it('does not render the old Quick Links or Services columns', () => {
    render(<Footer />);
    expect(screen.queryByText('Quick Links')).not.toBeInTheDocument();
    expect(screen.queryByText('Services')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Full-Stack Development')
    ).not.toBeInTheDocument();
  });
});
