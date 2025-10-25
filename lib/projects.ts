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

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getProjectsByCategory(
  category: Project['category']
): Project[] {
  return projects.filter(project => project.category === category);
}
