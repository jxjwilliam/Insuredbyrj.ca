'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

/**
 * Back-to-top button component that appears after scrolling down
 * Uses GSAP for smooth scroll animation and respects prefers-reduced-motion
 */
export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Show button after scrolling 300px
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      setIsVisible(scrollY > 300)
    }

    // Initial check
    handleScroll()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    if (prefersReducedMotion) {
      // Instant scroll for users who prefer reduced motion
      window.scrollTo({ top: 0, behavior: 'auto' })
    } else {
      // Smooth scroll with GSAP animation
      if (typeof window !== 'undefined') {
        const startY = window.scrollY
        const startTime = performance.now()
        const duration = 1000 // 1 second

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function (ease-out)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          
          window.scrollTo(0, startY * (1 - easeOut))
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll)
          }
        }
        
        requestAnimationFrame(animateScroll)
      }
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-full h-12 w-12 p-0 shadow-lg hover:shadow-xl transition-shadow duration-300 md:bottom-6 md:right-6"
      aria-label="Scroll to top"
      size="icon"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </Button>
  )
}
