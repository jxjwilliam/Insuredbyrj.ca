'use client'

import { cn } from '@/lib/utils'

interface GradientMeshProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
}

/**
 * Gradient Mesh component
 * Creates a dynamic gradient mesh background effect
 */
export function GradientMesh({
  children,
  className,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
}: GradientMeshProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${colors[0]} 0%, transparent 50%),
                       radial-gradient(circle at 80% 80%, ${colors[1]} 0%, transparent 50%),
                       radial-gradient(circle at 40% 20%, ${colors[2]} 0%, transparent 50%),
                       radial-gradient(circle at 60% 60%, ${colors[3]} 0%, transparent 50%)`,
          backgroundSize: '200% 200%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
