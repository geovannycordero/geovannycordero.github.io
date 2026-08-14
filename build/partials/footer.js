const { html } = require('../render');
const { renderRssLink } = require('./rss-link');

function renderFooter() {
  return html`
    <footer class="border-t border-line bg-paper py-8 dark:border-line/20 dark:bg-paper">
      <div class="container mx-auto flex flex-col items-center gap-4 px-4 text-sm text-ink-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>&copy; ${new Date().getFullYear()} Geovanny Cordero Valverde. All rights reserved.</p>
        ${renderRssLink()}
      </div>
    </footer>
  `;
}

module.exports = { renderFooter };
