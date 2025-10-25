import Link from 'next/link';
import { Mail, Linkedin, Github } from 'lucide-react';
import RSSLink from './rss-link';

export default function Footer() {
  return (
    <footer className='bg-emerald-50/50 border-t border-emerald-100'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4 text-sage-900'>
              Geovanny Cordero Valverde
            </h3>
            <p className='text-sage-700 mb-4'>
              Full-Stack Software Engineer passionate about creating innovative
              solutions and leading high-performing development teams.
            </p>
            <div className='flex gap-4'>
              <Link
                href='mailto:geovanny@pm.me'
                className='text-sage-600 hover:text-emerald-600 transition-colors'
              >
                <Mail className='h-5 w-5' />
              </Link>
              <Link
                href='https://linkedin.com/in/geovannycordero'
                target='_blank'
                className='text-sage-600 hover:text-emerald-600 transition-colors'
              >
                <Linkedin className='h-5 w-5' />
              </Link>
              <Link
                href='https://github.com/geovannycordero'
                target='_blank'
                className='text-sage-600 hover:text-emerald-600 transition-colors'
              >
                <Github className='h-5 w-5' />
              </Link>
              <Link
                href='https://x.com/gehovah'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sage-600 hover:text-emerald-600 transition-colors'
                aria-label='Visit X profile'
              >
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-4 text-emerald-800'>Quick Links</h4>
            <nav className='space-y-2'>
              <Link
                href='/#about'
                className='block text-sage-600 hover:text-emerald-600 transition-colors'
              >
                About
              </Link>
              <Link
                href='/#skills'
                className='block text-sage-600 hover:text-emerald-600 transition-colors'
              >
                Skills
              </Link>
              <Link
                href='/#experience'
                className='block text-sage-600 hover:text-emerald-600 transition-colors'
              >
                Experience
              </Link>
              <Link
                href='/#education'
                className='block text-sage-600 hover:text-emerald-600 transition-colors'
              >
                Education
              </Link>
              <Link
                href='/#contact'
                className='block text-sage-600 hover:text-emerald-600 transition-colors'
              >
                Contact
              </Link>
              <Link
                href='/projects'
                className='block text-sage-600 hover:text-emerald-600 transition-colors'
              >
                Projects
              </Link>
              <div className='pt-2'>
                <RSSLink />
              </div>
            </nav>
          </div>

          <div>
            <h4 className='font-semibold mb-4 text-emerald-800'>Services</h4>
            <ul className='space-y-2 text-sage-600'>
              <li>Full-Stack Development</li>
              <li>Team Leadership</li>
              <li>Project Management</li>
              <li>Technical Consulting</li>
              <li>Code Review & Mentoring</li>
            </ul>
          </div>
        </div>

        <div className='border-t border-emerald-100 mt-8 pt-8 text-center text-sage-600'>
          <p>
            &copy; {new Date().getFullYear()} Geovanny Cordero Valverde. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
