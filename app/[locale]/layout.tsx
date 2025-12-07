import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { BackToTopButton } from '@/components/shared/back-to-top-button'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import { I18nProvider } from '@/lib/i18n/context'
import { getSupportedLanguages, isSupportedLocale, getDefaultLocale } from '@/lib/i18n/config'
import { loadTranslations } from '@/lib/i18n/utils'
import type { TranslationObject } from '@/lib/i18n/types'
import './../globals.css'

const inter = Inter({ subsets: ['latin'] })

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * Generate static params for all supported locales
 * This enables static generation for all language versions
 */
export async function generateStaticParams() {
  const supportedLocales = getSupportedLanguages().map((lang) => lang.code)
  return supportedLocales.map((locale) => ({
    locale,
  }))
}

/**
 * Generate metadata with hreflang tags for SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const supportedLocales = getSupportedLanguages()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://insuredbyrajan.com'
  
  // Generate hreflang alternate links
  const alternates: { languages: Record<string, string> } = {
    languages: {},
  }
  
  supportedLocales.forEach((lang) => {
    alternates.languages[lang.code] = `${baseUrl}/${lang.code}`
  })
  
  // Add x-default pointing to default locale
  alternates.languages['x-default'] = `${baseUrl}/${getDefaultLocale()}`

  return {
    title: "Insured by Rajan: British Columbia's Trusted Life Insurance Agency",
    description:
      'Protecting British Columbia families with transparent, affordable life insurance coverage. Get the peace of mind you deserve.',
    keywords: [
      'life insurance',
      'British Columbia',
      'BC insurance',
      'term life',
      'whole life',
      'universal life',
      'critical illness insurance',
    ],
    alternates,
  }
}

/**
 * Locale-aware layout component
 * 
 * Wraps all pages with I18nProvider and preloads translations for the current locale.
 * Sets HTML lang attribute based on locale.
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params
  
  // Validate locale and fallback to default if invalid
  const validLocale = isSupportedLocale(localeParam) ? localeParam : getDefaultLocale()
  
  // Preload translations for this locale
  let translations: TranslationObject = {}
  try {
    translations = await loadTranslations(validLocale)
  } catch (error) {
    console.error(`Failed to load translations for locale: ${validLocale}`, error)
    // Fallback to default locale translations
    try {
      translations = await loadTranslations(getDefaultLocale())
    } catch (fallbackError) {
      console.error('Failed to load default translations', fallbackError)
    }
  }

  return (
    <html lang={validLocale} className="scroll-smooth">
      <body className={inter.className} suppressHydrationWarning>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <I18nProvider initialLocale={validLocale} translations={translations}>
            {children}
          </I18nProvider>
        </ErrorBoundary>
        <BackToTopButton />
      </body>
    </html>
  )
}
