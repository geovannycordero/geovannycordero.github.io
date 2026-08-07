import skillsData from '@/app/skills/data/skills.json';

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = skillsData as SkillCategory[];

// ponytail: no sorting or filtering — the JSON is already in display order.
export function getSkillCategories(): SkillCategory[] {
  return skillCategories;
}
