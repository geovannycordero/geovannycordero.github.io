import { render, screen } from '@testing-library/react';
import Skills from '@/components/skills';

describe('Skills Component', () => {
  it('renders the skills section with correct content', () => {
    render(<Skills />);

    // Check for main heading
    expect(
      screen.getByRole('heading', { level: 2, name: /skills/i })
    ).toBeInTheDocument();
  });

  it('displays programming languages', () => {
    render(<Skills />);

    // Check for programming languages
    expect(screen.getAllByText('Golang')).toHaveLength(2); // Appears in both Programming Languages and Backend Technologies
    expect(screen.getAllByText('Ruby on Rails')).toHaveLength(2); // Appears in both Programming Languages and Backend Technologies
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('displays frameworks and libraries', () => {
    render(<Skills />);

    // Check for frameworks
    expect(screen.getByText('Vue.js')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument();
  });

  it('displays databases and tools', () => {
    render(<Skills />);

    // Check for databases and tools
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('MySQL')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });

  it('displays cloud and infrastructure skills', () => {
    render(<Skills />);

    // Check for cloud skills
    expect(
      screen.getByText('AWS (EC2, ECS, ECR, RDS, Lambda)')
    ).toBeInTheDocument();
    expect(screen.getByText('CI/CD')).toBeInTheDocument();
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Skills />);

    // Check for section element with id
    const section = document.getElementById('skills');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('displays skill categories correctly', () => {
    render(<Skills />);

    // Check for skill category titles
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Frontend Technologies')).toBeInTheDocument();
    expect(screen.getByText('Backend Technologies')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
    expect(screen.getByText('Version Control')).toBeInTheDocument();
    expect(screen.getByText('Soft Skills')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });
});
