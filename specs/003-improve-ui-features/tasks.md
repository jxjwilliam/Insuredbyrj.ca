---
description: "Task list for Improve UI and Add Common Features implementation"
---

# Tasks: Improve UI and Add Common Features

**Input**: Design documents from `/specs/003-improve-ui-features/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED per constitution (TDD approach, 80% coverage minimum, 100% for critical paths)

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

**Purpose**: Project initialization and dependency installation

- [x] T001 Install GSAP library in package.json: `npm install gsap@^3.12.0`
- [x] T002 Install Google Maps React wrapper in package.json: `npm install @react-google-maps/api`
- [ ] T003 [P] Add Google Maps API key to environment variables in `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here`
- [x] T004 [P] Verify framer-motion is installed: `npm list framer-motion` (should already be installed)
- [x] T005 [P] Add shadcn/ui input component if not present: `npx shadcn@latest add input`
- [x] T006 [P] Create directory structure: `components/layout/`, `components/shared/`, `components/sections/newsletter-section.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Add FooterContent type definition to lib/types.ts with companyInfo, quickLinks, contactDetails, socialMediaLinks, legalLinks, newsletterForm, copyright fields
- [x] T008 Add NewsletterSubscription type definition to lib/types.ts with email, subscriptionStatus, subscriptionTimestamp, errorMessage fields
- [x] T009 Add SocialMediaLink type definition to lib/types.ts with platform, url, label fields
- [x] T010 Add LegalLink type definition to lib/types.ts with label, href fields
- [x] T011 Add NewsletterFormConfig type definition to lib/types.ts with placeholder, buttonText, successMessage, errorMessage, duplicateMessage fields
- [x] T012 Add GoogleMapConfig type definition to lib/types.ts with apiKey, center, zoom, markerPosition, markerTitle, mapTypeId fields
- [x] T013 [P] Add footerContent constant to lib/constants.ts with company info, quick links, contact details, social media links, legal links, newsletter form config, and copyright
- [x] T014 [P] Add social sharing utility functions to lib/utils.ts: generateShareUrl(platform, url, title, description) and sanitizeShareText(text)
- [x] T015 [P] Verify use-reduced-motion hook exists in lib/hooks/use-reduced-motion.ts and respects prefers-reduced-motion media query

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Navigate Site with Footer and Site-Wide Navigation (Priority: P1) 🎯 MVP

**Goal**: Users can access important site information, contact details, legal pages, and social media links from any page via a comprehensive footer

**Independent Test**: Footer displays on all pages with all links functional. Users can navigate to any section, contact page, legal pages, and social media from footer.

### Tests for User Story 1

- [ ] T016 [P] [US1] E2E test: Footer displays on landing page in tests/e2e/footer.spec.ts
- [ ] T017 [P] [US1] E2E test: Footer links navigate correctly in tests/e2e/footer.spec.ts
- [ ] T018 [P] [US1] E2E test: Footer displays on contact page in tests/e2e/footer.spec.ts
- [ ] T019 [P] [US1] Integration test: Footer component renders all sections in tests/integration/footer.test.tsx
- [ ] T020 [P] [US1] Unit test: Footer component renders company info in tests/unit/components/footer.test.tsx
- [ ] T021 [P] [US1] Unit test: Footer component renders navigation links in tests/unit/components/footer.test.tsx
- [ ] T022 [P] [US1] Unit test: Footer component renders contact details in tests/unit/components/footer.test.tsx
- [ ] T023 [P] [US1] Unit test: Footer component renders social media links in tests/unit/components/footer.test.tsx
- [ ] T024 [P] [US1] Unit test: Footer component renders legal links in tests/unit/components/footer.test.tsx

### Implementation for User Story 1

- [x] T025 [US1] Create Footer component in components/layout/footer.tsx with company info section
- [x] T026 [US1] Add quick navigation links section to components/layout/footer.tsx using NavigationItem[] from constants
- [x] T027 [US1] Add contact details section to components/layout/footer.tsx with phone, email, and address
- [x] T028 [US1] Add social media links section to components/layout/footer.tsx with Facebook, Twitter/X, LinkedIn links opening in new tabs
- [x] T029 [US1] Add legal links section to components/layout/footer.tsx with Privacy Policy and Terms of Service links
- [x] T030 [US1] Add responsive layout to components/layout/footer.tsx (stack on mobile, multi-column on desktop)
- [x] T031 [US1] Add framer-motion animations to components/layout/footer.tsx for section entrance
- [x] T032 [US1] Add Footer component to app/page.tsx (landing page)
- [x] T033 [US1] Add Footer component to app/(routes)/contact/page.tsx
- [x] T034 [US1] Add Footer component to app/(routes)/get-quote/page.tsx
- [x] T035 [US1] Add Footer component to all product pages in app/(routes)/products/
- [x] T036 [US1] Ensure all footer links are accessible with proper ARIA labels and keyboard navigation

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Footer displays on all pages with all links working.

---

## Phase 4: User Story 2 - Return to Top Quickly on Long Pages (Priority: P1) 🎯 MVP

**Goal**: Users can quickly return to the top of long pages using a floating back-to-top button with smooth scroll animation

**Independent Test**: Back-to-top button appears after scrolling 300px, smoothly scrolls to top when clicked, and hides when near top. Works on mobile and desktop.

### Tests for User Story 2

- [ ] T037 [P] [US2] E2E test: Back-to-top button appears after scrolling in tests/e2e/back-to-top.spec.ts
- [ ] T038 [P] [US2] E2E test: Back-to-top button scrolls to top smoothly in tests/e2e/back-to-top.spec.ts
- [ ] T039 [P] [US2] E2E test: Back-to-top button hides when near top in tests/e2e/back-to-top.spec.ts
- [ ] T040 [P] [US2] Integration test: Back-to-top button visibility toggles on scroll in tests/integration/back-to-top.test.tsx
- [ ] T041 [P] [US2] Unit test: Back-to-top button component renders correctly in tests/unit/components/back-to-top-button.test.tsx
- [ ] T042 [P] [US2] Unit test: Back-to-top button respects prefers-reduced-motion in tests/unit/components/back-to-top-button.test.tsx

### Implementation for User Story 2

- [x] T043 [US2] Create BackToTopButton component in components/shared/back-to-top-button.tsx with scroll detection
- [x] T044 [US2] Add GSAP smooth scroll animation to components/shared/back-to-top-button.tsx for scroll-to-top functionality
- [x] T045 [US2] Add visibility toggle logic to components/shared/back-to-top-button.tsx (show after 300px scroll, hide near top)
- [x] T046 [US2] Add responsive styling to components/shared/back-to-top-button.tsx (appropriate size for mobile and desktop)
- [x] T047 [US2] Add accessibility features to components/shared/back-to-top-button.tsx (ARIA labels, keyboard support)
- [x] T048 [US2] Add prefers-reduced-motion support to components/shared/back-to-top-button.tsx (disable animation if user prefers)
- [x] T049 [US2] Add BackToTopButton component to app/page.tsx
- [x] T050 [US2] Add BackToTopButton component to app/layout.tsx for all pages (or add to each page individually)

**Checkpoint**: At this point, User Story 2 should be fully functional and testable independently. Back-to-top button works smoothly on all pages.

---

## Phase 5: User Story 3 - Experience Enhanced Visual Design and Animations (Priority: P2)

**Goal**: Users experience a polished, modern interface with smooth animations, better visual hierarchy, and enhanced interactive elements

**Independent Test**: All interactive elements have smooth hover effects, content loads with smooth animations, navigation has smooth scrolling, and overall design shows improved visual hierarchy.

### Tests for User Story 3

- [ ] T051 [P] [US3] Integration test: Hover effects work on interactive elements in tests/integration/animations.test.tsx
- [ ] T052 [P] [US3] Unit test: GSAP animations respect prefers-reduced-motion in tests/unit/components/gsap-animations.test.tsx
- [ ] T053 [P] [US3] Unit test: Framer-motion animations respect prefers-reduced-motion in tests/unit/components/fade-in.test.tsx

### Implementation for User Story 3

- [ ] T054 [US3] Enhance existing fade-in animation in components/animations/fade-in.tsx with GSAP integration
- [ ] T055 [US3] Enhance existing slide-in animation in components/animations/slide-in.tsx with GSAP integration
- [ ] T056 [US3] Enhance existing stagger-children animation in components/animations/stagger-children.tsx with GSAP integration
- [ ] T057 [US3] Implement GSAP scroll animations in components/animations/gsap-animations.tsx with ScrollTrigger plugin
- [x] T058 [US3] Add smooth hover effects to all buttons in components/ui/button.tsx using framer-motion
- [x] T059 [US3] Add smooth hover effects to plan cards in components/shared/plan-card.tsx using framer-motion
- [x] T060 [US3] Add smooth scroll behavior to anchor links in lib/utils.ts with GSAP easing
- [ ] T061 [US3] Copy magicui animated-button component to components/ui/animated-button.tsx (if using)
- [ ] T062 [US3] Copy magicui gradient-text component to components/ui/gradient-text.tsx (if using)
- [ ] T063 [US3] Copy acernity-ui sparkles component to components/ui/sparkles.tsx (optional, for visual polish)
- [ ] T064 [US3] Apply enhanced animations to hero section in components/sections/hero-section.tsx
- [ ] T065 [US3] Apply enhanced animations to footer in components/layout/footer.tsx
- [ ] T066 [US3] Ensure all animations respect prefers-reduced-motion via use-reduced-motion hook

**Checkpoint**: At this point, User Story 3 should be fully functional. Site has enhanced visual design with smooth animations throughout.

---

## Phase 6: User Story 4 - Share Content on Social Media (Priority: P2)

**Goal**: Users can share the page or specific content with others via Facebook, Twitter/X, and LinkedIn

**Independent Test**: Social sharing buttons appear, open share dialogs with pre-filled content, use Web Share API on mobile, and allow users to return to page after sharing.

### Tests for User Story 4

- [ ] T067 [P] [US4] E2E test: Social sharing buttons appear on page in tests/e2e/social-sharing.spec.ts
- [ ] T068 [P] [US4] E2E test: Facebook share opens with pre-filled content in tests/e2e/social-sharing.spec.ts
- [ ] T069 [P] [US4] E2E test: Twitter/X share opens with pre-filled content in tests/e2e/social-sharing.spec.ts
- [ ] T070 [P] [US4] E2E test: LinkedIn share opens with pre-filled content in tests/e2e/social-sharing.spec.ts
- [ ] T071 [P] [US4] Integration test: Social sharing component handles Web Share API in tests/integration/social-share-buttons.test.tsx
- [ ] T072 [P] [US4] Unit test: generateShareUrl utility function works correctly in tests/unit/lib/utils.test.ts
- [ ] T073 [P] [US4] Unit test: SocialShareButtons component renders all platforms in tests/unit/components/social-share-buttons.test.tsx

### Implementation for User Story 4

- [x] T074 [US4] Create SocialShareButtons component in components/shared/social-share-buttons.tsx
- [x] T075 [US4] Add Facebook share functionality to components/shared/social-share-buttons.tsx with pre-filled URL, title, description
- [x] T076 [US4] Add Twitter/X share functionality to components/shared/social-share-buttons.tsx with pre-filled URL, title, description
- [x] T077 [US4] Add LinkedIn share functionality to components/shared/social-share-buttons.tsx with pre-filled URL, title, description
- [x] T078 [US4] Add Web Share API support to components/shared/social-share-buttons.tsx for mobile devices with fallback to platform URLs
- [x] T079 [US4] Add error handling to components/shared/social-share-buttons.tsx for blocked popups or unavailable services
- [x] T080 [US4] Add accessibility features to components/shared/social-share-buttons.tsx (ARIA labels, keyboard support)
- [x] T081 [US4] Add SocialShareButtons component to landing page in app/page.tsx (appropriate section placement)
- [x] T082 [US4] Style social sharing buttons using shadcn/ui Button components with platform-specific icons

**Checkpoint**: At this point, User Story 4 should be fully functional. Users can share content on all major social platforms.

---

## Phase 7: User Story 5 - Subscribe to Newsletter or Updates (Priority: P2)

**Goal**: Users can subscribe to newsletters from footer and dedicated landing page section with email validation and feedback

**Independent Test**: Newsletter forms appear in footer and dedicated section, validate emails, handle success/error/duplicate states, and show appropriate loading states.

### Tests for User Story 5

- [ ] T083 [P] [US5] E2E test: Newsletter form appears in footer in tests/e2e/newsletter.spec.ts
- [ ] T084 [P] [US5] E2E test: Newsletter form appears in dedicated section in tests/e2e/newsletter.spec.ts
- [ ] T085 [P] [US5] E2E test: Newsletter form validates email format in tests/e2e/newsletter.spec.ts
- [ ] T086 [P] [US5] E2E test: Newsletter form handles success state in tests/e2e/newsletter.spec.ts
- [ ] T087 [P] [US5] E2E test: Newsletter form handles duplicate email in tests/e2e/newsletter.spec.ts
- [ ] T088 [P] [US5] E2E test: Newsletter form handles service failure in tests/e2e/newsletter.spec.ts
- [ ] T089 [P] [US5] Integration test: NewsletterForm component validates email in tests/integration/newsletter-form.test.tsx
- [ ] T090 [P] [US5] Integration test: NewsletterForm component handles submission states in tests/integration/newsletter-form.test.tsx
- [ ] T091 [P] [US5] Unit test: NewsletterForm component renders correctly in tests/unit/components/newsletter-form.test.tsx
- [ ] T092 [P] [US5] Unit test: Email validation utility function works correctly in tests/unit/lib/utils.test.ts

### Implementation for User Story 5

- [x] T093 [US5] Create NewsletterForm component in components/shared/newsletter-form.tsx with email input and submit button
- [x] T094 [US5] Add email validation to components/shared/newsletter-form.tsx (RFC 5322 format, real-time validation)
- [x] T095 [US5] Add loading state to components/shared/newsletter-form.tsx during submission
- [x] T096 [US5] Add success state handling to components/shared/newsletter-form.tsx with confirmation message
- [x] T097 [US5] Add error state handling to components/shared/newsletter-form.tsx with user-friendly error message and retry option
- [x] T098 [US5] Add duplicate email handling to components/shared/newsletter-form.tsx with friendly "already subscribed" message
- [x] T099 [US5] Add service failure handling to components/shared/newsletter-form.tsx with alternative contact method
- [x] T100 [US5] Add placeholder API endpoint integration to components/shared/newsletter-form.tsx (POST /api/newsletter/subscribe)
- [x] T101 [US5] Add accessibility features to components/shared/newsletter-form.tsx (ARIA labels, error announcements, keyboard support)
- [x] T102 [US5] Create NewsletterSection component in components/sections/newsletter-section.tsx with NewsletterForm
- [x] T103 [US5] Add NewsletterForm to footer in components/layout/footer.tsx
- [x] T104 [US5] Add NewsletterSection to landing page in app/page.tsx
- [x] T105 [US5] Style newsletter form using shadcn/ui Input and Button components

**Checkpoint**: At this point, User Story 5 should be fully functional. Users can subscribe to newsletters from footer and dedicated section with proper validation and feedback.

---

## Phase 8: User Story 6 - Access Site with Improved Accessibility (Priority: P2)

**Goal**: Users with disabilities can navigate and use the site effectively with assistive technologies

**Independent Test**: All interactive elements are keyboard accessible, screen readers announce content properly, skip link works, and color contrast meets WCAG AA standards.

### Tests for User Story 6

- [ ] T106 [P] [US6] E2E test: Skip link appears and works in tests/e2e/accessibility.spec.ts
- [ ] T107 [P] [US6] E2E test: Keyboard navigation works for all interactive elements in tests/e2e/accessibility.spec.ts
- [ ] T108 [P] [US6] Integration test: ARIA labels are present on all components in tests/integration/accessibility.test.tsx
- [ ] T109 [P] [US6] Unit test: Color contrast meets WCAG AA standards in tests/unit/accessibility.test.tsx

### Implementation for User Story 6

- [x] T110 [US6] Add skip link to main content in app/layout.tsx (visible on Tab press, jumps to main content)
- [x] T111 [US6] Add ARIA labels to Footer component in components/layout/footer.tsx
- [x] T112 [US6] Add ARIA labels to BackToTopButton component in components/shared/back-to-top-button.tsx
- [x] T113 [US6] Add ARIA labels to SocialShareButtons component in components/shared/social-share-buttons.tsx
- [x] T114 [US6] Add ARIA labels to NewsletterForm component in components/shared/newsletter-form.tsx
- [x] T115 [US6] Ensure all buttons have visible focus indicators in components/ui/button.tsx
- [x] T116 [US6] Ensure all links have visible focus indicators throughout the site
- [x] T117 [US6] Add semantic HTML to Footer component in components/layout/footer.tsx (nav, section, address tags)
- [ ] T118 [US6] Verify color contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text) in all components
- [ ] T119 [US6] Add aria-live regions for dynamic content (newsletter form success/error messages) in components/shared/newsletter-form.tsx
- [ ] T120 [US6] Test all components with screen reader (NVDA, JAWS, or VoiceOver)

**Checkpoint**: At this point, User Story 6 should be fully functional. Site meets WCAG 2.1 AA accessibility standards.

---

## Phase 9: User Story 7 - Print Pages with Proper Formatting (Priority: P3)

**Goal**: Users can print pages or save as PDFs with proper formatting, without navigation elements

**Independent Test**: Print preview shows optimized layout without navigation, footer clutter, or back-to-top button. All important content is visible and properly formatted.

### Tests for User Story 7

- [ ] T121 [P] [US7] E2E test: Print styles hide navigation in tests/e2e/print.spec.ts
- [ ] T122 [P] [US7] E2E test: Print styles hide footer clutter in tests/e2e/print.spec.ts
- [ ] T123 [P] [US7] E2E test: Print styles show all important content in tests/e2e/print.spec.ts

### Implementation for User Story 7

- [x] T124 [US7] Add print media query styles to app/globals.css to hide header navigation
- [x] T125 [US7] Add print media query styles to app/globals.css to hide footer social media and newsletter sections
- [x] T126 [US7] Add print media query styles to app/globals.css to hide back-to-top button
- [x] T127 [US7] Add print media query styles to app/globals.css to optimize layout for 8.5x11 inch paper
- [x] T128 [US7] Add print media query styles to app/globals.css to ensure all important content is visible
- [ ] T129 [US7] Test print styles across different browsers (Chrome, Firefox, Safari, Edge)
- [ ] T130 [US7] Test print styles on mobile devices
- [ ] T131 [US7] Verify PDF generation matches print preview

**Checkpoint**: At this point, User Story 7 should be fully functional. Pages print correctly with optimized layouts.

---

## Phase 10: User Story 8 - Experience Better Loading States and Error Handling (Priority: P3)

**Goal**: Users receive clear feedback when content is loading or when errors occur

**Independent Test**: Loading states appear within 100ms, error messages are user-friendly with guidance, and users have retry options when appropriate.

### Tests for User Story 8

- [ ] T132 [P] [US8] Integration test: Loading states appear for async operations in tests/integration/loading-states.test.tsx
- [ ] T133 [P] [US8] Integration test: Error messages are user-friendly in tests/integration/error-handling.test.tsx
- [ ] T134 [P] [US8] Unit test: Error boundary component works correctly in tests/unit/components/error-boundary.test.tsx

### Implementation for User Story 8

- [x] T135 [US8] Add loading skeleton screens for content sections in components/shared/loading-skeleton.tsx
- [x] T136 [US8] Add loading spinners for async operations in components/shared/loading-spinner.tsx
- [x] T137 [US8] Add error boundary component in components/shared/error-boundary.tsx with user-friendly error messages
- [x] T138 [US8] Add retry functionality to error messages in components/shared/error-boundary.tsx
- [ ] T139 [US8] Add loading states to NewsletterForm component in components/shared/newsletter-form.tsx (already implemented in US5)
- [x] T140 [US8] Add loading states to Google Maps component in components/shared/google-map.tsx (for US9)
- [ ] T141 [US8] Ensure all loading states appear within 100ms of operation start
- [ ] T142 [US8] Ensure all error messages are displayed within 1 second of error occurrence

**Checkpoint**: At this point, User Story 8 should be fully functional. Users receive clear feedback during loading and errors.

---

## Phase 11: User Story 9 - View Office Location on Google Maps (Priority: P2)

**Goal**: Users can view the office location on an interactive Google Map on the contact page

**Independent Test**: Google Map displays on contact page with office location marker, map is interactive, and handles API errors gracefully.

### Tests for User Story 9

- [ ] T143 [P] [US9] E2E test: Google Map displays on contact page in tests/e2e/google-maps.spec.ts
- [ ] T144 [P] [US9] E2E test: Google Map shows office location marker in tests/e2e/google-maps.spec.ts
- [ ] T145 [P] [US9] E2E test: Google Map handles API errors gracefully in tests/e2e/google-maps.spec.ts
- [ ] T146 [P] [US9] Integration test: GoogleMap component loads Maps API correctly in tests/integration/google-map.test.tsx
- [ ] T147 [P] [US9] Unit test: GoogleMap component renders correctly in tests/unit/components/google-map.test.tsx

### Implementation for User Story 9

- [x] T148 [US9] Create GoogleMap component in components/shared/google-map.tsx using @react-google-maps/api
- [x] T149 [US9] Add office location coordinates (7155 120 Street, Delta, BC V4E 2B1) to GoogleMap component in components/shared/google-map.tsx
- [x] T150 [US9] Add marker to GoogleMap component in components/shared/google-map.tsx at office location
- [x] T151 [US9] Add error handling to GoogleMap component in components/shared/google-map.tsx for API failures (fallback to static address)
- [x] T152 [US9] Add loading state to GoogleMap component in components/shared/google-map.tsx while Maps API loads
- [x] T153 [US9] Lazy-load GoogleMap component to avoid blocking initial page load
- [x] T154 [US9] Add GoogleMap component to Office Location section in app/(routes)/contact/page.tsx
- [x] T155 [US9] Add accessibility features to GoogleMap component in components/shared/google-map.tsx (ARIA labels, keyboard navigation)
- [x] T156 [US9] Style GoogleMap component with appropriate height and responsive width

**Checkpoint**: At this point, User Story 9 should be fully functional. Office location displays on interactive Google Map.

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T157 [P] Update documentation in docs/003-improve-ui-features-implementation.md with implementation details
- [ ] T158 [P] Code cleanup and refactoring: Remove unused imports, optimize component structure
- [ ] T159 [P] Performance optimization: Verify bundle size targets (initial < 200KB gzipped, total < 500KB gzipped)
- [ ] T160 [P] Performance optimization: Verify Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] T161 [P] Performance optimization: Code-split animation libraries (framer-motion, GSAP) for lazy loading
- [ ] T162 [P] Accessibility audit: Run automated accessibility tests (axe-core, Lighthouse)
- [ ] T163 [P] Accessibility audit: Manual testing with screen readers (NVDA, JAWS, VoiceOver)
- [ ] T164 [P] Accessibility audit: Manual keyboard-only navigation testing
- [ ] T165 [P] Cross-browser testing: Test all features in Chrome, Firefox, Safari, Edge
- [ ] T166 [P] Mobile testing: Test all features on iOS and Android devices
- [ ] T167 [P] Run quickstart.md validation: Verify all setup steps work correctly
- [ ] T168 [P] Update README.md with new features and setup instructions
- [ ] T169 [P] Verify all tests pass: `npm test`, `npm run test:e2e`
- [ ] T170 [P] Verify code coverage meets targets: `npm run test:coverage` (80% minimum, 100% for critical paths)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-11)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 12)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Enhances existing components, can work in parallel with US1/US2
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Newsletter form can be added to footer (US1) but is independently testable
- **User Story 6 (P2)**: Can start after Foundational (Phase 2) - Applies to all components, can work in parallel
- **User Story 7 (P3)**: Can start after Foundational (Phase 2) - Applies to all pages, can work in parallel
- **User Story 8 (P3)**: Can start after Foundational (Phase 2) - Applies to all components, can work in parallel
- **User Story 9 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD approach)
- Core implementation before integration
- Story complete before moving to next priority (recommended for MVP)
- Stories can be worked on in parallel if team capacity allows

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members
- Polish phase tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "E2E test: Footer displays on landing page in tests/e2e/footer.spec.ts"
Task: "E2E test: Footer links navigate correctly in tests/e2e/footer.spec.ts"
Task: "E2E test: Footer displays on contact page in tests/e2e/footer.spec.ts"
Task: "Integration test: Footer component renders all sections in tests/integration/footer.test.tsx"
Task: "Unit test: Footer component renders company info in tests/unit/components/footer.test.tsx"
Task: "Unit test: Footer component renders navigation links in tests/unit/components/footer.test.tsx"
Task: "Unit test: Footer component renders contact details in tests/unit/components/footer.test.tsx"
Task: "Unit test: Footer component renders social media links in tests/unit/components/footer.test.tsx"
Task: "Unit test: Footer component renders legal links in tests/unit/components/footer.test.tsx"

# Then implement Footer component sections in order:
Task: "Create Footer component in components/layout/footer.tsx with company info section"
Task: "Add quick navigation links section to components/layout/footer.tsx"
Task: "Add contact details section to components/layout/footer.tsx"
Task: "Add social media links section to components/layout/footer.tsx"
Task: "Add legal links section to components/layout/footer.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Footer)
4. Complete Phase 4: User Story 2 (Back-to-Top)
5. **STOP and VALIDATE**: Test User Stories 1 & 2 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Footer) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Back-to-Top) → Test independently → Deploy/Demo
4. Add User Story 3 (Animations) → Test independently → Deploy/Demo
5. Add User Story 4 (Social Sharing) → Test independently → Deploy/Demo
6. Add User Story 5 (Newsletter) → Test independently → Deploy/Demo
7. Add User Story 6 (Accessibility) → Test independently → Deploy/Demo
8. Add User Story 9 (Google Maps) → Test independently → Deploy/Demo
9. Add User Story 7 (Print Styles) → Test independently → Deploy/Demo
10. Add User Story 8 (Loading/Error States) → Test independently → Deploy/Demo
11. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Footer)
   - Developer B: User Story 2 (Back-to-Top)
   - Developer C: User Story 3 (Animations)
3. Next iteration:
   - Developer A: User Story 4 (Social Sharing)
   - Developer B: User Story 5 (Newsletter)
   - Developer C: User Story 6 (Accessibility)
4. Continue with remaining stories
5. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD approach)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Total tasks: 170
- Tasks per user story:
  - US1 (Footer): 21 tasks
  - US2 (Back-to-Top): 14 tasks
  - US3 (Animations): 16 tasks
  - US4 (Social Sharing): 16 tasks
  - US5 (Newsletter): 23 tasks
  - US6 (Accessibility): 15 tasks
  - US7 (Print Styles): 11 tasks
  - US8 (Loading/Error): 11 tasks
  - US9 (Google Maps): 14 tasks
  - Setup: 6 tasks
  - Foundational: 9 tasks
  - Polish: 14 tasks
