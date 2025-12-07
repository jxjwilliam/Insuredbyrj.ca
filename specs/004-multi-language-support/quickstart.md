# Quickstart Guide: Multi-Language Support

**Date**: 2025-01-27  
**Feature**: Multi-Language Support  
**Target**: Developers implementing the feature

## Prerequisites

- Next.js 15.0.0+ with App Router
- TypeScript 5.x
- React 18.3.1+
- shadcn/ui components installed
- Existing content in `lib/constants.ts`

## Setup Steps

### 1. Create i18n Directory Structure

```bash
mkdir -p lib/i18n/translations
```

### 2. Create Language Configuration

Create `lib/i18n/config.ts`:

```typescript
export interface LanguageConfig {
  code: string;
  name: string;
  nameEn: string;
  flag?: string;
  rtl?: boolean;
}

export const supportedLanguages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nameEn: 'English',
    flag: '🇬🇧',
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
];

export const defaultLocale = 'en';

export function getSupportedLanguages(): LanguageConfig[] {
  return supportedLanguages;
}

export function getDefaultLocale(): string {
  return defaultLocale;
}

export function isSupportedLocale(locale: string): boolean {
  return supportedLanguages.some(lang => lang.code === locale);
}
```

### 3. Create Translation Files

Extract content from `lib/constants.ts` and create JSON files:

**`lib/i18n/translations/en.json`** (source of truth):
```json
{
  "hero": {
    "headline": "Life Insurance That Stands the Test of Time",
    "subheadline": "Protecting British Columbia families with transparent, affordable coverage built for the long haul. Get the peace of mind you deserve.",
    "primaryCTA": {
      "text": "Get Your Free Quote",
      "href": "/get-quote"
    },
    "secondaryCTA": {
      "text": "Speak to a BC Advisor",
      "href": "/contact"
    }
  },
  "navigation": {
    "whyChoose": "Why Choose",
    "plans": "Plans",
    "howItWorks": "How It Works",
    "faq": "FAQ"
  }
}
```

**`lib/i18n/translations/pa.json`** (Punjabi translations):
```json
{
  "hero": {
    "headline": "ਜੀਵਨ ਬੀਮਾ ਜੋ ਸਮੇਂ ਦੀ ਕਸਵੱਟੀ ਖੜ੍ਹਾ ਹੈ",
    "subheadline": "ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ ਦੇ ਪਰਿਵਾਰਾਂ ਨੂੰ ਪਾਰਦਰਸ਼ੀ, ਸਸਤੀ ਕਵਰੇਜ ਨਾਲ ਸੁਰੱਖਿਆ ਦੇਣਾ। ਤੁਹਾਨੂੰ ਜੋ ਸ਼ਾਂਤੀ ਚਾਹੀਦੀ ਹੈ ਉਹ ਪ੍ਰਾਪਤ ਕਰੋ।"
  }
}
```

**`lib/i18n/translations/hi.json`** (Hindi translations):
```json
{
  "hero": {
    "headline": "जीवन बीमा जो समय की कसौटी पर खरा उतरता है",
    "subheadline": "ब्रिटिश कोलंबिया के परिवारों को पारदर्शी, सस्ती कवरेज के साथ सुरक्षा प्रदान करना। आप जो मन की शांति चाहते हैं वह प्राप्त करें।"
  }
}
```

### 4. Create i18n Utilities

Create `lib/i18n/utils.ts`:

```typescript
import type { TranslationObject } from './types';
import { isSupportedLocale, getDefaultLocale } from './config';

let translationCache: Record<string, TranslationObject> = {};

export async function loadTranslations(locale: string): Promise<TranslationObject> {
  if (!isSupportedLocale(locale)) {
    locale = getDefaultLocale();
  }

  // Check cache first
  if (translationCache[locale]) {
    return translationCache[locale];
  }

  try {
    const translations = await import(`./translations/${locale}.json`);
    translationCache[locale] = translations.default;
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to English
    if (locale !== getDefaultLocale()) {
      return loadTranslations(getDefaultLocale());
    }
    throw error;
  }
}

export function getTranslation(
  translations: TranslationObject,
  key: string,
  fallback?: string
): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback || key;
    }
  }

  return typeof value === 'string' ? value : (fallback || key);
}

export function getStoredLocale(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('i18n-locale');
}

export function setStoredLocale(locale: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('i18n-locale', locale);
}

export function detectBrowserLocale(): string {
  if (typeof window === 'undefined') return getDefaultLocale();
  
  const browserLang = navigator.language.split('-')[0];
  return isSupportedLocale(browserLang) ? browserLang : getDefaultLocale();
}
```

### 5. Create React Context and Hooks

Create `lib/i18n/context.tsx`:

```typescript
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadTranslations, getStoredLocale, setStoredLocale, detectBrowserLocale } from './utils';
import { getDefaultLocale, isSupportedLocale } from './config';
import type { TranslationObject } from './types';

interface I18nContextValue {
  locale: string;
  translations: TranslationObject;
  loading: boolean;
  error: Error | null;
  setLocale: (locale: string) => Promise<void>;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode;
  initialLocale?: string;
}) {
  const [locale, setLocaleState] = useState<string>(initialLocale || getDefaultLocale());
  const [translations, setTranslations] = useState<TranslationObject>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setLocale = useCallback(async (newLocale: string) => {
    if (!isSupportedLocale(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const loadedTranslations = await loadTranslations(newLocale);
      setLocaleState(newLocale);
      setTranslations(loadedTranslations);
      setStoredLocale(newLocale);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load translations'));
      console.error('Translation loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const t = useCallback((key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }

    return typeof value === 'string' ? value : (fallback || key);
  }, [translations]);

  // Load initial translations
  useEffect(() => {
    const stored = getStoredLocale();
    const detected = detectBrowserLocale();
    const initial = initialLocale || stored || detected;
    
    if (initial && isSupportedLocale(initial)) {
      setLocale(initial);
    } else {
      setLocale(getDefaultLocale());
    }
  }, [initialLocale, setLocale]);

  return (
    <I18nContext.Provider value={{ locale, translations, loading, error, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}
```

Create `lib/i18n/hooks.ts`:

```typescript
export { useTranslation } from './context';
export { getSupportedLanguages } from './config';

export function useLocale() {
  const { locale, setLocale } = useTranslation();
  const supportedLocales = getSupportedLanguages();
  const defaultLocale = getDefaultLocale();

  return {
    locale,
    setLocale,
    supportedLocales,
    defaultLocale,
  };
}
```

### 6. Create Middleware

Create `middleware.ts` (project root):

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDefaultLocale, isSupportedLocale, supportedLanguages } from './lib/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang.code}/`) || pathname === `/${lang.code}`
  );

  // If pathname already has locale, set cookie and pass through
  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1];
    if (isSupportedLocale(locale)) {
      const response = NextResponse.next();
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      });
      return response;
    }
  }

  // Detect locale
  let locale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (!locale || !isSupportedLocale(locale)) {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const browserLang = acceptLanguage.split(',')[0].split('-')[0];
      locale = isSupportedLocale(browserLang) ? browserLang : getDefaultLocale();
    } else {
      locale = getDefaultLocale();
    }
  }

  // Redirect to locale-prefixed URL
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  const response = NextResponse.redirect(newUrl);
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### 7. Restructure App Directory

Move existing routes under `[locale]`:

```bash
# Create locale directory
mkdir -p app/\[locale\]

# Move routes
mv app/page.tsx app/\[locale\]/page.tsx
mv app/\(routes\) app/\[locale\]/\(routes\)
```

Create `app/[locale]/layout.tsx`:

```typescript
import { I18nProvider } from '@/lib/i18n/context';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Generate locale-specific metadata
  return {
    title: '...', // Use translations
    description: '...',
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <I18nProvider initialLocale={params.locale}>
      {children}
    </I18nProvider>
  );
}
```

### 8. Create Language Selector Component

Create `components/shared/language-selector.tsx`:

```typescript
'use client';

import { useLocale } from '@/lib/i18n/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSelector() {
  const { locale, setLocale, supportedLocales } = useLocale();
  const currentLanguage = supportedLocales.find(lang => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        {currentLanguage?.flag} {currentLanguage?.nameEn}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {supportedLocales.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={locale === lang.code ? 'bg-accent' : ''}
          >
            {lang.flag} {lang.nameEn}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### 9. Update Header Component

Update `components/layout/header.tsx`:

```typescript
import { LanguageSelector } from '@/components/shared/language-selector';

export function Header() {
  return (
    <header>
      {/* Existing header content */}
      <LanguageSelector />
    </header>
  );
}
```

### 10. Update Components to Use Translations

Replace direct constant access with `t()` function:

```typescript
'use client';

import { useTranslation } from '@/lib/i18n/hooks';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('hero.headline')}</h1>
      <p>{t('hero.subheadline')}</p>
    </div>
  );
}
```

## Testing

### Unit Tests

```typescript
// lib/i18n/__tests__/utils.test.ts
import { loadTranslations, getTranslation } from '../utils';

describe('i18n utils', () => {
  it('loads English translations', async () => {
    const translations = await loadTranslations('en');
    expect(translations.hero.headline).toBeDefined();
  });

  it('gets translation by key', () => {
    const translations = { hero: { headline: 'Test' } };
    expect(getTranslation(translations, 'hero.headline')).toBe('Test');
  });
});
```

### E2E Tests

```typescript
// tests/e2e/language-switch.spec.ts
import { test, expect } from '@playwright/test';

test('user can switch language', async ({ page }) => {
  await page.goto('/en/');
  await page.click('[aria-label="Select language"]');
  await page.click('text=Punjabi');
  await expect(page).toHaveURL('/pa/');
  await expect(page.locator('h1')).toContainText('ਜੀਵਨ ਬੀਮਾ');
});
```

## Next Steps

1. Migrate all content from `lib/constants.ts` to translation files
2. Update all components to use `t()` function
3. Add translations for Punjabi and Hindi
4. Test language switching on all pages
5. Verify SEO (hreflang tags, metadata)
6. Test accessibility (keyboard navigation, screen readers)

## Troubleshooting

### Translations not loading
- Check file paths match locale codes
- Verify JSON syntax is valid
- Check browser console for errors

### Language switch not working
- Verify `I18nProvider` wraps the app
- Check `setLocale` is called correctly
- Ensure translations are loaded before rendering

### URL routing issues
- Verify middleware is in project root
- Check matcher config excludes API routes
- Ensure `[locale]` directory structure is correct
