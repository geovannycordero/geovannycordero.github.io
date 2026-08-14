const { html, escapeHtml } = require('../render');
const { icon } = require('../icons');
const { renderPage, SITE_URL, SITE_NAME } = require('../layout');
const { renderFooter } = require('../partials/footer');
const { renderBackToTop } = require('../partials/back-to-top');

function ldJson(post, postUrl) {
  const publishedTime = new Date(post.date).toISOString();

  const blogPosting = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: publishedTime,
    dateModified: publishedTime,
    url: postUrl,
    image: `${postUrl}opengraph-image.png`,
    keywords: post.tags.join(', '),
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Person', name: SITE_NAME },
  });

  const breadcrumbs = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  });

  return [blogPosting, breadcrumbs];
}

function renderBlogPostPage(post) {
  const postUrl = `${SITE_URL}/blog/${post.slug}/`;
  const dateFormatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const bodyHtml = html`
    <main id="main" class="pt-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-4xl mx-auto">
          <a href="/blog/" class="inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors mb-8">${icon('arrow-left', 'h-4 w-4')} Back to Blog</a>

          <article>
            <header class="mb-8">
              <div class="flex flex-wrap gap-2 mb-4">
                ${post.tags.map(tag => `<span class="text-xs bg-accent-soft text-accent-brand inline-flex items-center rounded-sm px-2 py-0.5">${escapeHtml(tag)}</span>`).join('')}
              </div>

              <h1 class="font-serif text-4xl font-normal text-ink mb-4">${escapeHtml(post.title)}</h1>

              <div class="flex flex-wrap items-center gap-6 text-sm text-ink-muted mb-6">
                <div class="flex items-center gap-2">${icon('user', 'h-4 w-4')}<span>${escapeHtml(post.author)}</span></div>
                <div class="flex items-center gap-2">${icon('calendar', 'h-4 w-4')}<span>${dateFormatted}</span></div>
                <div class="flex items-center gap-2">${icon('clock', 'h-4 w-4')}<span>${escapeHtml(post.readTime)}</span></div>
              </div>

              <p class="text-lg text-ink-muted">${escapeHtml(post.excerpt)}</p>
            </header>

            <div class="prose prose-lg max-w-none">${post.content}</div>
          </article>

          <div class="mt-12 text-center">
            <p class="text-ink-muted mb-4">Enjoyed this article? Connect with me on social media for more insights.</p>
            <a href="https://linkedin.com/in/geovannycordero" target="_blank" rel="noopener noreferrer" class="text-accent-brand hover:underline font-medium">Follow me on LinkedIn &rarr;</a>
          </div>

          <div class="mt-8 text-center">${renderBackToTop()}</div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  return renderPage({
    title: `${post.title} - Geovanny Cordero Valverde`,
    description: post.excerpt,
    canonical: postUrl,
    ogType: 'article',
    ogImage: `/blog/${post.slug}/opengraph-image.png`,
    extraLdJson: ldJson(post, postUrl),
    bodyHtml,
  });
}

module.exports = { renderBlogPostPage };
