const { html, escapeHtml } = require('../render');

function renderSectionHead({ index, label, id, content }) {
  return html`
    <section id="${id}" class="scroll-mt-24 border-b border-line py-[4.5rem] dark:border-line/20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-9 flex items-baseline gap-3">
          <span class="font-mono text-sm text-accent-brand">${escapeHtml(index)}</span>
          <h2 class="text-sm font-bold uppercase tracking-widest text-ink">${escapeHtml(label)}</h2>
        </div>
        ${content}
      </div>
    </section>
  `;
}

module.exports = { renderSectionHead };
