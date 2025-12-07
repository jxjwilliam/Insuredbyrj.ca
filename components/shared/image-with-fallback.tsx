'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
}

/**
 * Image component with fallback handling for failed external image loads
 * @param src - Primary image URL (external)
 * @param alt - Alt text for accessibility
 * @param fallbackSrc - Fallback image path (local)
 * @param width - Image width (if not using fill)
 * @param height - Image height (if not using fill)
 * @param className - Additional CSS classes
 * @param fill - Whether to fill parent container
 * @param priority - Whether to prioritize loading
 */
export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholders/placeholder.jpg',
  width,
  height,
  className,
  fill = false,
  priority = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    onError: handleError,
    priority,
  }

  if (fill) {
    return <Image {...imageProps} fill alt={alt} />
  }

  return (
    <Image
      {...imageProps}
      width={width || 800}
      height={height || 600}
      alt={alt}
    />
  )
}

