'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface NumberTickerProps {
  /**
   * The value to count to
   */
  value: number
  /**
   * The direction to count in
   */
  direction?: 'up' | 'down'
  /**
   * The delay before counting starts (in milliseconds)
   */
  delay?: number
  /**
   * The number of decimal places to show
   */
  decimalPlaces?: number
  /**
   * The value to start counting from
   */
  startValue?: number
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Duration of the animation in milliseconds
   */
  duration?: number
  /**
   * Custom formatter function to format the displayed value
   */
  formatValue?: (value: number) => string
}

/**
 * Number Ticker component from Magic UI
 * Animate numbers to count up or down to a target number
 * 
 * @example
 * ```tsx
 * <NumberTicker value={100} />
 * ```
 * 
 * @example
 * ```tsx
 * <NumberTicker 
 *   value={5.67} 
 *   decimalPlaces={2}
 *   startValue={0}
 *   delay={500}
 * />
 * ```
 */
export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  decimalPlaces = 0,
  startValue = 0,
  className,
  duration = 2000,
  formatValue,
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(startValue)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationFrameRef = useRef<number>()
  const startTimeRef = useRef<number>()

  useEffect(() => {
    // Delay before starting animation
    const delayTimeout = setTimeout(() => {
      setIsAnimating(true)
      startTimeRef.current = performance.now()
    }, delay)

    return () => {
      clearTimeout(delayTimeout)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [delay])

  useEffect(() => {
    if (!isAnimating) return

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const currentValue =
        direction === 'up'
          ? startValue + (value - startValue) * easeOut
          : startValue - (startValue - value) * easeOut

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
        setIsAnimating(false)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAnimating, value, startValue, direction, duration])

  // Format the number with decimal places or custom formatter
  const formattedValue = formatValue
    ? formatValue(displayValue)
    : displayValue.toFixed(decimalPlaces)

  return (
    <span className={cn('tabular-nums', className)}>
      {formattedValue}
    </span>
  )
}
