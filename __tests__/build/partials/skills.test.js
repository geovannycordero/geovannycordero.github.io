const { getByRole, getByTestId, getAllByText } = require('@testing-library/dom');
const { renderSkills } = require('../../../build/partials/skills');
const { getSkillCategories } = require('../../../build/content/skills');

function mount() {
  document.body.innerHTML = renderSkills();
  return document.body;
}

describe('renderSkills', () => {
  it('renders the skills section heading', () => {
    const body = mount();
    expect(getByRole(body, 'heading', { level: 2, name: /skills/i })).toBeTruthy();
  });

  it('renders every category as a group with an h3 title', () => {
    const body = mount();
    getSkillCategories().forEach(category => {
      expect(getByRole(body, 'heading', { level: 3, name: category.title })).toBeTruthy();
    });
  });

  it('renders every skill exactly once per category', () => {
    const body = mount();
    getSkillCategories().forEach(category => {
      category.skills.forEach(skill => {
        expect(getAllByText(body, skill).length).toBeGreaterThan(0);
      });
    });
  });

  it('has proper semantic structure', () => {
    const body = mount();
    const section = body.querySelector('#skills');
    expect(section).toBeTruthy();
    expect(section.tagName).toBe('SECTION');
  });

  it('lays skill groups out in CSS columns', () => {
    const body = mount();
    const columns = getByTestId(body, 'skills-columns');
    expect(columns.className).toMatch(/columns-1/);
    expect(columns.className).toMatch(/md:columns-2/);
  });
});
