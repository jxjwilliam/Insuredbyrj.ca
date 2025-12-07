'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface GSAPScrollAnimationProps {
  children: React.ReactNode
  trigger?: string // CSS selector for trigger element
  start?: string // ScrollTrigger start position (default: "top 80%")
  end?: string // ScrollTrigger end position
  animation?: 'fadeIn' | 'slideUp' | 'parallax' | 'scale'
  className?: string
}

/**
 * GSAP scroll-triggered animation component
 * Respects prefers-reduced-motion for accessibility
 */
export function GSAPScrollAnimation({
  children,
  trigger,
  start = 'top 80%',
  end,
  animation = 'fadeIn',
  className,
}: GSAPScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !elementRef.current) {
      return
    }

    const element = elementRef.current
    const triggerElement = trigger ? document.querySelector(trigger) : element

    if (!triggerElement) {
      return
    }

    // Set initial state based on animation type
    switch (animation) {
      case 'fadeIn':
        gsap.set(element, { opacity: 0 })
        break
      case 'slideUp':
        gsap.set(element, { opacity: 0, y: 50 })
        break
      case 'parallax':
        gsap.set(element, { y: 100 })
        break
      case 'scale':
        gsap.set(element, { opacity: 0, scale: 0.8 })
        break
    }

    // Create ScrollTrigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerElement,
      start,
      end,
      animation: (() => {
        switch (animation) {
          case 'fadeIn':
            return gsap.to(element, { opacity: 1, duration: 0.6, ease: 'power2.out' })
          case 'slideUp':
            return gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            })
          case 'parallax':
            return gsap.to(element, { y: 0, duration: 1, ease: 'power1.out' })
          case 'scale':
            return gsap.to(element, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
            })
          default:
            return gsap.to(element, { opacity: 1, duration: 0.6 })
        }
      })(),
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [prefersReducedMotion, trigger, start, end, animation])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
