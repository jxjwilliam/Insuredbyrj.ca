'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface SlideInAnimationProps {
  children: React.ReactNode
  direction: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  distance?: number // Distance to slide in pixels
  className?: string
}

/**
 * Slide-in animation component using Framer Motion
 * Respects prefers-reduced-motion for accessibility
 */
export function SlideIn({
  children,
  direction,
  delay = 0,
  duration = 0.5,
  distance = 50,
  className,
}: SlideInAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const initialX =
    direction === 'left' ? -distance : direction === 'right' ? distance : 0
  const initialY =
    direction === 'up' ? distance : direction === 'down' ? -distance : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
