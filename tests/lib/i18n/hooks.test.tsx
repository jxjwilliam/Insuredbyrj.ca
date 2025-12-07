/**
 * Unit tests for i18n React hooks
 * 
 * Tests useTranslation and useLocale hooks, including
 * translation function, locale management, and error handling.
 */

import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { I18nProvider, useTranslation } from '@/lib/i18n/context'
import { useLocale } from '@/lib/i18n/hooks'

// Mock translation loading
jest.mock('@/lib/i18n/utils', () => ({
  loadTranslations: jest.fn(),
  getStoredLocale: jest.fn(() => null),
  setStoredLocale: jest.fn(),
  setCookieLocale: jest.fn(),
  detectBrowserLocale: jest.fn(() => 'en'),
}))

const mockTranslations = {
  hero: {
    headline: 'Test Headline',
    subheadline: 'Test Subheadline',
  },
  navigation: {
    whyChoose: 'Why Choose',
  },
}

describe('i18n hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const { loadTranslations } = require('@/lib/i18n/utils')
    loadTranslations.mockResolvedValue(mockTranslations)
  })

  describe('useTranslation', () => {
    it('provides translation function', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      )

      const { result } = renderHook(() => useTranslation(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.t('hero.headline')).toBe('Test Headline')
      expect(result.current.t('navigation.whyChoose')).toBe('Why Choose')
    })

    it('provides current locale', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider initialLocale="pa">{children}</I18nProvider>
      )

      const { result } = renderHook(() => useTranslation(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.locale).toBe('pa')
    })

    it('allows changing locale', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      )

      const { result } = renderHook(() => useTranslation(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.setLocale('hi')
      })

      expect(result.current.locale).toBe('hi')
    })

    it('shows loading state during translation load', async () => {
      const { loadTranslations } = require('@/lib/i18n/utils')
      let resolveLoad: (value: any) => void
      const loadPromise = new Promise((resolve) => {
        resolveLoad = resolve
      })
      loadTranslations.mockReturnValue(loadPromise)

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      )

      const { result } = renderHook(() => useTranslation(), { wrapper })

      // Should be loading initially
      expect(result.current.loading).toBe(true)

      // Resolve the load
      await act(async () => {
        resolveLoad!(mockTranslations)
        await loadPromise
      })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })

    it('handles translation errors gracefully', async () => {
      const { loadTranslations } = require('@/lib/i18n/utils')
      loadTranslations.mockRejectedValue(new Error('Load failed'))

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      )

      const { result } = renderHook(() => useTranslation(), { wrapper })

      await waitFor(() => {
        expect(result.current.error).not.toBeNull()
      })

      expect(result.current.error?.message).toBe('Load failed')
    })

    it('throws error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        renderHook(() => useTranslation())
      }).toThrow('useTranslation must be used within I18nProvider')

      consoleSpy.mockRestore()
    })
  })

  describe('useLocale', () => {
    it('provides locale and setLocale', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider initialLocale="pa">{children}</I18nProvider>
      )

      const { result } = renderHook(() => useLocale(), { wrapper })

      await waitFor(() => {
        expect(result.current.locale).toBe('pa')
      })

      expect(result.current.supportedLocales).toHaveLength(3)
      expect(result.current.defaultLocale).toBe('en')
    })

    it('allows changing locale', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      )

      const { result } = renderHook(() => useLocale(), { wrapper })

      await waitFor(() => {
        expect(result.current.locale).toBeDefined()
      })

      await act(async () => {
        await result.current.setLocale('hi')
      })

      expect(result.current.locale).toBe('hi')
    })
  })
})
