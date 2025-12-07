# Component Contracts: Improve Webpage with More Details

**Date**: 2025-01-27  
**Feature**: Improve Webpage with More Details  
**Phase**: 1 - Design & Contracts

## Overview

This feature is frontend-only (static content, no API endpoints). Component contracts define the TypeScript interfaces for new and enhanced React components.

## Component Contracts

### ExpandableContent

Progressive disclosure component for detailed content.

**Location**: `components/shared/expandable-content.tsx`

```typescript
interface ExpandableContentProps {
  title: string;
  summary: string; // Brief summary shown when collapsed
  content: React.ReactNode; // Detailed content shown when expanded
  defaultExpanded?: boolean; // Whether initially expanded
  variant?: 'accordion' | 'collapsible' | 'modal'; // Display variant
  onExpandChange?: (expanded: boolean) => void; // Callback for state changes
  className?: string; // Additional CSS classes
}
```

**Behavior**:
- Supports keyboard navigation (Enter/Space to toggle)
- ARIA attributes for accessibility
- Respects `prefers-reduced-motion`
- Smooth expand/collapse animation

### AnimatedSection

Wrapper component for framer-motion animations.

**Location**: `components/shared/animated-section.tsx`

```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  delay?: number; // Animation delay in seconds
  duration?: number; // Animation duration in seconds
  once?: boolean; // Animate only once (on first view)
  threshold?: number; // Intersection observer threshold (0-1)
  className?: string;
}
```

**Behavior**:
- Uses Intersection Observer to trigger animations
- Respects `prefers-reduced-motion` (disables animations)
- Lazy-loads framer-motion to avoid blocking initial render
- Supports stagger animations for children

### PricingCalculator

Interactive component for pricing examples.

**Location**: `components/shared/pricing-calculator.tsx`

```typescript
interface PricingCalculatorProps {
  planId: string; // References InsurancePlan.id
  scenarios: PricingScenario[]; // Available pricing scenarios
  onScenarioSelect?: (scenarioId: string) => void; // Callback when scenario selected
  showDisclaimer?: boolean; // Whether to show pricing disclaimer
  className?: string;
}
```

**Behavior**:
- Displays pricing scenarios for selected plan
- Allows filtering by age, coverage amount, health status
- Shows representative pricing with disclaimer
- Links to quote request page

### TestimonialsSection

Component for displaying customer testimonials.

**Location**: `components/sections/testimonials-section.tsx`

```typescript
interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string; // Section title (default: "What Our Customers Say")
  showCarousel?: boolean; // Whether to use carousel layout
  itemsPerView?: number; // Number of testimonials visible at once
  autoPlay?: boolean; // Auto-advance carousel
  className?: string;
}
```

**Behavior**:
- Displays testimonials in grid or carousel layout
- Supports filtering by location or situation
- Shows verified badge for verified testimonials
- Responsive design (1 column mobile, 2-3 columns desktop)

### CompanyBackgroundSection

Component for company and advisor background.

**Location**: `components/sections/company-background-section.tsx`

```typescript
interface CompanyBackgroundSectionProps {
  background: CompanyBackground;
  showImage?: boolean; // Whether to show professional headshot
  layout?: 'default' | 'split' | 'centered'; // Layout variant
  className?: string;
}
```

**Behavior**:
- Displays company information and advisor bio
- Shows professional credentials and experience
- Displays company values and differentiators
- Links to contact page

### EnhancedPlanCard

Enhanced insurance plan card with expandable details.

**Location**: `components/shared/plan-card.tsx` (enhanced)

```typescript
interface EnhancedPlanCardProps {
  plan: InsurancePlan;
  detailedInfo?: DetailedPlanInformation; // Optional detailed information
  onLearnMore?: () => void; // Callback for "Learn More" action
  showComparison?: boolean; // Whether to show comparison points
  className?: string;
}
```

**Behavior**:
- Displays plan information with expandable details
- Shows "Learn More" button that expands detailed info
- Shows comparison points (affordability, flexibility, etc.)
- Links to product detail page

### ClaimsProcessSection

Component for detailed claims process information.

**Location**: `components/sections/claims-process-section.tsx`

```typescript
interface ClaimsProcessSectionProps {
  claimsInfo: ClaimsProcessInfo;
  title?: string; // Section title (default: "Claims Process")
  layout?: 'steps' | 'timeline' | 'accordion'; // Display layout
  className?: string;
}
```

**Behavior**:
- Displays step-by-step claims process
- Shows timeline and expected durations
- Lists required documents
- Provides contact information for claims support

### EnhancedTrustIndicators

Enhanced trust indicators with detailed credentials.

**Location**: `components/sections/trust-indicators.tsx` (enhanced)

```typescript
interface EnhancedTrustIndicatorsProps {
  indicators: TrustIndicator[];
  credentials?: TrustCredential[]; // Optional detailed credentials
  showDetails?: boolean; // Whether to show detailed credential information
  layout?: 'grid' | 'carousel' | 'list'; // Display layout
  className?: string;
}
```

**Behavior**:
- Displays trust indicators with optional detailed credentials
- Shows verification links when available
- Groups credentials by type (certifications, licenses, awards)
- Responsive grid layout

## Animation Component Contracts

### FadeInAnimation

Framer Motion fade-in animation wrapper.

**Location**: `components/animations/fade-in.tsx`

```typescript
interface FadeInAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}
```

### SlideInAnimation

Framer Motion slide-in animation wrapper.

**Location**: `components/animations/slide-in.tsx`

```typescript
interface SlideInAnimationProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  distance?: number; // Distance to slide in pixels
  className?: string;
}
```

### StaggerChildrenAnimation

Framer Motion stagger animation for children.

**Location**: `components/animations/stagger-children.tsx`

```typescript
interface StaggerChildrenAnimationProps {
  children: React.ReactNode;
  staggerDelay?: number; // Delay between each child
  animation?: 'fadeIn' | 'slideUp' | 'scale';
  className?: string;
}
```

### GSAPScrollAnimation

GSAP scroll-triggered animation wrapper.

**Location**: `components/animations/gsap-animations.tsx`

```typescript
interface GSAPScrollAnimationProps {
  children: React.ReactNode;
  trigger?: string; // CSS selector for trigger element
  start?: string; // ScrollTrigger start position
  end?: string; // ScrollTrigger end position
  animation: 'fadeIn' | 'slideUp' | 'parallax' | 'scale';
  className?: string;
}
```

## Accessibility Requirements

All components must:
- Support keyboard navigation
- Include ARIA attributes
- Respect `prefers-reduced-motion`
- Provide focus management
- Support screen readers
- Maintain proper heading hierarchy

## Performance Requirements

All animated components must:
- Lazy-load animation libraries
- Code-split to avoid blocking initial render
- Respect performance budgets (Core Web Vitals)
- Optimize for mobile devices
