'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SparklesTextProps {
  children: string
  className?: string
  sparklesCount?: number
  colors?: string[]
}

/**
 * Sparkles Text component
 * Dynamic text that generates continuous sparkles with smooth transitions
 */
export function SparklesText({
  children,
  className,
  sparklesCount = 3,
  colors = ['#ffaa40', '#9c40ff', '#ff6b6b', '#4ecdc4'],
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const generateSparkles = () => {
      const newSparkles: Array<{ id: number; x: number; y: number; color: string }> = []
      for (let i = 0; i < sparklesCount; i++) {
        newSparkles.push({
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, 2000)

    return () => clearInterval(interval)
  }, [sparklesCount, colors])

  return (
    <span ref={textRef} className={cn('relative inline-block', className)}>
      {children}
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            color: sparkle.color,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 1 }}
        >
          ✨
        </motion.span>
      ))}
    </span>
  )
}
