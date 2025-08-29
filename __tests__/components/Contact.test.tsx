import { render, screen } from '@testing-library/react';
import Contact from '@/components/contact';

describe('Contact Component', () => {
  it('renders the contact section with correct content', () => {
    render(<Contact />);

    // Check for main heading
    expect(
      screen.getByRole('heading', { level: 2, name: /get in touch/i })
    ).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<Contact />);

    // Check for contact details
    expect(screen.getByText(/geovanny@pm\.me/i)).toBeInTheDocument();
    expect(screen.getByText(/san josé, costa rica/i)).toBeInTheDocument();
  });

  it('displays social media links', () => {
    render(<Contact />);

    // Check for social media links
    const linkedinLink = screen.getByRole('link', { name: /linkedin\.com/i });

    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://linkedin.com/in/geovannycordero'
    );
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  it('displays contact information cards', () => {
    render(<Contact />);

    // Check for contact information cards
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('displays contact details correctly', () => {
    render(<Contact />);

    // Check for contact details
    expect(screen.getByText('geovanny@pm.me')).toBeInTheDocument();
    expect(screen.getByText('San José, Costa Rica')).toBeInTheDocument();
    expect(
      screen.getByText('linkedin.com/in/geovannycordero')
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Contact />);

    // Check for section element with id
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('displays collaboration message', () => {
    render(<Contact />);

    // Check for collaboration message
    expect(screen.getAllByText(/ready to collaborate/i)).toHaveLength(2); // Multiple mentions
    expect(
      screen.getByText(/let's discuss how we can work together/i)
    ).toBeInTheDocument();
  });

  it('displays contact description', () => {
    render(<Contact />);

    // Check for contact description
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
    expect(screen.getByText(/feel free to reach out/i)).toBeInTheDocument();
  });
});
