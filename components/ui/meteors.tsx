'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface MeteorProps {
  id: number
  left: string
  delay: number
  duration: number
}

interface MeteorsProps {
  number?: number
  className?: string
}

/**
 * Meteors component
 * A meteor shower effect
 */
export function Meteors({ number = 20, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<MeteorProps[]>([])

  useEffect(() => {
    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: `${Math.floor(Math.random() * 100)}%`,
      delay: Math.random() * 0.6,
      duration: Math.random() * 0.6 + 0.4,
    }))
    setMeteors(newMeteors)
  }, [number])

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            'absolute top-0 h-px w-px rounded-full bg-gradient-to-r from-[#64748b] to-transparent',
            'shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
            'animate-[meteor_var(--duration)_linear_infinite]'
          )}
          style={
            {
              left: meteor.left,
              top: 0,
              '--duration': `${meteor.duration}s`,
              '--delay': `${meteor.delay}s`,
              animationDelay: `${meteor.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
