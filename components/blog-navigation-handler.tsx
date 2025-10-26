'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useBlogNavigation() {
  const router = useRouter();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToTarget = (delay = 0) => {
    // Add safety check to prevent SSR issues
    if (typeof window === 'undefined') return;

    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      window.scrollTo({
        top: -10,
        behavior: 'smooth',
      });
    }, delay);
  };

  const navigateToBlog = (hash?: string) => {
    const url = hash ? `/blog${hash}` : '/blog';

    router.push(url);

    // Schedule scroll after navigation
    scrollToTarget(200);
  };

  const navigateToBlogPage = (page: number) => {
    const url = page === 1 ? '/blog' : `/blog?page=${page}`;

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

interface BlogNavigationHandlerProps {
  scrollTargetId?: string;
  headerOffset?: number;
}

export default function BlogNavigationHandler(
  _props: BlogNavigationHandlerProps
) {
  const { cleanup } = useBlogNavigation();

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return null;
}
