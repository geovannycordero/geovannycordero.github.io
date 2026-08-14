const { html, escapeHtml } = require('../render');
const { renderSectionHead } = require('./section-head');

const PARAGRAPHS = [
  "I've spent five years at Pernix Solutions moving from Apprentice to Software Engineer III to Supervisor of the Apprentice Program — a path that taught me as much about mentoring as it did about Golang and Rails.",
  "I've worked with teams across the US, Colombia, Australia, and India, and I currently split my time between that leadership track and freelance builds for small businesses who need a site that actually converts.",
  "Right now I'm pursuing an MBA focused on project management, mostly to get better at the parts of engineering that happen outside the editor.",
];

const STATS = [
  { label: '5+ years', detail: 'Full-stack, Golang & Rails' },
  { label: '4 client sites', detail: 'Shipped & live in production' },
  { label: '4 countries', detail: 'Teams collaborated with' },
  { label: '2020', detail: 'Programathon Competition Champion' },
];

function renderAbout() {
  return renderSectionHead({
    index: '02',
    label: 'About',
    id: 'about',
    content: html`
      <div class="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div data-testid="about-prose" class="measure max-w-[640px]">
          ${PARAGRAPHS.map(p => `<p class="mb-4 text-ink-muted">${escapeHtml(p)}</p>`).join('')}
        </div>

        <div class="grid content-start gap-5">
          ${STATS.map(
            stat =>
              `<div data-testid="about-stat" class="border-l-2 border-accent-brand pl-4"><b class="block text-base text-ink">${escapeHtml(stat.label)}</b><span class="text-sm text-ink-muted">${escapeHtml(stat.detail)}</span></div>`
          ).join('')}
        </div>
      </div>
    `,
  });
}

module.exports = { renderAbout };
