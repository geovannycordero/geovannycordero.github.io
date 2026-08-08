import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import RSSLink from '@/components/rss-link';
import BlogPostCard from '@/components/blog-post-card';
import { getAllPosts } from '@/lib/blog';
import BackToTopButton from '@/components/BackToTopButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Just the segment name — the root layout's title.template appends
  // "- Geovanny Cordero Valverde" automatically. OpenGraph/Twitter titles
  // below aren't templated, so they keep the full form intentionally.
  title: 'Blog',
  description:
    'Insights, articles, and updates on software development, technology, and leadership from Geovanny Cordero Valverde.',
  keywords:
    'Software Development, Technology, Leadership, Programming, Full-Stack Development, Golang, Ruby on Rails, JavaScript, Team Management',
  authors: [{ name: 'Geovanny Cordero Valverde' }],
  creator: 'Geovanny Cordero Valverde',
  publisher: 'Geovanny Cordero Valverde',
  openGraph: {
    title: 'Blog - Geovanny Cordero Valverde',
    description:
      'Insights, articles, and updates on software development, technology, and leadership from Geovanny Cordero Valverde.',
    url: 'https://geovannycordero.com/blog',
    siteName: 'Geovanny Cordero Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Geovanny Cordero Valverde',
    description:
      'Insights, articles, and updates on software development, technology, and leadership from Geovanny Cordero Valverde.',
  },
  alternates: {
    canonical: 'https://geovannycordero.com/blog',
    types: {
      'application/rss+xml': 'https://geovannycordero.com/rss.xml',
    },
  },
};

export const dynamic = 'force-static';

// Enhanced loading component
function BlogLoading() {
  return (
    <div className='space-y-8'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='animate-pulse'>
          <div className='bg-card border border-line dark:border-line/20 rounded-lg p-6 shadow-sm'>
            <div className='flex gap-2 mb-4'>
              <div className='h-6 w-16 bg-accent-soft rounded'></div>
              <div className='h-6 w-20 bg-accent-soft rounded'></div>
              <div className='h-6 w-24 bg-accent-soft rounded'></div>
            </div>
            <div className='h-8 bg-accent-soft rounded mb-4'></div>
            <div className='flex gap-4 mb-4'>
              <div className='h-4 w-32 bg-accent-soft rounded'></div>
              <div className='h-4 w-20 bg-accent-soft rounded'></div>
            </div>
            <div className='space-y-2 mb-4'>
              <div className='h-4 bg-accent-soft rounded'></div>
              <div className='h-4 bg-accent-soft rounded'></div>
              <div className='h-4 bg-accent-soft rounded w-3/4'></div>
            </div>
            <div className='h-4 w-24 bg-accent-soft rounded'></div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function BlogContent() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Blog posts count and summary */}
      <div className='mb-8 p-4 bg-accent-soft rounded-lg border border-line dark:border-line/20'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
          <p className='text-ink-muted'>
            <span className='font-semibold text-accent-brand'>
              {posts.length}
            </span>{' '}
            articles available
          </p>
          <p className='text-sm text-ink-muted'>
            Latest:{' '}
            {posts.length > 0
              ? new Date(posts[0].date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'No posts yet'}
          </p>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className='space-y-8'>
        {posts.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className='text-center py-16'>
          <div className='max-w-md mx-auto'>
            <div className='w-24 h-24 mx-auto mb-6 bg-accent-soft rounded-full flex items-center justify-center'>
              <svg
                className='w-12 h-12 text-accent-brand'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <h2 className='text-xl font-semibold mb-3 text-ink'>
              No posts found
            </h2>
            <p className='text-ink-muted mb-6'>
              There are no blog posts available at the moment. Check back soon
              for new content!
            </p>
            <Link
              href='/'
              className='inline-flex items-center px-4 py-2 bg-ink text-paper rounded-sm hover:opacity-80 transition-opacity dark:bg-accent-brand'
            >
              Return to Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default async function BlogPage() {
  return (
    <div className='min-h-screen bg-paper'>
      <Navigation />

      <main id='main' className='pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='max-w-4xl mx-auto'>
            {/* Header section */}
            <div className='mb-8'>
              <Link
                href='/'
                className='inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors mb-6 group'
              >
                <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
                Back to Home
              </Link>

              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4'>
                <div>
                  <h1 className='font-serif text-4xl font-normal text-ink mb-2'>
                    Blog
                  </h1>
                  <p className='text-lg text-ink-muted'>
                    Insights, articles, and updates on software development,
                    technology, and leadership.
                  </p>
                </div>
                <div className='flex flex-col sm:items-end gap-2'>
                  <RSSLink />
                  <p className='text-sm text-ink-muted'>
                    Subscribe for updates
                  </p>
                </div>
              </div>
            </div>

            {/* Blog content wrapper with scroll target */}
            <div id='blog-content' className='scroll-mt-24'>
              <Suspense fallback={<BlogLoading />}>
                <BlogContent />
              </Suspense>
            </div>

            <div className='mt-8 text-center'>
              <BackToTopButton />
            </div>

            {/* Footer section */}
            <div className='text-center mt-16 pt-8 border-t border-line dark:border-line/20'>
              <div className='max-w-2xl mx-auto'>
                <h2 className='text-lg font-semibold mb-4 text-ink'>
                  Stay Connected
                </h2>
                <p className='text-ink-muted mb-6'>
                  More articles coming soon! Follow me on{' '}
                  <Link
                    href='https://linkedin.com/in/geovannycordero'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-accent-brand hover:underline font-medium'
                  >
                    LinkedIn
                  </Link>{' '}
                  for updates and insights.
                </p>
                <div className='grid sm:grid-cols-3 gap-4 text-sm font-mono'>
                  <div className='flex items-center justify-center gap-2 p-3 bg-accent-soft rounded-lg text-ink-muted'>
                    RSS Feed Available
                  </div>
                  <div className='flex items-center justify-center gap-2 p-3 bg-accent-soft rounded-lg text-ink-muted'>
                    Updated Regularly
                  </div>
                  <div className='flex items-center justify-center gap-2 p-3 bg-accent-soft rounded-lg text-ink-muted'>
                    Tech Insights
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
