const { getByRole, getByTestId, getAllByTestId, getByText } = require('@testing-library/dom');
const { renderAbout } = require('../../../build/partials/about');

function mount() {
  document.body.innerHTML = renderAbout();
  return document.body;
}

describe('renderAbout', () => {
  it('renders the section heading', () => {
    const body = mount();
    expect(getByRole(body, 'heading', { level: 2, name: /about/i })).toBeTruthy();
  });

  it('has proper semantic structure with id="about"', () => {
    const body = mount();
    const section = body.querySelector('#about');
    expect(section).toBeTruthy();
    expect(section.tagName).toBe('SECTION');
  });

  it('renders the compressed narrative in a measure-width prose column', () => {
    const body = mount();
    const prose = getByTestId(body, 'about-prose');
    expect(prose.className).toMatch(/measure|max-w-\[/);
    expect(prose.textContent).toMatch(/pernix solutions/i);
  });

  it('renders exactly 4 stat items', () => {
    const body = mount();
    expect(getAllByTestId(body, 'about-stat')).toHaveLength(4);
    expect(getByText(body, '5+ years')).toBeTruthy();
    expect(getByText(body, /programathon competition champion/i)).toBeTruthy();
  });
});
