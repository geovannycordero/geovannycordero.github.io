const { getByText, getAllByRole, queryAllByRole } = require('@testing-library/dom');
const { renderCredentials } = require('../../../build/partials/credentials');

const CERTIFICATIONS_WITH_URL = 7;

function mount() {
  document.body.innerHTML = renderCredentials();
  return document.body;
}

describe('renderCredentials', () => {
  it('renders both degrees, including the MBA-in-progress line', () => {
    const body = mount();
    expect(getByText(body, /mba in project management/i)).toBeTruthy();
    expect(getByText(body, /bachelor in computer science/i)).toBeTruthy();
  });

  it('renders all 8 certifications', () => {
    const body = mount();
    [
      'Gerencia con Liderazgo',
      'Introduction to Data Analytics for Business',
      'Crisis Management',
      'Introduction to Big Data',
      'Desarrollo de Habilidades Blandas',
      'Claude 101',
      'Claude Code 101',
      'Claude Code in Action',
    ].forEach(title => expect(getByText(body, title)).toBeTruthy());
  });

  it('renders a verify link for exactly the certifications that have a url', () => {
    const body = mount();
    expect(getAllByRole(body, 'link', { name: /verify/i })).toHaveLength(CERTIFICATIONS_WITH_URL);
  });

  it('renders the 2020 Programathon award', () => {
    const body = mount();
    expect(getByText(body, /2020 programathon competition winner/i)).toBeTruthy();
    expect(getByText(body, /sponsored by fiserv/i)).toBeTruthy();
  });

  it('has a single h2 and every degree/cert/award as an h3, no level skipped', () => {
    const body = mount();
    expect(getAllByRole(body, 'heading', { level: 2 })).toHaveLength(1);
    expect(getAllByRole(body, 'heading', { level: 3 })).toHaveLength(11);
    expect(queryAllByRole(body, 'heading', { level: 4 })).toHaveLength(0);
  });

  it('has proper semantic structure with id="credentials"', () => {
    const body = mount();
    const section = body.querySelector('#credentials');
    expect(section).toBeTruthy();
    expect(section.tagName).toBe('SECTION');
  });
});
