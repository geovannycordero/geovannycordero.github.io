"use client"

export default function BackToTopButton() {
  return (
    <button
      onClick={() => {
        const blogContent = document.getElementById("blog-content")
        if (blogContent) {
          blogContent.scrollIntoView({ behavior: "smooth", block: "start" })
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      }}
      className="inline-flex items-center gap-2 px-4 py-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200 hover:border-emerald-300"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      Back to Top
    </button>
  )
} 