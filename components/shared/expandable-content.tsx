'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExpandableContentProps {
  title: string
  summary: string // Brief summary shown when collapsed
  content: React.ReactNode // Detailed content shown when expanded
  defaultExpanded?: boolean // Whether initially expanded
  variant?: 'accordion' | 'collapsible' | 'modal' // Display variant
  onExpandChange?: (expanded: boolean) => void // Callback for state changes
  className?: string // Additional CSS classes
}

/**
 * Progressive disclosure component for detailed content
 * Supports keyboard navigation and accessibility
 */
export function ExpandableContent({
  title,
  summary,
  content,
  defaultExpanded = false,
  onExpandChange,
  className,
}: ExpandableContentProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const handleToggle = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded)
    onExpandChange?.(newExpanded)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={expanded}
        aria-controls={`expandable-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="flex w-full items-center justify-between gap-4 rounded-lg p-4 text-left transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          {!expanded && <p className="mt-1 text-sm text-muted-foreground">{summary}</p>}
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 transition-transform',
            expanded && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={`expandable-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          expanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!expanded}
      >
        <div className="p-4 pt-0">{content}</div>
      </div>
    </div>
  )
}
