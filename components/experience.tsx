import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, MapPin } from 'lucide-react';
import { getExperience } from '@/lib/experience';

export default function Experience() {
  const experiences = getExperience();

  return (
    <section
      id='experience'
      className='py-20 bg-emerald-50/30 dark:bg-[#0f1a16]'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-sage-900 dark:text-slate-100'>
            Work Experience
          </h2>
          <p className='text-lg text-sage-700 dark:text-slate-300 max-w-2xl mx-auto'>
            My professional journey showcasing growth, leadership, and technical
            excellence.
          </p>
        </div>

        <div className='max-w-4xl mx-auto space-y-8'>
          {experiences.map(job => (
            <Card key={job.id} className='relative card-elegant glow-accent'>
              <div className='absolute left-8 top-8 bottom-8 w-0.5 bg-emerald-200 dark:bg-emerald-800'></div>
              <CardHeader className='relative pl-16'>
                <div className='absolute left-6 top-8 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-[#0f1a16] shadow-md'></div>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                  <CardTitle className='text-xl text-sage-900 dark:text-slate-100'>
                    {job.company}
                  </CardTitle>
                  <div className='flex items-center gap-4 text-sm text-sage-600 dark:text-slate-400'>
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
                <div className='flex flex-wrap gap-2 mt-2'>
                  {job.role.map(role => (
                    <Badge
                      key={role}
                      variant='outline'
                      className='border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400'
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className='pl-16 space-y-4'>
                <p className='text-sage-700 dark:text-slate-300'>
                  {job.summary}
                </p>

                <div className='space-y-3'>
                  <h4 className='font-semibold text-emerald-800 dark:text-emerald-400'>
                    Key Achievements:
                  </h4>
                  <ul className='space-y-2 text-sage-700 dark:text-slate-300'>
                    {job.achievements.map(achievement => (
                      <li key={achievement} className='flex items-start gap-2'>
                        <span className='w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full mt-2 flex-shrink-0'></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='pt-4'>
                  <h4 className='font-semibold mb-2 text-emerald-800 dark:text-emerald-400'>
                    Technologies Used:
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {job.technologies.map(tech => (
                      <Badge
                        key={tech}
                        variant='secondary'
                        className='text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {job.clientProjects.length > 0 && (
                  <div className='pt-6 space-y-3'>
                    <h4 className='font-semibold text-emerald-800 dark:text-emerald-400'>
                      Client Engagements:
                    </h4>
                    <p className='text-xs text-sage-600 dark:text-slate-400'>
                      Details generalized for client confidentiality.
                    </p>

                    {job.clientProjects.map(project => (
                      // ponytail: native <details> — free keyboard support and
                      // expand state, no accordion dependency.
                      <details
                        key={project.id}
                        className='group rounded-lg border border-emerald-200 dark:border-emerald-800 p-4'
                      >
                        <summary className='cursor-pointer list-none [&::-webkit-details-marker]:hidden'>
                          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                            <span className='flex items-center gap-1 font-medium text-emerald-800 dark:text-emerald-400'>
                              <ChevronRight
                                aria-hidden='true'
                                className='h-4 w-4 flex-shrink-0 transition-transform group-open:rotate-90'
                              />
                              {project.name}
                            </span>
                            <span className='text-sm text-sage-600 dark:text-slate-400'>
                              {project.period}
                            </span>
                          </div>
                          <p className='mt-1 text-sage-700 dark:text-slate-300'>
                            {project.impactSummary}
                          </p>
                          <div className='flex flex-wrap gap-2 mt-2'>
                            {project.technologies.map(tech => (
                              <Badge
                                key={tech}
                                variant='secondary'
                                className='text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </summary>

                        <ul className='mt-3 space-y-2 text-sage-700 dark:text-slate-300'>
                          {project.highlights.map(highlight => (
                            <li
                              key={highlight}
                              className='flex items-start gap-2'
                            >
                              <span className='w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full mt-2 flex-shrink-0'></span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        {project.relatedProjectId && (
                          <Link
                            href={`/projects#${project.relatedProjectId}`}
                            className='inline-block mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline'
                          >
                            View full project →
                          </Link>
                        )}
                      </details>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
