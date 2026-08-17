const { renderNav } = require('../../build/partials/nav');
const { renderBackToTop } = require('../../build/partials/back-to-top');

function freshMain() {
  jest.resetModules();
  return require('../../assets/js/main');
}

function mountNav() {
  document.documentElement.className = '';
  document.body.innerHTML = renderNav();
}

describe('theme toggle', () => {
  it('syncs aria-checked to the theme already on <html> at init time', () => {
    mountNav();
    document.documentElement.classList.add('dark');
    const { init } = freshMain();
    init();

    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      expect(btn.getAttribute('aria-checked')).toBe('true');
      expect(btn.getAttribute('aria-label')).toBe('Switch to light mode');
    });
  });

  it('clicking a toggle flips the theme, persists it, and updates every toggle button', () => {
    mountNav();
    document.documentElement.classList.add('light');
    const { init } = freshMain();
    init();

    const [toggle] = document.querySelectorAll('[data-theme-toggle]');
    toggle.click();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(localStorage.getItem('geovanny-portfolio-theme')).toBe('dark');
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      expect(btn.getAttribute('aria-checked')).toBe('true');
    });
  });

  it('clicking again toggles back to light', () => {
    mountNav();
    document.documentElement.classList.add('dark');
    const { init } = freshMain();
    init();

    const [toggle] = document.querySelectorAll('[data-theme-toggle]');
    toggle.click();
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});

describe('mobile nav', () => {
  it('starts closed: data-open=false, body scroll unlocked', () => {
    mountNav();
    const { init } = freshMain();
    init();

    const nav = document.querySelector('[data-nav]');
    expect(nav.getAttribute('data-open')).toBe('false');
    expect(document.body.style.overflow).toBe('');
  });

  it('opening locks body scroll, shows the drawer, and flips the toggle button state', () => {
    mountNav();
    const { init } = freshMain();
    init();

    const nav = document.querySelector('[data-nav]');
    const navToggle = nav.querySelector('[data-nav-toggle]');
    const drawer = nav.querySelector('[data-nav-drawer]');

    navToggle.click();

    expect(nav.getAttribute('data-open')).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(drawer.hidden).toBe(false);
    expect(navToggle.getAttribute('aria-expanded')).toBe('true');
    expect(navToggle.getAttribute('aria-label')).toBe('Close menu');
  });

  it('closing restores body scroll and hides the drawer', () => {
    mountNav();
    const { init } = freshMain();
    init();

    const nav = document.querySelector('[data-nav]');
    const navToggle = nav.querySelector('[data-nav-toggle]');
    navToggle.click(); // open
    navToggle.click(); // close

    expect(nav.getAttribute('data-open')).toBe('false');
    expect(document.body.style.overflow).toBe('');
    expect(nav.querySelector('[data-nav-drawer]').hidden).toBe(true);
  });

  it('clicking a drawer link closes the menu', () => {
    mountNav();
    const { init } = freshMain();
    init();

    const nav = document.querySelector('[data-nav]');
    nav.querySelector('[data-nav-toggle]').click(); // open
    nav.querySelector('[data-nav-drawer] a').click();

    expect(nav.getAttribute('data-open')).toBe('false');
    expect(document.body.style.overflow).toBe('');
  });

  it('applyNavState sets the exact class string for each of the 3 states', () => {
    mountNav();
    const { applyNavState } = freshMain();
    const nav = document.querySelector('[data-nav]');

    applyNavState(nav, { open: false, scrolled: false });
    expect(nav.className).toBe(
      'fixed top-0 z-50 w-full transition-all duration-300 bg-transparent'
    );

    applyNavState(nav, { open: false, scrolled: true });
    expect(nav.className).toBe(
      'fixed top-0 z-50 w-full transition-all duration-300 border-b border-line bg-paper/90 backdrop-blur-md dark:border-line/20 dark:bg-paper/90'
    );

    applyNavState(nav, { open: true, scrolled: false });
    expect(nav.className).toBe(
      'fixed top-0 z-50 w-full transition-all duration-300 bottom-0 flex flex-col bg-paper dark:bg-paper'
    );
  });
});

describe('back to top', () => {
  it('scrolls to #blog-content when present', () => {
    document.body.innerHTML = `<div id="blog-content"></div>${renderBackToTop()}`;
    const blogContent = document.getElementById('blog-content');
    blogContent.scrollIntoView = jest.fn();
    window.scrollTo = jest.fn();

    const { init } = freshMain();
    init();
    document.querySelector('[data-back-to-top]').click();

    expect(blogContent.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('scrolls to top when #blog-content is absent', () => {
    document.body.innerHTML = renderBackToTop();
    window.scrollTo = jest.fn();

    const { init } = freshMain();
    init();
    document.querySelector('[data-back-to-top]').click();

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});

describe('scroll-to-hash on load', () => {
  it('smooth-scrolls to the element matching location.hash', () => {
    document.body.innerHTML = '<div id="blog-content"></div>';
    document.getElementById('blog-content').scrollIntoView = jest.fn();
    window.history.pushState(null, '', '/blog/#blog-content');

    const { init } = freshMain();
    init();

    expect(
      document.getElementById('blog-content').scrollIntoView
    ).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('does nothing when there is no hash', () => {
    document.body.innerHTML = '<div id="blog-content"></div>';
    document.getElementById('blog-content').scrollIntoView = jest.fn();
    window.history.pushState(null, '', '/blog/');

    const { init } = freshMain();
    init();

    expect(
      document.getElementById('blog-content').scrollIntoView
    ).not.toHaveBeenCalled();
  });
});
