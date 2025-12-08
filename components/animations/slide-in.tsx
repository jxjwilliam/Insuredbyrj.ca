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
  gesture?: 'hover' | 'tap' // Add gesture support
  whileInView?: boolean // Trigger on viewport entry
  viewport?: { once?: boolean; margin?: string }
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
  gesture,
  whileInView = false,
  viewport = { once: true, margin: '-100px' },
}: SlideInAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const initialX =
    direction === 'left' ? -distance : direction === 'right' ? distance : 0
  const initialY =
    direction === 'up' ? distance : direction === 'down' ? -distance : 0

  const gestureProps: any = {}
  if (gesture === 'hover') {
    gestureProps.whileHover = { scale: 1.05, transition: { duration: 0.2 } }
  }
  if (gesture === 'tap') {
    gestureProps.whileTap = { scale: 0.95, transition: { duration: 0.1 } }
  }

  const animationProps = whileInView
    ? {
        initial: { opacity: 0, x: initialX, y: initialY },
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport,
        transition: { delay, duration, ease: 'easeOut' },
        ...gestureProps,
      }
    : {
        initial: { opacity: 0, x: initialX, y: initialY },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { delay, duration },
        ...gestureProps,
      }

  return (
    <motion.div {...animationProps} className={className}>
      {children}
    </motion.div>
  )
}
