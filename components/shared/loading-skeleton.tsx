'use client'

import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'image' | 'button'
}

/**
 * Loading skeleton component for content placeholders
 * Provides visual feedback while content is loading
 */
export function LoadingSkeleton({ className, variant = 'text' }: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded'

  const variantClasses = {
    text: 'h-4 w-full',
    card: 'h-32 w-full',
    image: 'h-48 w-full aspect-video',
    button: 'h-10 w-24',
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

/**
 * Loading spinner component for async operations
 */
export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn('inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent', className)}
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
