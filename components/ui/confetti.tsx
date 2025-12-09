'use client'

import { useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import type { CreateTypes, Options } from 'canvas-confetti'

export interface ConfettiRef {
  fire: (options?: Options) => void
}

interface ConfettiProps {
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  options?: Options
}

/**
 * Confetti component
 * Renders a canvas element that can trigger confetti animations
 */
export function Confetti({ className, onMouseEnter, onMouseLeave }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRef = useRef<CreateTypes | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      confettiRef.current = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      })
    }
  }, [])

  const handleMouseEnter = () => {
    if (confettiRef.current && onMouseEnter) {
      onMouseEnter()
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

/**
 * Hook to get confetti ref for programmatic control
 */
export function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRef = useRef<CreateTypes | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      confettiRef.current = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      })
    }
  }, [])

  const fire = (options?: Options) => {
    if (confettiRef.current) {
      confettiRef.current(options)
    }
  }

  return { canvasRef, fire }
}
