const { getAllProjects, getCaseStudies, getSideProjects } = require('../../../build/content/projects');

describe('getAllProjects', () => {
  it('returns an array', () => {
    expect(Array.isArray(getAllProjects())).toBe(true);
  });

  it('returns featured projects before non-featured', () => {
    const projects = getAllProjects();
    const firstNonFeatured = projects.findIndex(p => !p.featured);
    const lastFeatured = projects.map(p => p.featured).lastIndexOf(true);
    if (firstNonFeatured !== -1 && lastFeatured !== -1) {
      expect(lastFeatured).toBeLessThan(firstNonFeatured);
    }
  });

  it('each project has required fields', () => {
    getAllProjects().forEach(p => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(Array.isArray(p.technologies)).toBe(true);
    });
  });
});

describe('getCaseStudies / getSideProjects', () => {
  it('getCaseStudies returns only Outsourcing projects', () => {
    getCaseStudies().forEach(p => expect(p.category).toBe('Outsourcing'));
  });

  it('getSideProjects returns the complement of getCaseStudies', () => {
    const caseStudyIds = new Set(getCaseStudies().map(p => p.id));
    getSideProjects().forEach(p => expect(caseStudyIds.has(p.id)).toBe(false));
  });

  it('case studies and side projects together equal all projects', () => {
    const combined = [...getCaseStudies(), ...getSideProjects()].map(p => p.id).sort();
    const all = getAllProjects().map(p => p.id).sort();
    expect(combined).toEqual(all);
  });

  it('every case study has a non-empty projectUrl', () => {
    getCaseStudies().forEach(p => expect(p.projectUrl).toBeTruthy());
  });
});
