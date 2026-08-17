const { html } = require('../render');
const { icon } = require('../icons');
const { renderPage, SITE_URL } = require('../layout');
const { renderFooter } = require('../partials/footer');
const { renderProjectCard } = require('../partials/project-card');
const { getSideProjects } = require('../content/projects');

function renderProjectsPage() {
  const projects = getSideProjects();
  const workCount = projects.filter(p => p.category === 'Work').length;
  const personalCount = projects.filter(p => p.category === 'Personal').length;

  const itemListLdJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: project.projectUrl,
      name: project.title,
    })),
  });

  const projectsHtml = projects.length
    ? html`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${projects.map((p, i) => renderProjectCard(p, i)).join('')}</div>`
    : html`
        <div class="text-center py-16">
          <div class="max-w-md mx-auto">
            <h2 class="text-xl font-semibold mb-3 text-ink">No projects found</h2>
            <p class="text-ink-muted mb-6">There are no projects available at the moment. Check back soon for new additions!</p>
            <a href="/" class="inline-flex items-center px-4 py-2 bg-ink text-paper rounded-sm hover:opacity-80 transition-opacity dark:bg-accent-brand">Return to Home</a>
          </div>
        </div>
      `;

  const bodyHtml = html`
    <main id="main" class="pt-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-7xl mx-auto">
          <div class="mb-8">
            <a href="/" class="inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors mb-6 group">${icon('arrow-left', 'h-4 w-4')} Back to Home</a>

            <div class="text-left mb-6">
              <h1 class="font-serif text-4xl font-normal text-ink mb-4">Side Projects</h1>
              <p class="text-lg text-ink-muted">Personal builds and work delivered directly through an employer — smaller in scope than the client engagements below, but shipped and live.</p>
            </div>

            <a href="/#work" class="inline-flex items-center gap-2 text-sm font-medium text-accent-brand hover:underline">Looking for client work? See case studies ${icon('arrow-right', 'h-4 w-4')}</a>
          </div>

          <div id="projects-content" class="scroll-mt-24 mt-8">
            <div class="mb-8 p-4 bg-accent-soft rounded-lg border border-line dark:border-line/20">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p class="text-ink-muted"><span class="font-semibold text-accent-brand">${projects.length}</span> side projects showcased</p>
                <div class="flex items-center gap-4 text-sm text-ink-muted">
                  <div class="flex items-center gap-1">${icon('briefcase', 'h-4 w-4')}<span>${workCount} Work</span></div>
                  <div class="flex items-center gap-1">${icon('code', 'h-4 w-4')}<span>${personalCount} Personal</span></div>
                </div>
              </div>
            </div>
            ${projectsHtml}
          </div>

          <div class="text-center mt-16 pt-8 border-t border-line dark:border-line/20">
            <div class="max-w-2xl mx-auto">
              <h2 class="text-lg font-semibold mb-4 text-ink">Interested in Working Together?</h2>
              <p class="text-ink-muted mb-6">I&apos;m always excited to work on new projects and collaborate with innovative teams. Let&apos;s discuss how we can bring your ideas to life.</p>
              <a href="/#contact" class="inline-flex items-center px-6 py-3 bg-ink text-paper rounded-sm hover:opacity-80 transition-opacity font-medium dark:bg-accent-brand">Get In Touch</a>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;

  return renderPage({
    title: 'Projects - Geovanny Cordero Valverde',
    description:
      'Explore my portfolio of software development projects including full-stack applications, APIs, and web solutions built with modern technologies.',
    canonical: `${SITE_URL}/projects/`,
    ogType: 'website',
    ogImage: '/projects/opengraph-image.png',
    extraLdJson: [itemListLdJson],
    bodyHtml,
  });
}

module.exports = { renderProjectsPage };
