const { getByRole, getAllByRole, queryByRole, getByText } = require('@testing-library/dom');
const { renderNav } = require('../../../build/partials/nav');

// Scope: static (initial, closed, unscrolled) markup only. Open/close,
// scroll-backdrop, and body-scroll-lock behavior are wired up in Phase 8
// (assets/js/main.js) and tested there against this same markup.
function mount() {
  document.body.innerHTML = renderNav();
  return document.body;
}

describe('renderNav', () => {
  it('renders the navigation with correct content', () => {
    const body = mount();
    expect(getByRole(body, 'navigation')).toBeTruthy();
  });

  it('has exactly this nav item set: Work, About, Skills, Experience, Credentials, Blog, Projects', () => {
    const body = mount();
    const expected = {
      Work: '/#work',
      About: '/#about',
      Skills: '/#skills',
      Experience: '/#experience',
      Credentials: '/#credentials',
      Blog: '/blog/#blog-content',
      Projects: '/projects/',
    };
    Object.entries(expected).forEach(([label, href]) => {
      expect(
        getByRole(body, 'link', { name: new RegExp(`^${label}$`, 'i') }).getAttribute('href')
      ).toBe(href);
    });
  });

  it('does not link to the removed Education or Awards sections (regression guard)', () => {
    const body = mount();
    expect(queryByRole(body, 'link', { name: /^education$/i })).toBeNull();
    expect(queryByRole(body, 'link', { name: /^awards$/i })).toBeNull();
  });

  it('renders a persistent "Get in touch" CTA in the desktop bar, linking to #contact', () => {
    const body = mount();
    const ctas = getAllByRole(body, 'link', { name: /get in touch/i });
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach(cta => expect(cta.getAttribute('href')).toBe('/#contact'));
  });

  it('displays the brand name', () => {
    const body = mount();
    expect(getByText(body, /geovanny cordero/i)).toBeTruthy();
  });

  it('displays a mobile menu button, closed by default', () => {
    const body = mount();
    const menuButton = getByRole(body, 'button', { name: 'Open menu' });
    expect(menuButton).toBeTruthy();
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders a theme switch', () => {
    const body = mount();
    expect(getAllByRole(body, 'switch').length).toBeGreaterThan(0);
  });

  it('uses the lg breakpoint (not md) for the desktop/mobile nav split', () => {
    const body = mount();
    const brand = getByRole(body, 'link', { name: /geovanny cordero/i });
    const desktopLinksContainer =
      brand.parentElement?.querySelector('.hidden.lg\\:flex');
    expect(desktopLinksContainer).toBeTruthy();

    const menuButton = getByRole(body, 'button', { name: 'Open menu' });
    expect(menuButton.closest('.lg\\:hidden')).toBeTruthy();
  });

  it('renders the mobile drawer natively hidden by default', () => {
    const body = mount();
    const drawer = body.querySelector('[data-nav-drawer]');
    expect(drawer).toBeTruthy();
    expect(drawer.hidden).toBe(true);
  });
});
