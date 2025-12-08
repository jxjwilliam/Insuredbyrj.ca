'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ParallaxProps {
  children: React.ReactNode
  speed?: number // Parallax speed (negative = slower, positive = faster)
  className?: string
}

/**
 * Parallax effect component using GSAP ScrollTrigger
 * 
 * Creates a smooth parallax scrolling effect that moves at a different speed
 * than the scroll position, creating depth and visual interest.
 * 
 * @param children - Content to apply parallax effect to
 * @param speed - Parallax speed (negative = slower, positive = faster, default: -0.5)
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <Parallax speed={-0.3}>
 *   <HeroImage />
 * </Parallax>
 * ```
 * 
 * Respects prefers-reduced-motion for accessibility
 */
export function Parallax({
  children,
  speed = -0.5,
  className,
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !elementRef.current) {
      return
    }

    const element = elementRef.current

    // Create parallax animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true, // Smooth scroll-linked animation
      animation: gsap.to(element, {
        y: speed * 100,
        ease: 'none',
      }),
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [prefersReducedMotion, speed])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
