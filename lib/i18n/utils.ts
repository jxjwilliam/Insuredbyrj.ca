/**
 * Internationalization (i18n) utility functions
 * 
 * Provides functions for loading translations, getting translated strings,
 * managing locale persistence, and detecting browser language preferences.
 */

import type { TranslationObject } from './types'
import { isSupportedLocale, getDefaultLocale } from './config'

// Translation cache to avoid reloading the same translations
const translationCache: Record<string, TranslationObject> = {}

/**
 * Loads translation file for the specified locale
 * 
 * Uses dynamic imports to load JSON translation files. Implements caching
 * to avoid reloading the same translations. Falls back to default locale
 * if the requested locale is unsupported or fails to load.
 * 
 * @param locale - Language code to load (e.g., 'en', 'fr', 'pa', 'hi')
 * @returns Promise resolving to translation object
 * @throws Error if translation file cannot be loaded and default locale also fails
 * 
 * @example
 * ```typescript
 * const enTranslations = await loadTranslations('en')
 * const headline = getTranslation(enTranslations, 'hero.headline')
 * ```
 */
export async function loadTranslations(locale: string): Promise<TranslationObject> {
  // Validate locale
  if (!isSupportedLocale(locale)) {
    console.warn(`[i18n] Unsupported locale: ${locale}, falling back to default`)
    locale = getDefaultLocale()
  }

  // Check cache first
  if (translationCache[locale]) {
    return translationCache[locale]
  }

  try {
    // Dynamic import of translation file
    const translations = await import(`./translations/${locale}.json`)
    const translationData = translations.default || translations
    
    // Validate translation data structure
    if (!translationData || typeof translationData !== 'object') {
      throw new Error(`Invalid translation data structure for locale: ${locale}`)
    }
    
    // Cache the loaded translations
    translationCache[locale] = translationData
    return translationData
  } catch (error) {
    console.error(`[i18n] Failed to load translations for locale: ${locale}`, error)
    
    // Fallback to English if not already English
    if (locale !== getDefaultLocale()) {
      console.warn(`[i18n] Attempting fallback to default locale: ${getDefaultLocale()}`)
      return loadTranslations(getDefaultLocale())
    }
    
    // If English also fails, return empty object with warning
    console.error(`[i18n] Critical: Failed to load default locale translations`)
    return {}
  }
}

/**
 * Retrieves a translated string by key path
 * 
 * Traverses a nested translation object using dot-separated keys.
 * Falls back to the provided fallback value or the key itself if translation is missing.
 * 
 * @param translations - Loaded translation object containing nested key-value pairs
 * @param key - Dot-separated key path (e.g., 'hero.headline', 'navigation.whyChoose')
 * @param fallback - Optional fallback value if key not found. If not provided, returns the key itself
 * @returns Translated string, fallback value, or the key if translation is missing
 * 
 * @example
 * ```typescript
 * const translations = { hero: { headline: 'Welcome' } }
 * getTranslation(translations, 'hero.headline') // Returns: 'Welcome'
 * getTranslation(translations, 'hero.missing', 'Default') // Returns: 'Default'
 * getTranslation(translations, 'hero.missing') // Returns: 'hero.missing'
 * ```
 */
export function getTranslation(
  translations: TranslationObject,
  key: string,
  fallback?: string
): string {
  if (!translations || typeof translations !== 'object') {
    return fallback || key
  }

  const keys = key.split('.')
  let value: string | TranslationObject = translations

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Key not found, return fallback or key itself
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[i18n] Translation key not found: ${key}. Using fallback: ${fallback || key}`)
      }
      return fallback || key
    }
  }

  // Return string value or fallback
  return typeof value === 'string' ? value : (fallback || key)
}

/**
 * Reads locale preference from localStorage
 * @returns Language code string or null if not set
 */
export function getStoredLocale(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  
  try {
    return localStorage.getItem('i18n-locale')
  } catch (error) {
    console.warn('Failed to read from localStorage:', error)
    return null
  }
}

/**
 * Saves locale preference to localStorage
 * @param locale - Language code to save
 */
export function setStoredLocale(locale: string): void {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    localStorage.setItem('i18n-locale', locale)
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

/**
 * Reads locale preference from cookie (for SSR)
 * @returns Language code string or null if not set
 */
export function getCookieLocale(): string | null {
  if (typeof document === 'undefined') {
    return null
  }
  
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'NEXT_LOCALE') {
      return decodeURIComponent(value)
    }
  }
  return null
}

/**
 * Saves locale preference to cookie (for SSR)
 * @param locale - Language code to save
 */
export function setCookieLocale(locale: string): void {
  if (typeof document === 'undefined') {
    return
  }
  
  try {
    const maxAge = 60 * 60 * 24 * 365 // 1 year
    document.cookie = `NEXT_LOCALE=${encodeURIComponent(locale)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
  } catch (error) {
    console.warn('Failed to save to cookie:', error)
  }
}

/**
 * Detects user's preferred language from browser settings
 * @returns Language code matching browser preference, or default locale if no match
 */
export function detectBrowserLocale(): string {
  if (typeof window === 'undefined' || !navigator.language) {
    return getDefaultLocale()
  }
  
  // Get browser language (e.g., 'en-US' -> 'en')
  const browserLang = navigator.language.split('-')[0]
  
  // Check if browser language is supported
  if (isSupportedLocale(browserLang)) {
    return browserLang
  }
  
  // Try to match any supported language from navigator.languages array
  if (navigator.languages) {
    for (const lang of navigator.languages) {
      const langCode = lang.split('-')[0]
      if (isSupportedLocale(langCode)) {
        return langCode
      }
    }
  }
  
  // Fallback to default
  return getDefaultLocale()
}
