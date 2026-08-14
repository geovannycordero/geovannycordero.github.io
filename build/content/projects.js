const projectsData = require('../data/projects.json');

function getAllProjects() {
  return [...projectsData].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
  });
}

// Client/freelance work, framed as outcome-based case studies.
function getCaseStudies() {
  return getAllProjects().filter(p => p.category === 'Outsourcing');
}

// Personal projects and work delivered directly through an employer.
function getSideProjects() {
  return getAllProjects().filter(p => p.category !== 'Outsourcing');
}

module.exports = { getAllProjects, getCaseStudies, getSideProjects };
