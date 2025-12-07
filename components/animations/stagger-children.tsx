'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface StaggerChildrenAnimationProps {
  children: React.ReactNode
  staggerDelay?: number // Delay between each child
  animation?: 'fadeIn' | 'slideUp' | 'scale'
  className?: string
}

/**
 * Stagger animation component for children using Framer Motion
 * Animates children with a delay between each
 * Respects prefers-reduced-motion for accessibility
 */
export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  animation = 'fadeIn',
  className,
}: StaggerChildrenAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const getChildVariants = () => {
    switch (animation) {
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      case 'fadeIn':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={getChildVariants()}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
