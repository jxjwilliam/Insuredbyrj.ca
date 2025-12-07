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

