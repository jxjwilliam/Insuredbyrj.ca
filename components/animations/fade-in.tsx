'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface FadeInAnimationProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  whileInView?: boolean // Trigger on viewport entry
  viewport?: { once?: boolean; margin?: string }
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
  whileInView = false,
  viewport = { once: true, margin: '-100px' },
}: FadeInAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const initialY = direction === 'up' ? 20 : direction === 'down' ? -20 : 0
  const initialX = direction === 'left' ? 20 : direction === 'right' ? -20 : 0

  const animationProps = whileInView
    ? {
        initial: { opacity: 0, y: initialY, x: initialX },
        whileInView: { opacity: 1, y: 0, x: 0 },
        viewport,
        transition: { delay, duration, ease: 'easeOut' },
      }
    : {
        initial: { opacity: 0, y: initialY, x: initialX },
        animate: { opacity: 1, y: 0, x: 0 },
        transition: { delay, duration },
      }

  return (
    <motion.div {...animationProps} className={className}>
      {children}
    </motion.div>
  )
}
