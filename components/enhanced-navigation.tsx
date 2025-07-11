"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useBlogNavigation } from "./blog-navigation-handler"

export default function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { navigateToBlog } = useBlogNavigation({
    scrollTargetId: "blog-content",
    headerOffset: 100,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/#about", label: "About", type: "anchor" },
    { href: "/#skills", label: "Skills", type: "anchor" },
    { href: "/#experience", label: "Experience", type: "anchor" },
    { href: "/#education", label: "Education", type: "anchor" },
    { href: "/#contact", label: "Contact", type: "anchor" },
    { href: "/blog", label: "Blog", type: "blog" },
  ]

  const handleNavClick = (item: (typeof navItems)[0]) => {
    setIsOpen(false)

    if (item.type === "blog") {
      // Use our enhanced blog navigation
      navigateToBlog("#blog-content")
    }
    // For anchor links, let the default behavior handle it
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-emerald-100" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-emerald-600">
            Geovanny Cordero
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.type === "blog" ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className="text-sage-600 hover:text-emerald-600 transition-colors font-medium"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sage-600 hover:text-emerald-600 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-sage-600 hover:text-emerald-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-white/95 backdrop-blur-sm border-t border-emerald-100">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.type === "blog" ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className="text-sage-600 hover:text-emerald-600 transition-colors font-medium text-left"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sage-600 hover:text-emerald-600 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
