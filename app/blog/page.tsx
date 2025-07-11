import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EnhancedNavigation from '@/components/enhanced-navigation';
import Footer from '@/components/footer';
import RSSLink from '@/components/rss-link';
import BlogPostCard from '@/components/blog-post-card';
import BlogAutoScroll from '@/components/blog-auto-scroll';
import BlogNavigationHandler from '@/components/blog-navigation-handler';
import { getAllPosts } from '@/lib/blog';
import BackToTopButton from './BackToTopButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Geovanny Cordero Valverde',
  description:
    'Insights, articles, and updates on software development, technology, and leadership from Geovanny Cordero Valverde.',
};

export const dynamic = 'force-static';

// Enhanced loading component
function BlogLoading() {
  return (
    <div className='space-y-8'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='animate-pulse'>
          <div className='bg-card border border-emerald-100 rounded-lg p-6 shadow-sm'>
            <div className='flex gap-2 mb-4'>
              <div className='h-6 w-16 bg-emerald-100 rounded'></div>
              <div className='h-6 w-20 bg-emerald-100 rounded'></div>
              <div className='h-6 w-24 bg-emerald-100 rounded'></div>
            </div>
            <div className='h-8 bg-emerald-100 rounded mb-4'></div>
            <div className='flex gap-4 mb-4'>
              <div className='h-4 w-32 bg-emerald-100 rounded'></div>
              <div className='h-4 w-20 bg-emerald-100 rounded'></div>
            </div>
            <div className='space-y-2 mb-4'>
              <div className='h-4 bg-emerald-100 rounded'></div>
              <div className='h-4 bg-emerald-100 rounded'></div>
              <div className='h-4 bg-emerald-100 rounded w-3/4'></div>
            </div>
            <div className='h-4 w-24 bg-emerald-100 rounded'></div>
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
      <div className='mb-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
          <p className='text-sage-700'>
            <span className='font-semibold text-emerald-700'>
              {posts.length}
            </span>{' '}
            articles available
          </p>
          <p className='text-sm text-sage-600'>
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
            <div className='w-24 h-24 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-12 h-12 text-emerald-600'
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
            <h3 className='text-xl font-semibold mb-3 text-sage-900'>
              No posts found
            </h3>
            <p className='text-sage-700 mb-6'>
              There are no blog posts available at the moment. Check back soon
              for new content!
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

export default async function BlogPage() {
  return (
    <div className='min-h-screen bg-background'>
      <EnhancedNavigation />

      {/* Auto-scroll mechanism */}
      <BlogAutoScroll
        scrollTargetId='blog-content'
        headerOffset={100}
        scrollBehavior='smooth'
        enableDebugLogs={false}
      />

      {/* Navigation handler for programmatic navigation */}
      <BlogNavigationHandler
        scrollTargetId='blog-content'
        headerOffset={100}
        enableDebugLogs={false}
      />

      <main className='pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='max-w-4xl mx-auto'>
            {/* Header section */}
            <div className='mb-8'>
              <Link
                href='/'
                className='inline-flex items-center gap-2 text-sage-600 hover:text-emerald-600 transition-colors mb-6 group'
              >
                <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
                Back to Home
              </Link>

              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4'>
                <div>
                  <h1 className='text-4xl font-bold text-sage-900 mb-2'>
                    Blog
                  </h1>
                  <p className='text-lg text-sage-700'>
                    Insights, articles, and updates on software development,
                    technology, and leadership.
                  </p>
                </div>
                <div className='flex flex-col sm:items-end gap-2'>
                  <RSSLink />
                  <p className='text-sm text-sage-600'>Subscribe for updates</p>
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
            <div className='text-center mt-16 pt-8 border-t border-emerald-100'>
              <div className='max-w-2xl mx-auto'>
                <h3 className='text-lg font-semibold mb-4 text-sage-900'>
                  Stay Connected
                </h3>
                <p className='text-sage-700 mb-6'>
                  More articles coming soon! Follow me on{' '}
                  <Link
                    href='https://linkedin.com/in/geovannycordero'
                    target='_blank'
                    className='text-emerald-600 hover:text-emerald-700 underline font-medium'
                  >
                    LinkedIn
                  </Link>{' '}
                  for updates and insights.
                </p>
                <div className='grid sm:grid-cols-3 gap-4 text-sm'>
                  <div className='flex items-center justify-center gap-2 p-3 bg-emerald-50 rounded-lg'>
                    <span className='text-emerald-600'>📧</span>
                    <span className='text-sage-700'>RSS Feed Available</span>
                  </div>
                  <div className='flex items-center justify-center gap-2 p-3 bg-emerald-50 rounded-lg'>
                    <span className='text-emerald-600'>🔄</span>
                    <span className='text-sage-700'>Updated Regularly</span>
                  </div>
                  <div className='flex items-center justify-center gap-2 p-3 bg-emerald-50 rounded-lg'>
                    <span className='text-emerald-600'>💡</span>
                    <span className='text-sage-700'>Tech Insights</span>
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
