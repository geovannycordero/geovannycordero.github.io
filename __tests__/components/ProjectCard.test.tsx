import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/project-card';
import type { Project } from '@/lib/projects';

const project: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A project used only in tests.',
  longDescription: 'Longer description.',
  image: '/images/projects/test.png',
  technologies: ['Next.js', 'TypeScript'],
  projectUrl: 'https://example.com',
  githubUrl: 'https://github.com/example/test',
  category: 'Outsourcing',
  featured: true,
  completedDate: '2026-01',
};

describe('ProjectCard', () => {
  it('renders the title, category, and technologies', () => {
    render(<ProjectCard project={project} index={0} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Outsourcing')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('links GitHub and live-site URLs when present', () => {
    render(<ProjectCard project={project} index={0} />);
    const github = screen.getByRole('link', { name: /github/i });
    expect(github).toHaveAttribute('href', project.githubUrl);
    expect(github).toHaveAttribute('target', '_blank');

    const live = screen.getByRole('link', { name: /live site/i });
    expect(live).toHaveAttribute('href', project.projectUrl);
  });

  it('does not use the legacy emerald/sage/slate token classes', () => {
    const { container } = render(<ProjectCard project={project} index={0} />);
    expect(container.innerHTML).not.toMatch(/emerald-\d|sage-\d|slate-\d/);
  });

  it('renders the title as a real heading, not a styled div', () => {
    render(<ProjectCard project={project} index={0} />);
    expect(
      screen.getByRole('heading', { name: 'Test Project' })
    ).toBeInTheDocument();
  });
});
