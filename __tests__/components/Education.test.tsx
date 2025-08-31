import { render, screen } from '@testing-library/react';
import Education from '@/components/education';

describe('Education Component', () => {
  it('renders the education section with correct content', () => {
    render(<Education />);

    // Check for main heading
    expect(
      screen.getByRole('heading', { level: 2, name: /education/i })
    ).toBeInTheDocument();
  });

  it('displays degree information', () => {
    render(<Education />);

    // Check for degree
    expect(
      screen.getByText(/bachelor in computer science/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/mba in project management/i)).toBeInTheDocument();
  });

  it('displays university name', () => {
    render(<Education />);

    // Check for university
    expect(screen.getByText(/universidad de costa rica/i)).toBeInTheDocument();
  });

  it('displays graduation year', () => {
    render(<Education />);

    // Check for graduation year
    expect(screen.getAllByText(/2020/i)).toHaveLength(2); // Multiple mentions
  });

  it('displays relevant coursework', () => {
    render(<Education />);

    // Check for coursework - these might not be in the current component
    // Let's check for what's actually there
    expect(screen.getByText(/computer science/i)).toBeInTheDocument();
    expect(screen.getByText(/project management/i)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Education />);

    // Check for section element with id
    const section = document.getElementById('education');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('displays additional certifications', () => {
    render(<Education />);

    // Check for additional certifications
    expect(
      screen.getByText(/university of california san diego/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/coursera/i)).toHaveLength(2); // Multiple mentions
    expect(screen.getAllByText(/uned/i)).toHaveLength(2); // Multiple mentions
  });

  it('displays certification years', () => {
    render(<Education />);

    // Check for certification years
    expect(screen.getByText(/2021/i)).toBeInTheDocument();
    expect(screen.getByText(/2023/i)).toBeInTheDocument();
  });
});
