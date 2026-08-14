const { html } = require('../render');
const { renderPage, SITE_URL, SITE_NAME } = require('../layout');
const { renderHero } = require('../partials/hero');
const { renderCaseStudies } = require('../partials/case-studies');
const { renderAbout } = require('../partials/about');
const { renderSkills } = require('../partials/skills');
const { renderExperience } = require('../partials/experience');
const { renderCredentials } = require('../partials/credentials');
const { renderContact } = require('../partials/contact');
const { renderFooter } = require('../partials/footer');

const WEBSITE_LD_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
});

function renderHomePage() {
  const bodyHtml = html`
    <main id="main" class="min-h-screen bg-paper" data-testid="main">
      ${renderHero()}
      ${renderCaseStudies()}
      ${renderAbout()}
      ${renderSkills()}
      ${renderExperience()}
      ${renderCredentials()}
      ${renderContact()}
    </main>
    ${renderFooter()}
  `;

  return renderPage({
    ogType: 'website',
    ogImage: '/opengraph-image.png',
    extraLdJson: [WEBSITE_LD_JSON],
    bodyHtml,
  });
}

module.exports = { renderHomePage };
