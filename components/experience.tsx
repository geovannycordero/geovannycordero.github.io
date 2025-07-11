import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  return (
    <section id='experience' className='py-20 bg-emerald-50/30'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-sage-900'>
            Work Experience
          </h2>
          <p className='text-lg text-sage-700 max-w-2xl mx-auto'>
            My professional journey showcasing growth, leadership, and technical
            excellence.
          </p>
        </div>

        <div className='max-w-4xl mx-auto'>
          <Card className='relative card-elegant'>
            <div className='absolute left-8 top-8 bottom-8 w-0.5 bg-emerald-200'></div>
            <CardHeader className='relative pl-16'>
              <div className='absolute left-6 top-8 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-md'></div>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                <CardTitle className='text-xl text-sage-900'>
                  Pernix Solutions
                </CardTitle>
                <div className='flex items-center gap-4 text-sm text-sage-600'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    <span>July 2019 - Present</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-4 w-4' />
                    <span>San José, Costa Rica</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap gap-2 mt-2'>
                <Badge
                  variant='outline'
                  className='border-emerald-300 text-emerald-700'
                >
                  Software Engineer III
                </Badge>
                <Badge
                  variant='outline'
                  className='border-emerald-300 text-emerald-700'
                >
                  Apprentice Program Supervisor
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='pl-16 space-y-4'>
              <p className='text-sage-700'>
                Progressed from Apprentice to Software Engineer III and
                Supervisor of the Apprentice Program, demonstrating exceptional
                growth and leadership capabilities.
              </p>

              <div className='space-y-3'>
                <h4 className='font-semibold text-emerald-800'>
                  Key Achievements:
                </h4>
                <ul className='space-y-2 text-sage-700'>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span>
                      Developed and maintained full-stack applications using
                      Golang, Ruby on Rails, and Vue.js
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span>
                      Led end-to-end software projects including requirement
                      gathering, estimation, development, and delivery
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span>
                      Collaborated with international teams from the US,
                      Colombia, Australia, and India
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span>
                      Managed and mentored new apprentices, supporting their
                      personal and professional development
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span>
                      Spearheaded multiple teams as Developer, Team Lead, and
                      Manager
                    </span>
                  </li>
                </ul>
              </div>

              <div className='pt-4'>
                <h4 className='font-semibold mb-2 text-emerald-800'>
                  Technologies Used:
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {[
                    'Golang',
                    'Ruby on Rails',
                    'Vue.js',
                    'JavaScript',
                    'PostgreSQL',
                    'AWS',
                    'Docker',
                    'GraphQL',
                  ].map(tech => (
                    <Badge
                      key={tech}
                      variant='secondary'
                      className='text-xs bg-emerald-100 text-emerald-700'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
