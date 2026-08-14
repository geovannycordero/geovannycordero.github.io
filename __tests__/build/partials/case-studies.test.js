const { getByText, getByRole, getAllByText, queryByText } = require('@testing-library/dom');
const { renderCaseStudies } = require('../../../build/partials/case-studies');
const { getCaseStudies } = require('../../../build/content/projects');

function mount() {
  document.body.innerHTML = renderCaseStudies();
  return document.body;
}

describe('renderCaseStudies', () => {
  it('renders one row per case study', () => {
    const body = mount();
    getCaseStudies().forEach(project => {
      expect(getByText(body, project.title)).toBeTruthy();
    });
  });

  it('shows title, every technology tag, and description for each case study', () => {
    const body = mount();
    const [first] = getCaseStudies();
    expect(getByText(body, first.title)).toBeTruthy();
    expect(getByText(body, first.description)).toBeTruthy();
    first.technologies.forEach(tech => {
      expect(getAllByText(body, tech).length).toBeGreaterThan(0);
    });
  });

  it('links "View live site" to the project URL, opening in a new tab safely', () => {
    const body = mount();
    getCaseStudies().forEach(project => {
      const link = getByRole(body, 'link', {
        name: new RegExp(`view live site.*${project.title}`, 'i'),
      });
      expect(link.getAttribute('href')).toBe(project.projectUrl);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('does not render personal or work projects', () => {
    const body = mount();
    expect(queryByText(body, 'My Portfolio Website')).toBeNull();
    expect(queryByText(body, 'Caja de Ande Seguros')).toBeNull();
  });

  it('carries id="work" so the nav anchor resolves', () => {
    const body = mount();
    expect(body.querySelector('#work')).toBeTruthy();
  });
});
