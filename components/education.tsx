import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, GraduationCap, Award, ExternalLink } from 'lucide-react';

export default function Education() {
  const education = [
    {
      degree: 'MBA in Project Management',
      institution: 'Universidad Estatal a Distancia (UNED)',
      period: 'In Progress',
      status: 'current',
    },
    {
      degree: 'Bachelor in Computer Science',
      institution: 'Universidad de Costa Rica (UCR)',
      period: '2019',
      status: 'completed',
    },
  ];

  const certifications = [
    {
      title: 'Gerencia con Liderazgo',
      institution: 'INCAE Business School',
      year: '2020',
      url: 'https://www.credential.net/bacae4cc-2a7c-4cda-9d4f-feac8c5f1500',
    },
    {
      title: 'Introduction to Data Analytics for Business',
      institution: 'University of Colorado Boulder, Coursera',
      year: '2020',
      url: 'https://coursera.org/share/4af8428f026c178ae5d826b5bc4b4e6c',
    },
    {
      title: 'Crisis Management',
      institution: 'INCAE Business School',
      year: '2022',
      url: 'https://www.credential.net/c4d5b5b2-3179-45c2-bd8a-b1fe3b2b6918',
    },
    {
      title: 'Introduction to Big Data',
      institution: 'University of California San Diego, Coursera',
      year: '2021',
      url: 'https://coursera.org/share/e2da619b7d37207e620e9dd1a3aa5552',
    },
    {
      title: 'Desarrollo de Habilidades Blandas',
      institution: 'UNED',
      year: '2023',
    },
    {
      title: 'Claude 101',
      institution: 'Anthropic Education',
      year: '2026',
      url: 'https://verify.skilljar.com/c/swr37jiqyx99',
    },
    {
      title: 'Claude Code 101',
      institution: 'Anthropic Education',
      year: '2026',
      url: 'https://verify.skilljar.com/c/x94svf5rz4h2',
    },
    {
      title: 'Claude Code in Action',
      institution: 'Anthropic Education',
      year: '2026',
      url: 'https://verify.skilljar.com/c/dvyh735ucjte',
    },
  ];

  return (
    <section id='education' className='py-20 bg-white dark:bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-sage-900 dark:text-slate-100'>
            Education & Certifications
          </h2>
          <p className='text-lg text-sage-700 dark:text-slate-300 max-w-2xl mx-auto'>
            Continuous learning and professional development through formal
            education and specialized certifications.
          </p>
        </div>

        <div className='max-w-4xl mx-auto space-y-8'>
          {/* Education */}
          <div>
            <h3 className='text-2xl font-semibold mb-6 flex items-center gap-2 text-emerald-800 dark:text-emerald-400'>
              <GraduationCap className='h-6 w-6 text-emerald-600 dark:text-emerald-400' />
              Education
            </h3>
            <div className='space-y-4'>
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className='card-elegant hover-lift glow-accent'
                >
                  <CardHeader>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                      <CardTitle className='text-lg text-sage-900 dark:text-slate-100'>
                        {edu.degree}
                      </CardTitle>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant={
                            edu.status === 'current' ? 'default' : 'secondary'
                          }
                          className={
                            edu.status === 'current'
                              ? 'bg-amber-600 text-white'
                              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          }
                        >
                          {edu.status === 'current'
                            ? 'In Progress'
                            : 'Completed'}
                        </Badge>
                        <div className='flex items-center gap-1 text-sm text-sage-600 dark:text-slate-400'>
                          <Calendar className='h-4 w-4' />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sage-700 dark:text-slate-300'>
                      {edu.institution}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className='text-2xl font-semibold mb-6 flex items-center gap-2 text-emerald-800 dark:text-emerald-400'>
              <Award className='h-6 w-6 text-emerald-600 dark:text-emerald-400' />
              Certifications
            </h3>
            <div className='grid md:grid-cols-2 gap-4'>
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className='card-elegant hover-lift glow-accent'
                >
                  <CardHeader>
                    <CardTitle className='text-base text-sage-900 dark:text-slate-100'>
                      {cert.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-sage-700 dark:text-slate-300 mb-2'>
                      {cert.institution}
                    </p>
                    <div className='flex items-center gap-3'>
                      <Badge
                        variant='outline'
                        className='text-xs border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400'
                      >
                        {cert.year}
                      </Badge>
                      {cert.url && (
                        <Link
                          href={cert.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-1 text-sage-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-xs font-medium'
                          aria-label={`Verify ${cert.title} certificate`}
                        >
                          <ExternalLink className='h-3.5 w-3.5' />
                          <span>Verify</span>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
