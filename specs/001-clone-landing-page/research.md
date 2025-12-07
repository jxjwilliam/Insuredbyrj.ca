# Research: Clone Landing Page

**Date**: 2025-01-27  
**Feature**: Clone Landing Page  
**Phase**: 0 - Research & Technology Decisions

## Technology Stack Decisions

### Next.js 15 with App Router

**Decision**: Use Next.js 15.x (latest stable) with App Router architecture.

**Rationale**: 
- App Router provides server components by default, improving performance
- Built-in routing, image optimization, and code splitting
- Excellent TypeScript support
- Strong ecosystem and community support
- Aligns with constitution performance requirements (Core Web Vitals)

**Alternatives considered**:
- Next.js Pages Router: Older architecture, less optimal for modern React patterns
- Remix: Smaller ecosystem, less mature
- Vite + React Router: More manual setup, no built-in optimizations

### Tailwind CSS 3.x

**Decision**: Use Tailwind CSS 3.x (latest) for all styling.

**Rationale**:
- Constitution requires Tailwind CSS exclusively for styling
- Utility-first approach enables rapid development
- Excellent responsive design utilities
- Small bundle size with purging
- Strong integration with shadcn/ui

**Alternatives considered**: None (constitution requirement)

### shadcn/ui Components

**Decision**: Use shadcn/ui (latest) as the component foundation.

**Rationale**:
- Constitution requires shadcn/ui as design system foundation
- Copy-paste component model (not a dependency)
- Built on Radix UI primitives (accessibility built-in)
- Fully customizable with Tailwind
- TypeScript-first

**Components needed**:
- Button (for CTAs)
- Accordion (for FAQ section)
- Navigation Menu (for sticky header)
- Card (for insurance plan cards)

**Alternatives considered**: None (constitution requirement)

### Image Handling Strategy

**Decision**: Use Next.js Image component with external URLs and fallback placeholders.

**Rationale**:
- Next.js Image provides automatic optimization, lazy loading, and responsive images
- External URLs from source page allow exact visual match
- Fallback placeholders maintain layout integrity (constitution requirement)
- Supports WebP/AVIF formats automatically
- Meets performance requirements (LCP < 2.5s)

**Implementation approach**:
- Use `next/image` with `unoptimized` prop for external domains
- Create fallback placeholder images in `/public/images/placeholders/`
- Implement custom ImageWithFallback component that handles error states

**Alternatives considered**:
- Static assets: Would require downloading and hosting all images, more maintenance
- Image CDN: Adds complexity, external URLs are sufficient

### Smooth Scrolling & Navigation

**Decision**: Use CSS scroll-behavior and JavaScript for smooth scrolling with intersection observer for active nav state.

**Rationale**:
- Native CSS `scroll-behavior: smooth` provides basic smooth scrolling
- JavaScript `scrollIntoView` with `behavior: 'smooth'` for programmatic scrolling
- Intersection Observer API for detecting active section (for nav highlighting)
- Lightweight, no additional dependencies needed

**Alternatives considered**:
- React libraries (react-scroll): Adds dependency, native solution sufficient
- CSS-only: Limited control, JavaScript provides better UX

### FAQ Accordion Implementation

**Decision**: Use shadcn/ui Accordion component (built on Radix UI Accordion).

**Rationale**:
- Built-in accessibility (ARIA attributes, keyboard navigation)
- Matches constitution requirement (WCAG 2.1 AA)
- Accordion pattern (one open at a time) as clarified in spec
- Styling customizable with Tailwind
- No additional dependencies (Radix UI included with shadcn/ui)

**Alternatives considered**:
- Custom accordion: More code, accessibility concerns
- Other libraries: Adds dependency, shadcn/ui already available

### Sticky Navigation Header

**Decision**: Use CSS `position: sticky` with backdrop blur for modern glassmorphism effect.

**Rationale**:
- Native CSS solution, no JavaScript needed for stickiness
- Backdrop blur provides modern visual effect matching source design
- Lightweight, performant
- Works across all browsers

**Implementation details**:
- `sticky top-0 z-50` for positioning
- `bg-white/95 backdrop-blur-sm` for glassmorphism
- Shadow and border for visual separation

**Alternatives considered**:
- JavaScript-based sticky: Unnecessary complexity, CSS sufficient
- Fixed positioning: Less flexible, sticky is better UX

### Testing Strategy

**Decision**: Use Jest + React Testing Library for unit tests, Playwright for E2E tests.

**Rationale**:
- Jest: Industry standard, excellent TypeScript support
- React Testing Library: Encourages testing user behavior, not implementation
- Playwright: Modern E2E framework, better than Cypress for Next.js
- Meets constitution requirement (80% coverage, TDD approach)

**Test structure**:
- Unit tests: Individual components, utilities
- Integration tests: Section components, page layout
- E2E tests: User journeys (view content, navigate, interact with FAQ)

**Alternatives considered**:
- Vitest: Newer, less ecosystem maturity
- Cypress: Heavier, Playwright more modern

### Performance Optimization

**Decision**: Implement static generation, image optimization, code splitting, and lazy loading.

**Rationale**:
- Static generation: Landing page is mostly static content, perfect for SSG
- Image optimization: Next.js Image component handles this automatically
- Code splitting: Route-based (automatic with App Router)
- Lazy loading: Images and below-fold content
- Meets all constitution performance targets

**Optimization techniques**:
- Static page generation (no server-side rendering needed)
- Image lazy loading with `loading="lazy"`
- Dynamic imports for heavy components (if needed)
- Font optimization with `next/font`

**Alternatives considered**: None - these are standard Next.js optimizations

## Accessibility Decisions

### WCAG 2.1 Level AA Compliance

**Decision**: Implement full WCAG 2.1 AA compliance using semantic HTML, ARIA attributes, and keyboard navigation.

**Rationale**:
- Constitution requirement (mandatory)
- shadcn/ui components built on Radix UI (accessibility built-in)
- Semantic HTML for screen readers
- Keyboard navigation for all interactive elements
- Proper color contrast ratios

**Implementation checklist**:
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`)
- ARIA labels where needed
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators
- Alt text for all images
- Color contrast ratios (4.5:1 for text)

## Content Management

### Static Content Storage

**Decision**: Store all content in TypeScript constants file (`lib/constants.ts`).

**Rationale**:
- Landing page content is static (no CMS needed)
- Type-safe content with TypeScript
- Easy to update and maintain
- No database overhead
- Version controlled

**Content structure**:
- Hero section text
- Trust indicators
- Benefit points
- Insurance plan details
- FAQ items (questions and answers)
- Navigation links

**Alternatives considered**:
- CMS (Contentful, Sanity): Overkill for static landing page
- JSON files: Less type-safe than TypeScript
- Database: Unnecessary complexity

## Placeholder Pages Strategy

**Decision**: Create minimal placeholder pages with basic structure and "Coming Soon" messaging.

**Rationale**:
- Spec clarification requires placeholder pages
- Allows landing page to be fully functional independently
- Minimal implementation effort
- Can be enhanced later without breaking existing links

**Placeholder page structure**:
- Basic layout matching main site
- Page title and brief description
- "Coming Soon" or minimal content message
- Navigation back to main page

## Summary

All technology decisions align with:
- ✅ Constitution requirements (TypeScript, shadcn/ui, Tailwind, testing, accessibility, performance)
- ✅ Spec requirements (placeholder pages, external images, accordion FAQ, sticky nav)
- ✅ Best practices for Next.js development
- ✅ Performance and accessibility standards

No unresolved technical decisions remain. Ready to proceed to Phase 1 (Design & Contracts).

