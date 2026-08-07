'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPostMeta;
  index: number;
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Stagger the animation of cards with reduced delay for better performance
    const timeoutId = setTimeout(() => setIsVisible(true), 50 + index * 50);
    return () => clearTimeout(timeoutId);
  }, [index]);

  return (
    <div
      className={`border border-line bg-surface transition-all duration-300 hover:border-accent-brand dark:border-line/20 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className='flex flex-col space-y-1.5 p-6'>
        <div className='flex flex-wrap gap-2 mb-3'>
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
        <h2 className='text-xl font-semibold leading-none tracking-tight text-ink hover:text-accent-brand transition-colors'>
          <Link href={`/blog/${post.slug}`} className='block group'>
            <span className='group-hover:underline'>{post.title}</span>
          </Link>
        </h2>
        <div className='flex items-center gap-4 text-sm text-ink-muted'>
          <div className='flex items-center gap-1'>
            <Calendar className='h-4 w-4' />
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4' />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
      <div className='p-6 pt-0'>
        <p className='text-ink-muted mb-4 leading-relaxed line-clamp-3'>
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className='inline-flex items-center gap-2 text-accent-brand hover:opacity-80 font-medium transition-colors group'
        >
          <span>Read full article</span>
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </Link>
      </div>
    </div>
  );
}
