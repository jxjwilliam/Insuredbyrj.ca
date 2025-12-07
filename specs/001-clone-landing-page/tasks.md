---
description: "Task list for Clone Landing Page feature implementation"
---

# Tasks: Clone Landing Page

**Input**: Design documents from `/specs/001-clone-landing-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED per constitution (TDD approach, 80% coverage minimum)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: Next.js App Router structure
- Components: `components/`
- Pages: `app/`
- Utilities: `lib/`
- Tests: `tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Next.js project structure per implementation plan (app/, components/, lib/, public/, tests/)
- [x] T002 Initialize Next.js 15 project with TypeScript, Tailwind CSS, and required dependencies in package.json
- [x] T003 [P] Configure ESLint and Prettier with TypeScript support in .eslintrc.json and .prettierrc
- [x] T004 [P] Initialize shadcn/ui with configuration in components.json
- [x] T005 [P] Setup Jest and React Testing Library configuration in jest.config.js
- [x] T006 [P] Setup Playwright for E2E tests in playwright.config.ts
- [x] T007 [P] Create directory structure: components/{ui,layout,sections,shared}, app/(routes), lib, public/images/placeholders
- [x] T008 Configure Tailwind CSS with shadcn/ui paths in tailwind.config.ts
- [x] T009 Create global CSS file with Tailwind directives in app/globals.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T010 Create TypeScript type definitions for all content entities in lib/types.ts
- [x] T011 [P] Create utility function for smooth scrolling in lib/utils.ts
- [x] T012 [P] Create ImageWithFallback component with error handling in components/shared/image-with-fallback.tsx
- [x] T013 [P] Create reusable CTAButton component using shadcn/ui Button in components/shared/cta-button.tsx
- [x] T014 Create root layout with metadata and global styles in app/layout.tsx
- [x] T015 [P] Add shadcn/ui Button component via CLI: npx shadcn@latest add button
- [x] T016 [P] Add shadcn/ui Accordion component via CLI: npx shadcn@latest add accordion
- [x] T017 [P] Add shadcn/ui Navigation Menu component via CLI: npx shadcn@latest add navigation-menu
- [x] T018 [P] Add shadcn/ui Card component via CLI: npx shadcn@latest add card
- [x] T019 Create placeholder fallback images in public/images/placeholders/ directory

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Landing Page Core Content (Priority: P1) 🎯 MVP

**Goal**: Display all essential content sections (hero, trust indicators, benefits, insurance plans, process flow) matching the source landing page structure

**Independent Test**: Load the page and verify all major content sections are visible and properly structured. Page should display complete informational content without requiring any user interaction.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T020 [P] [US1] Unit test for HeroSection component rendering in tests/unit/components/hero-section.test.tsx
- [ ] T021 [P] [US1] Unit test for TrustIndicators component rendering in tests/unit/components/trust-indicators.test.tsx
- [ ] T022 [P] [US1] Unit test for WhyChooseSection component rendering in tests/unit/components/why-choose.test.tsx
- [ ] T023 [P] [US1] Unit test for InsurancePlansSection component rendering in tests/unit/components/insurance-plans.test.tsx
- [ ] T024 [P] [US1] Unit test for HowItWorksSection component rendering in tests/unit/components/how-it-works.test.tsx
- [ ] T025 [P] [US1] Integration test for landing page content sections in tests/integration/sections/landing-page-content.test.tsx
- [ ] T026 [US1] E2E test for viewing all content sections in tests/e2e/landing-page.spec.ts

### Implementation for User Story 1

- [x] T027 [US1] Create content constants with all landing page text and image URLs in lib/constants.ts
- [x] T028 [P] [US1] Create HeroSection component with headline, subheadline, CTAs, and image in components/sections/hero-section.tsx
- [x] T029 [P] [US1] Create TrustIndicators component displaying A+, 10K+, 15+ stats in components/sections/trust-indicators.tsx
- [x] T030 [P] [US1] Create WhyChooseSection component with four benefit points in components/sections/why-choose.tsx
- [x] T031 [P] [US1] Create PlanCard component for insurance plan display in components/shared/plan-card.tsx
- [x] T032 [US1] Create InsurancePlansSection component with four plan cards in components/sections/insurance-plans.tsx
- [x] T033 [P] [US1] Create HowItWorksSection component with three-step process in components/sections/how-it-works.tsx
- [x] T034 [US1] Create main landing page component assembling all sections in app/page.tsx
- [x] T035 [US1] Add responsive design classes for mobile, tablet, and desktop breakpoints
- [x] T036 [US1] Add semantic HTML structure and ARIA attributes for accessibility

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. All content sections visible, page loads successfully, responsive design works.

---

## Phase 4: User Story 2 - Navigate Sections and Interact with CTAs (Priority: P2)

**Goal**: Enable navigation between sections via sticky header menu with smooth scrolling, and make all CTAs functional linking to placeholder destination pages

**Independent Test**: Click all call-to-action buttons and navigation links, verify they navigate to correct destinations. Test smooth scrolling to sections. All CTAs should be functional even if destination pages are placeholders.

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T037 [P] [US2] Unit test for Header component with sticky navigation in tests/unit/components/header.test.tsx
- [ ] T038 [P] [US2] Unit test for smooth scroll utility function in tests/unit/lib/utils.test.ts
- [ ] T039 [P] [US2] Integration test for navigation menu functionality in tests/integration/sections/navigation.test.tsx
- [ ] T040 [US2] E2E test for clicking CTAs and navigating to placeholder pages in tests/e2e/navigation.spec.ts
- [ ] T041 [US2] E2E test for smooth scrolling to sections via navigation menu in tests/e2e/smooth-scroll.spec.ts

### Implementation for User Story 2

- [x] T042 [US2] Create Header component with sticky navigation menu in components/layout/header.tsx
- [x] T043 [US2] Implement smooth scroll functionality using CSS and JavaScript in lib/utils.ts
- [x] T044 [US2] Add intersection observer for active section highlighting in header component
- [x] T045 [P] [US2] Create placeholder quote request page in app/(routes)/get-quote/page.tsx
- [x] T046 [P] [US2] Create placeholder contact page in app/(routes)/contact/page.tsx
- [x] T047 [P] [US2] Create placeholder product detail page for term-life in app/(routes)/products/term-life/page.tsx
- [x] T048 [P] [US2] Create placeholder product detail page for whole-life in app/(routes)/products/whole-life/page.tsx
- [x] T049 [P] [US2] Create placeholder product detail page for universal-life in app/(routes)/products/universal-life/page.tsx
- [x] T050 [P] [US2] Create placeholder product detail page for critical-illness in app/(routes)/products/critical-illness/page.tsx
- [x] T051 [US2] Update all CTA buttons to link to correct placeholder pages
- [x] T052 [US2] Implement mobile menu toggle functionality in header component
- [x] T053 [US2] Add keyboard navigation support for header menu items

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Navigation functional, all CTAs link correctly, smooth scrolling works, placeholder pages accessible.

---

## Phase 5: User Story 3 - View FAQ Section and Get Answers (Priority: P3)

**Goal**: Display FAQ section with accordion functionality allowing users to expand/collapse questions, with only one question open at a time

**Independent Test**: Expand FAQ questions and verify answers display correctly. Click another question and verify previous answer collapses. All FAQ items should be functional independently of other page features.

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T054 [P] [US3] Unit test for FAQSection component rendering in tests/unit/components/faq-section.test.tsx
- [ ] T055 [P] [US3] Unit test for FAQ accordion expand/collapse behavior in tests/unit/components/faq-accordion.test.tsx
- [ ] T056 [US3] Integration test for FAQ section interaction in tests/integration/sections/faq.test.tsx
- [ ] T057 [US3] E2E test for FAQ accordion functionality in tests/e2e/faq.spec.ts

### Implementation for User Story 3

- [x] T058 [US3] Add FAQ content (minimum 6 items) to constants in lib/constants.ts
- [x] T059 [US3] Create FAQSection component using shadcn/ui Accordion in components/sections/faq-section.tsx
- [x] T060 [US3] Configure accordion for single-item expansion (one open at a time)
- [x] T061 [US3] Add FAQ section to main landing page in app/page.tsx
- [x] T062 [US3] Add keyboard navigation support for FAQ accordion items
- [x] T063 [US3] Add ARIA attributes for FAQ accessibility compliance

**Checkpoint**: At this point, all user stories should now be independently functional. FAQ section works correctly, accordion expands/collapses as expected.

---

## Phase 6: User Story 4 - Why BC Section (Additional Content)

**Goal**: Display "Why British Columbians Choose Insured by Rajan" section with value propositions and statistics

**Independent Test**: Verify Why BC section displays correctly with all value propositions and statistics visible.

### Tests for User Story 4 ⚠️

- [ ] T064 [P] [US4] Unit test for WhyBCSection component rendering in tests/unit/components/why-bc.test.tsx
- [ ] T065 [US4] Integration test for Why BC section in tests/integration/sections/why-bc.test.tsx

### Implementation for User Story 4

- [x] T066 [US4] Add Why BC content to constants in lib/constants.ts
- [x] T067 [US4] Create WhyBCSection component with value propositions in components/sections/why-bc.tsx
- [x] T068 [US4] Add Why BC section to main landing page in app/page.tsx

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T069 [P] Add JSDoc/TSDoc documentation to all exported components and functions
- [ ] T070 [P] Verify all images have proper alt text for accessibility
- [ ] T071 [P] Run accessibility audit and fix WCAG 2.1 AA compliance issues
- [ ] T072 [P] Optimize images with Next.js Image component lazy loading
- [ ] T073 Performance optimization: verify bundle size < 200KB gzipped initial
- [ ] T074 Performance optimization: verify Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] T075 [P] Add loading states for images in ImageWithFallback component
- [ ] T076 [P] Verify responsive design works on mobile (375px), tablet (768px), desktop (1920px)
- [ ] T077 [P] Add error boundaries for graceful error handling
- [ ] T078 Run full test suite and verify 80%+ coverage
- [ ] T079 [P] Code cleanup and refactoring for consistency
- [ ] T080 Validate quickstart.md instructions work correctly
- [ ] T081 [P] Add meta tags and SEO optimization in app/layout.tsx
- [ ] T082 Final visual comparison with source landing page for accuracy

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for content structure but navigation is independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Types/constants before components
- Shared components before section components
- Section components before page assembly
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003-T009)
- All Foundational tasks marked [P] can run in parallel (T011-T019)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Section components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all section component tests together:
Task: "Unit test for HeroSection component rendering"
Task: "Unit test for TrustIndicators component rendering"
Task: "Unit test for WhyChooseSection component rendering"
Task: "Unit test for InsurancePlansSection component rendering"
Task: "Unit test for HowItWorksSection component rendering"

# Launch all section components together:
Task: "Create HeroSection component"
Task: "Create TrustIndicators component"
Task: "Create WhyChooseSection component"
Task: "Create HowItWorksSection component"
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
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (content sections)
   - Developer B: User Story 2 (navigation, placeholder pages)
   - Developer C: User Story 3 (FAQ section)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD approach)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All components must use shadcn/ui foundation and Tailwind CSS exclusively
- All images must use ImageWithFallback component for error handling
- TypeScript strict mode must be enabled throughout

