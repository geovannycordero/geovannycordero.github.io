'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useBlogNavigation() {
  const router = useRouter();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToTarget = (delay = 0) => {
    if (typeof window === 'undefined') return;

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, delay);
  };

  const navigateToBlog = (hash?: string) => {
    const url = hash ? `/blog${hash}` : '/blog';
    router.push(url);
    scrollToTarget(200);
  };

  const navigateToBlogPage = (page: number) => {
    const url = page === 1 ? '/blog' : `/blog?page=${page}`;
    router.push(url);
    scrollToTarget(150);
  };

  const cleanup = () => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
  };

  return { navigateToBlog, navigateToBlogPage, scrollToTarget, cleanup };
}
