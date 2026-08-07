import SectionHead from '@/components/section-head';
import { getSkillCategories } from '@/lib/skills';

export default function Skills() {
  const skillCategories = getSkillCategories();

  return (
    <SectionHead index='03' label='Skills' id='skills'>
      <div
        data-testid='skills-columns'
        className='columns-1 gap-12 font-sans md:columns-2'
      >
        {skillCategories.map(category => (
          <div key={category.title} className='mb-7 break-inside-avoid'>
            <h4 className='mb-2 text-sm uppercase tracking-wider text-accent-brand'>
              {category.title}
            </h4>
            <p className='text-sm text-ink-muted'>
              {category.skills.map((skill, index) => (
                <span key={skill}>
                  {index > 0 && ', '}
                  <span>{skill}</span>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </SectionHead>
  );
}
