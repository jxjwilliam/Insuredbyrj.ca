'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface ViewportAnimationProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean // Animate only once when entering viewport
  margin?: string // Viewport margin (default: '-100px')
}

/**
 * Viewport-triggered animation component using Framer Motion
 * 
 * Animates elements when they enter the viewport, providing smooth
 * scroll-triggered animations without manual scroll listeners.
 * 
 * @param children - Content to animate
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param direction - Animation direction: 'up' | 'down' | 'left' | 'right' | 'none' (default: 'up')
 * @param className - Additional CSS classes
 * @param once - Animate only once when entering viewport (default: true)
 * @param margin - Viewport margin for trigger (default: '-100px')
 * 
 * @example
 * ```tsx
 * <ViewportAnimation direction="up" duration={0.6}>
 *   <SectionContent />
 * </ViewportAnimation>
 * ```
 * 
 * Respects prefers-reduced-motion for accessibility
 */
export function ViewportAnimation({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className,
  once = true,
  margin = '-100px',
}: ViewportAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const initialY = direction === 'up' ? 20 : direction === 'down' ? -20 : 0
  const initialX = direction === 'left' ? 20 : direction === 'right' ? -20 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin }}
      transition={{ delay, duration, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
