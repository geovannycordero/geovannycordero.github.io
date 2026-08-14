const { html } = require('../render');

// Click handler wired up in assets/js/main.js (Phase 8) — same
// nav-partials-are-static / behavior-lives-in-main.js split as build/partials/nav.js.
function renderBackToTop() {
  return html`
    <button type="button" data-back-to-top class="inline-flex items-center gap-2 px-4 py-2 text-ink-muted hover:text-accent-brand hover:bg-accent-soft rounded-lg transition-colors border border-line dark:border-line/30 hover:border-accent-brand">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
      Back to Top
    </button>
  `;
}

module.exports = { renderBackToTop };
