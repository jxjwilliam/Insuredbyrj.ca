'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GSAPKeyframe {
  progress: number // 0-1, position in animation
  properties: Record<string, number | string>
  ease?: string // GSAP easing function
}

interface GSAPScrollAnimationProps {
  children: React.ReactNode
  trigger?: string // CSS selector for trigger element
  start?: string // ScrollTrigger start position (default: "top 80%")
  end?: string // ScrollTrigger end position
  animation?: 'fadeIn' | 'slideUp' | 'parallax' | 'scale' | 'keyframe'
  className?: string
  keyframes?: GSAPKeyframe[] // For keyframe animations
  timeline?: boolean // Use timeline for complex sequences
  scrub?: boolean // Smooth scroll-linked animation
}

/**
 * GSAP scroll-triggered animation component
 * 
 * Provides advanced scroll-triggered animations using GSAP ScrollTrigger plugin.
 * Supports fade-in, slide-up, parallax, scale, and keyframe-based animations.
 * Includes timeline orchestration and smooth scroll-linked animations.
 * 
 * @param children - Content to animate
 * @param trigger - CSS selector for trigger element (defaults to element itself)
 * @param start - ScrollTrigger start position (default: "top 80%")
 * @param end - ScrollTrigger end position
 * @param animation - Animation type: 'fadeIn' | 'slideUp' | 'parallax' | 'scale' | 'keyframe'
 * @param className - Additional CSS classes
 * @param keyframes - Keyframe array for keyframe animations
 * @param timeline - Use timeline for complex sequences
 * @param scrub - Enable smooth scroll-linked animation
 * 
 * @example
 * ```tsx
 * <GSAPScrollAnimation animation="fadeIn" start="top 80%">
 *   <YourContent />
 * </GSAPScrollAnimation>
 * ```
 * 
 * @example
 * ```tsx
 * <GSAPScrollAnimation 
 *   animation="keyframe" 
 *   keyframes={[
 *     { progress: 0, properties: { opacity: 0, y: 50 } },
 *     { progress: 1, properties: { opacity: 1, y: 0 } }
 *   ]}
 * >
 *   <YourContent />
 * </GSAPScrollAnimation>
 * ```
 * 
 * Respects prefers-reduced-motion for accessibility
 */
export function GSAPScrollAnimation({
  children,
  trigger,
  start = 'top 80%',
  end,
  animation = 'fadeIn',
  className,
  keyframes,
  timeline = false,
  scrub = false,
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
      case 'keyframe':
        if (keyframes && keyframes.length > 0) {
          const firstKeyframe = keyframes[0]
          Object.keys(firstKeyframe.properties).forEach((key) => {
            gsap.set(element, { [key]: firstKeyframe.properties[key] })
          })
        }
        break
    }

    // Create animation
    let anim: gsap.core.Tween | gsap.core.Timeline

    if (animation === 'keyframe' && keyframes && keyframes.length > 0) {
      // Keyframe animation using timeline
      const tl = gsap.timeline()
      const totalDuration = 1 // Total duration for keyframe sequence
      
      keyframes.forEach((keyframe, index) => {
        const duration = index === 0 
          ? keyframe.progress * totalDuration
          : (keyframe.progress - keyframes[index - 1].progress) * totalDuration
        
        tl.to(element, {
          ...keyframe.properties,
          ease: keyframe.ease || 'power2.out',
          duration,
        }, keyframe.progress)
      })
      
      anim = tl
    } else if (timeline) {
      // Use timeline for complex sequences
      const tl = gsap.timeline()
      switch (animation) {
        case 'fadeIn':
          tl.to(element, { opacity: 1, duration: 0.6, ease: 'power2.out' })
          break
        case 'slideUp':
          tl.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          })
          break
        case 'scale':
          tl.to(element, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          })
          break
        default:
          tl.to(element, { opacity: 1, duration: 0.6 })
      }
      anim = tl
    } else {
      // Single tween animation
      switch (animation) {
        case 'fadeIn':
          anim = gsap.to(element, { opacity: 1, duration: 0.6, ease: 'power2.out' })
          break
        case 'slideUp':
          anim = gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          })
          break
        case 'parallax':
          anim = gsap.to(element, { y: 0, duration: 1, ease: 'power1.out' })
          break
        case 'scale':
          anim = gsap.to(element, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          })
          break
        default:
          anim = gsap.to(element, { opacity: 1, duration: 0.6 })
      }
    }

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerElement,
      start,
      end,
      animation: anim,
      scrub: scrub ? 1 : false, // Smooth scroll-linked animation when scrub is true
    })

    return () => {
      scrollTrigger.kill()
      if (anim) {
        anim.kill()
      }
    }
  }, [prefersReducedMotion, trigger, start, end, animation, keyframes, timeline, scrub])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
