"use client"

import { useRouter } from "next/navigation"
import { useCallback, useRef } from "react"

interface BlogPaginationScrollProps {
  scrollTargetId?: string
  headerOffset?: number
  scrollDelay?: number
}

export function useBlogPaginationScroll({
  scrollTargetId = "blog-content",
  headerOffset = 100,
  scrollDelay = 150,
}: BlogPaginationScrollProps = {}) {
  const router = useRouter()
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToTarget = useCallback(() => {
    const targetElement = document.getElementById(scrollTargetId)

    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      })
    } else {
      // Fallback: scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [scrollTargetId, headerOffset])

  const navigateWithScroll = useCallback(
    (url: string) => {
      // Clear any existing timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current)
      }

      // Navigate to the new page
      router.push(url)

      // Schedule scroll after navigation
      navigationTimeoutRef.current = setTimeout(() => {
        scrollToTarget()
      }, scrollDelay)
    },
    [router, scrollToTarget, scrollDelay],
  )

  // Cleanup function
  const cleanup = useCallback(() => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current)
    }
  }, [])

  return {
    navigateWithScroll,
    scrollToTarget,
    cleanup,
  }
}

export default function BlogPaginationScroll(props: BlogPaginationScrollProps) {
  // This component doesn't render anything, it's just for the hook
  return null
}
