const { html, escapeHtml } = require('../render');
const { renderSectionHead } = require('./section-head');
const { getSkillCategories } = require('../content/skills');

function category(cat) {
  const skills = cat.skills
    .map((skill, index) => (index > 0 ? `, <span>${escapeHtml(skill)}</span>` : `<span>${escapeHtml(skill)}</span>`))
    .join('');
  return html`
    <div class="mb-7 break-inside-avoid">
      <h3 class="mb-2 text-sm uppercase tracking-wider text-accent-brand">${escapeHtml(cat.title)}</h3>
      <p class="text-sm text-ink-muted">${skills}</p>
    </div>
  `;
}

function renderSkills() {
  return renderSectionHead({
    index: '03',
    label: 'Skills',
    id: 'skills',
    content: html`
      <div data-testid="skills-columns" class="columns-1 gap-12 font-sans md:columns-2">
        ${getSkillCategories().map(category).join('')}
      </div>
    `,
  });
}

module.exports = { renderSkills };
