'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ContactDialog } from './contact-dialog'

interface ContactDialogContextType {
  openDialog: () => void
  closeDialog: () => void
  isOpen: boolean
}

const ContactDialogContext = createContext<ContactDialogContextType | undefined>(
  undefined
)

/**
 * Provider component that manages contact dialog state globally
 * Wrap your app with this to enable contact dialog from anywhere
 */
export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  return (
    <ContactDialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {children}
      <ContactDialog open={isOpen} onOpenChange={setIsOpen} />
    </ContactDialogContext.Provider>
  )
}

/**
 * Hook to access contact dialog functions
 * Usage: const { openDialog } = useContactDialog()
 */
export function useContactDialog() {
  const context = useContext(ContactDialogContext)
  if (context === undefined) {
    throw new Error('useContactDialog must be used within ContactDialogProvider')
  }
  return context
}
