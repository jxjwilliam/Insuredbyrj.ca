'use client'

/**
 * Language selector component
 * 
 * Provides a dropdown menu for users to select their preferred language.
 * Uses shadcn/ui DropdownMenu component for accessibility and styling.
 * Displays current language with flag and name, allows switching between supported languages.
 */

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from '@/lib/i18n/hooks'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

interface LanguageSelectorProps {
  /** Optional CSS classes */
  className?: string
  /** Visual variant */
  variant?: 'default' | 'minimal'
  /** Show flag icons */
  showFlags?: boolean
  /** Show native language names */
  showNativeNames?: boolean
}

/**
 * LanguageSelector component
 * 
 * Renders a dropdown menu for language selection with keyboard navigation
 * and screen reader support (WCAG 2.1 AA compliant).
 */
export function LanguageSelector({
  className = '',
  variant = 'default',
  showFlags = true,
  showNativeNames = true,
}: LanguageSelectorProps) {
  const { locale, setLocale, supportedLocales } = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const currentLanguage = supportedLocales.find((lang) => lang.code === locale)

  /**
   * Handle language selection
   * Updates locale, persists preference, and updates URL if needed
   */
  const handleLanguageSelect = async (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    try {
      await setLocale(newLocale)
      setIsOpen(false)

      // Update URL to reflect new locale
      // Extract current path without locale prefix
      const supportedLocales = ['en', 'fr', 'pa', 'hi']
      let pathWithoutLocale = pathname
      
      // Remove existing locale prefix if present
      for (const loc of supportedLocales) {
        if (pathname.startsWith(`/${loc}/`)) {
          pathWithoutLocale = pathname.replace(`/${loc}/`, '/')
          break
        } else if (pathname === `/${loc}`) {
          pathWithoutLocale = '/'
          break
        }
      }
      
      // Ensure path starts with /
      if (!pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = `/${pathWithoutLocale}`
      }
      
      // Build new path with locale prefix
      const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
      
      // Navigate to new locale URL
      router.push(newPath)
    } catch (error) {
      console.error('Failed to change language:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        aria-label={`Select language. Current language: ${currentLanguage?.nameEn || locale}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        role="combobox"
        aria-controls="language-selector-menu"
        disabled={isLoading}
        aria-busy={isLoading}
      >
            {isLoading ? (
          <span className="text-sm text-gray-500" aria-live="polite" aria-busy="true">
            Loading...
          </span>
        ) : variant === 'minimal' ? (
          <Globe className="h-4 w-4 text-gray-600" aria-hidden="true" />
        ) : (
          <>
            {showFlags && currentLanguage?.flag && (
              <span className="text-lg" aria-hidden="true">
                {currentLanguage.flag}
              </span>
            )}
            <span className="text-sm font-medium text-gray-700">
              {showNativeNames && currentLanguage?.name
                ? currentLanguage.name
                : currentLanguage?.nameEn || 'Language'}
            </span>
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[180px]"
        role="listbox"
        id="language-selector-menu"
        aria-label="Language selection menu"
      >
        {supportedLocales.map((lang) => {
          const isSelected = lang.code === locale
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleLanguageSelect(lang.code)
                }
              }}
              className={`flex items-center gap-2 cursor-pointer transition-colors duration-150 focus:bg-accent focus:text-accent-foreground ${
                isSelected ? 'bg-accent font-semibold' : ''
              }`}
              role="option"
              aria-selected={isSelected}
              aria-label={`Select ${lang.nameEn} (${lang.name})`}
            >
              {showFlags && lang.flag && (
                <span className="text-lg" aria-hidden="true">
                  {lang.flag}
                </span>
              )}
              <div className="flex flex-col">
                {showNativeNames && lang.name && (
                  <span className="text-sm">{lang.name}</span>
                )}
                <span className={`text-xs ${showNativeNames ? 'text-gray-500' : ''}`}>
                  {lang.nameEn}
                </span>
              </div>
              {isSelected && (
                <span className="ml-auto text-blue-500" aria-hidden="true">
                  ✓
                </span>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
