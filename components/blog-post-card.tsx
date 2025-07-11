'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card
      className={`card-elegant hover-lift transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <CardHeader>
        <div className='flex flex-wrap gap-2 mb-3'>
          {post.tags.map(tag => (
            <Badge
              key={tag}
              variant='secondary'
              className='text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors'
            >
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className='text-xl text-sage-900 hover:text-emerald-700 transition-colors'>
          <Link href={`/blog/${post.slug}`} className='block group'>
            <span className='group-hover:underline'>{post.title}</span>
          </Link>
        </CardTitle>
        <div className='flex items-center gap-4 text-sm text-sage-600'>
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
      </CardHeader>
      <CardContent>
        <p className='text-sage-700 mb-4 leading-relaxed line-clamp-3'>
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className='inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors group'
        >
          <span>Read full article</span>
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </Link>
      </CardContent>
    </Card>
  );
}
