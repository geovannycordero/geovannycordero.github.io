import { render, screen } from '@testing-library/react';
import Skills from '@/components/skills';
import { getSkillCategories } from '@/lib/skills';

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

    // Each technology belongs to exactly one category
    expect(screen.getAllByText('Go')).toHaveLength(1);
    expect(screen.getAllByText('Ruby on Rails')).toHaveLength(1);
    expect(screen.getByText('Ruby')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('displays frameworks and libraries', () => {
    render(<Skills />);

    // Check for frameworks
    expect(screen.getByText('Vue.js (2 & 3)')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument();
  });

  it('displays testing and code quality skills', () => {
    render(<Skills />);

    expect(screen.getByText('Testing & Code Quality')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
    expect(screen.getByText('Cypress')).toBeInTheDocument();
  });

  it('displays messaging and integration skills', () => {
    render(<Skills />);

    expect(screen.getByText('Messaging & Integrations')).toBeInTheDocument();
    expect(screen.getByText('Kafka')).toBeInTheDocument();
    expect(screen.getByText('Twilio')).toBeInTheDocument();
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
    expect(
      screen.getByText('Frontend Frameworks & Libraries')
    ).toBeInTheDocument();
    expect(screen.getByText('Backend Frameworks & APIs')).toBeInTheDocument();
    expect(screen.getByText('Databases & Caching')).toBeInTheDocument();
    expect(screen.getByText('Messaging & Integrations')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
    expect(screen.getByText('Testing & Code Quality')).toBeInTheDocument();
    expect(screen.getByText('Version Control')).toBeInTheDocument();
    expect(screen.getByText('Soft Skills')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  it('renders every category as a group with an h4 title', () => {
    render(<Skills />);
    getSkillCategories().forEach(category => {
      expect(
        screen.getByRole('heading', { level: 4, name: category.title })
      ).toBeInTheDocument();
    });
  });

  it('lays skill groups out in CSS columns', () => {
    render(<Skills />);
    const columns = screen.getByTestId('skills-columns');
    expect(columns.className).toMatch(/columns-1/);
    expect(columns.className).toMatch(/md:columns-2/);
  });
});
