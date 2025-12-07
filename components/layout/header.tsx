'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { smoothScrollTo } from '@/lib/utils'
import type { NavigationItem } from '@/lib/types'

interface HeaderProps {
  navigation: NavigationItem[]
}

/**
 * Sticky header navigation component with active section highlighting
 * @param navigation - Array of navigation items
 */
export function Header({ navigation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const sections = ['hero', 'why-choose', 'plans', 'how-it-works', 'why-bc', 'faq']
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -66%',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  const handleNavClick = (
    item: NavigationItem,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (item.isAnchor) {
      e.preventDefault()
      smoothScrollTo(item.href.replace('#', ''), 100)
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 transition-transform hover:scale-105"
          >
            <span className="text-2xl font-bold text-gray-900">
              Insured by Rajan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const sectionId = item.href.replace('/', '').replace('#', '')
              const isActive =
                activeSection === sectionId ||
                (sectionId === '' && activeSection === 'hero')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-500'
                      : 'text-gray-700 hover:text-blue-500'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA Button (Desktop) */}
          <Link
            href="/get-quote"
            className="hidden lg:inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get My Free Quote
            <span className="ml-2">→</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-500 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 py-2 border-b border-gray-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md mt-4"
              >
                Get My Free Quote
                <span className="ml-2">→</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

