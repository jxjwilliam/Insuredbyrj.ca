# Quickstart Guide: Improve Webpage with More Details

**Date**: 2025-01-27  
**Feature**: Improve Webpage with More Details

## Prerequisites

- Node.js 20.x LTS installed
- npm or yarn package manager
- Git repository cloned
- Existing landing page implementation (from feature 001)

## Setup Steps

### 1. Install New Dependencies

```bash
npm install framer-motion@^11.0.0
npm install gsap@^3.12.0
npm install --save-dev @types/gsap
```

**Note**: magicui and acernity-ui are copy-paste libraries (not npm packages). Components will be copied directly into the project.

### 2. Add Additional shadcn/ui Components

```bash
npx shadcn@latest add dialog
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add tooltip
```

### 3. Create Directory Structure

```bash
mkdir -p components/animations
mkdir -p components/sections/testimonials-section.tsx
mkdir -p components/sections/pricing-section.tsx
mkdir -p components/sections/company-background-section.tsx
mkdir -p components/sections/claims-process-section.tsx
mkdir -p public/images/testimonials
```

### 4. Copy magicui Components (Optional)

If using magicui components:

1. Visit [magicui.dev](https://magicui.dev) or GitHub repository
2. Copy desired components to `components/ui/`
3. Follow shadcn/ui naming conventions
4. Customize styling to match project design system

**Recommended magicui components**:
- `animated-beam` - For connecting elements
- `3d-card` - For enhanced plan cards
- `gradient-text` - For headings

### 5. Copy acernity-ui Components (Optional)

If using acernity-ui components:

1. Visit [ui.aceternity.com](https://ui.aceternity.com) or GitHub repository
2. Copy desired components to `components/ui/` or `components/animations/`
3. Ensure components use `"use client"` directive
4. Customize styling to match project design system

**Recommended acernity-ui components**:
- `aurora-background` - For hero section backgrounds
- `gradient-mesh` - For section backgrounds
- `particles` - For animated particle effects

### 6. Update Type Definitions

Add new type definitions to `lib/types.ts`:

```typescript
// Import new types from data-model.md
// Add: DetailedPlanInformation, TrustCredential, Testimonial, 
//      PricingScenario, CompanyBackground, ProcessDetail, 
//      ClaimsProcessInfo, ContactDetails, ServiceArea
```

### 7. Update Content Constants

Add detailed content to `lib/constants.ts`:

```typescript
// Add new content sections:
// - detailedPlanInfo: DetailedPlanInformation[]
// - trustCredentials: TrustCredential[]
// - testimonials: Testimonial[]
// - pricingScenarios: PricingScenario[]
// - companyBackground: CompanyBackground
// - processDetails: ProcessDetail[]
// - claimsProcess: ClaimsProcessInfo
// - contactDetails: ContactDetails
// - serviceAreas: ServiceArea
```

**Content Sources**:
- Extract information from `docs/search.md`
- Add real business data (Rajan Thind, InsureLine Brokers Infinity)
- Include professional credentials and certifications
- Add customer testimonials (with permission)

### 8. Create Animation Utilities

Create animation wrapper components in `components/animations/`:

- `fade-in.tsx` - Framer Motion fade animations
- `slide-in.tsx` - Framer Motion slide animations
- `stagger-children.tsx` - Framer Motion stagger effects
- `gsap-animations.tsx` - GSAP scroll-triggered animations

**Example FadeIn Component**:

```typescript
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

export function FadeIn({ children, delay = 0, duration = 0.5 }) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    return <>{children}</>
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  )
}
```

### 9. Create Reduced Motion Hook

Create `lib/hooks/use-reduced-motion.ts`:

```typescript
'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  return prefersReducedMotion
}
```

### 10. Update Tailwind Config (if needed)

If using custom animation utilities, add to `tailwind.config.ts`:

```typescript
extend: {
  keyframes: {
    // Add custom keyframes if needed
  },
  animation: {
    // Add custom animations if needed
  }
}
```

### 11. Code-Split Animation Libraries

Use Next.js dynamic imports for animation components:

```typescript
// Example: Lazy-load animated section
import dynamic from 'next/dynamic'

const AnimatedSection = dynamic(
  () => import('@/components/shared/animated-section'),
  { ssr: false }
)
```

### 12. Build and Run

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see the enhanced landing page.

## Development Workflow

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
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

**Note**: Monitor bundle size during build. Animation libraries should be code-split to maintain performance targets.

## Content Management

### Adding Testimonials

1. Obtain customer permission
2. Add testimonial to `lib/constants.ts`:
   ```typescript
   testimonials: [
     {
       id: 'testimonial-1',
       customerName: 'John D.',
       location: 'Surrey, BC',
       situation: 'New parent looking for term life insurance',
       experience: '...',
       outcome: '...',
       rating: 5,
       verified: true
     }
   ]
   ```

### Adding Pricing Scenarios

1. Add pricing scenario to `lib/constants.ts`:
   ```typescript
   pricingScenarios: [
     {
       id: 'scenario-1',
       planId: 'term-life',
       profile: {
         age: 35,
         healthStatus: 'excellent',
         coverageAmount: '$500,000',
         termLength: '20 years'
       },
       monthlyPremium: '$45/month',
       annualPremium: '$540/year',
       disclaimer: 'Representative pricing only...'
     }
   ]
   ```

### Updating Company Background

1. Extract information from `docs/search.md`
2. Add to `lib/constants.ts`:
   ```typescript
   companyBackground: {
     companyName: 'InsureLine Brokers (Infinity)',
     ownerName: 'Rajan Thind',
     // ... see data-model.md for full structure
   }
   ```

## Performance Optimization

### Animation Performance

1. **Lazy-load animations**: Use dynamic imports for animation components
2. **Code-split libraries**: Load framer-motion and GSAP only when needed
3. **Respect reduced motion**: Always check `prefers-reduced-motion`
4. **Optimize animations**: Use `will-change` CSS property sparingly
5. **Monitor bundle size**: Keep total bundle < 500KB gzipped

### Content Performance

1. **Progressive disclosure**: Use expandable sections for detailed content
2. **Lazy-load images**: Use Next.js Image component with lazy loading
3. **Optimize images**: Use WebP/AVIF formats, responsive sizes
4. **Code-split sections**: Load below-the-fold content on demand

## Troubleshooting

### Animation Libraries Not Loading

- Ensure components use `"use client"` directive
- Check that dynamic imports are configured correctly
- Verify animation libraries are installed

### Bundle Size Too Large

- Use dynamic imports for animation components
- Code-split GSAP plugins (load only needed plugins)
- Consider removing unused animation libraries
- Monitor bundle size with `npm run build`

### Accessibility Issues

- Ensure all animations respect `prefers-reduced-motion`
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard navigation works
- Check ARIA attributes are present

### Type Errors

- Ensure all new types are added to `lib/types.ts`
- Check that content constants match type definitions
- Run `npm run type-check` to identify issues

## Next Steps

1. Implement new sections following component contracts
2. Add animations to existing sections
3. Enhance plan cards with expandable details
4. Add testimonials section
5. Create company background section
6. Implement pricing calculator
7. Add claims process section
8. Test all enhancements for accessibility and performance
