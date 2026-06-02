import { Button } from '@/components/ui/button';
import { MapPin, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className='min-h-screen flex items-center justify-center bg-background pt-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sage-900 dark:text-slate-100'>
                Geovanny
                <span className='block text-emerald-600 dark:bg-gradient-to-r dark:from-emerald-400 dark:to-cyan-400 dark:bg-clip-text dark:text-transparent'>
                  Cordero
                </span>
              </h1>
              <p className='text-xl sm:text-2xl text-emerald-700 dark:text-emerald-400 font-medium'>
                Full-Stack Software Engineer
              </p>
              <div className='flex items-center gap-2 text-sage-600 dark:text-slate-400'>
                <MapPin className='h-4 w-4' />
                <span>San José, Costa Rica</span>
              </div>
            </div>

            <p className='text-lg text-sage-700 dark:text-slate-300 leading-relaxed'>
              Passionate Full-Stack Software Engineer with 5+ years of
              experience, specializing in Golang, Ruby on Rails, and JavaScript
              technologies. Proven expertise in leading teams and delivering
              high-quality software solutions.
            </p>

            <div className='flex flex-wrap gap-4'>
              <Button
                asChild
                size='lg'
                className='bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white shadow-lg dark:shadow-emerald-500/20 hover:shadow-xl dark:hover:shadow-emerald-500/40 transition-all duration-300'
              >
                <Link href='/#contact'>Get In Touch</Link>
              </Button>
              <Button
                variant='outline'
                size='lg'
                asChild
                className='border-emerald-600 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300'
              >
                <Link href='/#about'>Learn More</Link>
              </Button>
            </div>

            <div className='flex flex-wrap gap-6 pt-4'>
              <Link
                href='mailto:geovanny@pm.me'
                className='flex items-center gap-2 text-sage-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200'
              >
                <Mail className='h-4 w-4' />
                <span className='hidden sm:inline'>geovanny@pm.me</span>
              </Link>
              <Link
                href='https://linkedin.com/in/geovannycordero'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-sage-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200'
              >
                <Linkedin className='h-4 w-4' />
                <span className='hidden sm:inline'>LinkedIn</span>
              </Link>
              <Link
                href='https://github.com/geovannycordero'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-sage-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200'
                aria-label='Visit GitHub profile'
              >
                <Github className='h-4 w-4' />
                <span className='hidden sm:inline'>GitHub</span>
              </Link>
              <Link
                href='https://x.com/gehovah'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-sage-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200'
                aria-label='Visit X profile'
              >
                <svg
                  className='h-4 w-4'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </Link>
            </div>
          </div>

          <div className='flex justify-center lg:justify-end'>
            <div className='relative'>
              <div className='w-80 h-80 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/10 flex items-center justify-center overflow-hidden shadow-2xl dark:shadow-emerald-500/10 hover-lift'>
                <Image
                  src='/images/me-forest.jpg'
                  alt='Geovanny Cordero Valverde on a forest bridge'
                  width={320}
                  height={320}
                  className='rounded-2xl object-cover w-full h-full'
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-emerald-200 dark:bg-emerald-500 rounded-full opacity-60 dark:opacity-20 blur-xl'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-300 dark:bg-emerald-600 rounded-full opacity-40 dark:opacity-15 blur-xl'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
