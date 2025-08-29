import { render, screen } from '@testing-library/react';
import Experience from '@/components/experience';

describe('Experience Component', () => {
  it('renders the experience section with correct content', () => {
    render(<Experience />);

    // Check for main heading
    expect(
      screen.getByRole('heading', { level: 2, name: /experience/i })
    ).toBeInTheDocument();
  });

  it('displays job positions and companies', () => {
    render(<Experience />);

    // Check for job positions
    expect(screen.getAllByText(/software engineer/i)).toHaveLength(2); // Multiple mentions
    expect(screen.getAllByText(/supervisor/i)).toHaveLength(2); // Multiple mentions
  });

  it('displays company name', () => {
    render(<Experience />);

    // Check for company name
    expect(screen.getByText(/pernix solutions/i)).toBeInTheDocument();
  });

  it('displays job responsibilities and achievements', () => {
    render(<Experience />);

    // Check for responsibilities
    expect(screen.getByText(/full-stack applications/i)).toBeInTheDocument();
    expect(screen.getByText(/team lead/i)).toBeInTheDocument();
    expect(screen.getByText(/mentored new apprentices/i)).toBeInTheDocument();
  });

  it('displays technologies used in jobs', () => {
    render(<Experience />);

    // Check for technologies
    expect(screen.getByText('Golang')).toBeInTheDocument();
    expect(screen.getByText('Ruby on Rails')).toBeInTheDocument();
    expect(screen.getByText('Vue.js')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Experience />);

    // Check for section element with id
    const section = document.getElementById('experience');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('displays time periods for jobs', () => {
    render(<Experience />);

    // Check for time periods
    expect(screen.getByText(/july 2019 - present/i)).toBeInTheDocument();
  });

  it('displays career progression', () => {
    render(<Experience />);

    // Check for career progression
    expect(screen.getAllByText(/apprentice/i)).toHaveLength(3); // Multiple mentions
    expect(screen.getByText('Software Engineer III')).toBeInTheDocument();
  });
});
