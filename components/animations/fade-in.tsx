'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface FadeInAnimationProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

/**
 * Fade-in animation component using Framer Motion
 * Respects prefers-reduced-motion for accessibility
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'none',
  className,
}: FadeInAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const initialY = direction === 'up' ? 20 : direction === 'down' ? -20 : 0
  const initialX = direction === 'left' ? 20 : direction === 'right' ? -20 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
