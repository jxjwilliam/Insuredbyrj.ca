# React Hooks API Contract

## Translation Context

### `I18nProvider`

React Context Provider component that manages i18n state.

**Props**:
```typescript
interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: string;  // Optional initial locale (defaults to 'en')
  translations?: TranslationObject;  // Optional preloaded translations
}
```

**Usage**:
```typescript
<I18nProvider initialLocale="pa">
  <App />
</I18nProvider>
```

**State Managed**:
- Current locale
- Loaded translations
- Loading state
- Error state

## Hooks

### `useTranslation(): TranslationHook`

Main hook for accessing translations and locale management.

**Returns**:
```typescript
interface TranslationHook {
  t: (key: TranslationKey, fallback?: string) => string;
  locale: string;
  setLocale: (locale: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  translations: TranslationObject;
}
```

**Example**:
```typescript
const { t, locale, setLocale } = useTranslation();

// Get translation
const headline = t('hero.headline');

// Change language
await setLocale('pa');
```

**Behavior**:
- `t()`: Returns translated string for key, falls back to English if missing
- `setLocale()`: Asynchronously loads new translations and updates state
- `loading`: `true` while translations are loading
- `error`: Contains error if translation loading fails

### `useLocale(): LocaleHook`

Hook for accessing current locale without translation functions.

**Returns**:
```typescript
interface LocaleHook {
  locale: string;
  setLocale: (locale: string) => Promise<void>;
  supportedLocales: LanguageConfig[];
  defaultLocale: string;
}
```

**Example**:
```typescript
const { locale, setLocale, supportedLocales } = useLocale();

// Check current locale
if (locale === 'pa') {
  // Punjabi-specific logic
}

// Get all supported languages
supportedLocales.forEach(lang => {
  console.log(lang.nameEn);
});
```

## Component Integration

### Server Components

Server components cannot use hooks. Use utility functions directly:

```typescript
// app/[locale]/page.tsx
import { loadTranslations } from '@/lib/i18n/utils';

export default async function Page({ params }: { params: { locale: string } }) {
  const translations = await loadTranslations(params.locale);
  const headline = getTranslation(translations, 'hero.headline');
  
  return <h1>{headline}</h1>;
}
```

### Client Components

Client components use hooks:

```typescript
'use client';

import { useTranslation } from '@/lib/i18n/hooks';

export function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('hero.headline')}</h1>
  );
}
```

## Error Boundaries

Translation errors are handled gracefully:

1. **Missing Translation Key**: Returns fallback (English or provided fallback)
2. **Translation Load Error**: Sets error state, falls back to English
3. **Invalid Locale**: Defaults to English, logs warning

## Performance

- **Initial Render**: Uses SSR-provided translations (no loading state)
- **Language Switch**: Shows loading state, updates when complete
- **Caching**: Translations cached in context, no re-fetch on re-render
