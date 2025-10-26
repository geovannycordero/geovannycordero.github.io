import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Briefcase, Users } from 'lucide-react';
import type { Metadata } from 'next';
import EnhancedNavigation from '@/components/enhanced-navigation';
import Footer from '@/components/footer';
import ProjectCard from '@/components/project-card';
import { getAllProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects - Geovanny Cordero Valverde',
  description:
    'Explore my portfolio of software development projects including full-stack applications, APIs, and web solutions built with modern technologies.',
  keywords:
    'Software Projects, Full-Stack Development, Golang, Ruby on Rails, JavaScript, Vue.js, React, Portfolio, Web Development',
  openGraph: {
    title: 'Projects - Geovanny Cordero Valverde',
    description:
      'Explore my portfolio of software development projects including full-stack applications, APIs, and web solutions.',
    url: 'https://geovannycordero.com/projects',
    siteName: 'Geovanny Cordero Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Geovanny Cordero Valverde',
    description:
      'Explore my portfolio of software development projects including full-stack applications, APIs, and web solutions.',
  },
};

export const dynamic = 'force-static';

// Enhanced loading component
function ProjectsLoading() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className='animate-pulse'>
          <div className='bg-card border border-emerald-100 rounded-lg shadow-sm'>
            <div className='h-48 bg-emerald-100 rounded-t-lg'></div>
            <div className='p-6 space-y-4'>
              <div className='flex justify-between items-start'>
                <div className='h-6 w-3/4 bg-emerald-100 rounded'></div>
                <div className='h-4 w-16 bg-emerald-100 rounded'></div>
              </div>
              <div className='h-4 w-20 bg-emerald-100 rounded'></div>
              <div className='space-y-2'>
                <div className='h-4 bg-emerald-100 rounded'></div>
                <div className='h-4 bg-emerald-100 rounded'></div>
                <div className='h-4 bg-emerald-100 rounded w-2/3'></div>
              </div>
              <div className='flex gap-2'>
                <div className='h-6 w-16 bg-emerald-100 rounded'></div>
                <div className='h-6 w-20 bg-emerald-100 rounded'></div>
                <div className='h-6 w-14 bg-emerald-100 rounded'></div>
              </div>
              <div className='flex gap-4'>
                <div className='h-4 w-16 bg-emerald-100 rounded'></div>
                <div className='h-4 w-20 bg-emerald-100 rounded'></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function ProjectsContent() {
  const projects = getAllProjects();

  return (
    <>
      {/* Projects count and summary */}
      <div className='mb-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
          <p className='text-sage-700'>
            <span className='font-semibold text-emerald-700'>
              {projects.length}
            </span>{' '}
            projects showcased
          </p>
          <div className='flex items-center gap-4 text-sm text-sage-600'>
            <div className='flex items-center gap-1'>
              <Briefcase className='h-4 w-4' />
              <span>
                {projects.filter(p => p.category === 'Work').length} Work
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='h-4 w-4' />
              <span>
                {projects.filter(p => p.category === 'Outsourcing').length}{' '}
                Outsourcing
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <Code className='h-4 w-4' />
              <span>
                {projects.filter(p => p.category === 'Personal').length}{' '}
                Personal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className='text-center py-16'>
          <div className='max-w-md mx-auto'>
            <div className='w-24 h-24 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center'>
              <Code className='w-12 h-12 text-emerald-600' />
            </div>
            <h3 className='text-xl font-semibold mb-3 text-sage-900'>
              No projects found
            </h3>
            <p className='text-sage-700 mb-6'>
              There are no projects available at the moment. Check back soon for
              new additions!
            </p>
            <Link
              href='/'
              className='inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'
            >
              Return to Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default async function ProjectsPage() {
  return (
    <div className='min-h-screen bg-background'>
      <EnhancedNavigation />

      <main className='pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='max-w-7xl mx-auto'>
            {/* Header section */}
            <div className='mb-8'>
              <Link
                href='/'
                className='inline-flex items-center gap-2 text-sage-600 hover:text-emerald-600 transition-colors mb-6 group'
              >
                <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
                Back to Home
              </Link>

              <div className='text-left mb-8'>
                <h1 className='text-4xl font-bold text-sage-900 mb-4'>
                  My Projects
                </h1>
                <p className='text-lg text-sage-700'>
                  A collection of software development projects showcasing my
                  expertise in full-stack development, API design, and modern
                  web technologies.
                </p>
              </div>
            </div>

            {/* Projects content wrapper */}
            <div id='projects-content' className='scroll-mt-24'>
              <Suspense fallback={<ProjectsLoading />}>
                <ProjectsContent />
              </Suspense>
            </div>

            {/* Footer section */}
            <div className='text-center mt-16 pt-8 border-t border-emerald-100'>
              <div className='max-w-2xl mx-auto'>
                <h3 className='text-lg font-semibold mb-4 text-sage-900'>
                  Interested in Working Together?
                </h3>
                <p className='text-sage-700 mb-6'>
                  I&apos;m always excited to work on new projects and
                  collaborate with innovative teams. Let&apos;s discuss how we
                  can bring your ideas to life.
                </p>
                <Link
                  href='/#contact'
                  className='inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium'
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
