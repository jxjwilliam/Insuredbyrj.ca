'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { QuoteDialog } from './quote-dialog'

interface QuoteDialogContextType {
  openDialog: () => void
  closeDialog: () => void
  isOpen: boolean
}

const QuoteDialogContext = createContext<QuoteDialogContextType | undefined>(
  undefined
)

/**
 * Provider component that manages quote dialog state globally
 * Wrap your app with this to enable quote dialog from anywhere
 */
export function QuoteDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  return (
    <QuoteDialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {children}
      <QuoteDialog open={isOpen} onOpenChange={setIsOpen} />
    </QuoteDialogContext.Provider>
  )
}

/**
 * Hook to access quote dialog functions
 * Usage: const { openDialog } = useQuoteDialog()
 */
export function useQuoteDialog() {
  const context = useContext(QuoteDialogContext)
  if (context === undefined) {
    throw new Error('useQuoteDialog must be used within QuoteDialogProvider')
  }
  return context
}
