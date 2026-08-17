const { html, escapeHtml } = require('../render');
const { icon, customIcon } = require('../icons');
const { renderTerminalCard } = require('./terminal-card');

const META_LINKS = [
  { href: 'mailto:geovanny@pm.me', label: 'geovanny@pm.me', icon: null, external: false },
  { href: 'https://linkedin.com/in/geovannycordero', label: 'LinkedIn', icon: 'linkedin', external: true },
  { href: 'https://github.com/geovannycordero', label: 'GitHub', icon: 'github', external: true },
];

function metaLink({ href, label, icon: iconName, external }) {
  const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  const iconMarkup = iconName ? customIcon(iconName, 'h-4 w-4') : icon('mail', 'h-4 w-4');
  return html`<a href="${href}"${attrs} class="flex items-center gap-2 transition-colors hover:text-accent-brand">${iconMarkup}<span>${escapeHtml(label)}</span></a>`;
}

function renderHero() {
  return html`
    <section class="border-b border-line bg-paper pb-20 pt-32 dark:border-line/20 dark:bg-paper">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p data-testid="hero-eyebrow" class="mb-5 font-mono text-sm text-accent-brand">Full-Stack Software Engineer &middot; San José, Costa Rica</p>

            <h1 class="text-balance font-serif text-4xl font-normal leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              I build <span class="border-b-2 border-accent-brand text-accent-brand underline decoration-accent-brand decoration-2 underline-offset-4">production systems</span><br>and the sites that sell them.
            </h1>

            <p class="mt-8 max-w-[56ch] text-lg text-ink-muted">Five years shipping Go and Ruby on Rails at Pernix Solutions, plus four freelance builds that turned into booked clients. Currently mentoring the next apprentice cohort.</p>

            <div class="mt-8 flex flex-wrap items-center gap-6">
              <a href="/#contact" class="inline-block rounded-sm bg-ink px-6 py-3 text-sm text-paper transition-opacity hover:opacity-80 dark:bg-accent-brand dark:text-paper">Get in touch</a>
              <a href="/resume/geovanny-cordero-cv.pdf" download class="text-sm text-ink-muted underline decoration-accent-brand underline-offset-4">Download résumé</a>
            </div>

            <div class="mt-10 flex flex-wrap gap-6 font-mono text-xs text-ink-muted">
              ${META_LINKS.map(metaLink).join('')}
            </div>
          </div>

          <div data-testid="terminal-card-wrapper" aria-hidden="true" class="hidden lg:block">
            ${renderTerminalCard()}
          </div>
        </div>
      </div>
    </section>
  `;
}

module.exports = { renderHero };
