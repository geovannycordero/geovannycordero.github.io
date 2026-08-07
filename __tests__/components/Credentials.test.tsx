import { render, screen } from '@testing-library/react';
import Credentials from '@/components/credentials';

const CERTIFICATIONS_WITH_URL = 7; // 8 total; only "Desarrollo de Habilidades Blandas" has no url

describe('Credentials', () => {
  it('renders both degrees, including the MBA-in-progress line', () => {
    render(<Credentials />);
    expect(screen.getByText(/mba in project management/i)).toBeInTheDocument();
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(
      screen.getByText(/bachelor in computer science/i)
    ).toBeInTheDocument();
  });

  it('renders all 8 certifications', () => {
    render(<Credentials />);
    [
      'Gerencia con Liderazgo',
      'Introduction to Data Analytics for Business',
      'Crisis Management',
      'Introduction to Big Data',
      'Desarrollo de Habilidades Blandas',
      'Claude 101',
      'Claude Code 101',
      'Claude Code in Action',
    ].forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders a verify link for exactly the certifications that have a url', () => {
    render(<Credentials />);
    expect(screen.getAllByRole('link', { name: /verify/i })).toHaveLength(
      CERTIFICATIONS_WITH_URL
    );
  });

  it('renders the 2020 Programathon award', () => {
    render(<Credentials />);
    expect(
      screen.getByText(/2020 programathon competition winner/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/sponsored by fiserv/i)).toBeInTheDocument();
  });

  it('has a single h2 and every degree/cert/award as an h3, no level skipped', () => {
    render(<Credentials />);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);

    const h3s = screen.getAllByRole('heading', { level: 3 });
    // 2 degrees + 8 certifications + 1 award = 11
    expect(h3s).toHaveLength(11);
    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(0);
  });

  it('has proper semantic structure with id="credentials"', () => {
    render(<Credentials />);
    const section = document.getElementById('credentials');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });
});
