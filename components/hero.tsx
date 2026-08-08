import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import TerminalCard from '@/components/terminal-card';

const META_LINKS = [
  {
    href: 'mailto:geovanny@pm.me',
    label: 'geovanny@pm.me',
    icon: Mail,
    external: false,
  },
  {
    href: 'https://linkedin.com/in/geovannycordero',
    label: 'LinkedIn',
    icon: Linkedin,
    external: true,
  },
  {
    href: 'https://github.com/geovannycordero',
    label: 'GitHub',
    icon: Github,
    external: true,
  },
];

export default function Hero() {
  return (
    <section className='border-b border-line bg-paper pb-20 pt-32 dark:border-line/20 dark:bg-paper'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <div>
            <p
              data-testid='hero-eyebrow'
              className='mb-5 font-mono text-sm text-accent-brand'
            >
              Full-Stack Software Engineer · San José, Costa Rica
            </p>

            <h1 className='text-balance font-serif text-4xl font-normal leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl'>
              I build{' '}
              <span className='border-b-2 border-accent-brand text-accent-brand underline decoration-accent-brand decoration-2 underline-offset-4'>
                production systems
              </span>
              <br />
              and the sites that sell them.
            </h1>

            <p className='mt-8 max-w-[56ch] text-lg text-ink-muted'>
              Five years shipping Go and Ruby on Rails at Pernix Solutions, plus
              four freelance builds that turned into booked clients. Currently
              mentoring the next apprentice cohort.
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-6'>
              <Link
                href='/#contact'
                className='inline-block rounded-sm bg-ink px-6 py-3 text-sm text-paper transition-opacity hover:opacity-80 dark:bg-accent-brand dark:text-paper'
              >
                Get in touch
              </Link>
              <a
                href='/resume/geovanny-cordero-cv.pdf'
                download
                className='text-sm text-ink-muted underline decoration-accent-brand underline-offset-4'
              >
                Download résumé
              </a>
            </div>

            <div className='mt-10 flex flex-wrap gap-6 font-mono text-xs text-ink-muted'>
              {META_LINKS.map(({ href, label, icon: Icon, external }) => (
                <Link
                  key={href}
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className='flex items-center gap-2 transition-colors hover:text-accent-brand'
                >
                  <Icon className='h-4 w-4' aria-hidden='true' />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div
            data-testid='terminal-card-wrapper'
            aria-hidden='true'
            className='hidden lg:block'
          >
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
}
