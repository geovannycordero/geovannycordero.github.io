const { getByText, getByRole } = require('@testing-library/dom');
const { renderProjectCard } = require('../../../build/partials/project-card');

const project = {
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

function mount() {
  document.body.innerHTML = renderProjectCard(project, 0);
  return document.body;
}

describe('renderProjectCard', () => {
  it('renders the title, category, and technologies', () => {
    const body = mount();
    expect(getByText(body, 'Test Project')).toBeTruthy();
    expect(getByText(body, 'Outsourcing')).toBeTruthy();
    expect(getByText(body, 'Next.js')).toBeTruthy();
    expect(getByText(body, 'TypeScript')).toBeTruthy();
  });

  it('links GitHub and live-site URLs when present', () => {
    const body = mount();
    const github = getByRole(body, 'link', { name: /github/i });
    expect(github.getAttribute('href')).toBe(project.githubUrl);
    expect(github.getAttribute('target')).toBe('_blank');

    const live = getByRole(body, 'link', { name: /live site/i });
    expect(live.getAttribute('href')).toBe(project.projectUrl);
  });

  it('renders the title as a real heading', () => {
    const body = mount();
    expect(getByRole(body, 'heading', { name: 'Test Project' })).toBeTruthy();
  });

  it('renders technology chips as flat mono chips, not rounded-full badge pills', () => {
    const body = mount();
    const chip = getByText(body, 'Next.js');
    expect(chip.className).toMatch(/font-mono/);
    expect(chip.className).not.toMatch(/rounded-full/);
  });

  it('carries the project id for #id deep-linking from Experience', () => {
    const body = mount();
    expect(body.querySelector('#test-project')).toBeTruthy();
  });
});
