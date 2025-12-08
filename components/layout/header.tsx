'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { smoothScrollTo } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/hooks'
import { useQuoteDialog } from '@/components/shared/quote-dialog-provider'
import { LanguageSelector } from '@/components/shared/language-selector'
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
  const { t } = useTranslation()
  const { openDialog: openQuoteDialog } = useQuoteDialog()

  useEffect(() => {
    const sections = ['hero', 'why-choose', 'plans', 'how-it-works', 'testimonials', 'about', 'faq', 'contact']
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
            <Image
              src="/logo.png"
              alt="Insured by Rajan"
              title="Insured by Rajan"
              width={200}
              height={112}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const sectionId = item.href.replace('/', '').replace('#', '')
              const isActive =
                activeSection === sectionId ||
                (sectionId === '' && activeSection === 'hero')
              // Get translation key for navigation item - map common labels
              const labelMap: Record<string, string> = {
                'Why Us': 'navigation.whyUs',
                'Why Choose': 'navigation.whyChoose',
                'Plans': 'navigation.plans',
                'How It Works': 'navigation.howItWorks',
                'Testimonials': 'navigation.testimonials',
                'About': 'navigation.about',
                'FAQ': 'navigation.faq',
                'Contact': 'navigation.contact',
              }
              const translationKey = labelMap[item.label] || `navigation.${item.label.toLowerCase().replace(/\s+/g, '')}`
              const label = t(translationKey, item.label)
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
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Language Selector & CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSelector />
            <Button
              onClick={openQuoteDialog}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t('common.getMyFreeQuote', 'Get My Free Quote')}
              <span className="ml-2">→</span>
            </Button>
          </div>

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
              {navigation.map((item) => {
                const labelMap: Record<string, string> = {
                  'Why Us': 'navigation.whyUs',
                  'Why Choose': 'navigation.whyChoose',
                  'Plans': 'navigation.plans',
                  'How It Works': 'navigation.howItWorks',
                  'Testimonials': 'navigation.testimonials',
                  'About': 'navigation.about',
                  'FAQ': 'navigation.faq',
                  'Contact': 'navigation.contact',
                }
                const translationKey = labelMap[item.label] || `navigation.${item.label.toLowerCase().replace(/\s+/g, '')}`
                const label = t(translationKey, item.label)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item, e)}
                    className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 py-2 border-b border-gray-200"
                  >
                    {label}
                  </Link>
                )
              })}
              <div className="mt-4 space-y-4">
                <LanguageSelector />
                <Button
                  onClick={openQuoteDialog}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md"
                >
                  {t('common.getMyFreeQuote', 'Get My Free Quote')}
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

