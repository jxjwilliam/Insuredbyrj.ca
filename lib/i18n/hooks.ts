/**
 * React hooks for internationalization (i18n)
 * 
 * Provides convenient hooks for accessing translation functions
 * and locale management throughout the application.
 */

export { useTranslation } from './context'
export { getSupportedLanguages } from './config'
import { useTranslation } from './context'
import { getSupportedLanguages, getDefaultLocale } from './config'

/**
 * Hook for accessing current locale without translation functions
 * 
 * Useful for components that need locale information but don't need
 * translation functions (e.g., language selector component)
 * 
 * @returns Locale hook with locale, setLocale, supportedLocales, and defaultLocale
 */
export function useLocale() {
  const { locale, setLocale } = useTranslation()
  const supportedLocales = getSupportedLanguages()
  const defaultLocale = getDefaultLocale()

  return {
    locale,
    setLocale,
    supportedLocales,
    defaultLocale,
  }
}
