import Link from 'next/link';
import { ExternalLink, Trophy } from 'lucide-react';
import SectionHead from '@/components/section-head';

const EDUCATION = [
  {
    degree: 'MBA in Project Management',
    institution: 'Universidad Estatal a Distancia (UNED)',
    period: 'In Progress',
  },
  {
    degree: 'Bachelor in Computer Science',
    institution: 'Universidad de Costa Rica (UCR)',
    period: '2019',
  },
];

const CERTIFICATIONS = [
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

export default function Credentials() {
  return (
    <SectionHead index='05' label='Credentials' id='credentials'>
      <div className='space-y-10'>
        <div>
          <p className='mb-4 font-mono text-xs uppercase tracking-wider text-accent-brand'>
            Education
          </p>
          <div className='space-y-4'>
            {EDUCATION.map(edu => (
              <div
                key={edu.degree}
                className='border-b border-line pb-4 last:border-b-0 dark:border-line/20'
              >
                <div className='flex flex-wrap items-baseline justify-between gap-2'>
                  <h3 className='font-semibold text-ink'>{edu.degree}</h3>
                  <span className='text-sm text-ink-muted'>{edu.period}</span>
                </div>
                <p className='text-sm text-ink-muted'>{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className='mb-4 font-mono text-xs uppercase tracking-wider text-accent-brand'>
            Certifications
          </p>
          <div className='grid gap-4 md:grid-cols-2'>
            {CERTIFICATIONS.map(cert => (
              <div
                key={cert.title}
                className='border-l-2 border-line pl-4 dark:border-line/20'
              >
                <h3 className='text-sm font-semibold text-ink'>{cert.title}</h3>
                <p className='text-sm text-ink-muted'>{cert.institution}</p>
                <div className='mt-1 flex items-center gap-3'>
                  <span className='font-mono text-xs text-ink-muted'>
                    {cert.year}
                  </span>
                  {cert.url && (
                    <Link
                      href={cert.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Verify ${cert.title} certificate`}
                      className='inline-flex items-center gap-1 text-xs font-medium text-accent-brand hover:underline'
                    >
                      <ExternalLink className='h-3.5 w-3.5' />
                      <span>Verify</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className='mb-4 font-mono text-xs uppercase tracking-wider text-accent-brand'>
            Award
          </p>
          <div className='flex items-start gap-4 border-l-2 border-accent-brand pl-4'>
            <Trophy
              className='mt-1 h-6 w-6 flex-shrink-0 text-accent-brand'
              aria-hidden='true'
            />
            <div>
              <h3 className='font-semibold text-ink'>
                2020 Programathon Competition Winner
              </h3>
              <p className='text-sm text-ink-muted'>
                Winner of Costa Rica&apos;s most prestigious programming
                competition, sponsored by Fiserv.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionHead>
  );
}
