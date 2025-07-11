"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBlogPaginationScroll } from "./blog-pagination-scroll"

interface EnhancedPaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  basePath?: string
  scrollTargetId?: string
  headerOffset?: number
  scrollDelay?: number
}

export default function EnhancedPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  basePath = "/blog",
  scrollTargetId = "blog-content",
  headerOffset = 100,
  scrollDelay = 150,
}: EnhancedPaginationProps) {
  const { navigateWithScroll, cleanup } = useBlogPaginationScroll({
    scrollTargetId,
    headerOffset,
    scrollDelay,
  })

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 3) {
        // Show pages 2, 3, 4 and ellipsis
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        if (totalPages > 4) {
          pages.push("...")
        }
      } else if (currentPage >= totalPages - 2) {
        // Show ellipsis and last 3 pages
        if (totalPages > 4) {
          pages.push("...")
        }
        for (let i = Math.max(2, totalPages - 3); i <= totalPages - 1; i++) {
          pages.push(i)
        }
      } else {
        // Show ellipsis, current page with neighbors, ellipsis
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
      }

      // Always show last page (if not already included)
      if (!pages.includes(totalPages) && totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}?page=${page}`
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="flex items-center justify-center space-x-2 mt-12" aria-label="Blog pagination" role="navigation">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrevPage}
        onClick={() => hasPrevPage && navigateWithScroll(getPageUrl(currentPage - 1))}
        className={cn(
          "flex items-center gap-2 pagination-button border-emerald-300 text-emerald-700",
          !hasPrevPage && "opacity-50 cursor-not-allowed",
        )}
        aria-label={`Go to page ${currentPage - 1}`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <div key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10" aria-hidden="true">
                <MoreHorizontal className="h-4 w-4 text-sage-500" />
              </div>
            )
          }

          const pageNumber = page as number
          const isCurrentPage = pageNumber === currentPage

          return (
            <Button
              key={pageNumber}
              variant={isCurrentPage ? "default" : "outline"}
              size="sm"
              disabled={isCurrentPage}
              onClick={() => !isCurrentPage && navigateWithScroll(getPageUrl(pageNumber))}
              className={cn(
                "w-10 h-10 p-0 pagination-button",
                isCurrentPage && "bg-emerald-600 text-white cursor-default hover:bg-emerald-600",
                !isCurrentPage && "border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800",
              )}
              aria-label={isCurrentPage ? `Current page ${pageNumber}` : `Go to page ${pageNumber}`}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={() => hasNextPage && navigateWithScroll(getPageUrl(currentPage + 1))}
        className={cn(
          "flex items-center gap-2 pagination-button border-emerald-300 text-emerald-700",
          !hasNextPage && "opacity-50 cursor-not-allowed",
        )}
        aria-label={`Go to page ${currentPage + 1}`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
