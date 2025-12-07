'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ContactInquiryForm } from '@/components/shared/contact-inquiry-form'
import { useTranslation } from '@/lib/i18n/hooks'

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Contact dialog component that displays inquiry form in a popup
 * Can be opened from anywhere on the page
 */
export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const { t } = useTranslation()

  // Close dialog when form is successfully submitted
  const handleSuccess = () => {
    // Keep dialog open for 2 seconds to show success message, then close
    setTimeout(() => {
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('contact.form.title', 'Get in Touch')}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 pt-2">
            {t(
              'contact.form.description',
              'Fill out the form below and we\'ll get back to you as soon as possible.'
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ContactInquiryForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
