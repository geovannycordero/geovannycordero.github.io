import Link from 'next/link';
import { Calendar, ChevronRight, MapPin } from 'lucide-react';
import SectionHead from '@/components/section-head';
import { getExperience } from '@/lib/experience';
import { TECH_CHIP_CLASSES } from '@/lib/utils';

export default function Experience() {
  const experiences = getExperience();

  return (
    <SectionHead index='04' label='Experience' id='experience'>
      <div className='mx-auto max-w-4xl'>
        <div className='grid gap-px border border-line bg-line dark:border-line/20 dark:bg-line/20'>
          {experiences.map(job => (
            <div key={job.id} className='bg-surface p-8'>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <h3 className='text-xl font-semibold leading-none tracking-tight text-ink'>
                  {job.company}
                </h3>
                <div className='flex items-center gap-4 text-sm text-ink-muted'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    <span>{job.period}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-4 w-4' />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <div className='mt-2 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted'>
                {job.role.map((role, index) => (
                  <span key={role} className='flex items-center gap-2'>
                    {index > 0 && <span aria-hidden='true'>·</span>}
                    <span>{role}</span>
                  </span>
                ))}
              </div>

              <div className='mt-4 space-y-4'>
                <p className='text-ink-muted'>{job.summary}</p>

                <div className='space-y-3'>
                  <h4 className='font-semibold text-accent-brand'>
                    Key Achievements:
                  </h4>
                  <ul className='space-y-2 text-ink-muted'>
                    {job.achievements.map(achievement => (
                      <li key={achievement} className='flex items-start gap-2'>
                        <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-line dark:bg-line/40'></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='pt-4'>
                  <h4 className='mb-2 font-semibold text-accent-brand'>
                    Technologies Used:
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {job.technologies.map(tech => (
                      <span key={tech} className={TECH_CHIP_CLASSES}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {job.clientProjects.length > 0 && (
                  <div className='space-y-1 pt-6'>
                    <h4 className='font-semibold text-accent-brand'>
                      Client Engagements:
                    </h4>
                    <p className='pb-2 text-xs text-ink-muted'>
                      Details generalized for client confidentiality.
                    </p>

                    <div className='divide-y divide-line dark:divide-line/20'>
                      {job.clientProjects.map(project => (
                        // Native <details> — free keyboard support and
                        // expand state, no accordion dependency. A plain
                        // row in this hairline-divided list, not a second
                        // boxed card nested inside the employer's own
                        // flat block.
                        <details key={project.id} className='group py-4'>
                          <summary className='cursor-pointer list-none [&::-webkit-details-marker]:hidden'>
                            <div className='flex items-baseline justify-between gap-4'>
                              <span className='flex items-center gap-1.5 font-semibold text-ink'>
                                <ChevronRight
                                  aria-hidden='true'
                                  className='h-3.5 w-3.5 flex-shrink-0 text-ink-muted transition-transform group-open:rotate-90'
                                />
                                {project.name}
                              </span>
                              <span className='shrink-0 font-mono text-xs text-ink-muted'>
                                {project.period}
                              </span>
                            </div>
                            <p className='mt-1 text-sm text-ink-muted'>
                              {project.impactSummary}
                            </p>
                            <div className='mt-2 flex flex-wrap gap-2'>
                              {project.technologies.map(tech => (
                                <span key={tech} className={TECH_CHIP_CLASSES}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </summary>

                          <ul className='mt-3 space-y-1.5 pl-5 text-sm text-ink-muted'>
                            {project.highlights.map(highlight => (
                              <li
                                key={highlight}
                                className='flex items-start gap-2'
                              >
                                <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-line dark:bg-line/40'></span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          {project.relatedProjectId && (
                            <Link
                              href={`/projects#${project.relatedProjectId}`}
                              className='mt-2 inline-block text-xs font-medium text-accent-brand hover:underline'
                            >
                              View full project →
                            </Link>
                          )}
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionHead>
  );
}
