'use client'

import { cn } from '@/lib/utils'

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  reverse?: boolean
}

/**
 * Border Beam component
 * An animated beam of light that travels along the border of its container
 */
export function BorderBeam({
  className,
  size = 50,
  duration = 6,
  delay = 0,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  reverse = false,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        '[border:1px_solid_transparent]',
        className
      )}
      style={
        {
          '--size': size,
          '--duration': `${duration}s`,
          '--delay': `${delay}s`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--reverse': reverse ? 'reverse' : 'normal',
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'absolute inset-0 rounded-[inherit]',
          'bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)]',
          'bg-[length:200%_100%] opacity-50',
          'animate-[border-beam_var(--duration)_linear_infinite]',
          'animate-[border-beam-delay_var(--delay)_linear_infinite]',
          reverse && '[animation-direction:reverse]'
        )}
        style={
          {
            maskImage: 'linear-gradient(to right, transparent, white, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, white, transparent)',
          } as React.CSSProperties
        }
      />
    </div>
  )
}
