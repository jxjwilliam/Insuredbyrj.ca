# Data Model: Clone Landing Page

**Date**: 2025-01-27  
**Feature**: Clone Landing Page  
**Phase**: 1 - Design & Contracts

## Overview

This feature is primarily a static landing page with no database or persistent data storage. All content is stored in TypeScript constants. The data model defines the structure of content entities used throughout the page.

## Entities

### LandingPageContent

Represents the complete landing page content structure.

**Type**: TypeScript interface/type  
**Location**: `lib/types.ts`

```typescript
interface LandingPageContent {
  hero: HeroSection;
  trustIndicators: TrustIndicator[];
  whyChoose: WhyChooseSection;
  insurancePlans: InsurancePlan[];
  howItWorks: HowItWorksSection;
  whyBC: WhyBCSection;
  faq: FAQItem[];
  navigation: NavigationItem[];
}
```

### HeroSection

Hero section content at the top of the landing page.

**Fields**:
- `headline: string` - Main headline text
- `subheadline: string` - Supporting text below headline
- `primaryCTA: CTAButton` - "Get Your Free Quote" button
- `secondaryCTA: CTAButton` - "Speak to a BC Advisor" button
- `trustMicrocopy: string[]` - Trust indicators text (e.g., "No obligation quote")
- `imageUrl: string` - Hero image URL (external)
- `imageAlt: string` - Alt text for hero image

### TrustIndicator

Trust indicator statistics displayed in hero section.

**Fields**:
- `value: string` - Display value (e.g., "A+", "10K+", "15+")
- `label: string` - Description text (e.g., "Financial Strength")
- `color?: string` - Optional color variant

### WhyChooseSection

"Why Choose Insured by Rajan" section with benefit points.

**Fields**:
- `title: string` - Section title
- `description: string` - Section description
- `benefits: BenefitPoint[]` - Array of 4 benefit points

### BenefitPoint

Individual benefit point in "Why Choose" section.

**Fields**:
- `title: string` - Benefit title (e.g., "BC-Licensed Expert")
- `description: string` - Benefit description
- `icon: string` - Icon identifier (for Font Awesome or similar)
- `color?: string` - Optional color variant

### InsurancePlan

Insurance plan card displayed in plans section.

**Fields**:
- `id: string` - Unique identifier (e.g., "term-life", "whole-life")
- `type: string` - Plan type name (e.g., "Term Life")
- `description: string` - Brief description
- `startingPrice: string` - Price display (e.g., "From $25/month")
- `features: string[]` - Array of key features
- `imageUrl: string` - Plan image URL (external)
- `imageAlt: string` - Alt text for plan image
- `ctaLink: string` - Link to product detail page
- `isPopular?: boolean` - Whether to show "Most Popular" badge
- `color?: string` - Optional color variant for styling

### HowItWorksSection

Three-step process explanation section.

**Fields**:
- `title: string` - Section title
- `description: string` - Section description
- `steps: ProcessStep[]` - Array of 3 process steps

### ProcessStep

Individual step in "How It Works" section.

**Fields**:
- `number: number` - Step number (1, 2, 3)
- `title: string` - Step title (e.g., "Share Your Needs")
- `description: string` - Step description
- `timeIndicator: string` - Time/result indicator (e.g., "2 minutes", "Instant results")
- `icon: string` - Icon identifier

### WhyBCSection

"Why British Columbians Choose" section.

**Fields**:
- `title: string` - Section title
- `description: string` - Section description
- `imageUrl: string` - Section image URL (external)
- `imageAlt: string` - Alt text for image
- `valuePropositions: ValueProposition[]` - Array of 4 value propositions
- `statistics: Statistic[]` - Optional statistics to display

### ValueProposition

Value proposition in "Why BC" section.

**Fields**:
- `title: string` - Proposition title
- `description: string` - Proposition description
- `icon: string` - Icon identifier

### Statistic

Statistical information displayed on page.

**Fields**:
- `value: string` - Display value (e.g., "10,000+")
- `label: string` - Description (e.g., "Families Protected")

### FAQItem

FAQ question and answer pair.

**Fields**:
- `id: string` - Unique identifier
- `question: string` - FAQ question text
- `answer: string` - FAQ answer text (supports HTML/markdown)

### NavigationItem

Navigation menu item in sticky header.

**Fields**:
- `label: string` - Display text
- `href: string` - Link URL (can be anchor link or route)
- `isAnchor?: boolean` - Whether link is anchor to section on same page

### CTAButton

Call-to-action button configuration.

**Fields**:
- `text: string` - Button text
- `href: string` - Link destination
- `variant?: 'primary' | 'secondary' | 'outline'` - Button style variant
- `icon?: string` - Optional icon identifier

## Type Definitions

All entities will be defined as TypeScript interfaces/types in `lib/types.ts`:

```typescript
// Core content types
export type LandingPageContent = { ... };
export type HeroSection = { ... };
export type TrustIndicator = { ... };
export type InsurancePlan = { ... };
export type FAQItem = { ... };
// ... etc
```

## Content Storage

**Location**: `lib/constants.ts`

All content will be stored as a constant object matching the `LandingPageContent` interface:

```typescript
export const landingPageContent: LandingPageContent = {
  hero: { ... },
  trustIndicators: [ ... ],
  insurancePlans: [ ... ],
  faq: [ ... ],
  // ... etc
};
```

## Validation Rules

Since content is static and stored in TypeScript:

- **Type Safety**: TypeScript compiler enforces structure
- **Required Fields**: All required fields must be present (TypeScript will error if missing)
- **Image URLs**: Must be valid URL strings (external URLs from source page)
- **FAQ Items**: Minimum 6 items required (enforced by spec)
- **Insurance Plans**: Exactly 4 plans required (Term, Whole, Universal, Critical Illness)

## State Management

No client-side state management needed for content (static). Only interactive state:

- **FAQ Accordion**: Which question is currently expanded (managed by shadcn/ui Accordion component)
- **Navigation**: Active section highlighting (managed by intersection observer)
- **Mobile Menu**: Open/closed state (managed by component state)

## Image Handling

**External Images**: Stored as URL strings in content constants  
**Fallback Images**: Stored in `/public/images/placeholders/` directory  
**Image Component**: Custom `ImageWithFallback` component handles error states

## No Database Required

This feature requires no database, API endpoints, or data persistence. All content is:
- Static (TypeScript constants)
- Version controlled (in code)
- Type-safe (TypeScript interfaces)
- Easy to update (edit constants file)

