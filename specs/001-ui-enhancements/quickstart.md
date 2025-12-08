# Quickstart Guide: UI/CSS Enhancements

**Date**: 2025-01-27  
**Feature**: UI/CSS Enhancements  
**Phase**: 1 - Design & Contracts

## Overview

This quickstart guide provides step-by-step instructions for implementing UI/CSS enhancements using GSAP, framer-motion, MagicUI, Acernity UI, shadcn/ui, and Google Fonts.

## Prerequisites

- Node.js 18+ installed
- Next.js 15.0.0 project set up
- Existing animation infrastructure (GSAP, framer-motion already installed)
- shadcn/ui configured
- TypeScript strict mode enabled

## Step 1: Verify Existing Dependencies

Check that required packages are installed:

```bash
npm list gsap framer-motion
```

Expected output should show:
- `gsap@^3.13.0`
- `framer-motion@^11.18.2`

If missing, install:
```bash
npm install gsap@^3.13.0 framer-motion@^11.18.2
```

## Step 2: Add Google Fonts

### 2.1 Update Layout with Fonts

Edit `app/[locale]/layout.tsx`:

```typescript
import { Inter, Playfair_Display, Montserrat } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700']
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '600', '700']
})

// Apply to body
<body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${inter.className}`}>
```

### 2.2 Update CSS Variables

Edit `app/globals.css`:

```css
:root {
  --font-heading: var(--font-playfair);
  --font-body: var(--font-inter);
  --font-accent: var(--font-montserrat);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

## Step 3: Enhance GSAP Animations

### 3.1 Update GSAP Component

Edit `components/animations/gsap-animations.tsx`:

```typescript
// Add keyframe support
interface GSAPKeyframe {
  progress: number
  properties: Record<string, number | string>
  ease?: string
}

// Add keyframe animation type
animation?: 'fadeIn' | 'slideUp' | 'parallax' | 'scale' | 'keyframe'

// Implement keyframe animation
if (animation === 'keyframe' && keyframes) {
  const timeline = gsap.timeline()
  keyframes.forEach((keyframe) => {
    timeline.to(element, {
      ...keyframe.properties,
      ease: keyframe.ease || 'power2.out',
      duration: keyframe.progress * totalDuration
    }, keyframe.progress)
  })
}
```

### 3.2 Add ScrollTrigger Enhancements

```typescript
// Add scrub for smooth scroll-linked animations
ScrollTrigger.create({
  trigger: element,
  start: 'top 80%',
  scrub: true, // Smooth scroll-linked animation
  animation: gsap.to(element, { ... })
})
```

## Step 4: Enhance Framer Motion Components

### 4.1 Add Viewport Animations

Create `components/animations/viewport-animation.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

export function ViewportAnimation({ children, ...props }) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    return <div>{children}</div>
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

## Step 5: Add MagicUI Components

### 5.1 Copy MagicUI Components

1. Visit [magicui.design](https://magicui.design)
2. Select components to copy (e.g., Animated Beam, Border Beam, Shimmer Button)
3. Copy component code
4. Paste into `components/ui/[component-name].tsx`
5. Customize colors to match brand
6. Add TypeScript types
7. Test accessibility

### 5.2 Example: Shimmer Button

```typescript
// components/ui/shimmer-button.tsx
'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ShimmerButton({ children, className, ...props }) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r",
        "before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
```

## Step 6: Add Acernity UI Components

### 6.1 Copy Acernity UI Components

1. Visit [ui.aceternity.com](https://ui.aceternity.com)
2. Select components (e.g., Aurora Background, 3D Card, Spotlight)
3. Copy component code
4. Paste into `components/ui/[component-name].tsx` or `components/animations/[component-name].tsx`
5. Customize for project
6. Test performance

### 6.2 Example: Aurora Background

```typescript
// components/animations/aurora-background.tsx
'use client'

import { useEffect, useRef } from 'react'

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    // Aurora effect implementation
    // (Copy from Acernity UI)
  }, [])
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
```

## Step 7: Add New shadcn/ui Components

### 7.1 Install Components

```bash
npx shadcn@latest add skeleton
npx shadcn@latest add progress
npx shadcn@latest add alert
npx shadcn@latest add avatar
npx shadcn@latest add carousel
npx shadcn@latest add hover-card
npx shadcn@latest add popover
npx shadcn@latest add select
npx shadcn@latest add switch
npx shadcn@latest add slider
```

### 7.2 Customize Components

Edit each component in `components/ui/` to match brand colors and styling.

## Step 8: Enhance Existing Sections

### 8.1 Hero Section

Edit `components/sections/hero-section.tsx`:

```typescript
import { GSAPScrollAnimation } from '@/components/animations/gsap-animations'
import { AuroraBackground } from '@/components/animations/aurora-background'

export function HeroSection() {
  return (
    <section className="relative">
      <AuroraBackground />
      <GSAPScrollAnimation animation="parallax">
        {/* Hero content */}
      </GSAPScrollAnimation>
    </section>
  )
}
```

### 8.2 Plan Cards

Edit `components/shared/plan-card.tsx`:

```typescript
import { ViewportAnimation } from '@/components/animations/viewport-animation'
import { MagicCard } from '@/components/ui/magic-card'

export function PlanCard({ plan }) {
  return (
    <ViewportAnimation>
      <MagicCard>
        {/* Plan card content */}
      </MagicCard>
    </ViewportAnimation>
  )
}
```

## Step 9: Add Keyframe Animations

### 9.1 Create Keyframe Animation Component

Create `components/animations/keyframe-animation.tsx`:

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Keyframe {
  progress: number
  properties: Record<string, number | string>
  ease?: string
}

export function KeyframeAnimation({ 
  children, 
  keyframes 
}: { 
  children: React.ReactNode
  keyframes: Keyframe[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!ref.current) return
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        scrub: true
      }
    })
    
    keyframes.forEach((keyframe) => {
      timeline.to(ref.current, {
        ...keyframe.properties,
        ease: keyframe.ease || 'power2.out'
      }, keyframe.progress)
    })
    
    return () => timeline.kill()
  }, [keyframes])
  
  return <div ref={ref}>{children}</div>
}
```

## Step 10: Testing

### 10.1 Unit Tests

Create tests for new animation components:

```typescript
// tests/unit/components/animations/viewport-animation.test.tsx
import { render } from '@testing-library/react'
import { ViewportAnimation } from '@/components/animations/viewport-animation'

describe('ViewportAnimation', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ViewportAnimation>Test Content</ViewportAnimation>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })
  
  it('respects reduced motion', () => {
    // Mock prefers-reduced-motion
    // Test that animations are disabled
  })
})
```

### 10.2 E2E Tests

Create E2E tests for enhanced UI:

```typescript
// tests/e2e/ui-enhancements.spec.ts
import { test, expect } from '@playwright/test'

test('hero section has parallax animation', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('#hero')
  await expect(hero).toBeVisible()
  // Test scroll animation
})
```

## Step 11: Performance Optimization

### 11.1 Code Splitting

Lazy load animation components:

```typescript
import dynamic from 'next/dynamic'

const GSAPScrollAnimation = dynamic(
  () => import('@/components/animations/gsap-animations').then(mod => mod.GSAPScrollAnimation),
  { ssr: false }
)
```

### 11.2 Font Optimization

Ensure fonts are optimized via `next/font/google` (already done in Step 2).

## Step 12: Accessibility

### 12.1 Reduced Motion

All animations should use `useReducedMotion` hook:

```typescript
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

const prefersReducedMotion = useReducedMotion()
if (prefersReducedMotion) {
  // Render static content
}
```

### 12.2 Keyboard Navigation

Ensure all interactive elements are keyboard accessible.

## Common Issues & Solutions

### Issue: Animations not working

**Solution**: Check that:
- GSAP ScrollTrigger is registered: `gsap.registerPlugin(ScrollTrigger)`
- Components are client components: `'use client'`
- Elements are mounted before animation initialization

### Issue: Fonts not loading

**Solution**: Check that:
- Fonts are imported in layout
- CSS variables are set correctly
- Font-display: swap is set

### Issue: Performance degradation

**Solution**: 
- Limit concurrent animations
- Use `will-change` sparingly
- Animate only `transform` and `opacity`
- Code-split animation libraries

## Next Steps

1. Review reference websites for design inspiration
2. Select specific MagicUI and Acernity UI components
3. Implement animations section by section
4. Test on various devices and browsers
5. Optimize performance based on metrics
6. Document component usage

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [MagicUI Components](https://magicui.design)
- [Acernity UI Components](https://ui.aceternity.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
