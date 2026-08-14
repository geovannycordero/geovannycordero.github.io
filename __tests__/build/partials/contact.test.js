const { getAllByRole, getByRole } = require('@testing-library/dom');
const { renderContact } = require('../../../build/partials/contact');

function mount() {
  document.body.innerHTML = renderContact();
  return document.body;
}

describe('renderContact', () => {
  it('renders a single h2 with the serif headline copy', () => {
    const body = mount();
    const headings = getAllByRole(body, 'heading', { level: 2 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toMatch(/talk about what you're building/i);
  });

  it('has proper semantic structure with id="contact"', () => {
    const body = mount();
    const section = body.querySelector('#contact');
    expect(section).toBeTruthy();
    expect(section.tagName).toBe('SECTION');
  });

  it('renders an inline link row: email, LinkedIn, GitHub, Upwork', () => {
    const body = mount();
    const email = getByRole(body, 'link', { name: /geovanny@pm\.me/i });
    expect(email.getAttribute('href')).toBe('mailto:geovanny@pm.me');

    const linkedin = getByRole(body, 'link', { name: /linkedin/i });
    expect(linkedin.getAttribute('target')).toBe('_blank');
    expect(linkedin.getAttribute('rel')).toBe('noopener noreferrer');

    const upwork = getByRole(body, 'link', { name: /upwork/i });
    expect(upwork.getAttribute('href')).toBe(
      'https://www.upwork.com/freelancers/~013cc6068c4bfca093'
    );
  });

  it('does not render a form — static export has no route to POST to', () => {
    const body = mount();
    expect(body.querySelector('form')).toBeNull();
  });
});
