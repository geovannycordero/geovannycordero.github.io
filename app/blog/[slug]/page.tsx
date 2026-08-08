import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import BackToTopButton from '@/components/BackToTopButton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    // Just "Post Not Found" — the root layout's title.template appends
    // "- Geovanny Cordero Valverde" automatically.
    return {
      title: 'Post Not Found',
    };
  }

  const postUrl = `https://geovannycordero.com/blog/${slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.date).toISOString(); // Posts are published once and not modified

  return {
    // Just the post title — the root layout's title.template appends
    // "- Geovanny Cordero Valverde" automatically.
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'Geovanny Cordero Valverde',
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Geovanny Cordero Portfolio',
      locale: 'en_US',
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://geovannycordero.com/blog/${slug}`;
  const publishedTime = new Date(post.date).toISOString();

  return (
    <div className='min-h-screen bg-paper'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: publishedTime,
            dateModified: publishedTime,
            url: postUrl,
            image: `${postUrl}/opengraph-image`,
            keywords: post.tags.join(', '),
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Person',
              name: 'Geovanny Cordero Valverde',
            },
          }),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://geovannycordero.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://geovannycordero.com/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: postUrl,
              },
            ],
          }),
        }}
      />
      <Navigation />

      <main className='pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='max-w-4xl mx-auto'>
            <Link
              href='/blog'
              className='inline-flex items-center gap-2 text-ink-muted hover:text-accent-brand transition-colors mb-8'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to Blog
            </Link>

            <article>
              <header className='mb-8'>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {post.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant='secondary'
                      className='text-xs bg-accent-soft text-accent-brand'
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className='font-serif text-4xl font-normal text-ink mb-4'>
                  {post.title}
                </h1>

                <div className='flex flex-wrap items-center gap-6 text-sm text-ink-muted mb-6'>
                  <div className='flex items-center gap-2'>
                    <User className='h-4 w-4' />
                    <span>{post.author}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4' />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <p className='text-lg text-ink-muted'>{post.excerpt}</p>
              </header>

              <div className='prose prose-lg max-w-none'>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </article>

            <div className='mt-12 text-center'>
              <p className='text-ink-muted mb-4'>
                Enjoyed this article? Connect with me on social media for more
                insights.
              </p>
              <Link
                href='https://linkedin.com/in/geovannycordero'
                target='_blank'
                rel='noopener noreferrer'
                className='text-accent-brand hover:underline font-medium'
              >
                Follow me on LinkedIn →
              </Link>
            </div>

            <div className='mt-8 text-center'>
              <BackToTopButton />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}
