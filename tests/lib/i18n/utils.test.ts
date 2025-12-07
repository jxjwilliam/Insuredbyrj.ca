/**
 * Unit tests for i18n utility functions
 * 
 * Tests translation loading, translation lookup, locale persistence,
 * and browser language detection.
 */

import {
  loadTranslations,
  getTranslation,
  getStoredLocale,
  setStoredLocale,
  getCookieLocale,
  setCookieLocale,
  detectBrowserLocale,
} from '@/lib/i18n/utils'
import { getDefaultLocale } from '@/lib/i18n/config'

// Mock translation files
jest.mock('@/lib/i18n/translations/en.json', () => ({
  default: {
    hero: {
      headline: 'Life Insurance That Stands the Test of Time',
      subheadline: 'Protecting British Columbia families...',
    },
    navigation: {
      whyChoose: 'Why Choose',
      plans: 'Plans',
    },
  },
}), { virtual: true })

jest.mock('@/lib/i18n/translations/pa.json', () => ({
  default: {
    hero: {
      headline: 'ਜੀਵਨ ਬੀਮਾ ਜੋ ਸਮੇਂ ਦੀ ਕਸਵੱਟੀ ਖੜ੍ਹਾ ਹੈ',
      subheadline: 'ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ ਦੇ ਪਰਿਵਾਰਾਂ ਨੂੰ...',
    },
    navigation: {
      whyChoose: 'ਕਿਉਂ ਚੁਣੋ',
      plans: 'ਯੋਜਨਾਵਾਂ',
    },
  },
}), { virtual: true })

describe('i18n utils', () => {
  beforeEach(() => {
    // Clear localStorage and cookies before each test
    if (typeof window !== 'undefined') {
      localStorage.clear()
      document.cookie = 'NEXT_LOCALE=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }
  })

  describe('loadTranslations', () => {
    it('loads English translations', async () => {
      const translations = await loadTranslations('en')
      expect(translations.hero.headline).toBe('Life Insurance That Stands the Test of Time')
      expect(translations.navigation.whyChoose).toBe('Why Choose')
    })

    it('loads Punjabi translations', async () => {
      const translations = await loadTranslations('pa')
      expect(translations.hero.headline).toBe('ਜੀਵਨ ਬੀਮਾ ਜੋ ਸਮੇਂ ਦੀ ਕਸਵੱਟੀ ਖੜ੍ਹਾ ਹੈ')
      expect(translations.navigation.whyChoose).toBe('ਕਿਉਂ ਚੁਣੋ')
    })

    it('falls back to default locale for unsupported locale', async () => {
      const translations = await loadTranslations('fr')
      // Should fall back to English
      expect(translations.hero.headline).toBe('Life Insurance That Stands the Test of Time')
    })

    it('caches loaded translations', async () => {
      const translations1 = await loadTranslations('en')
      const translations2 = await loadTranslations('en')
      expect(translations1).toBe(translations2) // Same object reference
    })
  })

  describe('getTranslation', () => {
    const translations = {
      hero: {
        headline: 'Test Headline',
        subheadline: 'Test Subheadline',
      },
      navigation: {
        whyChoose: 'Why Choose',
      },
    }

    it('gets translation by simple key', () => {
      expect(getTranslation(translations, 'navigation.whyChoose')).toBe('Why Choose')
    })

    it('gets translation by nested key', () => {
      expect(getTranslation(translations, 'hero.headline')).toBe('Test Headline')
      expect(getTranslation(translations, 'hero.subheadline')).toBe('Test Subheadline')
    })

    it('returns fallback for missing key', () => {
      expect(getTranslation(translations, 'nonexistent.key', 'Fallback')).toBe('Fallback')
    })

    it('returns key itself if no fallback provided', () => {
      expect(getTranslation(translations, 'nonexistent.key')).toBe('nonexistent.key')
    })

    it('handles empty translations object', () => {
      expect(getTranslation({}, 'hero.headline', 'Fallback')).toBe('Fallback')
    })
  })

  describe('locale persistence', () => {
    beforeEach(() => {
      // Mock window and document for browser environment
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true,
      })

      Object.defineProperty(document, 'cookie', {
        value: '',
        writable: true,
      })
    })

    it('gets stored locale from localStorage', () => {
      ;(localStorage.getItem as jest.Mock).mockReturnValue('pa')
      expect(getStoredLocale()).toBe('pa')
    })

    it('returns null if no locale stored', () => {
      ;(localStorage.getItem as jest.Mock).mockReturnValue(null)
      expect(getStoredLocale()).toBeNull()
    })

    it('sets locale in localStorage', () => {
      setStoredLocale('hi')
      expect(localStorage.setItem).toHaveBeenCalledWith('i18n-locale', 'hi')
    })

    it('gets locale from cookie', () => {
      document.cookie = 'NEXT_LOCALE=pa'
      expect(getCookieLocale()).toBe('pa')
    })

    it('sets locale in cookie', () => {
      setCookieLocale('hi')
      expect(document.cookie).toContain('NEXT_LOCALE=hi')
      expect(document.cookie).toContain('Path=/')
      expect(document.cookie).toContain('SameSite=Lax')
    })
  })

  describe('detectBrowserLocale', () => {
    it('detects supported browser language', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'pa-CA',
        writable: true,
        configurable: true,
      })
      expect(detectBrowserLocale()).toBe('pa')
    })

    it('falls back to default for unsupported language', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'fr-CA',
        writable: true,
        configurable: true,
      })
      expect(detectBrowserLocale()).toBe(getDefaultLocale())
    })

    it('checks navigator.languages array', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'fr',
        writable: true,
        configurable: true,
      })
      Object.defineProperty(navigator, 'languages', {
        value: ['fr', 'pa', 'en'],
        writable: true,
        configurable: true,
      })
      expect(detectBrowserLocale()).toBe('pa')
    })
  })
})
