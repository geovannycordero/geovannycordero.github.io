const { getByText, getByRole } = require('@testing-library/dom');
const { renderSectionHead } = require('../../../build/partials/section-head');

function mount(props) {
  document.body.innerHTML = renderSectionHead(props);
  return document.body;
}

describe('renderSectionHead', () => {
  it('renders the index and the label', () => {
    const body = mount({ index: '01', label: 'Case Studies', id: 'work', content: '<p>content</p>' });
    expect(getByText(body, '01')).toBeTruthy();
    expect(getByText(body, 'Case Studies')).toBeTruthy();
  });

  it('renders the label as an h2', () => {
    const body = mount({ index: '02', label: 'About', id: 'about', content: '<p>content</p>' });
    expect(getByRole(body, 'heading', { level: 2, name: 'About' })).toBeTruthy();
  });

  it('applies the id to the wrapping section', () => {
    const body = mount({ index: '03', label: 'Skills', id: 'skills', content: '<p>content</p>' });
    const section = body.querySelector('#skills');
    expect(section).toBeTruthy();
    expect(section.tagName).toBe('SECTION');
  });

  it('renders content inside the section', () => {
    const body = mount({ index: '04', label: 'Experience', id: 'experience', content: '<p data-testid="x">content</p>' });
    const section = body.querySelector('#experience');
    expect(section.querySelector('[data-testid="x"]')).toBeTruthy();
  });
});
