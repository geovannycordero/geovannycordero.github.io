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

  it('uses the flat editorial card motif, not the rounded/shadow card-elegant one', () => {
    const { container } = render(<ProjectCard project={project} index={0} />);

    // Regression guard: card-elegant/glow-accent/hover-lift pulled a
    // rounded, drop-shadowed look off the retired emerald-100/200/500
    // scale, visually mismatched with the flat Case Studies grid.
    expect(container.innerHTML).not.toMatch(
      /card-elegant|glow-accent|hover-lift/
    );
    expect(container.querySelector('.border-line')).toBeInTheDocument();
  });

  it('renders technology chips as flat mono chips, not rounded-full badge pills', () => {
    render(<ProjectCard project={project} index={0} />);

    const chip = screen.getByText('Next.js');
    expect(chip.className).toMatch(/font-mono/);
    expect(chip.className).not.toMatch(/rounded-full/);
  });
});
