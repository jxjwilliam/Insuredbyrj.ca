'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'
  delay?: number // Animation delay in seconds
  duration?: number // Animation duration in seconds
  once?: boolean // Animate only once (on first view)
  threshold?: number // Intersection observer threshold (0-1)
  className?: string
}

/**
 * Wrapper component for framer-motion animations
 * Uses Intersection Observer to trigger animations on scroll
 * Respects prefers-reduced-motion for accessibility
 */
export function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  className,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const prefersReducedMotion = useReducedMotion()

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Define animation variants
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay,
          duration,
        },
      },
    }

    switch (animation) {
      case 'slideUp':
        return {
          hidden: { ...baseVariants.hidden, y: 50 },
          visible: {
            ...baseVariants.visible,
            y: 0,
          },
        }
      case 'slideDown':
        return {
          hidden: { ...baseVariants.hidden, y: -50 },
          visible: {
            ...baseVariants.visible,
            y: 0,
          },
        }
      case 'slideLeft':
        return {
          hidden: { ...baseVariants.hidden, x: 50 },
          visible: {
            ...baseVariants.visible,
            x: 0,
          },
        }
      case 'slideRight':
        return {
          hidden: { ...baseVariants.hidden, x: -50 },
          visible: {
            ...baseVariants.visible,
            x: 0,
          },
        }
      case 'fadeIn':
      default:
        return baseVariants
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
