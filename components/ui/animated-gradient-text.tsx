'use client'

import { cn } from '@/lib/utils'

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
  colorFrom?: string
  colorTo?: string
}

/**
 * Animated Gradient Text component
 * Displays text with an animated gradient background that transitions between colors
 */
export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent',
        'bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)]',
        'bg-[length:200%_auto] animate-gradient',
        className
      )}
      style={
        {
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--speed': `${3 / speed}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  )
}
