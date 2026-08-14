const { html, escapeHtml } = require('../render');
const { icon } = require('../icons');
const { renderSectionHead } = require('./section-head');
const { getExperience } = require('../content/experience');
const { TECH_CHIP_CLASSES } = require('../utils');

// Native <details>/<summary> — expand/collapse is free browser behavior,
// no JS required (unlike the React version's no-dependency choice of the
// same element, made for the same reason).
function clientProjectRow(project) {
  const relatedLink = project.relatedProjectId
    ? `<a href="/projects/#${project.relatedProjectId}" class="mt-2 inline-block text-xs font-medium text-accent-brand hover:underline">View full project &rarr;</a>`
    : '';

  return html`
    <details class="group py-4">
      <summary class="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div class="flex items-baseline justify-between gap-4">
          <span class="flex items-center gap-1.5 font-semibold text-ink">
            ${icon('chevron-right', 'h-3.5 w-3.5 flex-shrink-0 text-ink-muted transition-transform group-open:rotate-90')}
            ${escapeHtml(project.name)}
          </span>
          <span class="shrink-0 font-mono text-xs text-ink-muted">${escapeHtml(project.period)}</span>
        </div>
        <p class="mt-1 text-sm text-ink-muted">${escapeHtml(project.impactSummary)}</p>
        <div class="mt-2 flex flex-wrap gap-2">
          ${project.technologies.map(tech => `<span class="${TECH_CHIP_CLASSES}">${escapeHtml(tech)}</span>`).join('')}
        </div>
      </summary>

      <ul class="mt-3 space-y-1.5 pl-5 text-sm text-ink-muted">
        ${project.highlights
          .map(
            h =>
              `<li class="flex items-start gap-2"><span class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-line dark:bg-line/40"></span><span>${escapeHtml(h)}</span></li>`
          )
          .join('')}
      </ul>
      ${relatedLink}
    </details>
  `;
}

function roleList(roles) {
  return roles
    .map((role, index) => `<span class="flex items-center gap-2">${index > 0 ? '<span aria-hidden="true">&middot;</span>' : ''}<span>${escapeHtml(role)}</span></span>`)
    .join('');
}

function job(entry) {
  const clientProjects =
    entry.clientProjects.length > 0
      ? html`
          <div class="space-y-1 pt-6">
            <h4 class="font-semibold text-accent-brand">Client Engagements:</h4>
            <p class="pb-2 text-xs text-ink-muted">Details generalized for client confidentiality.</p>
            <div class="divide-y divide-line dark:divide-line/20">
              ${entry.clientProjects.map(clientProjectRow).join('')}
            </div>
          </div>
        `
      : '';

  return html`
    <div class="bg-surface p-8">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-xl font-semibold leading-none tracking-tight text-ink">${escapeHtml(entry.company)}</h3>
        <div class="flex items-center gap-4 text-sm text-ink-muted">
          <div class="flex items-center gap-1">${icon('calendar', 'h-4 w-4')}<span>${escapeHtml(entry.period)}</span></div>
          <div class="flex items-center gap-1">${icon('map-pin', 'h-4 w-4')}<span>${escapeHtml(entry.location)}</span></div>
        </div>
      </div>
      <div class="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
        ${roleList(entry.role)}
      </div>

      <div class="mt-4 space-y-4">
        <p class="text-ink-muted">${escapeHtml(entry.summary)}</p>

        <div class="space-y-3">
          <h4 class="font-semibold text-accent-brand">Key Achievements:</h4>
          <ul class="space-y-2 text-ink-muted">
            ${entry.achievements
              .map(
                a =>
                  `<li class="flex items-start gap-2"><span class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-line dark:bg-line/40"></span><span>${escapeHtml(a)}</span></li>`
              )
              .join('')}
          </ul>
        </div>

        <div class="pt-4">
          <h4 class="mb-2 font-semibold text-accent-brand">Technologies Used:</h4>
          <div class="flex flex-wrap gap-2">
            ${entry.technologies.map(tech => `<span class="${TECH_CHIP_CLASSES}">${escapeHtml(tech)}</span>`).join('')}
          </div>
        </div>

        ${clientProjects}
      </div>
    </div>
  `;
}

function renderExperience() {
  return renderSectionHead({
    index: '04',
    label: 'Experience',
    id: 'experience',
    content: html`
      <div class="mx-auto max-w-4xl">
        <div class="grid gap-px border border-line bg-line dark:border-line/20 dark:bg-line/20">
          ${getExperience().map(job).join('')}
        </div>
      </div>
    `,
  });
}

module.exports = { renderExperience };
