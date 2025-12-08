'use client'

import { motion, type MotionProps } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface GestureAnimationProps {
  children: React.ReactNode
  gesture?: 'hover' | 'tap' | 'drag'
  hoverScale?: number
  tapScale?: number
  className?: string
}

/**
 * Gesture-based animation component using Framer Motion
 * Provides interactive hover, tap, and drag animations
 * Respects prefers-reduced-motion for accessibility
 */
export function GestureAnimation({
  children,
  gesture = 'hover',
  hoverScale = 1.05,
  tapScale = 0.95,
  className,
}: GestureAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const gestureProps: Partial<MotionProps> = {}

  if (gesture === 'hover' || gesture === 'tap') {
    gestureProps.whileHover = { scale: hoverScale }
    gestureProps.whileTap = { scale: tapScale }
    gestureProps.transition = { duration: 0.2, ease: 'easeOut' }
  }

  if (gesture === 'drag') {
    gestureProps.drag = true
    gestureProps.dragConstraints = { left: 0, right: 0, top: 0, bottom: 0 }
    gestureProps.dragElastic = 0.2
  }

  return (
    <motion.div
      {...gestureProps}
      className={className}
    >
      {children}
    </motion.div>
  )
}

