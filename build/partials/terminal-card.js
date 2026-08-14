const { html, escapeHtml } = require('../render');

const FACTS = [
  ['name', 'Geovanny Cordero'],
  ['title', 'Full-Stack Software Engineer'],
  ['location', 'San José, Costa Rica'],
  ['experience', '5+ years'],
  ['award', 'Programathon 2020 Champion'],
];

const LANGUAGES = ['Golang', 'Ruby', 'JavaScript', 'TypeScript'];

function renderTerminalCard() {
  return html`
    <div aria-hidden="true" class="rounded-xl border border-line/20 bg-surface/40 p-6 font-mono text-sm dark:shadow-[0_0_30px_rgba(0,255,65,0.03)]">
      <div class="mb-2 text-accent-brand">$ cat about.md</div>
      <div class="space-y-1 text-ink-muted">
        ${FACTS.map(
          ([key, value]) =>
            `<p><span class="text-accent-brand">${escapeHtml(key)}</span> : "${escapeHtml(value)}"</p>`
        ).join('')}
        <p><span class="text-accent-brand">languages</span> : [${LANGUAGES.map(lang => `"${escapeHtml(lang)}"`).join(', ')}]</p>
        <p class="mt-2 text-accent-brand motion-safe:animate-terminal-blink">$ _</p>
      </div>
    </div>
  `;
}

module.exports = { renderTerminalCard };
