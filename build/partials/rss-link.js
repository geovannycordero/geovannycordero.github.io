const { html } = require('../render');
const { icon } = require('../icons');

function renderRssLink() {
  return html`
    <a href="/rss.xml" target="_blank" rel="noopener noreferrer" title="Subscribe to RSS Feed" class="inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors text-sm">
      ${icon('rss', 'h-4 w-4')}
      <span>RSS Feed</span>
    </a>
  `;
}

module.exports = { renderRssLink };
