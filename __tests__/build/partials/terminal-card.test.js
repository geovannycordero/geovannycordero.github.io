const { getByText } = require('@testing-library/dom');
const { renderTerminalCard } = require('../../../build/partials/terminal-card');

function mount() {
  document.body.innerHTML = renderTerminalCard();
  return document.body;
}

describe('renderTerminalCard', () => {
  it('renders the $ cat about.md prompt line', () => {
    expect(getByText(mount(), '$ cat about.md')).toBeTruthy();
  });

  it.each([
    ['name', 'Geovanny Cordero'],
    ['title', 'Full-Stack Software Engineer'],
    ['experience', '5+ years'],
  ])('renders the %s key/value pair', (key, value) => {
    const body = mount();
    expect(body.textContent).toMatch(new RegExp(key, 'i'));
    expect(body.textContent).toContain(value);
  });

  it('renders the languages list', () => {
    const body = mount();
    expect(body.textContent).toMatch(/languages/i);
    expect(body.textContent).toMatch(/golang/i);
  });

  it('is aria-hidden — decorative, facts are duplicated in About', () => {
    const body = mount();
    expect(body.firstElementChild.getAttribute('aria-hidden')).toBe('true');
  });
});
