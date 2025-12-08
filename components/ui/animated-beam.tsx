'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedBeamProps {
  className?: string
  path?: string
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
}

/**
 * Animated Beam component
 * An animated beam of light that travels along a path
 */
export function AnimatedBeam({
  className,
  path = 'M 0,50 Q 50,0 100,50 T 200,50',
  duration = 3,
  delay = 0,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
}: AnimatedBeamProps) {
  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
          <stop offset="50%" stopColor={colorTo} stopOpacity="1" />
          <stop offset="100%" stopColor={colorFrom} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke="url(#beam-gradient)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </svg>
  )
}
