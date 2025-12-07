'use client'

/**
 * React Context Provider for internationalization (i18n)
 * 
 * Manages locale state, loaded translations, loading states, and error handling.
 * Provides translation function and locale management to all child components.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loadTranslations, getStoredLocale, setStoredLocale, detectBrowserLocale, setCookieLocale } from './utils'
import { getDefaultLocale, isSupportedLocale } from './config'
import type { TranslationObject } from './types'

/**
 * Context value interface
 */
interface I18nContextValue {
  /** Current active locale code */
  locale: string
  /** Loaded translation object for current locale */
  translations: TranslationObject
  /** Whether translations are currently loading */
  loading: boolean
  /** Error that occurred during translation loading, if any */
  error: Error | null
  /** Function to change the active locale */
  setLocale: (locale: string) => Promise<void>
  /** Translation function to get translated strings by key */
  t: (key: string, fallback?: string) => string
}

/**
 * Create the i18n context
 */
const I18nContext = createContext<I18nContextValue | undefined>(undefined)

/**
 * Props for I18nProvider component
 */
interface I18nProviderProps {
  /** Child components */
  children: React.ReactNode
  /** Optional initial locale (defaults to 'en' or detected locale) */
  initialLocale?: string
  /** Optional preloaded translations */
  translations?: TranslationObject
}

/**
 * I18nProvider component
 * 
 * Provides i18n context to all child components. Manages locale state,
 * loads translations on demand, and persists language preferences.
 */
export function I18nProvider({ 
  children, 
  initialLocale,
  translations: preloadedTranslations
}: I18nProviderProps) {
  // Determine initial locale
  const getInitialLocale = useCallback(() => {
    if (initialLocale && isSupportedLocale(initialLocale)) {
      return initialLocale
    }
    
    const stored = getStoredLocale()
    if (stored && isSupportedLocale(stored)) {
      return stored
    }
    
    const detected = detectBrowserLocale()
    return detected
  }, [initialLocale])

  const [locale, setLocaleState] = useState<string>(getInitialLocale())
  const [translations, setTranslations] = useState<TranslationObject>(preloadedTranslations || {})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Function to change the active locale
   * Loads translations, updates state, and persists preference
   */
  const setLocale = useCallback(async (newLocale: string) => {
    if (!isSupportedLocale(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}`)
      return
    }

    // Don't reload if already the current locale
    if (newLocale === locale && Object.keys(translations).length > 0) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const loadedTranslations = await loadTranslations(newLocale)
      setLocaleState(newLocale)
      setTranslations(loadedTranslations)
      setStoredLocale(newLocale)
      setCookieLocale(newLocale)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load translations')
      setError(error)
      console.error('Translation loading error:', error)
      
      // Fallback to default locale on error
      if (newLocale !== getDefaultLocale()) {
        try {
          const defaultTranslations = await loadTranslations(getDefaultLocale())
          setLocaleState(getDefaultLocale())
          setTranslations(defaultTranslations)
        } catch (fallbackError) {
          console.error('Failed to load default translations:', fallbackError)
        }
      }
    } finally {
      setLoading(false)
    }
  }, [locale, translations])

  /**
   * Translation function to get translated strings by key
   */
  const t = useCallback((key: string, fallback?: string): string => {
    if (!translations || Object.keys(translations).length === 0) {
      return fallback || key
    }

    const keys = key.split('.')
    let value: string | TranslationObject = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Key not found, return fallback or key
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation key not found: ${key} for locale: ${locale}`)
        }
        return fallback || key
      }
    }

    return typeof value === 'string' ? value : (fallback || key)
  }, [translations, locale])

  // Load initial translations if not preloaded
  useEffect(() => {
    const initial = getInitialLocale()
    
    // Only load if we don't have preloaded translations or locale changed
    if (!preloadedTranslations || Object.keys(preloadedTranslations).length === 0) {
      if (initial && isSupportedLocale(initial)) {
        setLocale(initial)
      } else {
        setLocale(getDefaultLocale())
      }
    } else {
      // Use preloaded translations
      setLocaleState(initial)
      setTranslations(preloadedTranslations)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount - getInitialLocale and setLocale are stable

  return (
    <I18nContext.Provider value={{ locale, translations, loading, error, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

/**
 * Hook to access i18n context
 * @throws Error if used outside I18nProvider
 */
export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  return context
}
