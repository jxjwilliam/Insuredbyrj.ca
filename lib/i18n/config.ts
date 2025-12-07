/**
 * Language configuration for internationalization (i18n) system
 * 
 * Defines all supported languages with their metadata including
 * language codes, display names, flags, and RTL support.
 * 
 * @module lib/i18n/config
 */

import type { LanguageConfig } from './types'

/**
 * List of all supported languages
 * 
 * Primary focus: English (default), French, Punjabi, and Hindi for Vancouver/Surrey BC community.
 * Languages are ordered by priority: English (default), French (official), then community languages.
 * 
 * @constant {LanguageConfig[]}
 * 
 * @example
 * ```typescript
 * import { supportedLanguages } from '@/lib/i18n/config'
 * const english = supportedLanguages.find(lang => lang.code === 'en')
 * ```
 */
export const supportedLanguages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nameEn: 'English',
    flag: '🇨🇦',
    rtl: false,
  },
  {
    code: 'fr',
    name: 'Français',
    nameEn: 'French',
    flag: '🇨🇦',
    rtl: false,
  },
  {
    code: 'pa',
    name: 'ਪੰਜਾਬੀ',
    nameEn: 'Punjabi',
    flag: '🇮🇳',
    rtl: false,
  },
  {
    code: 'hi',
    name: 'हिन्दी',
    nameEn: 'Hindi',
    flag: '🇮🇳',
    rtl: false,
  },
]

/**
 * Default language code
 * 
 * Always English ('en'). This is used as the fallback language
 * when no locale is specified or when a requested locale fails to load.
 * 
 * @constant {string}
 */
export const defaultLocale = 'en'

/**
 * Returns the list of all supported languages
 * 
 * Provides a copy of the supported languages array. Useful for
 * components that need to display language options or validate locales.
 * 
 * @returns {LanguageConfig[]} Array of language configuration objects
 * 
 * @example
 * ```typescript
 * const languages = getSupportedLanguages()
 * languages.forEach(lang => console.log(lang.nameEn))
 * ```
 */
export function getSupportedLanguages(): LanguageConfig[] {
  return supportedLanguages
}

/**
 * Returns the default language code
 * 
 * @returns {string} Default locale string ('en')
 * 
 * @example
 * ```typescript
 * const locale = getDefaultLocale() // Returns: 'en'
 * ```
 */
export function getDefaultLocale(): string {
  return defaultLocale
}

/**
 * Checks if a locale code is supported
 * 
 * Validates whether a given locale string matches any of the
 * supported language codes. Case-sensitive comparison.
 * 
 * @param {string} locale - Language code to check (e.g., 'en', 'fr', 'pa', 'hi')
 * @returns {boolean} True if locale is supported, false otherwise
 * 
 * @example
 * ```typescript
 * isSupportedLocale('en') // Returns: true
 * isSupportedLocale('de') // Returns: false
 * ```
 */
export function isSupportedLocale(locale: string): boolean {
  return supportedLanguages.some((lang) => lang.code === locale)
}
