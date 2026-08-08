import experienceData from '@/app/experience/data/experience.json';
import projectsData from '@/app/projects/data/projects.json';
import { getSkillCategories } from '@/lib/skills';

/**
 * Cosmetic label differences between the source data files and the curated
 * skills list. Left side = label used in projects.json/experience.json,
 * right side = the canonical badge label in skills.json.
 *
 * ponytail: a plain object literal, not a fuzzy matcher. Anything that isn't
 * listed here has to exist verbatim in skills.json.
 */
const ALIASES: Record<string, string> = {
  Vue: 'Vue.js (2 & 3)',
  'Vue 3': 'Vue.js (2 & 3)',
  'Vue.js': 'Vue.js (2 & 3)',
  'Tailwind CSS': 'TailwindCSS',
  AWS: 'AWS (EC2, ECS, ECR, RDS, Lambda)',
  'AWS ECS': 'AWS (EC2, ECS, ECR, RDS, Lambda)',
};

function usedTechnologies(): Set<string> {
  const used = new Set<string>();
  const add = (technologies: string[]) =>
    technologies.forEach(tech => used.add(ALIASES[tech] ?? tech));

  projectsData.forEach(project => add(project.technologies));
  experienceData.forEach(entry => {
    add(entry.technologies);
    entry.clientProjects.forEach(client => add(client.technologies));
  });

  return used;
}

describe('skills.json stays in sync with projects/experience data', () => {
  it('lists every technology used in projects.json and experience.json', () => {
    const listed = new Set(
      getSkillCategories().flatMap(category => category.skills)
    );
    const missing = [...usedTechnologies()].filter(tech => !listed.has(tech));

    expect(missing).toEqual([]);
  });

  it('does not list the same skill in more than one category', () => {
    const all = getSkillCategories().flatMap(category => category.skills);
    const duplicates = all.filter(
      (skill, index) => all.indexOf(skill) !== index
    );

    expect(duplicates).toEqual([]);
  });
});
