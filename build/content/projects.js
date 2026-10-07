const projectsData = require('../data/projects.json');

function getAllProjects() {
  return [...projectsData].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
  });
}

// Hand-picked projects (`caseStudy: true`), framed as outcome-based case studies.
function getCaseStudies() {
  return getAllProjects().filter(p => p.caseStudy);
}

// Everything else: client sites, personal builds, and employer work.
function getSideProjects() {
  return getAllProjects().filter(p => !p.caseStudy);
}

module.exports = { getAllProjects, getCaseStudies, getSideProjects };
