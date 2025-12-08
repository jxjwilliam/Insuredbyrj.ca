'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface LayoutAnimationProps {
  children: React.ReactNode
  className?: string
}

/**
 * Layout animation component using Framer Motion
 * Automatically animates layout changes (position, size)
 * Respects prefers-reduced-motion for accessibility
 */
export function LayoutAnimation({
  children,
  className,
}: LayoutAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
