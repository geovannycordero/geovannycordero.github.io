'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface BlogNavigationHandlerProps {
  scrollTargetId?: string;
  headerOffset?: number;
  enableDebugLogs?: boolean;
}

export function useBlogNavigation({
  scrollTargetId = 'blog-content',
  headerOffset = 100,
  enableDebugLogs = false,
}: BlogNavigationHandlerProps = {}) {
  const router = useRouter();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const log = (message: string, data?: any) => {
    if (enableDebugLogs) {
      console.log(`[BlogNavigation] ${message}`, data || '');
    }
  };

  const scrollToTarget = (delay = 0) => {
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      const targetElement = document.getElementById(scrollTargetId);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        log('Scrolling to blog content', {
          targetId: scrollTargetId,
          elementPosition,
          offsetPosition,
        });

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      } else {
        log('Blog content element not found, scrolling to top');
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, delay);
  };

  const navigateToBlog = (hash?: string) => {
    const url = hash ? `/blog${hash}` : '/blog';
    log('Navigating to blog', { url });

    router.push(url);

    // Schedule scroll after navigation
    scrollToTarget(200);
  };

  const navigateToBlogPage = (page: number) => {
    const url = page === 1 ? '/blog' : `/blog?page=${page}`;
    log('Navigating to blog page', { page, url });

    router.push(url);

    // Schedule scroll after navigation
    scrollToTarget(150);
  };

  // Cleanup function
  const cleanup = () => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
  };

  return {
    navigateToBlog,
    navigateToBlogPage,
    scrollToTarget,
    cleanup,
  };
}

export default function BlogNavigationHandler(
  props: BlogNavigationHandlerProps
) {
  const { cleanup } = useBlogNavigation(props);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return null;
}
