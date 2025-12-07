'use client'

import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Linkedin } from 'lucide-react'
import { generateShareUrl, sanitizeShareText } from '@/lib/utils'

interface SocialShareButtonsProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

/**
 * Social sharing buttons component
 * Uses Web Share API on mobile devices, falls back to platform URLs on desktop
 */
export function SocialShareButtons({
  url,
  title,
  description,
  className,
}: SocialShareButtonsProps) {
  // Get current page URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title || (typeof document !== 'undefined' ? document.title : '')
  const shareDescription = description
    ? sanitizeShareText(description)
    : typeof document !== 'undefined'
      ? sanitizeShareText(
          document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
        )
      : ''

  const handleShare = async (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const shareUrlGenerated = generateShareUrl(platform, shareUrl, shareTitle, shareDescription)

    // Try Web Share API on mobile devices
    if (
      typeof navigator !== 'undefined' &&
      navigator.share &&
      platform === 'facebook' // Use native share for first click on mobile
    ) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        })
        return
      } catch (err) {
        // User cancelled or Web Share API failed, fall through to platform URL
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err)
        }
      }
    }

    // Fallback to platform-specific URLs
    window.open(shareUrlGenerated, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`flex gap-2 ${className || ''}`} role="group" aria-label="Social sharing options">
      <Button
        onClick={() => handleShare('facebook')}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>
      <Button
        onClick={() => handleShare('twitter')}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>
      <Button
        onClick={() => handleShare('linkedin')}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>
    </div>
  )
}
