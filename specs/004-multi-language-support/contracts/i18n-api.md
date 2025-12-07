# i18n Core API Contract

## Language Configuration

### `getSupportedLanguages(): LanguageConfig[]`

Returns the list of all supported languages.

**Returns**: Array of language configuration objects

**Example**:
```typescript
const languages = getSupportedLanguages();
// [
//   { code: 'en', name: 'English', nameEn: 'English', flag: '🇬🇧', rtl: false },
//   { code: 'pa', name: 'ਪੰਜਾਬੀ', nameEn: 'Punjabi', flag: '🇮🇳', rtl: false },
//   { code: 'hi', name: 'हिन्दी', nameEn: 'Hindi', flag: '🇮🇳', rtl: false }
// ]
```

### `getDefaultLocale(): string`

Returns the default language code.

**Returns**: `'en'` (always English)

### `isSupportedLocale(locale: string): boolean`

Checks if a locale code is supported.

**Parameters**:
- `locale` (string): Language code to check

**Returns**: `true` if locale is supported, `false` otherwise

**Example**:
```typescript
isSupportedLocale('pa') // true
isSupportedLocale('fr') // false
```

## Translation Loading

### `loadTranslations(locale: string): Promise<TranslationObject>`

Loads translation file for the specified locale.

**Parameters**:
- `locale` (string): Language code to load

**Returns**: Promise resolving to translation object

**Throws**: Error if translation file cannot be loaded

**Example**:
```typescript
const translations = await loadTranslations('pa');
// { hero: { headline: '...', ... }, navigation: [...], ... }
```

### `getTranslation(translations: TranslationObject, key: string, fallback?: string): string`

Retrieves a translated string by key path.

**Parameters**:
- `translations` (TranslationObject): Loaded translation object
- `key` (string): Dot-separated key path (e.g., 'hero.headline')
- `fallback` (string, optional): Fallback value if key not found

**Returns**: Translated string or fallback value

**Example**:
```typescript
const headline = getTranslation(translations, 'hero.headline');
const subheadline = getTranslation(translations, 'hero.subheadline', 'Default text');
```

## Locale Persistence

### `getStoredLocale(): string | null`

Reads locale preference from localStorage.

**Returns**: Language code string or `null` if not set

**Example**:
```typescript
const locale = getStoredLocale(); // 'pa' or null
```

### `setStoredLocale(locale: string): void`

Saves locale preference to localStorage.

**Parameters**:
- `locale` (string): Language code to save

**Example**:
```typescript
setStoredLocale('pa');
```

### `getCookieLocale(): string | null`

Reads locale preference from cookie (for SSR).

**Returns**: Language code string or `null` if not set

### `setCookieLocale(locale: string): void`

Saves locale preference to cookie (for SSR).

**Parameters**:
- `locale` (string): Language code to save

## Browser Language Detection

### `detectBrowserLocale(): string`

Detects user's preferred language from browser settings.

**Returns**: Language code matching browser preference, or default locale if no match

**Example**:
```typescript
const detected = detectBrowserLocale(); // 'pa' if browser is set to Punjabi
```

## Type Definitions

### `LanguageConfig`

```typescript
interface LanguageConfig {
  code: string;        // ISO 639-1 language code
  name: string;        // Display name in native language
  nameEn: string;      // Display name in English
  flag?: string;       // Flag emoji or icon
  rtl?: boolean;       // Right-to-left support (default: false)
}
```

### `TranslationObject`

```typescript
type TranslationObject = {
  [key: string]: string | TranslationObject;
};
```

Nested object structure matching the content hierarchy from `lib/constants.ts`.

### `TranslationKey`

```typescript
type TranslationKey = 
  | 'hero.headline'
  | 'hero.subheadline'
  | 'hero.primaryCTA.text'
  | 'navigation.whyChoose'
  | 'navigation.plans'
  // ... all possible translation keys
```

String literal union type of all valid translation keys (generated from translation structure).

## Error Handling

All functions that can fail will throw errors with descriptive messages:

- **Translation Loading Errors**: `Error('Failed to load translations for locale: {locale}')`
- **Invalid Locale Errors**: `Error('Unsupported locale: {locale}')`
- **Missing Key Errors**: Logs warning in development, returns fallback in production

## Performance Guarantees

- `getSupportedLanguages()`: O(1) - returns cached array
- `loadTranslations()`: O(1) after first load (cached), O(n) for file size on first load
- `getTranslation()`: O(d) where d is depth of key path (typically <5)
- `getStoredLocale()` / `setStoredLocale()`: O(1) - localStorage operations
