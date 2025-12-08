'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ProductDetailDialog } from './product-detail-dialog'
import type { InsurancePlan, DetailedPlanInformation } from '@/lib/types'

interface ProductDialogContextType {
  openDialog: (plan: InsurancePlan, detailedInfo?: DetailedPlanInformation) => void
  closeDialog: () => void
  isOpen: boolean
  currentPlan: InsurancePlan | null
  currentDetailedInfo: DetailedPlanInformation | undefined
}

const ProductDialogContext = createContext<ProductDialogContextType | undefined>(
  undefined
)

/**
 * Provider component that manages product detail dialog state globally
 * Wrap your app with this to enable product detail dialogs from anywhere
 */
export function ProductDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<InsurancePlan | null>(null)
  const [currentDetailedInfo, setCurrentDetailedInfo] = useState<DetailedPlanInformation | undefined>()

  const openDialog = (plan: InsurancePlan, detailedInfo?: DetailedPlanInformation) => {
    setCurrentPlan(plan)
    setCurrentDetailedInfo(detailedInfo)
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    // Clear data after animation completes
    setTimeout(() => {
      setCurrentPlan(null)
      setCurrentDetailedInfo(undefined)
    }, 200)
  }

  return (
    <ProductDialogContext.Provider 
      value={{ 
        openDialog, 
        closeDialog, 
        isOpen, 
        currentPlan, 
        currentDetailedInfo 
      }}
    >
      {children}
      {currentPlan && (
        <ProductDetailDialog 
          open={isOpen} 
          onOpenChange={setIsOpen}
          plan={currentPlan}
          detailedInfo={currentDetailedInfo}
        />
      )}
    </ProductDialogContext.Provider>
  )
}

/**
 * Hook to access product dialog functions
 * Usage: const { openDialog } = useProductDialog()
 */
export function useProductDialog() {
  const context = useContext(ProductDialogContext)
  if (context === undefined) {
    throw new Error('useProductDialog must be used within ProductDialogProvider')
  }
  return context
}
