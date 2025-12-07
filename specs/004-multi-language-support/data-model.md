# Data Model: Multi-Language Support

**Date**: 2025-01-27  
**Feature**: Multi-Language Support  
**Phase**: 1 - Design & Contracts

## Entities

### Language Configuration

Represents the list of supported languages with their metadata.

**Fields**:
- `code` (string, required): ISO 639-1 language code (e.g., 'en', 'pa', 'hi')
- `name` (string, required): Display name in native language (e.g., 'English', 'ਪੰਜਾਬੀ', 'हिन्दी')
- `nameEn` (string, required): Display name in English (e.g., 'English', 'Punjabi', 'Hindi')
- `flag` (string, optional): Flag emoji or icon identifier (e.g., '🇬🇧', '🇮🇳', '🇮🇳')
- `rtl` (boolean, default: false): Right-to-left language support (not used initially)

**Validation Rules**:
- `code` must be 2-5 characters, lowercase
- `code` must be unique across all languages
- `name` and `nameEn` must be non-empty strings
- At least one language must be marked as default

**Default Language**: English ('en') is always the default and fallback language.

**Example**:
```typescript
{
  code: 'pa',
  name: 'ਪੰਜਾਬੀ',
  nameEn: 'Punjabi',
  flag: '🇮🇳',
  rtl: false
}
```

### Translation Content

Represents the translated versions of all text content, organized hierarchically.

**Structure**: Nested object matching the structure of `lib/constants.ts`

**Fields** (dynamic, based on content structure):
- Top-level keys match sections: `hero`, `navigation`, `trustIndicators`, `insurancePlans`, `faq`, etc.
- Nested keys match the original constants structure
- Values are strings (translated text) or nested objects

**Validation Rules**:
- All translation files must have the same top-level structure
- Missing keys fall back to English translation
- Empty strings are allowed (for optional content)
- String values must be valid UTF-8 (supports Unicode for Punjabi/Hindi)

**Example Structure**:
```json
{
  "hero": {
    "headline": "Life Insurance That Stands the Test of Time",
    "subheadline": "Protecting British Columbia families...",
    "primaryCTA": {
      "text": "Get Your Free Quote",
      "href": "/get-quote"
    }
  },
  "navigation": {
    "whyChoose": "Why Choose",
    "plans": "Plans"
  }
}
```

**File Organization**:
- `lib/i18n/translations/en.json` - English (source of truth)
- `lib/i18n/translations/pa.json` - Punjabi translations
- `lib/i18n/translations/hi.json` - Hindi translations

### Language Preference

Represents the user's selected language preference, stored client-side.

**Storage Locations**:
1. **localStorage** (primary): Key `i18n-locale`, value: language code string
2. **Cookie** (SSR fallback): Name `NEXT_LOCALE`, value: language code string

**Fields** (implicit):
- `locale` (string): Language code (e.g., 'en', 'pa', 'hi')

**Validation Rules**:
- Must be a valid supported language code
- Invalid values default to 'en'
- Expires: localStorage persists indefinitely, cookie expires in 1 year

**Example**:
```typescript
// localStorage.getItem('i18n-locale') === 'pa'
// Cookie: NEXT_LOCALE=pa; Max-Age=31536000
```

### Translation Context State

Represents the runtime state of the i18n system in React Context.

**Fields**:
- `locale` (string, required): Current active language code
- `translations` (object, required): Loaded translation object for current locale
- `loading` (boolean): Whether translations are currently loading
- `error` (Error | null): Any error that occurred during translation loading
- `setLocale` (function): Function to change the active locale
- `t` (function): Translation function to get translated strings by key

**State Transitions**:
1. **Initial**: `{ locale: 'en', translations: {}, loading: false, error: null }`
2. **Loading**: `{ locale: 'pa', translations: {}, loading: true, error: null }`
3. **Loaded**: `{ locale: 'pa', translations: {...}, loading: false, error: null }`
4. **Error**: `{ locale: 'pa', translations: {}, loading: false, error: Error }`

**Validation Rules**:
- `locale` must be a supported language code
- `translations` must match the expected structure (validated at load time)
- `setLocale` must update both locale and trigger translation loading

## Relationships

### Language Configuration ↔ Translation Content

- **One-to-Many**: One language configuration has one translation file
- **Relationship**: Language `code` maps to translation file name (`{code}.json`)
- **Constraint**: Every supported language must have a corresponding translation file

### Language Preference ↔ Language Configuration

- **Many-to-One**: Many users can prefer one language
- **Relationship**: Preference `locale` field references Language Configuration `code`
- **Constraint**: Preference locale must exist in supported languages list

### Translation Context ↔ Translation Content

- **One-to-One**: Context loads one translation file at a time
- **Relationship**: Context `locale` determines which translation file to load
- **Constraint**: Context must load translation file matching current locale

## Data Flow

### Language Selection Flow

1. User clicks language selector dropdown
2. User selects language (e.g., 'pa')
3. `setLocale('pa')` called in context
4. Context updates `locale` state
5. Context checks if translations for 'pa' are cached
6. If not cached, load `pa.json` translation file
7. Update `translations` state with loaded data
8. Update `localStorage` and cookie with new preference
9. Update URL to `/pa/...` (if on a page)
10. Re-render components with new translations

### Initial Page Load Flow

1. Middleware intercepts request
2. Check URL for locale prefix (`/pa/...`)
3. If no locale in URL, check cookie `NEXT_LOCALE`
4. If no cookie, read `Accept-Language` header
5. Match to supported language or default to 'en'
6. Redirect to `/{locale}/...` if needed
7. Set cookie with detected locale
8. Server renders page with locale from URL params
9. Client hydrates, reads `localStorage` for preference
10. If localStorage differs from URL, update URL to match preference
11. Load translations for locale
12. Render page with translations

### Translation Lookup Flow

1. Component calls `t('hero.headline')`
2. Translation function receives key
3. Split key by '.' to navigate nested object
4. Look up value in current `translations` object
5. If found, return translated string
6. If not found, fall back to English translation
7. If English also missing, return key as fallback (with warning in dev)

## Constraints

### Business Rules

1. **Default Language**: English ('en') is always available and used as fallback
2. **Required Translations**: All user-facing content must have English translation
3. **Optional Translations**: Other languages can have missing keys (fallback to English)
4. **Language Addition**: New languages can be added by:
   - Adding language config to `lib/i18n/config.ts`
   - Creating translation file `lib/i18n/translations/{code}.json`
   - No code changes needed (infrastructure supports it)

### Technical Constraints

1. **Type Safety**: Translation keys must be typed to prevent typos
2. **Bundle Size**: Translations loaded on-demand, not bundled
3. **Performance**: Language switch must complete in <1 second
4. **SEO**: All language versions must be accessible via URL
5. **Accessibility**: Language selector must be keyboard accessible

## Migration from Constants

The existing `lib/constants.ts` structure will be migrated to translation files:

**Current Structure**:
```typescript
export const landingPageContent: LandingPageContent = {
  hero: { headline: '...', subheadline: '...' },
  navigation: [...],
  // ...
}
```

**New Structure**:
```json
// en.json
{
  "hero": {
    "headline": "...",
    "subheadline": "..."
  },
  "navigation": [...]
}
```

**Migration Strategy**:
1. Extract all string values from `constants.ts`
2. Create nested JSON structure matching TypeScript structure
3. Create translation files for each language (pa.json, hi.json)
4. Update components to use `t()` function instead of direct constants
5. Keep TypeScript types for structure validation

## Validation

### Translation File Validation

- **Structure**: Must match English file structure (same keys)
- **Encoding**: Must be valid UTF-8 (for Punjabi/Hindi characters)
- **Completeness**: English file must have all keys (no missing translations)
- **Format**: Valid JSON syntax

### Runtime Validation

- **Locale Code**: Must be in supported languages list
- **Translation Keys**: Must exist in translation file (warn if missing, fallback to English)
- **Storage**: localStorage and cookie must contain valid locale codes

## Performance Considerations

### Translation Loading

- **Lazy Loading**: Load only active language's translations
- **Caching**: Cache loaded translations in memory (React Context)
- **Preloading**: Optionally preload likely next language on hover

### Bundle Size

- **Zero Impact**: Translation files not included in initial bundle
- **On-Demand**: Loaded via dynamic import when needed
- **Gzipped Size**: Each translation file ~50-100KB (estimated)

### Runtime Performance

- **Lookup**: O(1) for flat keys, O(n) for nested keys (n = depth)
- **Switch**: <100ms (in-memory cache, no network if already loaded)
