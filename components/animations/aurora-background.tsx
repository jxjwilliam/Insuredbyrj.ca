'use client'

import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  children: React.ReactNode
  className?: string
  showRadialGradient?: boolean
}

/**
 * Aurora Background component
 * Creates a subtle aurora or southern lights effect
 */
export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className={cn(
          'absolute inset-0',
          'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]',
          'bg-[size:14px_24px]',
          '[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]'
        )}
      />
      <div
        className={cn(
          'absolute inset-0',
          'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20',
          'animate-[aurora_60s_linear_infinite]',
          showRadialGradient &&
            'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]'
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
