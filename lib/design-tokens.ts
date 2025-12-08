/**
 * Design Tokens
 * 
 * Centralized design system constants for spacing, typography, and colors.
 * These tokens match the CSS custom properties defined in app/globals.css.
 * 
 * @file lib/design-tokens.ts
 */

/**
 * Spacing scale values (in rem units)
 * Base unit: 1rem = 16px
 */
export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px - Base unit
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
} as const

/**
 * Typography scale - font sizes (in rem units)
 */
export const fontSize = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  base: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
} as const

/**
 * Typography scale - line heights
 */
export const lineHeight = {
  tight: '1.2',
  snug: '1.3',
  normal: '1.5',
  relaxed: '1.6',
  loose: '1.75',
} as const

/**
 * Typography scale - font weights
 */
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

/**
 * Border radius scale (in rem units)
 */
export const borderRadius = {
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px - Default
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
} as const

/**
 * Color tokens (using CSS variable names)
 * Colors are defined in app/globals.css using oklch color space
 */
export const colors = {
  // Primary colors (Indian Flag Theme)
  primary: 'var(--primary)',
  primaryForeground: 'var(--primary-foreground)',
  secondary: 'var(--secondary)',
  secondaryForeground: 'var(--secondary-foreground)',
  accent: 'var(--accent)',
  accentForeground: 'var(--accent-foreground)',
  
  // Neutral colors
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  card: 'var(--card)',
  cardForeground: 'var(--card-foreground)',
  muted: 'var(--muted)',
  mutedForeground: 'var(--muted-foreground)',
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',
  
  // Semantic colors
  destructive: 'var(--destructive)',
  destructiveForeground: 'var(--destructive-foreground)',
} as const

/**
 * Font family tokens
 */
export const fontFamily = {
  heading: 'var(--font-heading)',
  body: 'var(--font-body)',
  accent: 'var(--font-accent)',
  sans: 'var(--font-sans)',
  serif: 'var(--font-serif)',
  mono: 'var(--font-mono)',
} as const

/**
 * Shadow/elevation tokens
 */
export const shadows = {
  '2xs': 'var(--shadow-2xs)',
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
} as const

/**
 * Responsive breakpoints (in pixels)
 */
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1280px',
  extraLarge: '1920px',
} as const

/**
 * Animation duration tokens (in milliseconds)
 */
export const animationDuration = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const

/**
 * Animation easing functions
 */
export const easing = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
} as const

/**
 * Type exports for design tokens
 */
export type Spacing = keyof typeof spacing
export type FontSize = keyof typeof fontSize
export type LineHeight = keyof typeof lineHeight
export type FontWeight = keyof typeof fontWeight
export type BorderRadius = keyof typeof borderRadius
export type Color = keyof typeof colors
export type FontFamily = keyof typeof fontFamily
export type Shadow = keyof typeof shadows
export type Breakpoint = keyof typeof breakpoints
