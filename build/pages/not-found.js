const { html } = require('../render');
const { renderPage, SITE_URL } = require('../layout');
const { renderFooter } = require('../partials/footer');

// Written to docs/404.html — GitHub Pages serves it for any unknown path
// (as does `yarn preview`, see build/serve.js).
function renderNotFoundPage() {
  const bodyHtml = html`
    <main id="main" class="pt-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="max-w-xl mx-auto text-center">
          <p class="font-mono text-sm text-accent-brand mb-4">404</p>
          <h1 class="font-serif text-4xl font-normal text-ink mb-4">Page not found</h1>
          <p class="text-ink-muted mb-8">That page doesn't exist, or it moved somewhere else.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" class="inline-flex items-center justify-center px-4 py-2 bg-ink text-paper rounded-sm hover:opacity-80 transition-opacity dark:bg-accent-brand">Return to Home</a>
            <a href="/blog/" class="inline-flex items-center justify-center px-4 py-2 border border-line text-ink rounded-sm hover:border-accent-brand transition-colors dark:border-line/20">Read the Blog</a>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  return renderPage({
    title: 'Page not found - Geovanny Cordero Valverde',
    description: 'The page you are looking for does not exist.',
    canonical: `${SITE_URL}/404.html`,
    bodyHtml,
  });
}

module.exports = { renderNotFoundPage };
