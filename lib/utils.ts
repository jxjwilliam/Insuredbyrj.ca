import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to an element by ID with GSAP easing
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (default: 0)
 */
export function smoothScrollTo(elementId: string, offset: number = 0): void {
  if (typeof window === 'undefined') {
    return
  }

  const element = document.getElementById(elementId)
  if (!element) {
    return
  }

  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  if (prefersReducedMotion) {
    // Instant scroll for users who prefer reduced motion
    window.scrollTo({ top: offsetPosition, behavior: 'auto' })
    return
  }

  // Use GSAP for smooth scroll with easing if available
  // Note: GSAP ScrollToPlugin needs to be registered separately
  // For now, use native smooth scroll
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

/**
 * Generates a social media share URL for the specified platform
 * @param platform - The social media platform ('facebook' | 'twitter' | 'linkedin')
 * @param url - The URL to share
 * @param title - The title of the content
 * @param description - The description of the content
 * @returns The share URL for the platform
 */
export function generateShareUrl(
  platform: 'facebook' | 'twitter' | 'linkedin',
  url: string,
  title?: string,
  description?: string
): string {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = title ? encodeURIComponent(title) : ''
  const encodedDescription = description ? encodeURIComponent(description) : ''

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case 'twitter':
      const twitterText = encodedTitle || encodedDescription
      return `https://twitter.com/intent/tweet?url=${encodedUrl}${twitterText ? `&text=${twitterText}` : ''}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    default:
      return url
  }
}

/**
 * Sanitizes text for social media sharing
 * Removes HTML tags and limits length
 * @param text - The text to sanitize
 * @param maxLength - Maximum length (default: 200)
 * @returns Sanitized text
 */
export function sanitizeShareText(text: string, maxLength: number = 200): string {
  // Remove HTML tags
  const withoutHtml = text.replace(/<[^>]*>/g, '')
  // Trim and limit length
  const trimmed = withoutHtml.trim()
  return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + '...' : trimmed
}

/**
 * Parses a formatted number string (e.g., "10K+", "15+", "1.5M") to a numeric value
 * @param value - The formatted number string
 * @returns An object with the numeric value, display format, and suffix
 */
export function parseFormattedNumber(value: string): { 
  numericValue: number
  displayFormat: 'short' | 'long'
  suffix: string
  originalValue: number
} {
  // Remove any non-numeric characters except decimal point, K, M, B, and +
  const cleaned = value.trim().toUpperCase()
  
  // Extract numeric part
  const numericMatch = cleaned.match(/^([\d.]+)/)
  if (!numericMatch) {
    return { numericValue: 0, displayFormat: 'long', suffix: '', originalValue: 0 }
  }
  
  const numericPart = parseFloat(numericMatch[1])
  const hasPlus = cleaned.includes('+')
  
  // Extract suffix (K, M, B, +, etc.)
  let suffix = cleaned.replace(/^[\d.]+/, '')
  
  // Convert based on suffix
  let multiplier = 1
  let displayFormat: 'short' | 'long' = 'long'
  
  if (suffix.includes('K')) {
    multiplier = 1000
    displayFormat = 'short'
    suffix = 'K' + (hasPlus ? '+' : '')
  } else if (suffix.includes('M')) {
    multiplier = 1000000
    displayFormat = 'short'
    suffix = 'M' + (hasPlus ? '+' : '')
  } else if (suffix.includes('B')) {
    multiplier = 1000000000
    displayFormat = 'short'
    suffix = 'B' + (hasPlus ? '+' : '')
  } else if (hasPlus) {
    suffix = '+'
  } else {
    suffix = ''
  }
  
  return {
    numericValue: numericPart * multiplier,
    displayFormat,
    suffix,
    originalValue: numericPart,
  }
}

/**
 * Formats a number for display (e.g., 10 with 'K+' suffix -> "10K+", 15 with '+' suffix -> "15+")
 * @param value - The numeric value
 * @param format - Display format ('short' or 'long')
 * @param suffix - Additional suffix to append (e.g., "K+", "+")
 * @returns Formatted string
 */
export function formatNumberForDisplay(
  value: number,
  format: 'short' | 'long' = 'long',
  suffix: string = ''
): string {
  // For short format with K/M/B in suffix, just append the suffix
  if (format === 'short' && suffix) {
    // If suffix already contains K/M/B, just append it
    if (suffix.includes('K') || suffix.includes('M') || suffix.includes('B')) {
      return `${Math.round(value)}${suffix}`
    }
    // Otherwise, format based on value size
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B${suffix}`
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M${suffix}`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K${suffix}`
    }
  }
  
  // For long format or no special formatting needed
  return `${Math.round(value)}${suffix}`
}

