const { html, escapeHtml } = require('../render');
const { icon } = require('../icons');

// Front-matter dates are date-only, so they parse as UTC midnight —
// formatting must stay in UTC or a builder west of UTC renders the
// previous day (and disagrees with what CI deploys).
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// The React version staggered each card's fade-in via useState+useEffect+
// setTimeout keyed off its index. Same visual effect here with zero JS:
// an animation-delay driven by a --stagger-index custom property (see
// .stagger-fade-in in assets/css/globals.css), which also means it
// automatically respects prefers-reduced-motion via that rule.
function renderBlogPostCard(post, index) {
  return html`
    <div class="stagger-fade-in border border-line bg-surface transition-all duration-300 hover:border-accent-brand dark:border-line/20" style="--stagger-index: ${index}">
      <div class="flex flex-col space-y-1.5 p-6">
        <div class="flex flex-wrap gap-2 mb-3">
          ${post.tags.map(tag => `<span class="inline-flex items-center rounded-sm px-2 py-0.5 text-xs bg-accent-soft text-accent-brand">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <h2 class="text-xl font-semibold leading-none tracking-tight text-ink hover:text-accent-brand transition-colors">
          <a href="/blog/${post.slug}/" class="block group"><span class="group-hover:underline">${escapeHtml(post.title)}</span></a>
        </h2>
        <div class="flex items-center gap-4 text-sm text-ink-muted">
          <div class="flex items-center gap-1">${icon('calendar', 'h-4 w-4')}<span>${formatDate(post.date)}</span></div>
          <div class="flex items-center gap-1">${icon('clock', 'h-4 w-4')}<span>${escapeHtml(post.readTime)}</span></div>
        </div>
      </div>
      <div class="p-6 pt-0">
        <p class="text-ink-muted mb-4 leading-relaxed line-clamp-3">${escapeHtml(post.excerpt)}</p>
        <a href="/blog/${post.slug}/" class="inline-flex items-center gap-2 text-accent-brand hover:opacity-80 font-medium transition-colors group">
          <span>Read full article</span>
          ${icon('arrow-right', 'h-4 w-4 transition-transform group-hover:translate-x-1')}
        </a>
      </div>
    </div>
  `;
}

module.exports = { renderBlogPostCard };
