const { html, escapeHtml } = require('../render');
const { icon } = require('../icons');
const NAV_ITEMS = require('../data/nav-items');

const LINK_CLASSES =
  'font-medium text-ink-muted transition-colors hover:text-accent-brand';

function navLink(item, className = LINK_CLASSES) {
  return html`<a href="${item.href}" class="${className}">${escapeHtml(item.label)}</a>`;
}

// Both icons render always; assets/js/globals.css's html.dark selectors
// (not JS) decide which is visible, driven by the class THEME_INIT_SCRIPT
// already set on <html> before first paint — so the right icon is correct
// from the very first frame, with no client-side swap needed. main.js only
// needs to toggle the theme itself and keep aria-checked in sync.
function themeToggleButton() {
  return html`
    <button type="button" role="switch" aria-checked="false" aria-label="Switch to dark mode" data-theme-toggle class="relative inline-flex h-8 w-16 shrink-0 items-center rounded-full border transition-colors duration-300 border-line bg-accent-soft dark:border-line/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background">
      <span class="theme-toggle-thumb inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface shadow-md transition-transform duration-300" data-theme-toggle-thumb>
        <span data-theme-icon="sun">${icon('sun', 'h-3.5 w-3.5 text-accent-brand')}</span>
        <span data-theme-icon="moon">${icon('moon', 'h-3.5 w-3.5 text-accent-brand')}</span>
      </span>
    </button>
  `;
}

// Renders the closed/unscrolled initial state. assets/js/main.js (Phase 8)
// owns the isOpen/scrolled class swaps and the mobile-drawer `hidden`
// attribute toggle at runtime — see the plan's Phase 2/Phase 8 split.
function renderNav() {
  return html`
    <nav class="fixed top-0 z-50 w-full transition-all duration-300 bg-transparent" data-nav data-open="false">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8" data-nav-container>
        <div class="flex items-center justify-between py-4">
          <a href="/" class="font-mono text-sm text-ink">Geovanny Cordero</a>

          <div class="hidden items-center gap-6 lg:flex">
            <div class="flex gap-6">
              ${NAV_ITEMS.map(item => navLink(item)).join('')}
            </div>
            <a href="/#contact" class="rounded-sm bg-ink px-4 py-2 text-sm text-paper transition-opacity hover:opacity-80 dark:bg-accent-brand dark:text-paper">Get in touch</a>
            ${themeToggleButton()}
          </div>

          <div class="flex items-center gap-2 lg:hidden">
            ${themeToggleButton()}
            <button type="button" class="text-ink-muted hover:text-accent-brand inline-flex h-9 w-9 items-center justify-center rounded-md" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
              <span data-nav-icon="menu">${icon('menu', 'h-6 w-6')}</span>
              <span data-nav-icon="close">${icon('x', 'h-6 w-6')}</span>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto border-t border-line bg-paper pb-4 dark:border-line/20 dark:bg-paper lg:hidden" hidden data-nav-drawer>
          <div class="flex flex-col gap-4 pt-4">
            ${NAV_ITEMS.map(item => navLink(item, `${LINK_CLASSES} text-left`)).join('')}
            <a href="/#contact" class="inline-block w-fit rounded-sm bg-ink px-4 py-2 text-sm text-paper dark:bg-accent-brand" data-nav-drawer-cta>Get in touch</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

module.exports = { renderNav };
