import Link from 'next/link';
import SectionHead from '@/components/section-head';
import { getCaseStudies } from '@/lib/projects';
import { TECH_CHIP_CLASSES } from '@/lib/utils';

export default function CaseStudies() {
  const caseStudies = getCaseStudies();

  return (
    <SectionHead index='01' label='Case Studies' id='work'>
      <div className='grid gap-px border border-line bg-line dark:border-line/20 dark:bg-line/20'>
        {caseStudies.map(project => (
          <div
            key={project.id}
            className='grid gap-8 bg-surface p-8 md:grid-cols-[1fr_2fr]'
          >
            <div>
              <p className='mb-2 font-mono text-xs uppercase tracking-wider text-accent-brand'>
                {project.category}
              </p>
              <h3 className='text-xl font-bold text-ink'>{project.title}</h3>
              <div className='mt-3 flex flex-wrap gap-2'>
                {project.technologies.map(tech => (
                  <span key={tech} className={TECH_CHIP_CLASSES}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className='mb-3 text-ink-muted'>{project.description}</p>
              {project.outcome && (
                <p className='mb-3 text-sm font-medium text-accent-brand'>
                  {project.outcome}
                </p>
              )}
              {project.projectUrl && (
                <Link
                  href={project.projectUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`View live site: ${project.title}`}
                  className='text-sm text-accent-brand underline decoration-accent-brand underline-offset-4'
                >
                  View live site →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionHead>
  );
}
