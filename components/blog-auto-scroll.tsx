'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

interface BlogAutoScrollProps {
  scrollTargetId?: string;
  headerOffset?: number;
  scrollBehavior?: 'smooth' | 'auto';
}

export default function BlogAutoScroll({
  scrollTargetId = 'blog-content',
  headerOffset = 100,
  scrollBehavior = 'smooth',
}: BlogAutoScrollProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const previousPageRef = useRef<string | null>(null);
  const previousPathnameRef = useRef<string | null>(null);
  const isInitialLoadRef = useRef(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToTarget = (
    behavior: 'smooth' | 'auto' = scrollBehavior,
    delay = 0
  ) => {
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const targetElement = document.getElementById(scrollTargetId);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Use scrollTo with options for React 17 compatibility
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: behavior,
        });
      } else {
        // Fallback: scroll to top of page
        window.scrollTo({
          top: 0,
          behavior: behavior,
        });
      }
    }, delay);
  };

  useEffect(() => {
    const currentPage = searchParams?.get('page') || '1';
    const currentPathname = pathname;

    // Determine if we should scroll
    const shouldScroll = (() => {
      // Case 1: Initial load to blog page
      if (isInitialLoadRef.current && currentPathname === '/blog')
        return { should: true, delay: 400, behavior: 'smooth' as const };

      // Case 2: Navigation from different page to blog
      if (
        previousPathnameRef.current &&
        previousPathnameRef.current !== '/blog' &&
        currentPathname === '/blog'
      ) {
        return { should: true, delay: 200, behavior: 'smooth' as const };
      }

      // Case 3: Page number change within blog
      if (
        currentPathname === '/blog' &&
        previousPathnameRef.current === '/blog' &&
        previousPageRef.current !== null &&
        previousPageRef.current !== currentPage
      ) {
        return { should: true, delay: 150, behavior: 'smooth' as const };
      }

      // Case 4: Hash navigation to blog content
      if (
        currentPathname === '/blog' &&
        window.location.hash === `#${scrollTargetId}`
      ) {
        return { should: true, delay: 100, behavior: 'smooth' as const };
      }

      return { should: false, delay: 0, behavior: 'smooth' as const };
    })();

    if (shouldScroll.should) {
      scrollToTarget(shouldScroll.behavior, shouldScroll.delay);
    }

    // Update refs for next comparison
    previousPageRef.current = currentPage;
    previousPathnameRef.current = currentPathname;
    isInitialLoadRef.current = false;

    // Cleanup function
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pathname, scrollTargetId, headerOffset, scrollBehavior]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (pathname === '/blog') {
        // Small delay to ensure page state is updated
        scrollToTarget('smooth', 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, scrollTargetId, headerOffset, scrollBehavior]);

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (
        pathname === '/blog' &&
        window.location.hash === `#${scrollTargetId}`
      ) {
        scrollToTarget('smooth', 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, scrollTargetId, headerOffset, scrollBehavior]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return null;
}
