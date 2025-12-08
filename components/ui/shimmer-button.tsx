'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

type ButtonProps = ComponentPropsWithoutRef<typeof Button>

interface ShimmerButtonProps extends ButtonProps {
  shimmerColor?: string
  shimmerSize?: string
  shimmerDuration?: string
}

/**
 * Shimmer Button component
 * A button with a shimmering light effect that travels around the perimeter
 */
export function ShimmerButton({
  children,
  className,
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  ...props
}: ShimmerButtonProps) {
  return (
    <Button
      className={cn(
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:animate-[shimmer_var(--shimmer-duration)_infinite]',
        'before:bg-gradient-to-r before:from-transparent before:via-[var(--shimmer-color)] before:to-transparent',
        'before:blur-[var(--shimmer-size)]',
        className
      )}
      style={
        {
          '--shimmer-color': shimmerColor,
          '--shimmer-size': shimmerSize,
          '--shimmer-duration': shimmerDuration,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Button>
  )
}

