# Implementation Plan: Multi-Language Support

**Branch**: `004-multi-language-support` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-multi-language-support/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement multi-language support for the insurance website targeting Vancouver/Surrey BC Punjabi and Hindi-speaking Indian community. The solution will add a language dropdown selector in the top navbar, support language-specific URLs with path prefixes (`/en/`, `/pa/`, `/hi/`), translate all user-facing content, and persist language preferences. The implementation will use Next.js App Router with a custom i18n solution optimized for static content translation and client-side language switching.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 15.0.0, React 18.3.1  
**Primary Dependencies**: Next.js App Router, React Context API, localStorage API, shadcn/ui components (DropdownMenu)  
**Storage**: Browser localStorage (with cookie fallback for SSR), static JSON translation files  
**Testing**: Jest, React Testing Library, Playwright (E2E)  
**Target Platform**: Web (Next.js App Router, server and client components)  
**Project Type**: Web application (Next.js single-page application)  
**Performance Goals**: Language switch updates content in <1s without page reload, no impact on Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)  
**Constraints**: Must work with existing App Router structure, preserve SSR/SSG benefits, maintain TypeScript strict mode, zero bundle size impact for unused languages  
**Scale/Scope**: 3 languages initially (English, Punjabi, Hindi), ~1000+ translatable strings from `lib/constants.ts`, infrastructure to add more languages without code changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with InsuredByRJ Constitution principles:

- **Code Quality**: ✅ TypeScript strict mode required, all translation functions will be typed, JSDoc for i18n utilities, proper error handling for missing translations
- **Testing Standards**: ✅ TDD approach for i18n utilities, 80%+ coverage for translation logic, 100% coverage for language switching critical path, E2E tests for language selection flows
- **User Experience**: ✅ Language dropdown using shadcn/ui DropdownMenu component, WCAG 2.1 AA compliant (keyboard navigation, screen reader support), consistent placement in header, smooth transitions
- **Performance**: ✅ Translation files loaded on-demand, no impact on initial bundle size, language switch <1s update time, maintain Core Web Vitals targets, translation caching strategy

**Constitution Compliance**: ✅ All principles satisfied. No violations expected.

## Project Structure

### Documentation (this feature)

```text
specs/004-multi-language-support/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── [locale]/                    # NEW: Language-prefixed routes
│   ├── layout.tsx              # NEW: Locale-aware root layout
│   ├── page.tsx                # NEW: Homepage with locale
│   ├── (routes)/
│   │   ├── contact/
│   │   │   └── page.tsx        # MODIFIED: Add locale support
│   │   ├── get-quote/
│   │   │   └── page.tsx        # MODIFIED: Add locale support
│   │   └── products/
│   │       └── [product]/      # MODIFIED: Add locale support
│   └── api/
│       └── newsletter/
│           └── subscribe/
│               └── route.ts     # MODIFIED: Add locale support
├── layout.tsx                   # MODIFIED: Add locale detection & redirect
└── page.tsx                     # REMOVED: Replaced by [locale]/page.tsx

lib/
├── i18n/                        # NEW: Internationalization utilities
│   ├── config.ts               # Language configuration
│   ├── translations/           # Translation files
│   │   ├── en.json
│   │   ├── pa.json
│   │   └── hi.json
│   ├── types.ts                # TypeScript types for translations
│   └── utils.ts                # Translation helper functions
├── constants.ts                 # MODIFIED: Convert to use i18n
└── types.ts                     # MODIFIED: Add locale types

components/
├── layout/
│   └── header.tsx              # MODIFIED: Add language dropdown
└── shared/
    └── language-selector.tsx   # NEW: Language dropdown component

public/
└── locales/                     # NEW: Optional static locale assets
    └── flags/                   # Language flag icons (optional)
```

**Structure Decision**: Using Next.js App Router dynamic route segments `[locale]` for language prefixes. This approach:
- Maintains SEO-friendly URLs (`/pa/`, `/hi/`, `/en/`)
- Preserves SSR/SSG benefits
- Allows type-safe locale handling
- Supports hreflang tags for SEO
- Keeps translation files as static JSON (no runtime translation service needed)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations expected. The implementation follows Next.js best practices and maintains constitution compliance.

## Phase Completion Status

### Phase 0: Research ✅ COMPLETE

- **research.md**: Created with technology decisions
  - Decision: Custom lightweight i18n solution (no third-party library)
  - URL routing: Next.js `[locale]` dynamic route segments
  - Translation files: JSON structure matching existing constants
  - Language selector: shadcn/ui DropdownMenu component
  - Browser detection: Highlight but don't auto-switch

### Phase 1: Design & Contracts ✅ COMPLETE

- **data-model.md**: Created with entity definitions
  - Language Configuration entity
  - Translation Content structure
  - Language Preference storage
  - Translation Context state management

- **contracts/**: Created API contracts
  - `i18n-api.md`: Core i18n utility functions
  - `react-hooks.md`: React hooks and context API
  - `middleware-api.md`: Next.js middleware contract
  - `component-api.md`: Language selector component API

- **quickstart.md**: Created implementation guide
  - Step-by-step setup instructions
  - Code examples for all components
  - Testing strategies
  - Troubleshooting guide

- **Agent Context**: Updated Cursor IDE context file
  - Added TypeScript, Next.js, React technologies
  - Added i18n framework information

### Phase 2: Tasks (Next Step)

Ready for `/speckit.tasks` command to break down implementation into specific tasks.
