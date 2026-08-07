import projectsData from '@/app/projects/data/projects.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  category: 'Personal' | 'Outsourcing' | 'Work';
  featured: boolean;
  completedDate: string;
  /** Set when delivered through an employer; omitted for direct freelance work */
  employer?: string;
  /** Links back to an Experience.id */
  experienceEntryId?: string;
  /** Measurable result, shown as a hover-revealed line on case study cards */
  outcome?: string;
}

export const projects: Project[] = projectsData as Project[];

export function getAllProjects(): Project[] {
  return projects.sort((a, b) => {
    // Sort featured projects first, then by completion date (newest first)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (
      new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
    );
  });
}

/** Client/freelance work, framed as outcome-based case studies. */
export function getCaseStudies(): Project[] {
  return getAllProjects().filter(p => p.category === 'Outsourcing');
}

/** Personal projects and work delivered directly through an employer. */
export function getSideProjects(): Project[] {
  return getAllProjects().filter(p => p.category !== 'Outsourcing');
}
