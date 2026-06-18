'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useBlogNavigation() {
  const router = useRouter();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const scrollToTarget = (delay = 0) => {
    if (typeof window === 'undefined') return;

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
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
