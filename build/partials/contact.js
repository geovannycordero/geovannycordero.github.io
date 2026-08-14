const { html, escapeHtml } = require('../render');

const CONTACT_LINKS = [
  { href: 'mailto:geovanny@pm.me', label: 'geovanny@pm.me', external: false },
  { href: 'https://linkedin.com/in/geovannycordero', label: 'LinkedIn', external: true },
  { href: 'https://github.com/geovannycordero', label: 'GitHub', external: true },
  { href: 'https://www.upwork.com/freelancers/~013cc6068c4bfca093', label: 'Upwork', external: true },
];

function contactLink({ href, label, external }) {
  const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  return html`<a href="${href}"${attrs} class="border-b border-line pb-0.5 text-ink transition-colors hover:border-accent-brand hover:text-accent-brand dark:border-line/30">${escapeHtml(label)}</a>`;
}

function renderContact() {
  return html`
    <section id="contact" class="scroll-mt-24 bg-paper py-20 text-left dark:bg-paper">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="mb-4 text-balance font-serif text-3xl font-normal text-ink sm:text-4xl">Let&apos;s talk about what you&apos;re building.</h2>
        <p class="mb-8 max-w-[50ch] text-ink-muted">Open to full-time roles and select freelance projects. I read every message myself.</p>
        <div class="flex flex-wrap gap-8 font-mono text-sm">
          ${CONTACT_LINKS.map(contactLink).join('')}
        </div>
      </div>
    </section>
  `;
}

module.exports = { renderContact };
