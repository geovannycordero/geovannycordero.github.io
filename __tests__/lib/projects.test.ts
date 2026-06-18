import { getAllProjects } from '@/lib/projects';

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
