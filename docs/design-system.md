# Design System Documentation

**Last Updated**: 2025-01-27  
**Feature**: UI/CSS Enhancements

## Overview

This document defines the design system tokens, scales, and guidelines for the InsuredByRJ website. All components must adhere to these standards to ensure visual consistency and maintainability.

## Typography

### Font Families

- **Heading Font**: Playfair Display (serif, elegant, trustworthy)
  - CSS Variable: `--font-heading` or `var(--font-playfair)`
  - Weights: 400 (regular), 700 (bold)
  - Usage: All heading elements (h1, h2, h3, h4, h5, h6)

- **Body Font**: Inter (sans-serif, readable, modern)
  - CSS Variable: `--font-body` or `var(--font-inter)`
  - Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
  - Usage: Body text, paragraphs, labels, buttons

- **Accent Font**: Montserrat (sans-serif, modern, professional)
  - CSS Variable: `--font-accent` or `var(--font-montserrat)`
  - Weights: 400 (regular), 600 (semibold), 700 (bold)
  - Usage: Accent text, CTAs, badges, small labels

### Typography Scale

| Element | Font Size | Line Height | Font Weight | Font Family |
|---------|-----------|-------------|-------------|-------------|
| h1 | 3rem (48px) | 1.2 | 700 | Heading |
| h2 | 2.25rem (36px) | 1.3 | 700 | Heading |
| h3 | 1.875rem (30px) | 1.4 | 700 | Heading |
| h4 | 1.5rem (24px) | 1.5 | 600 | Heading |
| h5 | 1.25rem (20px) | 1.5 | 600 | Heading |
| h6 | 1rem (16px) | 1.5 | 600 | Heading |
| Body Large | 1.125rem (18px) | 1.75 | 400 | Body |
| Body | 1rem (16px) | 1.6 | 400 | Body |
| Body Small | 0.875rem (14px) | 1.5 | 400 | Body |
| Caption | 0.75rem (12px) | 1.4 | 400 | Body |

### Responsive Typography

Typography scales down on mobile devices:
- Mobile (320px+): Base font size 16px
- Tablet (768px+): Base font size 16px
- Desktop (1024px+): Base font size 16px (no scaling needed)

## Spacing Scale (Vertical Rhythm)

Consistent spacing creates visual harmony and improves readability. Use the spacing scale for all margins and padding.

### Spacing Values

| Scale | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| 0 | 0 | `--spacing-0` | No spacing |
| 1 | 0.25rem (4px) | `--spacing-1` | Tight spacing, icons |
| 2 | 0.5rem (8px) | `--spacing-2` | Small gaps, compact layouts |
| 3 | 0.75rem (12px) | `--spacing-3` | Small padding |
| 4 | 1rem (16px) | `--spacing-4` | Base spacing unit |
| 5 | 1.25rem (20px) | `--spacing-5` | Medium spacing |
| 6 | 1.5rem (24px) | `--spacing-6` | Standard padding |
| 8 | 2rem (32px) | `--spacing-8` | Section padding |
| 10 | 2.5rem (40px) | `--spacing-10` | Large spacing |
| 12 | 3rem (48px) | `--spacing-12` | Section margins |
| 16 | 4rem (64px) | `--spacing-16` | Large section spacing |
| 20 | 5rem (80px) | `--spacing-20` | Extra large spacing |
| 24 | 6rem (96px) | `--spacing-24` | Hero section spacing |

### Vertical Rhythm

Maintain consistent vertical rhythm using multiples of the base spacing unit (1rem = 16px):
- Between sections: 4rem (64px) or 6rem (96px)
- Between content blocks: 2rem (32px) or 3rem (48px)
- Between paragraphs: 1.5rem (24px)
- Between list items: 1rem (16px)

## Color System

### Primary Colors (Indian Flag Theme)

- **Primary**: Saffron (#FF671F) - oklch(0.70 0.20 40)
  - Usage: Primary CTAs, links, accents
  - CSS Variable: `--primary`

- **Secondary**: India Green (#046A38) - oklch(0.40 0.10 150)
  - Usage: Secondary actions, success states
  - CSS Variable: `--secondary`

- **Accent**: Navy Blue (#06038D) - oklch(0.20 0.10 260)
  - Usage: Borders, dividers, subtle accents
  - CSS Variable: `--accent`

### Neutral Colors

- **Background**: White - oklch(0.99 0.002 0)
  - CSS Variable: `--background`

- **Foreground**: Dark Gray - oklch(0.25 0.02 260)
  - CSS Variable: `--foreground`

- **Muted**: Light Gray - oklch(0.96 0.005 0)
  - CSS Variable: `--muted`

- **Border**: Dark Gray - oklch(0.20 0.10 260)
  - CSS Variable: `--border`

### Color Usage Guidelines

- **Primary color**: Use for primary CTAs, important links, and key interactive elements
- **Secondary color**: Use for secondary actions, success messages, and positive indicators
- **Accent color**: Use sparingly for borders, dividers, and subtle highlights
- **Neutral colors**: Use for backgrounds, text, and structural elements

## Border Radius

Consistent border radius creates a cohesive visual language.

| Component | Border Radius | CSS Variable | Usage |
|-----------|---------------|--------------|-------|
| Small | 0.25rem (4px) | `--radius-sm` | Small buttons, badges |
| Medium | 0.5rem (8px) | `--radius-md` | Default (cards, buttons, inputs) |
| Large | 0.75rem (12px) | `--radius-lg` | Large cards, modals |
| Extra Large | 1rem (16px) | `--radius-xl` | Hero sections, large containers |

Default: `--radius: 0.5rem` (8px)

## Shadow/Elevation System

Shadows create depth hierarchy and help users understand the interface structure.

| Elevation | Shadow | CSS Variable | Usage |
|-----------|--------|--------------|-------|
| 0 | None | `--shadow-0` | Flat elements |
| 1 | 2xs | `--shadow-2xs` | Subtle elevation |
| 2 | xs | `--shadow-xs` | Slight elevation |
| 3 | sm | `--shadow-sm` | Cards, inputs |
| 4 | md | `--shadow-md` | Hovered cards |
| 5 | lg | `--shadow-lg` | Modals, dropdowns |
| 6 | xl | `--shadow-xl` | Overlays, popovers |
| 7 | 2xl | `--shadow-2xl` | Maximum elevation |

### Shadow Values

- `--shadow-sm`: `0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)`
- `--shadow-md`: `0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 2px 4px -2px hsl(0 0% 0% / 0.10)`
- `--shadow-lg`: `0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 4px 6px -2px hsl(0 0% 0% / 0.10)`
- `--shadow-xl`: `0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 8px 10px -2px hsl(0 0% 0% / 0.10)`
- `--shadow-2xl`: `0px 4px 8px -1px hsl(0 0% 0% / 0.25)`

## Component Standards

### Buttons

- **Border Radius**: `--radius-md` (0.5rem / 8px)
- **Padding**: Vertical 0.75rem (12px), Horizontal 1.5rem (24px)
- **Shadow**: `--shadow-sm` (default), `--shadow-md` (hover)
- **Transition**: 150ms-300ms for all state changes

### Cards

- **Border Radius**: `--radius-md` (0.5rem / 8px)
- **Padding**: 1.5rem (24px)
- **Shadow**: `--shadow-sm` (default), `--shadow-md` (hover)
- **Background**: `--card` (white)

### Inputs

- **Border Radius**: `--radius-md` (0.5rem / 8px)
- **Padding**: Vertical 0.75rem (12px), Horizontal 1rem (16px)
- **Border**: 1px solid `--border`
- **Focus**: 2px solid `--ring` (primary color)

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| Mobile | 320px | Base mobile styles |
| Tablet | 768px | Tablet layouts |
| Desktop | 1024px | Desktop layouts |
| Large Desktop | 1280px | Large screens |
| Extra Large | 1920px | Ultra-wide screens |

## Accessibility

### Color Contrast

- **Normal Text**: Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large Text**: Minimum 3:1 contrast ratio (WCAG AA)
- **Interactive Elements**: Minimum 3:1 contrast ratio

### Touch Targets

- **Minimum Size**: 44x44px on mobile devices
- **Spacing**: Minimum 8px between touch targets

### Focus Indicators

- **Visible**: All interactive elements must have visible focus indicators
- **Style**: 2px solid outline using `--ring` color
- **Keyboard Navigation**: All interactive elements must be keyboard accessible

### Reduced Motion

- **Respect**: All animations must respect `prefers-reduced-motion`
- **Implementation**: Use `useReducedMotion` hook from `@/lib/hooks/use-reduced-motion`
- **Fallback**: Provide static alternatives when animations are disabled

## Implementation Guidelines

1. **Use CSS Variables**: Always use CSS custom properties for colors, spacing, and typography
2. **Consistent Spacing**: Use the spacing scale for all margins and padding
3. **Typography Scale**: Use predefined typography sizes, don't create custom sizes
4. **Color Consistency**: Use design system colors, avoid custom colors
5. **Component Standards**: Follow component standards for buttons, cards, and inputs
6. **Responsive First**: Design mobile-first, then enhance for larger screens
7. **Accessibility First**: Ensure all components meet WCAG AA standards

## Design Tokens TypeScript File

Design tokens are also available in TypeScript:
- Location: `lib/design-tokens.ts`
- Usage: Import constants for programmatic access to design values

## Utility Functions

Design system utilities are available:
- Location: `lib/utils/design-system.ts`
- Functions: Spacing helpers, typography utilities, color utilities
