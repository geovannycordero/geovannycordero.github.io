const { html, escapeHtml } = require('../render');
const { renderSectionHead } = require('./section-head');
const { getCaseStudies } = require('../content/projects');
const { TECH_CHIP_CLASSES } = require('../utils');

function row(project) {
  const outcome = project.outcome
    ? `<p class="mb-3 text-sm font-medium text-accent-brand">${escapeHtml(project.outcome)}</p>`
    : '';
  const link = project.projectUrl
    ? `<a href="${project.projectUrl}" target="_blank" rel="noopener noreferrer" aria-label="View live site: ${escapeHtml(project.title)}" class="text-sm text-accent-brand underline decoration-accent-brand underline-offset-4">View live site &rarr;</a>`
    : '';

  return html`
    <div class="grid gap-8 bg-surface p-8 md:grid-cols-[1fr_2fr]">
      <div>
        <p class="mb-2 font-mono text-xs uppercase tracking-wider text-accent-brand">${escapeHtml(project.category)}</p>
        <h3 class="text-xl font-bold text-ink">${escapeHtml(project.title)}</h3>
        <div class="mt-3 flex flex-wrap gap-2">
          ${project.technologies.map(tech => `<span class="${TECH_CHIP_CLASSES}">${escapeHtml(tech)}</span>`).join('')}
        </div>
      </div>
      <div>
        <p class="mb-3 text-ink-muted">${escapeHtml(project.description)}</p>
        ${outcome}
        ${link}
      </div>
    </div>
  `;
}

function renderCaseStudies() {
  const caseStudies = getCaseStudies();
  return renderSectionHead({
    index: '01',
    label: 'Case Studies',
    id: 'work',
    content: html`
      <div class="grid gap-px border border-line bg-line dark:border-line/20 dark:bg-line/20">
        ${caseStudies.map(row).join('')}
      </div>
    `,
  });
}

module.exports = { renderCaseStudies };
