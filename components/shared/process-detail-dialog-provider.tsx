'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ProcessDetailDialog } from './process-detail-dialog'
import type { ProcessDetail } from '@/lib/types'

interface ProcessDetailDialogContextType {
  openDialog: (processDetail: ProcessDetail) => void
  closeDialog: () => void
  isOpen: boolean
  currentProcessDetail: ProcessDetail | null
}

const ProcessDetailDialogContext = createContext<ProcessDetailDialogContextType | undefined>(
  undefined
)

/**
 * Provider component that manages process detail dialog state globally
 * Wrap your app with this to enable process detail dialogs from anywhere
 */
export function ProcessDetailDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentProcessDetail, setCurrentProcessDetail] = useState<ProcessDetail | null>(null)

  const openDialog = (processDetail: ProcessDetail) => {
    setCurrentProcessDetail(processDetail)
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    // Clear data after animation completes
    setTimeout(() => {
      setCurrentProcessDetail(null)
    }, 200)
  }

  return (
    <ProcessDetailDialogContext.Provider 
      value={{ 
        openDialog, 
        closeDialog, 
        isOpen, 
        currentProcessDetail 
      }}
    >
      {children}
      {currentProcessDetail && (
        <ProcessDetailDialog 
          open={isOpen} 
          onOpenChange={setIsOpen}
          processDetail={currentProcessDetail}
        />
      )}
    </ProcessDetailDialogContext.Provider>
  )
}

/**
 * Hook to access process detail dialog functions
 * Usage: const { openDialog } = useProcessDetailDialog()
 */
export function useProcessDetailDialog() {
  const context = useContext(ProcessDetailDialogContext)
  if (context === undefined) {
    throw new Error('useProcessDetailDialog must be used within ProcessDetailDialogProvider')
  }
  return context
}
