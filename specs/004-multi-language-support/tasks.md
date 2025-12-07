# Tasks: Multi-Language Support

**Input**: Design documents from `/specs/004-multi-language-support/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included per constitution requirements (TDD approach, 80%+ coverage for translation logic, 100% coverage for language switching critical path).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `app/`, `lib/`, `components/` at repository root
- Translation files: `lib/i18n/translations/`
- Tests: `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create i18n directory structure: `lib/i18n/` and `lib/i18n/translations/`
- [x] T002 [P] Verify shadcn/ui DropdownMenu component is available (check `components/ui/dropdown-menu.tsx` or install if missing)
- [x] T003 [P] Create TypeScript types file structure: `lib/i18n/types.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create language configuration: `lib/i18n/config.ts` with supportedLanguages array (en, pa, hi), getSupportedLanguages(), getDefaultLocale(), isSupportedLocale()
- [x] T005 [P] Create TypeScript types: `lib/i18n/types.ts` with LanguageConfig interface, TranslationObject type, TranslationKey type (initial structure)
- [x] T006 Create i18n utility functions: `lib/i18n/utils.ts` with loadTranslations(), getTranslation(), getStoredLocale(), setStoredLocale(), getCookieLocale(), setCookieLocale(), detectBrowserLocale()
- [x] T007 Create React Context provider: `lib/i18n/context.tsx` with I18nProvider component managing locale, translations, loading, error state
- [x] T008 Create React hooks: `lib/i18n/hooks.ts` with useTranslation() and useLocale() hooks exporting from context
- [x] T009 [P] Create unit tests for i18n utilities: `tests/lib/i18n/utils.test.ts` testing loadTranslations, getTranslation, locale persistence functions
- [x] T010 [P] Create unit tests for React hooks: `tests/lib/i18n/hooks.test.ts` testing useTranslation and useLocale hooks

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Language Selection and Content Display (Priority: P1) 🎯 MVP

**Goal**: User can select their preferred language from a language selector, and all content displays in that language. Language preference is remembered for future visits.

**Independent Test**: Add language selector to header, allow users to switch languages, verify all text content changes to selected language. Test language persistence across browser sessions.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Create E2E test for language selection: `tests/e2e/language-selection.spec.ts` testing language dropdown visibility, language switching, content updates
- [ ] T012 [P] [US1] Create E2E test for language persistence: `tests/e2e/language-persistence.spec.ts` testing localStorage persistence, cookie persistence, cross-session persistence

### Implementation for User Story 1

- [x] T013 [US1] Create language selector component: `components/shared/language-selector.tsx` using shadcn/ui DropdownMenu, displaying current language, showing all supported languages
- [x] T014 [US1] Integrate language selector into header: `components/layout/header.tsx` adding LanguageSelector component in header navigation
- [x] T015 [US1] Create English translation file: `lib/i18n/translations/en.json` extracting all content from `lib/constants.ts` matching structure (hero, navigation, trustIndicators, insurancePlans, faq, etc.)
- [x] T016 [P] [US1] Create Punjabi translation file: `lib/i18n/translations/pa.json` with Punjabi translations (can be placeholder initially, structure must match en.json)
- [x] T017 [P] [US1] Create Hindi translation file: `lib/i18n/translations/hi.json` with Hindi translations (can be placeholder initially, structure must match en.json)
- [x] T018 [US1] Update root layout to include I18nProvider: `app/layout.tsx` wrapping children with I18nProvider, reading initial locale from cookie/localStorage
- [x] T019 [US1] Update homepage to use translations: `app/page.tsx` replacing direct constants access with useTranslation() hook, updating all text content to use t() function
- [x] T020 [US1] Implement language switching logic: `lib/i18n/context.tsx` updating setLocale() to load translations, update state, persist to localStorage and cookie, trigger re-render
- [x] T021 [US1] Update HeroSection component: `components/sections/hero-section.tsx` using useTranslation() hook, replacing hardcoded text with t('hero.headline'), t('hero.subheadline'), etc.
- [x] T022 [US1] Update navigation components: `components/layout/header.tsx` translating navigation items using t('navigation.whyChoose'), t('navigation.plans'), etc.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can select language, see content update, and preference persists.

---

## Phase 4: User Story 2 - Language-Specific URLs and SEO (Priority: P2)

**Goal**: User can access website using language-specific URLs (e.g., `/pa/`, `/hi/`), and search engines can properly index language versions.

**Independent Test**: Navigate to `/pa/` and `/hi/` URLs, verify content displays in correct language. Check hreflang tags in HTML source. Test URL updates when switching languages.

### Tests for User Story 2

- [ ] T023 [P] [US2] Create E2E test for language URLs: `tests/e2e/language-urls.spec.ts` testing `/en/`, `/pa/`, `/hi/` routes display correct language
- [ ] T024 [P] [US2] Create E2E test for URL updates on language switch: `tests/e2e/language-url-switch.spec.ts` testing URL changes when language selector used
- [ ] T025 [P] [US2] Create unit test for middleware: `tests/middleware.test.ts` testing locale detection, cookie management, redirect logic

### Implementation for User Story 2

- [x] T026 [US2] Create Next.js middleware: `middleware.ts` at project root implementing locale detection from URL, cookie, Accept-Language header, redirect logic
- [x] T027 [US2] Restructure app directory with locale route: Create `app/[locale]/` directory, move `app/page.tsx` to `app/[locale]/page.tsx`
- [x] T028 [US2] Move routes under locale: Move `app/(routes)/` to `app/[locale]/(routes)/` for contact, get-quote, products pages
- [x] T029 [US2] Create locale-aware layout: `app/[locale]/layout.tsx` with I18nProvider receiving locale from params, setting initialLocale prop
- [x] T030 [US2] Update root layout for redirect: `app/layout.tsx` removing I18nProvider (moved to [locale]/layout), keeping basic HTML structure
- [x] T031 [US2] Update homepage for locale param: `app/[locale]/page.tsx` receiving params.locale, passing to I18nProvider, using translations
- [x] T032 [US2] Update language selector for URL updates: `components/shared/language-selector.tsx` using Next.js router to update URL to `/{locale}/...` when language changes
- [x] T033 [US2] Add generateStaticParams for locales: `app/[locale]/page.tsx` and `app/[locale]/layout.tsx` generating static params for en, pa, hi
- [x] T034 [US2] Implement hreflang tags in metadata: `app/[locale]/layout.tsx` generating metadata with hreflang tags for all supported languages
- [x] T035 [US2] Update HTML lang attribute: `app/[locale]/layout.tsx` setting `<html lang={locale}>` attribute based on current locale

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Language-specific URLs work, SEO tags are present, URL updates on language switch.

---

## Phase 5: User Story 3 - Complete Content Translation Coverage (Priority: P2)

**Goal**: All user-facing text content throughout website is available in all supported languages, including navigation, forms, error messages, dynamic content.

**Independent Test**: Navigate through all pages in each language, verify no English text remains visible. Test form validation errors display in selected language.

### Tests for User Story 3

- [ ] T036 [P] [US3] Create E2E test for complete translation coverage: `tests/e2e/translation-coverage.spec.ts` testing all pages in all languages for missing translations
- [ ] T037 [P] [US3] Create E2E test for form translations: `tests/e2e/form-translations.spec.ts` testing form labels, validation errors, success messages in all languages

### Implementation for User Story 3

- [x] T038 [US3] Update TrustIndicators component: `components/sections/trust-indicators.tsx` using useTranslation() for all labels and text
- [x] T039 [US3] Update WhyChooseSection component: `components/sections/why-choose.tsx` translating title, description, benefit titles and descriptions
- [x] T040 [US3] Update InsurancePlansSection component: `components/sections/insurance-plans.tsx` translating plan types, descriptions, features, pricing
- [x] T041 [US3] Update HowItWorksSection component: `components/sections/how-it-works.tsx` translating step titles, descriptions, process details
- [x] T042 [US3] Update FAQSection component: `components/sections/faq-section.tsx` translating all FAQ questions and answers
- [ ] T043 [US3] Update TestimonialsSection component: `components/sections/testimonials-section.tsx` translating testimonial content (if applicable)
- [ ] T044 [US3] Update PricingSection component: `components/sections/pricing-section.tsx` translating pricing scenarios, plan comparisons
- [ ] T045 [US3] Update CompanyBackgroundSection component: `components/sections/company-background-section.tsx` translating background content
- [ ] T046 [US3] Update ClaimsProcessSection component: `components/sections/claims-process-section.tsx` translating claims process steps and information
- [x] T047 [US3] Update WhyBCSection component: `components/sections/why-bc.tsx` translating BC-specific content
- [x] T048 [US3] Update Footer component: `components/layout/footer.tsx` translating footer content, quick links, contact details labels
- [ ] T049 [US3] Update NewsletterSection component: `components/sections/newsletter-section.tsx` translating newsletter form labels, placeholders, messages
- [ ] T050 [US3] Update contact page: `app/[locale]/(routes)/contact/page.tsx` translating all form fields, labels, validation messages
- [ ] T051 [US3] Update get-quote page: `app/[locale]/(routes)/get-quote/page.tsx` translating quote form, all fields, validation, success/error messages
- [ ] T052 [US3] Update product pages: `app/[locale]/(routes)/products/[product]/page.tsx` translating product descriptions, features, pricing for all product types
- [ ] T053 [US3] Update newsletter API route: `app/api/newsletter/subscribe/route.ts` translating success/error response messages based on Accept-Language header
- [ ] T054 [US3] Implement translation fallback logic: `lib/i18n/utils.ts` updating getTranslation() to fallback to English if key missing in selected language
- [ ] T055 [US3] Add missing translation warnings: `lib/i18n/utils.ts` logging warnings in development mode when translations are missing

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. All content is translatable, no English text visible when non-English language selected.

---

## Phase 6: User Story 4 - Language Selector Accessibility and UX (Priority: P3)

**Goal**: Language selector is easily discoverable, accessible via keyboard navigation, provides clear visual feedback, users can switch without losing place on page.

**Independent Test**: Verify language selector visible in header, keyboard navigable, shows current language clearly, switching doesn't cause page reload or scroll issues.

### Tests for User Story 4

- [ ] T056 [P] [US4] Create accessibility test for language selector: `tests/e2e/language-selector-accessibility.spec.ts` testing keyboard navigation, screen reader compatibility, ARIA attributes
- [ ] T057 [P] [US4] Create UX test for language switching: `tests/e2e/language-switch-ux.spec.ts` testing no page reload, scroll position maintained, smooth transitions

### Implementation for User Story 4

- [x] T058 [US4] Enhance language selector accessibility: `components/shared/language-selector.tsx` adding proper ARIA labels (aria-label, aria-haspopup, aria-expanded), role="combobox"
- [x] T059 [US4] Implement keyboard navigation: `components/shared/language-selector.tsx` handling Tab, Enter, Arrow keys, Escape for full keyboard support
- [x] T060 [US4] Add focus management: `components/shared/language-selector.tsx` ensuring visible focus indicators, focus returns to trigger after selection
- [x] T061 [US4] Enhance visual feedback: `components/shared/language-selector.tsx` highlighting current language in dropdown, showing active state clearly
- [x] T062 [US4] Implement smooth transitions: `components/shared/language-selector.tsx` adding CSS transitions for dropdown open/close, language switch animations
- [x] T063 [US4] Prevent page scroll on language switch: `lib/i18n/context.tsx` ensuring setLocale() doesn't trigger page navigation, maintaining scroll position
- [x] T064 [US4] Add loading state indicator: `components/shared/language-selector.tsx` showing loading spinner or disabled state while translations load
- [ ] T065 [US4] Implement browser language detection highlighting: `components/shared/language-selector.tsx` detecting browser language on first visit, highlighting matching language in dropdown (but not auto-selecting)

**Checkpoint**: At this point, all user stories should be independently functional. Language selector is fully accessible, provides excellent UX, maintains page state during switches.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T066 [P] Update TypeScript types for all translation keys: `lib/i18n/types.ts` generating complete TranslationKey type union from all translation files
- [x] T067 [P] Add JSDoc documentation: `lib/i18n/config.ts`, `lib/i18n/utils.ts`, `lib/i18n/context.tsx` adding comprehensive JSDoc comments for all exported functions
- [x] T068 [P] Performance optimization: `lib/i18n/utils.ts` implementing translation caching strategy, preloading likely next language
- [x] T069 [P] Error handling improvements: `lib/i18n/context.tsx` adding error boundaries, graceful fallbacks for translation loading failures
- [ ] T070 [P] Add unit tests for all components: `tests/components/shared/language-selector.test.tsx` testing component rendering, interactions, accessibility
- [ ] T071 [P] Add integration tests: `tests/integration/i18n-integration.test.tsx` testing full language switching flow, URL updates, persistence
- [ ] T072 [P] Update documentation: `README.md` or `docs/` adding i18n usage guide, translation file structure documentation
- [ ] T073 [P] Code cleanup and refactoring: Review all i18n-related files, ensure consistent patterns, remove duplicate code
- [ ] T074 [P] Run quickstart.md validation: Verify all steps in `specs/004-multi-language-support/quickstart.md` work correctly
- [ ] T075 [P] Performance testing: Verify language switch completes in <1s, no Core Web Vitals regression, bundle size impact minimal
- [ ] T076 [P] Accessibility audit: Run WCAG 2.1 AA compliance check on language selector, fix any violations
- [ ] T077 [P] SEO validation: Verify hreflang tags present on all pages, test with Google Search Console, validate language-specific URLs indexed correctly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for language selector component, but URL routing can be implemented independently
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for translation infrastructure, can proceed in parallel with US2
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 for language selector component, enhances existing functionality

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Core infrastructure before components
- Components before integration
- Core implementation before polish
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Translation file creation (T016, T017) can run in parallel
- Component updates within US3 marked [P] can run in parallel (different component files)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Create E2E test for language selection in tests/e2e/language-selection.spec.ts"
Task: "Create E2E test for language persistence in tests/e2e/language-persistence.spec.ts"

# Launch translation file creation in parallel:
Task: "Create Punjabi translation file in lib/i18n/translations/pa.json"
Task: "Create Hindi translation file in lib/i18n/translations/hi.json"
```

---

## Parallel Example: User Story 3

```bash
# Launch component updates in parallel (different files):
Task: "Update TrustIndicators component in components/sections/trust-indicators.tsx"
Task: "Update WhyChooseSection component in components/sections/why-choose.tsx"
Task: "Update InsurancePlansSection component in components/sections/insurance-plans.tsx"
Task: "Update HowItWorksSection component in components/sections/how-it-works.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (SEO improvements)
4. Add User Story 3 → Test independently → Deploy/Demo (Complete translations)
5. Add User Story 4 → Test independently → Deploy/Demo (Accessibility polish)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (core language switching)
   - Developer B: User Story 2 (URL routing, can start after US1 language selector)
   - Developer C: User Story 3 (component translations, can start after US1 infrastructure)
3. Once US1 complete:
   - Developer A: User Story 4 (accessibility enhancements)
   - Developer B: Continue US2 polish
   - Developer C: Continue US3 translations
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Translation files (pa.json, hi.json) can start with English content as placeholders, then be translated incrementally
- All components must be updated to use useTranslation() hook instead of direct constants access
- Middleware must handle edge cases: invalid locales, missing cookies, malformed Accept-Language headers

---

## Task Summary

- **Total Tasks**: 77
- **Phase 1 (Setup)**: 3 tasks
- **Phase 2 (Foundational)**: 7 tasks
- **Phase 3 (User Story 1 - P1)**: 12 tasks (2 tests + 10 implementation)
- **Phase 4 (User Story 2 - P2)**: 13 tasks (3 tests + 10 implementation)
- **Phase 5 (User Story 3 - P2)**: 20 tasks (2 tests + 18 implementation)
- **Phase 6 (User Story 4 - P3)**: 10 tasks (2 tests + 8 implementation)
- **Phase 7 (Polish)**: 12 tasks

**Parallel Opportunities**: 35+ tasks can run in parallel (marked with [P])

**Suggested MVP Scope**: Phases 1, 2, and 3 (User Story 1) - 22 tasks total
