const { html, escapeHtml } = require('../render');
const { icon, customIcon } = require('../icons');

const TECH_CHIP_CLASSES =
  'rounded-sm border border-line px-2 py-1 font-mono text-xs text-accent-brand dark:border-line/30';

function renderProjectCard(project, index) {
  const featuredBadge = project.featured
    ? '<div class="absolute top-3 right-3"><span class="inline-flex items-center rounded-sm bg-accent-brand text-paper text-xs px-2 py-0.5">Featured</span></div>'
    : '';
  const employer = project.employer
    ? `<p class="text-xs text-ink-muted">Delivered while at ${escapeHtml(project.employer)}</p>`
    : '';
  const githubLink = project.githubUrl
    ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(project.title)} on GitHub" class="inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors text-sm font-medium">${customIcon('github', 'h-4 w-4')}<span class="hidden sm:inline">GitHub</span></a>`
    : '';
  const liveLink = project.projectUrl
    ? `<a href="${project.projectUrl}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escapeHtml(project.title)} live site" class="inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors text-sm font-medium">${icon('external-link', 'h-4 w-4')}<span class="hidden sm:inline">Live Site</span></a>`
    : '';

  return html`
    <div id="${project.id}" class="stagger-fade-in-slow scroll-mt-24 border border-line bg-surface transition-all duration-300 hover:border-accent-brand dark:border-line/20" style="--stagger-index: ${index}">
      <div class="relative overflow-hidden">
        <img src="${project.image}" alt="${escapeHtml(project.title)}" width="400" height="300" loading="lazy" class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        ${featuredBadge}
      </div>

      <div class="flex flex-col space-y-1.5 p-6 pb-3">
        <div class="flex items-start justify-between gap-2">
          <h2 class="text-xl font-semibold leading-none tracking-tight text-ink hover:text-accent-brand transition-colors line-clamp-2">${escapeHtml(project.title)}</h2>
          <div class="flex items-center gap-1 text-xs text-ink-muted">${icon('calendar', 'h-3 w-3')}<span>${escapeHtml(project.completedDate)}</span></div>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="inline-flex items-center rounded-sm border border-line text-xs text-accent-brand dark:border-line/30 px-2 py-0.5">${escapeHtml(project.category)}</span>
        </div>
        ${employer}
      </div>

      <div class="space-y-4 p-6 pt-0">
        <p class="text-ink-muted text-sm leading-relaxed line-clamp-3">${escapeHtml(project.description)}</p>
        <div class="space-y-3">
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(tech => `<span class="${TECH_CHIP_CLASSES}">${escapeHtml(tech)}</span>`).join('')}
          </div>
          <div class="flex items-center gap-3 pt-2">
            ${githubLink}
            ${liveLink}
          </div>
        </div>
      </div>
    </div>
  `;
}

module.exports = { renderProjectCard };
