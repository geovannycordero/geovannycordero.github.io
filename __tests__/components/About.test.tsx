import { render, screen } from '@testing-library/react';
import About from '@/components/about';

describe('About Component', () => {
  it('renders the about section with correct content', () => {
    render(<About />);

    // Check for main heading
    expect(
      screen.getByRole('heading', { level: 2, name: /about me/i })
    ).toBeInTheDocument();

    // Check for description text
    expect(
      screen.getByText(
        /passionate software engineer dedicated to creating innovative solutions/i
      )
    ).toBeInTheDocument();
  });

  it('displays key skills and technologies', () => {
    render(<About />);

    // Check for technology mentions in the description
    expect(screen.getByText(/golang/i)).toBeInTheDocument();
    expect(screen.getByText(/ruby on rails/i)).toBeInTheDocument();
    expect(screen.getByText(/javascript/i)).toBeInTheDocument();
  });

  it('displays professional experience highlights', () => {
    render(<About />);

    // Check for experience highlights
    expect(screen.getByText(/team leadership/i)).toBeInTheDocument();
    expect(
      screen.getByText(/high-quality software solutions/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/pernix solutions/i)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<About />);

    // Check for section element with id
    const section = document.getElementById('about');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('displays personal interests and values', () => {
    render(<About />);

    // Check for personal interests and values
    expect(screen.getByText(/collaborative environments/i)).toBeInTheDocument();
    expect(screen.getByText(/international teams/i)).toBeInTheDocument();
    expect(screen.getAllByText(/mba/i)).toHaveLength(2);
  });

  it('displays highlight cards with correct information', () => {
    render(<About />);

    // Check for highlight cards
    expect(screen.getByText('5+ Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Team Leadership')).toBeInTheDocument();
    expect(screen.getByText('Award Winner')).toBeInTheDocument();
    expect(screen.getByText('Continuous Learning')).toBeInTheDocument();

    // Check for descriptions
    expect(
      screen.getByText('Full-stack development with modern technologies')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Managing and mentoring development teams')
    ).toBeInTheDocument();
    expect(
      screen.getByText('2020 Programathon Competition Champion')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Currently pursuing MBA in Project Management')
    ).toBeInTheDocument();
  });
});
