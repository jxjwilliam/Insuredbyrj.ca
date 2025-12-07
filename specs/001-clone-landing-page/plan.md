# Implementation Plan: Clone Landing Page

**Branch**: `001-clone-landing-page` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-clone-landing-page/spec.md`

## Summary

Clone the "Insured by Rajan" life insurance landing page from the source URL, implementing an exact visual and functional replica using Next.js 15 (App Router), Tailwind CSS, and shadcn/ui components. The implementation will include all content sections (hero, trust indicators, benefits, insurance plans, process flow, FAQ), responsive design, sticky navigation, smooth scrolling, and placeholder destination pages for CTAs. All images will use external URLs from the source with fallback placeholders.

## Technical Context

**Language/Version**: TypeScript 5.x (latest stable) / Node.js 20.x LTS  
**Primary Dependencies**: Next.js 15.x (App Router), React 19.x, Tailwind CSS 3.x (latest), shadcn/ui (latest), @radix-ui/react-accordion, @radix-ui/react-navigation-menu  
**Storage**: N/A (static content, no database)  
**Testing**: Jest, React Testing Library, Playwright (for E2E), @testing-library/jest-dom  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - latest 2 versions), responsive (mobile, tablet, desktop)  
**Project Type**: web (Next.js App Router single-page application)  
**Performance Goals**: LCP < 2.5s, FID < 100ms, CLS < 0.1, TTFB < 600ms, page load < 3s on 3G, bundle size < 200KB gzipped initial, < 500KB total  
**Constraints**: WCAG 2.1 AA compliance, TypeScript strict mode, 80% test coverage minimum, all images must have fallback placeholders, external image URLs may fail  
**Scale/Scope**: Single landing page with 6+ content sections, 4 insurance plan cards, 6+ FAQ items, sticky navigation, 3 placeholder destination pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with InsuredByRJ Constitution principles:

- **Code Quality**: ✅ TypeScript strict mode enabled, all components typed, JSDoc/TSDoc documentation for exported components, kebab-case file naming, explicit error handling for image loading failures
- **Testing Standards**: ✅ TDD approach for components, 80% coverage target (100% for critical paths like navigation and FAQ interactions), unit tests for all reusable components, integration tests for page sections, E2E tests for user journeys
- **User Experience**: ✅ shadcn/ui components for consistency, Tailwind CSS exclusively for styling, WCAG 2.1 AA compliance (semantic HTML, ARIA attributes, keyboard navigation), responsive design (mobile-first), loading states for images
- **Performance**: ✅ Core Web Vitals targets defined, image optimization (lazy loading, responsive sizes), route-based code splitting, static generation where possible, bundle size monitoring

**Constitution Compliance**: ✅ PASS - All principles can be met with chosen tech stack and implementation approach.

## Project Structure

### Documentation (this feature)

```text
specs/001-clone-landing-page/
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
├── layout.tsx           # Root layout with metadata, global styles
├── page.tsx             # Landing page (main content)
├── globals.css          # Tailwind directives, CSS variables
├── (routes)/
│   ├── get-quote/
│   │   └── page.tsx     # Placeholder quote page
│   ├── contact/
│   │   └── page.tsx     # Placeholder contact page
│   └── products/
│       ├── term-life/
│       │   └── page.tsx # Placeholder product detail
│       ├── whole-life/
│       │   └── page.tsx # Placeholder product detail
│       ├── universal-life/
│       │   └── page.tsx # Placeholder product detail
│       └── critical-illness/
│           └── page.tsx # Placeholder product detail
components/
├── ui/                  # shadcn/ui components
│   ├── button.tsx
│   ├── accordion.tsx
│   └── navigation-menu.tsx
├── layout/
│   ├── header.tsx       # Sticky navigation header
│   └── footer.tsx       # Footer (if needed)
├── sections/
│   ├── hero-section.tsx
│   ├── trust-indicators.tsx
│   ├── why-choose.tsx
│   ├── insurance-plans.tsx
│   ├── how-it-works.tsx
│   ├── why-bc.tsx
│   └── faq-section.tsx
├── shared/
│   ├── cta-button.tsx  # Reusable CTA component
│   ├── plan-card.tsx   # Insurance plan card component
│   └── image-with-fallback.tsx # Image component with fallback
lib/
├── constants.ts         # Content constants (text, images, FAQ data)
├── utils.ts            # Utility functions (smooth scroll, image handling)
└── types.ts             # TypeScript type definitions
public/
└── images/
    └── placeholders/    # Fallback placeholder images
tests/
├── unit/
│   ├── components/      # Component unit tests
│   └── lib/            # Utility function tests
├── integration/
│   └── sections/       # Section integration tests
└── e2e/
    └── landing-page.spec.ts # E2E tests for user journeys
```

**Structure Decision**: Next.js App Router structure with feature-based component organization. Components grouped by section for maintainability. Placeholder pages in route groups for organization. Static content in constants file for easy updates.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution requirements can be met with standard Next.js + shadcn/ui patterns.
