import experienceData from '@/app/experience/data/experience.json';

export interface ClientProject {
  id: string;
  name: string;
  period: string;
  /** 1-2 impact-quantified lines, always visible whether collapsed or expanded */
  impactSummary: string;
  /** Fuller STAR-shaped bullets, revealed on expand */
  highlights: string[];
  technologies: string[];
  /** Links to a Project.id when a public /projects entry exists for this engagement */
  relatedProjectId?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string[];
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  clientProjects: ClientProject[];
}

export const experience: Experience[] = experienceData as Experience[];

// ponytail: no sorting — the JSON is already in display order. Add it if a
// second employer ever makes hand-ordering error-prone.
export function getExperience(): Experience[] {
  return experience;
}
