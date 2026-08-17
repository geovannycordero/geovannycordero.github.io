const { html, escapeHtml } = require('./render');
const { THEME_INIT_SCRIPT } = require('./theme-script');
const { renderNav } = require('./partials/nav');

const SITE_URL = 'https://geovannycordero.com';
const SITE_NAME = 'Geovanny Cordero Portfolio';
const DEFAULT_TITLE = 'Geovanny Cordero Valverde - Full-Stack Software Engineer';
const DEFAULT_DESCRIPTION =
  'Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies. Based in San José, Costa Rica.';

const PERSON_LD_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Geovanny Cordero Valverde',
  jobTitle: 'Full-Stack Software Engineer',
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  email: 'geovanny@pm.me',
  telephone: '+506 8852 7576',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San José',
    addressCountry: 'Costa Rica',
  },
  sameAs: ['https://linkedin.com/in/geovannycordero'],
  knowsAbout: [
    'Golang',
    'Ruby on Rails',
    'JavaScript',
    'Vue.js',
    'Full-Stack Development',
    'Team Leadership',
    'Software Engineering',
  ],
});

// Renders the full document shell every page shares: <head> metadata
// (favicons, RSS alternate, theme-color, site-wide Person JSON-LD, the
// pre-paint theme script) plus the skip-link + nav/footer chrome. Each
// page supplies its own <title>/description/OG/Twitter/canonical and
// page-specific JSON-LD (WebSite, BlogPosting, ItemList, ...) plus its
// body content.
function renderPage({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = `${SITE_URL}/`,
  ogType = 'website',
  ogImage,
  extraLdJson = [],
  bodyHtml,
  includeChrome = true,
}) {
  const fullOgImage = ogImage ? `${SITE_URL}${ogImage}` : undefined;
  const ldJsonScripts = [PERSON_LD_JSON, ...extraLdJson]
    .map(json => `<script type="application/ld+json">${json}</script>`)
    .join('');

  const analytics =
    process.env.NODE_ENV === 'production'
      ? html`
          <script defer data-domain="geovannycordero.com" src="https://analytics.geovannycordero.com/js/script.file-downloads.outbound-links.js"></script>
          <script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>
        `
      : '';

  const chrome = includeChrome
    ? html`
        <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent-brand focus:px-4 focus:py-2 focus:text-surface focus:outline-none focus:ring-2 focus:ring-offset-2">Skip to main content</a>
        ${renderNav()}
      `
    : '';

  return html`<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="utf-8">
<script>${THEME_INIT_SCRIPT}</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/icons/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Geovanny Cordero Valverde - Blog RSS Feed" href="/rss.xml">
<meta name="theme-color" content="#f6f7f5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="en_US">
${fullOgImage ? `<meta property="og:image" content="${fullOgImage}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
${fullOgImage ? `<meta name="twitter:image" content="${fullOgImage}">` : ''}
${ldJsonScripts}
<link rel="stylesheet" href="/assets/css/globals.css">
<script defer src="/assets/js/main.js"></script>
${analytics}
</head>
<body>
${chrome}
${bodyHtml}
</body>
</html>`;
}

module.exports = { renderPage, SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION };
