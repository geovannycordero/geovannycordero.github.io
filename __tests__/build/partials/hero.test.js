const { getAllByRole, getByRole, getByTestId, queryByRole } = require('@testing-library/dom');
const { renderHero } = require('../../../build/partials/hero');

function mount() {
  document.body.innerHTML = renderHero();
  return document.body;
}

describe('renderHero', () => {
  it('renders exactly one h1 containing the promise copy', () => {
    const body = mount();
    const headings = getAllByRole(body, 'heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toMatch(/production systems/i);
  });

  it('shows a mono eyebrow with role and location', () => {
    const body = mount();
    const eyebrow = getByTestId(body, 'hero-eyebrow');
    expect(eyebrow.textContent).toMatch(/full-stack software engineer/i);
    expect(eyebrow.textContent).toMatch(/san josé, costa rica/i);
  });

  it('has exactly one primary CTA linking to #contact', () => {
    const body = mount();
    const ctas = getAllByRole(body, 'link', { name: /get in touch/i });
    expect(ctas).toHaveLength(1);
    expect(ctas[0].getAttribute('href')).toBe('/#contact');
  });

  it('has a résumé download link', () => {
    const body = mount();
    const resumeLink = getByRole(body, 'link', { name: /résumé|resume/i });
    expect(resumeLink.getAttribute('href')).toBe('/resume/geovanny-cordero-cv.pdf');
    expect(resumeLink.hasAttribute('download')).toBe(true);
  });

  it('does not render a "Learn More" button', () => {
    const body = mount();
    expect(queryByRole(body, 'link', { name: /learn more/i })).toBeNull();
    expect(queryByRole(body, 'button', { name: /learn more/i })).toBeNull();
  });

  it('exposes email, LinkedIn, and GitHub in the meta row with correct attributes', () => {
    const body = mount();
    const email = getByRole(body, 'link', { name: /geovanny@pm\.me/i });
    expect(email.getAttribute('href')).toBe('mailto:geovanny@pm.me');

    const linkedin = getByRole(body, 'link', { name: /linkedin/i });
    expect(linkedin.getAttribute('href')).toBe('https://linkedin.com/in/geovannycordero');
    expect(linkedin.getAttribute('target')).toBe('_blank');
    expect(linkedin.getAttribute('rel')).toBe('noopener noreferrer');

    const github = getByRole(body, 'link', { name: /github/i });
    expect(github.getAttribute('href')).toBe('https://github.com/geovannycordero');
  });

  it('renders the terminal card decoratively, hidden below lg', () => {
    const body = mount();
    const terminal = getByTestId(body, 'terminal-card-wrapper');
    expect(terminal.getAttribute('aria-hidden')).toBe('true');
    expect(terminal.className).toMatch(/hidden/);
    expect(terminal.className).toMatch(/lg:block/);
  });

  it('does not render a portrait image', () => {
    const body = mount();
    expect(queryByRole(body, 'img')).toBeNull();
  });
});
