const { html } = require('../render');
const { renderPage, SITE_URL } = require('../layout');
const { renderFooter } = require('../partials/footer');
const { renderRssLink } = require('../partials/rss-link');
const { renderBlogPostCard } = require('../partials/blog-post-card');
const { renderBackToTop } = require('../partials/back-to-top');
const { getAllPosts } = require('../content/blog');

function renderBlogIndexPage() {
  const posts = getAllPosts();

  const postsHtml = posts.length
    ? html`<div class="space-y-8">${posts.map((post, i) => renderBlogPostCard(post, i)).join('')}</div>`
    : html`
        <div class="text-center py-16">
          <div class="max-w-md mx-auto">
            <h2 class="text-xl font-semibold mb-3 text-ink">No posts found</h2>
            <p class="text-ink-muted mb-6">There are no blog posts available at the moment. Check back soon for new content!</p>
            <a href="/" class="inline-flex items-center px-4 py-2 bg-ink text-paper rounded-sm hover:opacity-80 transition-opacity dark:bg-accent-brand">Return to Home</a>
          </div>
        </div>
      `;

  const bodyHtml = html`
    <main id="main" class="pt-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-4xl mx-auto">
          <div class="mb-8">
            <a href="/" class="inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors mb-6 group">&larr; Back to Home</a>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 class="font-serif text-4xl font-normal text-ink mb-2">Blog</h1>
                <p class="text-lg text-ink-muted">Insights, articles, and updates on software development, technology, and leadership.</p>
              </div>
              <div class="flex flex-col sm:items-end gap-2">
                ${renderRssLink()}
                <p class="text-sm text-ink-muted">Subscribe for updates</p>
              </div>
            </div>
          </div>

          <div id="blog-content" class="scroll-mt-24">
            <div class="mb-8 p-4 bg-accent-soft rounded-lg border border-line dark:border-line/20">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p class="text-ink-muted"><span class="font-semibold text-accent-brand">${posts.length}</span> articles available</p>
                <p class="text-sm text-ink-muted">Latest: ${posts.length ? new Date(posts[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : 'No posts yet'}</p>
              </div>
            </div>
            ${postsHtml}
          </div>

          <div class="mt-8 text-center">${renderBackToTop()}</div>

          <div class="text-center mt-16 pt-8 border-t border-line dark:border-line/20">
            <div class="max-w-2xl mx-auto">
              <h2 class="text-lg font-semibold mb-4 text-ink">Stay Connected</h2>
              <p class="text-ink-muted mb-6">More articles coming soon! Follow me on <a href="https://linkedin.com/in/geovannycordero" target="_blank" rel="noopener noreferrer" class="text-accent-brand hover:underline font-medium">LinkedIn</a> for updates and insights.</p>
              <div class="grid sm:grid-cols-3 gap-4 text-sm font-mono">
                <div class="flex items-center justify-center gap-2 p-3 bg-accent-soft rounded-lg text-ink-muted">RSS Feed Available</div>
                <div class="flex items-center justify-center gap-2 p-3 bg-accent-soft rounded-lg text-ink-muted">Updated Regularly</div>
                <div class="flex items-center justify-center gap-2 p-3 bg-accent-soft rounded-lg text-ink-muted">Tech Insights</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  return renderPage({
    title: 'Blog - Geovanny Cordero Valverde',
    description:
      'Insights, articles, and updates on software development, technology, and leadership from Geovanny Cordero Valverde.',
    canonical: `${SITE_URL}/blog/`,
    ogType: 'website',
    ogImage: '/blog/opengraph-image.png',
    bodyHtml,
  });
}

module.exports = { renderBlogIndexPage };
