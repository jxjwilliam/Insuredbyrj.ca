# Data Model: UI/CSS Enhancements

**Date**: 2025-01-27  
**Feature**: UI/CSS Enhancements  
**Phase**: 1 - Design & Contracts

## Overview

This feature is primarily frontend UI enhancements with no backend data model changes. However, we document the component props, animation configuration types, and font configuration that will be used.

## Component Props & Types

### Animation Component Props

#### GSAPScrollAnimationProps
```typescript
interface GSAPScrollAnimationProps {
  children: React.ReactNode
  trigger?: string // CSS selector for trigger element
  start?: string // ScrollTrigger start position (default: "top 80%")
  end?: string // ScrollTrigger end position
  animation?: 'fadeIn' | 'slideUp' | 'parallax' | 'scale' | 'keyframe'
  className?: string
  keyframes?: GSAPKeyframe[] // NEW: For keyframe animations
  timeline?: boolean // NEW: Use timeline for complex sequences
}
```

#### FramerMotionAnimationProps
```typescript
interface FramerMotionAnimationProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  whileInView?: boolean // NEW: Viewport trigger
  gesture?: 'hover' | 'tap' | 'drag' // NEW: Gesture support
  layout?: boolean // NEW: Layout animation
}
```

#### MagicUIComponentProps
```typescript
// Base props for MagicUI components (varies by component)
interface MagicUIBaseProps {
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'animated' | 'gradient'
  // Component-specific props added as needed
}
```

#### AcernityUIComponentProps
```typescript
// Base props for Acernity UI components (varies by component)
interface AcernityUIBaseProps {
  children?: React.ReactNode
  className?: string
  effect?: 'aurora' | 'gradient' | 'particles' | 'spotlight'
  // Component-specific props added as needed
}
```

### Font Configuration

#### GoogleFontsConfig
```typescript
// Font configuration in app/[locale]/layout.tsx
interface FontConfig {
  heading: NextFont // e.g., Playfair Display, Montserrat
  body: NextFont // e.g., Inter (already in use)
  accent: NextFont // e.g., DM Sans (already defined in CSS)
}
```

### Animation Configuration Types

#### GSAPKeyframe
```typescript
interface GSAPKeyframe {
  progress: number // 0-1, position in animation
  properties: {
    opacity?: number
    x?: number
    y?: number
    scale?: number
    rotation?: number
    // Other transform properties
  }
  ease?: string // GSAP easing function
}
```

#### AnimationPreset
```typescript
type AnimationPreset = 
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'rotate'
  | 'parallax'
  | 'stagger'
  | 'keyframe'
```

## State Management

### Animation State

No global state management required. Animation state is managed locally within components using:
- React hooks (`useState`, `useEffect`, `useRef`)
- GSAP timelines (local to components)
- Framer Motion's internal state management

### Font Loading State

Fonts are loaded via Next.js `next/font/google` which handles loading state internally. No manual state management needed.

## Validation Rules

### Animation Props Validation

- `delay` must be >= 0
- `duration` must be > 0 and <= 5 seconds (for performance)
- `animation` type must be one of the defined presets
- `keyframes` array must have at least 2 keyframes if provided
- `keyframes` progress values must be between 0 and 1, in ascending order

### Component Props Validation

- All `className` props accept string or undefined
- All `children` props accept React.ReactNode
- MagicUI and Acernity UI component props validated per component documentation

## Relationships

### Component Hierarchy

```
Page Component
├── Section Components (enhanced with animations)
│   ├── Animation Wrappers (GSAP/Framer Motion)
│   │   └── Content Components
│   └── UI Components (shadcn/ui, MagicUI, Acernity UI)
│       └── Animation Wrappers (if needed)
└── Layout Components (enhanced with scroll animations)
```

### Animation Dependencies

- GSAP animations depend on GSAP and ScrollTrigger plugins
- Framer Motion animations depend on framer-motion package
- MagicUI components may use framer-motion internally
- Acernity UI components may use framer-motion internally
- All animations respect `useReducedMotion` hook

## Data Flow

### Animation Initialization Flow

1. Component mounts
2. Check `useReducedMotion()` hook
3. If reduced motion: render static content
4. If normal motion: initialize animation (GSAP/Framer Motion)
5. Set up scroll/viewport triggers
6. Clean up on unmount

### Font Loading Flow

1. Next.js loads font via `next/font/google`
2. Font is optimized and cached
3. CSS variable set for font family
4. Component uses font via className or CSS variable

## Edge Cases

### Animation Edge Cases

- **Low-performance devices**: Animations may be disabled or simplified
- **Reduced motion preference**: All animations disabled, static content shown
- **JavaScript disabled**: Static content shown, no animations
- **Scroll position on mount**: Animations should handle initial scroll position
- **Rapid scrolling**: Animations should not lag or stutter

### Font Loading Edge Cases

- **Font loading failure**: Fallback to system fonts
- **Slow network**: Font-display: swap ensures text is visible immediately
- **Font subset missing**: Fallback to available subset or system font

## Performance Considerations

### Animation Performance

- Limit concurrent animations to prevent performance degradation
- Use `will-change` CSS property sparingly
- Animate only `transform` and `opacity` for GPU acceleration
- Clean up animation instances on component unmount

### Font Performance

- Limit to 2-3 font families
- Use font-display: swap
- Preload critical fonts
- Subset fonts to required characters only
