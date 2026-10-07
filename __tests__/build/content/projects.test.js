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
  it('getCaseStudies returns only projects flagged caseStudy', () => {
    getCaseStudies().forEach(p => expect(p.caseStudy).toBe(true));
  });

  it('features Barbershop Studio, Madurez Digital and Dia Balance as case studies', () => {
    expect(getCaseStudies().map(p => p.id).sort()).toEqual([
      'barbershop-studio-website',
      'dia-balance',
      'tfg-maturity-assessment',
    ]);
  });

  it('keeps the other client sites on the projects page with their Outsourcing label', () => {
    const sideIds = getSideProjects().map(p => p.id);
    ['dc-drip-website', 'lg-services-website', '4-mk-firearms-llc-website'].forEach(id => {
      expect(sideIds).toContain(id);
      expect(getSideProjects().find(p => p.id === id).category).toBe('Outsourcing');
    });
  });

  it('every case study has an outcome', () => {
    getCaseStudies().forEach(p => expect(p.outcome).toBeTruthy());
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

  it('includes the tfg-maturity-assessment project as a featured personal project', () => {
    const project = getAllProjects().find(p => p.id === 'tfg-maturity-assessment');
    expect(project).toMatchObject({
      title: 'Madurez Digital — Autodiagnóstico para PYMEs',
      category: 'Personal',
      featured: true,
      projectUrl: 'https://madurez-digital-pymes-cr.com/',
      githubUrl: '', // repo is private; a link would 404 for visitors
    });
  });

  it('includes dia-balance as a non-featured personal project', () => {
    const project = getAllProjects().find(p => p.id === 'dia-balance');
    expect(project).toMatchObject({
      category: 'Personal',
      featured: false,
      projectUrl: 'https://dia-balance-production.up.railway.app/',
      githubUrl: 'https://github.com/geovannycordero/dia-balance',
    });
  });

  it('barbershop-studio-website reflects the multi-tenant SaaS billing launch', () => {
    const project = getAllProjects().find(p => p.id === 'barbershop-studio-website');
    expect(project.longDescription).toMatch(/multi-tenant|self-serve/i);
  });
});
