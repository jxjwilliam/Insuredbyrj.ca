# Research: Multi-Language Support

**Date**: 2025-01-27  
**Feature**: Multi-Language Support  
**Phase**: 0 - Research & Technology Decisions

## Technology Stack Decisions

### Internationalization Library Choice

**Decision**: Use a custom lightweight i18n solution built on React Context API and static JSON translation files, rather than `next-intl` or other third-party libraries.

**Rationale**: 
- **Minimal Dependencies**: Constitution emphasizes simplicity (YAGNI principle). We only need 3 languages initially with straightforward translation needs.
- **Full Control**: Custom solution allows precise control over bundle size, loading strategy, and integration with existing `lib/constants.ts` structure.
- **Type Safety**: Can create TypeScript types directly from translation keys, ensuring compile-time safety without additional tooling.
- **Performance**: No runtime translation library overhead. Translations loaded on-demand, zero impact on initial bundle.
- **Existing Structure**: Current content is in `lib/constants.ts` - custom solution can migrate this more naturally than forcing it into a library's structure.
- **Constitution Compliance**: Custom solution ensures we meet performance targets (bundle size <200KB gzipped) and maintainability standards.

**Alternatives considered**:
- **next-intl**: Excellent library for App Router, but adds ~15KB to bundle, more features than needed (date/number formatting not required), requires restructuring existing constants.
- **next-i18next**: Not compatible with App Router (Pages Router only).
- **react-i18next**: Works with App Router but adds significant bundle size and complexity for simple static content translation.

### URL Routing Strategy

**Decision**: Use Next.js App Router dynamic route segments `[locale]` with middleware for locale detection and routing.

**Rationale**:
- **SEO-Friendly**: Language-specific URLs (`/en/`, `/pa/`, `/hi/`) improve search engine indexing and allow direct linking to language versions.
- **Native Next.js**: Uses built-in App Router features, no additional routing library needed.
- **SSR/SSG Compatible**: Works seamlessly with Next.js static generation and server-side rendering.
- **Type-Safe**: TypeScript can infer `params.locale` type from route structure.
- **Hreflang Support**: Enables proper SEO hreflang tag implementation.

**Implementation Pattern**:
```typescript
// app/[locale]/layout.tsx
export default function LocaleLayout({ params }: { params: { locale: string } }) {
  // Access locale from params
}

// middleware.ts
export function middleware(request: NextRequest) {
  // Detect locale, redirect if needed
}
```

**Alternatives considered**:
- **Query Parameters** (`/?lang=pa`): Poor SEO, not shareable, doesn't support hreflang properly.
- **Subdomains** (`pa.example.com`): Requires DNS configuration, more complex deployment.
- **Cookie-based**: No URL indication of language, poor for sharing and SEO.

### Translation File Structure

**Decision**: Use JSON files organized by language code in `lib/i18n/translations/` with a flat key-value structure matching the existing `constants.ts` structure.

**Rationale**:
- **Simple & Maintainable**: Easy for translators to work with JSON files.
- **Type-Safe**: Can generate TypeScript types from JSON structure.
- **On-Demand Loading**: Load only the active language's translations.
- **Version Control Friendly**: JSON diffs are clear and easy to review.
- **No Build Step**: No need for translation compilation or code generation.

**Structure**:
```json
// lib/i18n/translations/en.json
{
  "hero": {
    "headline": "Life Insurance That Stands the Test of Time",
    "subheadline": "Protecting British Columbia families..."
  },
  "navigation": {
    "whyChoose": "Why Choose",
    "plans": "Plans"
  }
}
```

**Alternatives considered**:
- **Nested JSON with namespaces**: More complex, harder to maintain for our use case.
- **YAML files**: Less common, requires additional parser dependency.
- **Database/CMS**: Overkill for static content, adds complexity and latency.

### Language Selector Component

**Decision**: Use shadcn/ui `DropdownMenu` component for the language selector in the header.

**Rationale**:
- **Constitution Compliance**: Must use shadcn/ui components per constitution requirements.
- **Accessibility**: Built on Radix UI primitives with full keyboard navigation and screen reader support (WCAG 2.1 AA compliant).
- **Consistent Design**: Matches existing design system.
- **Customizable**: Fully customizable with Tailwind CSS to match brand.
- **TypeScript**: Full TypeScript support.

**Implementation**: Create `components/shared/language-selector.tsx` using shadcn/ui DropdownMenu.

**Alternatives considered**:
- **Custom dropdown**: Would require building accessibility features from scratch, violates constitution (must use shadcn/ui).
- **Select component**: Less flexible for custom styling, not ideal for language flags/icons.

### Browser Language Detection

**Decision**: Detect browser language in middleware and client-side, highlight matching language in dropdown on first visit, but default to English until user explicitly selects.

**Rationale**:
- **User Control**: Respects user agency - they may prefer English even if browser is set to another language.
- **Better UX**: Highlights suggested language without forcing it, reducing surprise/disorientation.
- **Constitution Compliance**: Aligns with UX consistency principle (predictable behavior).

**Implementation**:
- Middleware reads `Accept-Language` header, stores in cookie if matching supported language.
- Client-side reads cookie and highlights (but doesn't auto-select) matching language.
- User must explicitly click to change language.

**Alternatives considered**:
- **Auto-switch**: Could surprise users, especially if browser language doesn't match their preference.
- **No detection**: Misses opportunity to help users discover language options.

### Language Preference Persistence

**Decision**: Use browser `localStorage` as primary storage with cookie fallback for SSR compatibility.

**Rationale**:
- **Client-Side Preference**: Language is a client-side preference, localStorage is appropriate.
- **SSR Compatibility**: Cookie allows server to read preference during SSR for initial render.
- **No Server State**: No need for user accounts or server-side storage.
- **Fast Access**: localStorage is synchronous and fast.

**Implementation**:
- Store in `localStorage` key: `i18n-locale`
- Also set cookie: `NEXT_LOCALE` for SSR
- Read on page load, update URL and content accordingly.

**Alternatives considered**:
- **Cookies only**: More server overhead, sent with every request.
- **Session storage**: Doesn't persist across sessions (violates FR-004).
- **Server-side storage**: Requires user accounts, unnecessary complexity.

### Translation Loading Strategy

**Decision**: Load translations on-demand per language, cache in memory, lazy load on language switch.

**Rationale**:
- **Performance**: Only load active language, zero impact on initial bundle.
- **Fast Switching**: Cache loaded translations in memory for instant switching.
- **Bundle Size**: Keeps bundle size minimal (constitution requirement: <200KB gzipped).
- **Scalability**: Easy to add more languages without affecting existing bundle.

**Implementation**:
- Translations loaded via dynamic import: `import(`./translations/${locale}.json`)`
- Cache in React Context or module-level variable.
- Preload next likely language on hover (optional optimization).

**Alternatives considered**:
- **Bundle all languages**: Would increase bundle size significantly, violates performance requirements.
- **Server-side only**: Adds latency, doesn't support instant client-side switching.

### TypeScript Type Generation

**Decision**: Create TypeScript types manually from translation structure, ensuring type safety for translation keys.

**Rationale**:
- **Type Safety**: Prevents typos in translation keys, catches missing translations at compile time.
- **IDE Support**: Autocomplete for translation keys in development.
- **No Build Step**: Manual types are simpler than code generation tools.
- **Maintainable**: Types live alongside translations, easy to update.

**Implementation**:
```typescript
// lib/i18n/types.ts
export type TranslationKey = 
  | 'hero.headline'
  | 'hero.subheadline'
  | 'navigation.whyChoose'
  // ... etc
```

**Alternatives considered**:
- **Code generation**: Adds build complexity, requires additional tooling.
- **No types**: Loses type safety, increases runtime errors.

### Middleware Implementation

**Decision**: Create Next.js middleware to handle locale detection, URL rewriting, and initial redirects.

**Rationale**:
- **Centralized Logic**: Single place for locale routing logic.
- **SEO**: Proper redirects for SEO (301 for language changes).
- **Performance**: Runs at edge, minimal latency.
- **Browser Detection**: Can read `Accept-Language` header server-side.

**Implementation**:
- Check if URL has locale prefix.
- If not, detect from cookie or `Accept-Language` header.
- Redirect to appropriate locale URL.
- Set cookie for future requests.

**Alternatives considered**:
- **Client-side only**: Can't handle initial server render correctly, poor SEO.
- **API routes**: Adds unnecessary round-trip, slower than middleware.

## Performance Considerations

### Bundle Size Impact

- **Translation Files**: Loaded on-demand, zero initial bundle impact.
- **i18n Utilities**: ~2-3KB gzipped (React Context + helper functions).
- **Language Selector**: Uses existing shadcn/ui DropdownMenu (already in bundle).
- **Total Impact**: <5KB gzipped, well within constitution limits.

### Runtime Performance

- **Language Switch**: <100ms (in-memory cache, no network request).
- **Initial Load**: No impact (translations loaded after page load if needed).
- **SSR**: First render uses cookie-detected locale, subsequent renders use localStorage.

### SEO Performance

- **Hreflang Tags**: Properly implemented for all language versions.
- **URL Structure**: Language-specific URLs improve indexing.
- **Metadata**: Language-specific metadata for each locale.

## Accessibility Considerations

- **Keyboard Navigation**: shadcn/ui DropdownMenu provides full keyboard support.
- **Screen Readers**: Proper ARIA labels and roles.
- **Focus Management**: Focus returns to trigger after language selection.
- **Language Attribute**: HTML `lang` attribute updates with language change.

## Testing Strategy

- **Unit Tests**: Translation utility functions, locale detection logic.
- **Component Tests**: Language selector component, translation context provider.
- **E2E Tests**: Full language switching flow, URL routing, persistence.
- **Accessibility Tests**: Keyboard navigation, screen reader compatibility.

## Migration Strategy

1. **Phase 1**: Set up i18n infrastructure (types, utilities, translation files structure).
2. **Phase 2**: Migrate `lib/constants.ts` to translation files.
3. **Phase 3**: Update components to use translation hooks.
4. **Phase 4**: Add language selector to header.
5. **Phase 5**: Implement middleware and URL routing.
6. **Phase 6**: Add browser detection and persistence.

## Dependencies

### New Dependencies
- None (using built-in Next.js and React features)

### Existing Dependencies Used
- `next` (15.0.0): App Router, middleware, dynamic routes
- `react` (18.3.1): Context API, hooks
- `shadcn/ui`: DropdownMenu component (already installed)

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Translation file size grows large | Performance degradation | Implement code splitting per language, lazy load translations |
| Missing translations | Poor UX | Fallback to English, type system catches missing keys at compile time |
| URL routing conflicts | Broken routes | Careful middleware configuration, test all routes |
| Browser detection fails | Wrong language shown | Always default to English, user can override |

## Open Questions Resolved

✅ **Q: Which i18n library to use?**  
A: Custom lightweight solution (no library needed)

✅ **Q: How to structure translation files?**  
A: JSON files matching existing constants structure

✅ **Q: How to handle URL routing?**  
A: Next.js `[locale]` dynamic route segments with middleware

✅ **Q: How to persist language preference?**  
A: localStorage + cookie for SSR compatibility

✅ **Q: How to detect browser language?**  
A: Middleware reads Accept-Language, highlights but doesn't auto-switch

## Next Steps

Proceed to Phase 1: Design & Contracts
- Create data model for translations
- Design API contracts for i18n utilities
- Create quickstart guide
