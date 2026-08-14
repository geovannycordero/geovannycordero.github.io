// No bundler: this loads as a plain `<script defer>` in the browser, and
// is `require()`-able from Jest for testing (see __tests__/assets/main.test.js).
// The guard at the bottom picks which of those two contexts this is.
(function () {
  'use strict';

  // Must match build/theme-script.js's THEME_STORAGE_KEY — same value,
  // duplicated rather than shared because one runs at build time (Node)
  // and this runs in the browser with no build step between them.
  const THEME_STORAGE_KEY = 'geovanny-portfolio-theme';

  const NAV_BASE = 'fixed top-0 z-50 w-full transition-all duration-300';
  const NAV_STATE_CLASS = {
    open: ' bottom-0 flex flex-col bg-paper dark:bg-paper',
    closedScrolled:
      ' border-b border-line bg-paper/90 backdrop-blur-md dark:border-line/20 dark:bg-paper/90',
    closedUnscrolled: ' bg-transparent',
  };
  const CONTAINER_CLASS = {
    open: 'container mx-auto px-4 sm:px-6 lg:px-8 flex flex-1 flex-col overflow-hidden',
    closed: 'container mx-auto px-4 sm:px-6 lg:px-8',
  };

  function resolvedTheme() {
    return document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
  }

  function syncThemeToggles(theme) {
    const isDark = theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
      toggle.setAttribute('aria-checked', String(isDark));
      toggle.setAttribute(
        'aria-label',
        'Switch to ' + (isDark ? 'light' : 'dark') + ' mode'
      );
      toggle.setAttribute('data-state', theme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable — theme still applies for this page view.
    }
    syncThemeToggles(theme);
  }

  function initThemeToggle() {
    // The static markup hardcodes aria-checked="false"; sync it to
    // whatever THEME_INIT_SCRIPT actually resolved before this ran.
    syncThemeToggles(resolvedTheme());

    document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        applyTheme(resolvedTheme() === 'dark' ? 'light' : 'dark');
      });
    });
  }

  // Exported for tests; also what drives every open/scroll transition.
  function applyNavState(nav, state) {
    const container = nav.querySelector('[data-nav-container]');
    const toggle = nav.querySelector('[data-nav-toggle]');
    const drawer = nav.querySelector('[data-nav-drawer]');

    const stateClass = state.open
      ? NAV_STATE_CLASS.open
      : state.scrolled
        ? NAV_STATE_CLASS.closedScrolled
        : NAV_STATE_CLASS.closedUnscrolled;
    nav.className = NAV_BASE + stateClass;
    nav.setAttribute('data-open', String(state.open));

    if (container) {
      container.className = state.open
        ? CONTAINER_CLASS.open
        : CONTAINER_CLASS.closed;
    }
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(state.open));
      toggle.setAttribute(
        'aria-label',
        state.open ? 'Close menu' : 'Open menu'
      );
    }
    if (drawer) {
      drawer.hidden = !state.open;
    }

    document.body.style.overflow = state.open ? 'hidden' : '';
  }

  function initNav() {
    const nav = document.querySelector('[data-nav]');
    if (!nav) return;

    const state = { open: false, scrolled: window.scrollY > 50 };
    applyNavState(nav, state);

    const toggle = nav.querySelector('[data-nav-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        state.open = !state.open;
        applyNavState(nav, state);
      });
    }

    window.addEventListener(
      'scroll',
      function () {
        const scrolled = window.scrollY > 50;
        if (scrolled !== state.scrolled) {
          state.scrolled = scrolled;
          if (!state.open) applyNavState(nav, state);
        }
      },
      { passive: true }
    );

    nav.querySelectorAll('[data-nav-drawer] a').forEach(function (link) {
      link.addEventListener('click', function () {
        state.open = false;
        applyNavState(nav, state);
      });
    });
  }

  function initBackToTop() {
    document.querySelectorAll('[data-back-to-top]').forEach(function (button) {
      button.addEventListener('click', function () {
        const blogContent = document.getElementById('blog-content');
        if (blogContent) {
          blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  // Replaces blog-navigation-handler.tsx's post-navigation scroll: with
  // real page loads (no client router), the browser already lands at the
  // right hash — this only adds the smooth-scroll animation on top.
  function scrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;
    let target;
    try {
      target = document.querySelector(hash);
    } catch {
      return;
    }
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    initThemeToggle();
    initNav();
    initBackToTop();
    scrollToHash();
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init, applyTheme, resolvedTheme, applyNavState };
  } else {
    init();
  }
})();
