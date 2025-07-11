"use client"

import { useEffect, useRef } from "react"
import { useSearchParams, usePathname } from "next/navigation"

interface BlogAutoScrollProps {
  scrollTargetId?: string
  headerOffset?: number
  scrollBehavior?: "smooth" | "auto"
  enableDebugLogs?: boolean
}

export default function BlogAutoScroll({
  scrollTargetId = "blog-content",
  headerOffset = 100,
  scrollBehavior = "smooth",
  enableDebugLogs = false,
}: BlogAutoScrollProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const previousPageRef = useRef<string | null>(null)
  const previousPathnameRef = useRef<string | null>(null)
  const isInitialLoadRef = useRef(true)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const log = (message: string, data?: any) => {
    if (enableDebugLogs) {
      console.log(`[BlogAutoScroll] ${message}`, data || "")
    }
  }

  const scrollToTarget = (behavior: "smooth" | "auto" = scrollBehavior, delay = 0) => {
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const targetElement = document.getElementById(scrollTargetId)

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        log("Scrolling to target element", {
          targetId: scrollTargetId,
          elementPosition,
          offsetPosition,
          behavior,
        })

        // Use scrollTo with options for React 17 compatibility
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: behavior,
        })
      } else {
        // Fallback: scroll to top of page
        log("Target element not found, scrolling to top", { targetId: scrollTargetId })
        window.scrollTo({
          top: 0,
          behavior: behavior,
        })
      }
    }, delay)
  }

  useEffect(() => {
    const currentPage = searchParams?.get("page") || "1"
    const currentPathname = pathname

    log("Effect triggered", {
      currentPage,
      currentPathname,
      previousPage: previousPageRef.current,
      previousPathname: previousPathnameRef.current,
      isInitialLoad: isInitialLoadRef.current,
    })

    // Determine if we should scroll
    const shouldScroll = (() => {
      // Case 1: Initial load to blog page
      if (isInitialLoadRef.current && currentPathname === "/blog") {
        log("Scroll reason: Initial load to blog page")
        return { should: true, delay: 400, behavior: "smooth" as const }
      }

      // Case 2: Navigation from different page to blog
      if (previousPathnameRef.current && previousPathnameRef.current !== "/blog" && currentPathname === "/blog") {
        log("Scroll reason: Navigation from different page to blog")
        return { should: true, delay: 200, behavior: "smooth" as const }
      }

      // Case 3: Page number change within blog
      if (
        currentPathname === "/blog" &&
        previousPathnameRef.current === "/blog" &&
        previousPageRef.current !== null &&
        previousPageRef.current !== currentPage
      ) {
        log("Scroll reason: Page number change within blog")
        return { should: true, delay: 150, behavior: "smooth" as const }
      }

      // Case 4: Hash navigation to blog content
      if (currentPathname === "/blog" && window.location.hash === `#${scrollTargetId}`) {
        log("Scroll reason: Hash navigation to blog content")
        return { should: true, delay: 100, behavior: "smooth" as const }
      }

      log("No scroll needed")
      return { should: false, delay: 0, behavior: "smooth" as const }
    })()

    if (shouldScroll.should) {
      scrollToTarget(shouldScroll.behavior, shouldScroll.delay)
    }

    // Update refs for next comparison
    previousPageRef.current = currentPage
    previousPathnameRef.current = currentPathname
    isInitialLoadRef.current = false

    // Cleanup function
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [searchParams, pathname, scrollTargetId, headerOffset, scrollBehavior])

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      log("PopState event detected")
      if (pathname === "/blog") {
        // Small delay to ensure page state is updated
        scrollToTarget("smooth", 100)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [pathname, scrollTargetId, headerOffset, scrollBehavior])

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      log("Hash change detected", { hash: window.location.hash })
      if (pathname === "/blog" && window.location.hash === `#${scrollTargetId}`) {
        scrollToTarget("smooth", 100)
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [pathname, scrollTargetId, headerOffset, scrollBehavior])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return null
}
