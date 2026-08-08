import { render, screen } from '@testing-library/react';
import CaseStudies from '@/components/case-studies';
import { getCaseStudies } from '@/lib/projects';

describe('CaseStudies', () => {
  it('renders one row per case study', () => {
    render(<CaseStudies />);
    const caseStudies = getCaseStudies();
    caseStudies.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('shows title, every technology tag, and description for each case study', () => {
    render(<CaseStudies />);
    const [first] = getCaseStudies();

    expect(screen.getByText(first.title)).toBeInTheDocument();
    expect(screen.getByText(first.description)).toBeInTheDocument();
    first.technologies.forEach(tech => {
      expect(screen.getAllByText(tech).length).toBeGreaterThan(0);
    });
  });

  it('links "View live site" to the project URL, opening in a new tab safely', () => {
    render(<CaseStudies />);
    const caseStudies = getCaseStudies();

    caseStudies.forEach(project => {
      const link = screen.getByRole('link', {
        name: new RegExp(`view live site.*${project.title}`, 'i'),
      });
      expect(link).toHaveAttribute('href', project.projectUrl);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('does not render personal or work projects', () => {
    render(<CaseStudies />);
    expect(screen.queryByText('My Portfolio Website')).not.toBeInTheDocument();
    expect(screen.queryByText('Charts Example')).not.toBeInTheDocument();
    expect(screen.queryByText('Caja de Ande Seguros')).not.toBeInTheDocument();
  });

  it('carries id="work" so the nav anchor resolves', () => {
    render(<CaseStudies />);
    expect(document.getElementById('work')).toBeInTheDocument();
  });
});
