/**
 * Design System Utilities
 * 
 * Helper functions for working with design system tokens.
 * Provides type-safe access to spacing, typography, and color utilities.
 * 
 * @file lib/utils/design-system.ts
 */

import { spacing, fontSize, lineHeight, fontWeight, borderRadius, colors, fontFamily, shadows } from '@/lib/design-tokens'
import type { Spacing, FontSize, LineHeight, FontWeight, BorderRadius, Color, FontFamily, Shadow } from '@/lib/design-tokens'

/**
 * Get spacing value by key
 * @param key - Spacing scale key (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
 * @returns Spacing value in rem units
 */
export function getSpacing(key: Spacing): string {
  return spacing[key]
}

/**
 * Get font size value by key
 * @param key - Font size key (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl)
 * @returns Font size value in rem units
 */
export function getFontSize(key: FontSize): string {
  return fontSize[key]
}

/**
 * Get line height value by key
 * @param key - Line height key (tight, snug, normal, relaxed, loose)
 * @returns Line height value
 */
export function getLineHeight(key: LineHeight): string {
  return lineHeight[key]
}

/**
 * Get font weight value by key
 * @param key - Font weight key (normal, medium, semibold, bold)
 * @returns Font weight value
 */
export function getFontWeight(key: FontWeight): string {
  return fontWeight[key]
}

/**
 * Get border radius value by key
 * @param key - Border radius key (sm, md, lg, xl)
 * @returns Border radius value in rem units
 */
export function getBorderRadius(key: BorderRadius): string {
  return borderRadius[key]
}

/**
 * Get color value by key
 * @param key - Color key (primary, secondary, background, etc.)
 * @returns CSS variable for color
 */
export function getColor(key: Color): string {
  return colors[key]
}

/**
 * Get font family value by key
 * @param key - Font family key (heading, body, accent, sans, serif, mono)
 * @returns CSS variable for font family
 */
export function getFontFamily(key: FontFamily): string {
  return fontFamily[key]
}

/**
 * Get shadow value by key
 * @param key - Shadow key (2xs, xs, sm, md, lg, xl, 2xl)
 * @returns CSS variable for shadow
 */
export function getShadow(key: Shadow): string {
  return shadows[key]
}

/**
 * Generate spacing class name for Tailwind CSS
 * @param key - Spacing scale key
 * @param type - Spacing type ('p' for padding, 'm' for margin)
 * @param direction - Optional direction ('x', 'y', 't', 'r', 'b', 'l')
 * @returns Tailwind CSS class name
 */
export function spacingClass(key: Spacing, type: 'p' | 'm', direction?: 'x' | 'y' | 't' | 'r' | 'b' | 'l'): string {
  const value = spacing[key]
  const remValue = parseFloat(value)
  const pxValue = Math.round(remValue * 16)
  
  if (direction) {
    return `${type}${direction}-${pxValue / 4}`
  }
  return `${type}-${pxValue / 4}`
}

/**
 * Generate typography class name for Tailwind CSS
 * @param size - Font size key
 * @param weight - Font weight key
 * @param lineHeight - Line height key
 * @returns Tailwind CSS class name
 */
export function typographyClass(size: FontSize, weight?: FontWeight, lineHeight?: LineHeight): string {
  const classes: string[] = [`text-${size}`]
  
  if (weight) {
    classes.push(`font-${weight}`)
  }
  
  if (lineHeight) {
    classes.push(`leading-${lineHeight}`)
  }
  
  return classes.join(' ')
}

/**
 * Check if a color meets WCAG AA contrast requirements
 * Note: This is a simplified check. For accurate contrast checking, use a proper contrast checker.
 * @param foreground - Foreground color (lightness value 0-1)
 * @param background - Background color (lightness value 0-1)
 * @param isLargeText - Whether the text is large (18px+ or 14px+ bold)
 * @returns true if contrast meets WCAG AA standards
 */
export function meetsContrastAA(foreground: number, background: number, isLargeText: boolean = false): boolean {
  const ratio = Math.max(foreground, background) / Math.min(foreground, background)
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Get responsive spacing value
 * Returns different spacing values based on breakpoint
 * @param mobile - Spacing for mobile (default)
 * @param tablet - Spacing for tablet (optional)
 * @param desktop - Spacing for desktop (optional)
 * @returns Object with responsive spacing values
 */
export function responsiveSpacing(
  mobile: Spacing,
  tablet?: Spacing,
  desktop?: Spacing
): { mobile: string; tablet?: string; desktop?: string } {
  return {
    mobile: spacing[mobile],
    tablet: tablet ? spacing[tablet] : undefined,
    desktop: desktop ? spacing[desktop] : undefined,
  }
}
