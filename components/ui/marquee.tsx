'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the marquee animation
   * @default 'left'
   */
  direction?: 'left' | 'right'
  /**
   * Animation duration in seconds
   * @default 20
   */
  duration?: number
  /**
   * Whether to pause animation on hover
   * @default true
   */
  pauseOnHover?: boolean
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Children to display in the marquee
   */
  children: ReactNode
  /**
   * Additional className for the container
   */
  className?: string
}

/**
 * MagicUI-style Marquee component for horizontal scrolling content
 * Uses CSS animations for smooth, performant scrolling
 */
export function Marquee({
  children,
  className,
  direction = 'left',
  duration = 20,
  pauseOnHover = true,
  reverse = false,
  ...props
}: MarqueeProps) {
  // Inject keyframes CSS on mount
  useEffect(() => {
    const styleId = 'marquee-keyframes'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes marquee-left {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
      }
      @keyframes marquee-right {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
    `
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right'
  
  return (
    <div
      {...props}
      className={cn(
        'group relative flex w-full overflow-hidden',
        className
      )}
    >
      <div
        className={cn(
          'flex shrink-0',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex shrink-0',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

interface MarqueeItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Individual item within the marquee
 */
export function MarqueeItem({ children, className, ...props }: MarqueeItemProps) {
  return (
    <div
      {...props}
      className={cn('flex shrink-0 mr-4', className)}
    >
      {children}
    </div>
  )
}
