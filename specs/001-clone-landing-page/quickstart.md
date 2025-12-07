# Quickstart Guide: Clone Landing Page

**Date**: 2025-01-27  
**Feature**: Clone Landing Page

## Prerequisites

- Node.js 20.x LTS installed
- npm or yarn package manager
- Git repository cloned

## Setup Steps

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

This installs:
- Next.js 15.x
- React 19.x
- TypeScript 5.x
- Tailwind CSS 3.x
- shadcn/ui components
- Testing libraries (Jest, React Testing Library, Playwright)

### 2. Initialize shadcn/ui (if not already done)

```bash
npx shadcn@latest init
```

Configuration:
- TypeScript: Yes
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: `tailwind.config.ts`
- Components: `components/ui`
- Utils: `lib/utils.ts`
- React Server Components: Yes

### 3. Add Required shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add accordion
npx shadcn@latest add navigation-menu
npx shadcn@latest add card
```

### 4. Create Directory Structure

```bash
mkdir -p app/\(routes\)/get-quote
mkdir -p app/\(routes\)/contact
mkdir -p app/\(routes\)/products/{term-life,whole-life,universal-life,critical-illness}
mkdir -p components/{layout,sections,shared}
mkdir -p lib
mkdir -p public/images/placeholders
mkdir -p tests/{unit,integration,e2e}
```

### 5. Create Content Constants

Create `lib/constants.ts` with all landing page content (see data-model.md for structure).

### 6. Create Type Definitions

Create `lib/types.ts` with all TypeScript interfaces (see data-model.md for structure).

### 7. Build and Run

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see the landing page.

## Development Workflow

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

### Linting and Type Checking

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Format
npm run format
```

### Building for Production

```bash
npm run build
npm run start
```

## Key Files to Implement

### Core Page
- `app/page.tsx` - Main landing page component

### Sections (in order)
1. `components/sections/hero-section.tsx`
2. `components/sections/trust-indicators.tsx`
3. `components/sections/why-choose.tsx`
4. `components/sections/insurance-plans.tsx`
5. `components/sections/how-it-works.tsx`
6. `components/sections/why-bc.tsx`
7. `components/sections/faq-section.tsx`

### Layout Components
- `components/layout/header.tsx` - Sticky navigation header
- `app/layout.tsx` - Root layout with metadata

### Shared Components
- `components/shared/cta-button.tsx` - Reusable CTA button
- `components/shared/plan-card.tsx` - Insurance plan card
- `components/shared/image-with-fallback.tsx` - Image with error handling

### Placeholder Pages
- `app/(routes)/get-quote/page.tsx`
- `app/(routes)/contact/page.tsx`
- `app/(routes)/products/[plan-type]/page.tsx`

## Content Updates

To update landing page content:
1. Edit `lib/constants.ts`
2. Update TypeScript types in `lib/types.ts` if structure changes
3. Content is type-safe and validated at compile time

## Image Management

### External Images
- URLs stored in `lib/constants.ts`
- Loaded via Next.js Image component
- Automatically optimized by Next.js

### Fallback Images
- Place in `/public/images/placeholders/`
- Named descriptively (e.g., `hero-fallback.jpg`, `plan-term-life-fallback.jpg`)
- Referenced in `ImageWithFallback` component

## Testing Checklist

Before considering the feature complete:

- [ ] All sections render correctly
- [ ] Sticky navigation works
- [ ] Smooth scrolling to sections works
- [ ] FAQ accordion expands/collapses correctly
- [ ] All CTAs link to correct placeholder pages
- [ ] Images load or show fallbacks
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader compatible
- [ ] Performance: LCP < 2.5s
- [ ] Performance: Bundle size < 200KB gzipped
- [ ] All tests pass (80%+ coverage)

## Troubleshooting

### Images Not Loading
- Check external URL is accessible
- Verify fallback images exist in `/public/images/placeholders/`
- Check browser console for CORS errors

### TypeScript Errors
- Run `npm run type-check` to see all errors
- Ensure all content in `constants.ts` matches `types.ts` interfaces

### Styling Issues
- Verify Tailwind is configured correctly
- Check `tailwind.config.ts` includes all component paths
- Ensure `globals.css` imports Tailwind directives

### shadcn/ui Components Not Working
- Verify components are installed: `npx shadcn@latest add [component]`
- Check `components.json` configuration
- Ensure `lib/utils.ts` exists with `cn()` function

## Next Steps

After implementation:
1. Run `/speckit.tasks` to generate task breakdown
2. Implement components following TDD approach
3. Test each user story independently
4. Verify constitution compliance
5. Deploy to staging for review

