# Components Documentation

**Last Updated**: 2025-01-27  
**Feature**: UI/CSS Enhancements

## Overview

This document provides an overview of all UI components, animation components, and design system utilities available in the project.

## Animation Components

### GSAP Animations

**Location**: `components/animations/gsap-animations.tsx`

GSAP scroll-triggered animation component with support for:
- Fade in, slide up, parallax, scale animations
- Keyframe-based animations
- Timeline orchestration
- Scroll-linked animations (scrub)
- Respects `prefers-reduced-motion`

**Usage**:
```tsx
<GSAPScrollAnimation animation="fadeIn" start="top 80%">
  <YourContent />
</GSAPScrollAnimation>
```

### Framer Motion Animations

**Location**: `components/animations/`

- **fade-in.tsx**: Fade-in with optional viewport triggers
- **slide-in.tsx**: Slide-in with gesture support
- **stagger-children.tsx**: Stagger animations for children with layout support
- **viewport-animation.tsx**: Viewport-triggered animations
- **gesture-animation.tsx**: Interactive hover/tap animations
- **layout-animation.tsx**: Automatic layout change animations
- **parallax.tsx**: Parallax scrolling effects

**Usage**:
```tsx
<ViewportAnimation direction="up" duration={0.6}>
  <YourContent />
</ViewportAnimation>
```

## MagicUI Components

**Location**: `components/ui/`

### Text Effects

- **animated-gradient-text.tsx**: Text with animated gradient background
- **sparkles-text.tsx**: Text with continuous sparkle effects

### Interactive Elements

- **shimmer-button.tsx**: Button with shimmering light effect
- **ripple-button.tsx**: Button with ripple effect on click
- **animated-beam.tsx**: Animated beam of light along a path
- **border-beam.tsx**: Animated beam traveling along container border

### Layout Components

- **magic-card.tsx**: Card with spotlight effect following mouse
- **bento-grid.tsx**: Bento grid layout for feature showcases
- **meteors.tsx**: Meteor shower background effect

**Usage**:
```tsx
<AnimatedGradientText colorFrom="#3b82f6" colorTo="#f59e0b">
  Your Text
</AnimatedGradientText>

<ShimmerButton>Click Me</ShimmerButton>

<MagicCard>
  <Card>Your Card Content</Card>
</MagicCard>
```

## Acernity UI Components

**Location**: `components/animations/` and `components/ui/`

- **aurora-background.tsx**: Aurora/southern lights background effect
- **gradient-mesh.tsx**: Dynamic gradient mesh background
- **3d-card.tsx**: Interactive 3D card with perspective animation
- **spotlight-effect.tsx**: Spotlight that follows mouse cursor

**Usage**:
```tsx
<AuroraBackground>
  <YourContent />
</AuroraBackground>

<Card3D intensity={15}>
  <Card>Your Card</Card>
</Card3D>
```

## shadcn/ui Components

**Location**: `components/ui/`

### Standard Components

- **button.tsx**: Button with variants (default, outline, secondary, ghost, link)
- **card.tsx**: Card container with header, content, footer
- **input.tsx**: Text input with focus states
- **textarea.tsx**: Textarea with focus states
- **dialog.tsx**: Modal dialogs
- **accordion.tsx**: Collapsible accordion
- **tabs.tsx**: Tabbed interfaces
- **badge.tsx**: Status badges
- **separator.tsx**: Visual dividers
- **tooltip.tsx**: Hover tooltips
- **dropdown-menu.tsx**: Dropdown menus
- **navigation-menu.tsx**: Navigation menus

### New Components (Phase 7)

- **skeleton.tsx**: Loading skeleton placeholders
- **progress.tsx**: Progress indicators
- **alert.tsx**: Alert messages
- **avatar.tsx**: User avatars
- **carousel.tsx**: Image/content carousels
- **hover-card.tsx**: Hover information cards
- **popover.tsx**: Popover dialogs
- **select.tsx**: Select dropdowns
- **switch.tsx**: Toggle switches
- **slider.tsx**: Range sliders

## Design System

### Design Tokens

**Location**: `lib/design-tokens.ts`

Provides TypeScript constants for:
- Spacing scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
- Typography scale (font sizes, line heights, font weights)
- Border radius scale (sm, md, lg, xl)
- Color tokens (CSS variables)
- Font family tokens
- Shadow/elevation tokens
- Breakpoints
- Animation durations and easing

### Design System Utilities

**Location**: `lib/utils/design-system.ts`

Helper functions for:
- Getting spacing values
- Getting typography values
- Getting color values
- Generating Tailwind class names
- Contrast checking
- Responsive spacing

## Usage Examples

### Applying Animations to Sections

```tsx
// Viewport animation
<ViewportAnimation direction="up" duration={0.6}>
  <SectionContent />
</ViewportAnimation>

// GSAP scroll animation
<GSAPScrollAnimation animation="slideUp" start="top 80%">
  <SectionContent />
</GSAPScrollAnimation>

// Stagger children
<StaggerChildren staggerDelay={0.1} animation="fadeIn" whileInView={true}>
  {items.map(item => <Item key={item.id} />)}
</StaggerChildren>
```

### Using MagicUI Components

```tsx
// Animated gradient text
<AnimatedGradientText colorFrom="#3b82f6" colorTo="#f59e0b">
  Life Insurance
</AnimatedGradientText>

// Shimmer button
<ShimmerButton onClick={handleClick}>
  Get Quote
</ShimmerButton>

// Magic card
<MagicCard>
  <Card>
    <CardContent>Content</CardContent>
  </Card>
</MagicCard>
```

### Using Acernity UI Components

```tsx
// Aurora background
<AuroraBackground>
  <HeroSection />
</AuroraBackground>

// 3D card
<Card3D intensity={15}>
  <Card>
    <CardContent>3D Interactive Card</CardContent>
  </Card>
</Card3D>
```

## Best Practices

1. **Always respect reduced motion**: All animation components check `useReducedMotion` hook
2. **Use viewport animations**: Prefer `ViewportAnimation` over immediate animations for better performance
3. **Optimize animations**: Use `transform` and `opacity` only for GPU acceleration
4. **Keep durations short**: Animation durations should be 150ms-300ms
5. **Test on low-end devices**: Ensure animations perform well on mobile devices
6. **Accessibility first**: Always provide ARIA labels and keyboard navigation

## Performance Considerations

- Animation libraries are code-split and lazy-loaded
- MagicUI and Acernity UI components are copy-paste (zero bundle impact)
- GSAP ScrollTrigger instances are cleaned up on unmount
- Framer Motion animations use `whileInView` for viewport optimization
