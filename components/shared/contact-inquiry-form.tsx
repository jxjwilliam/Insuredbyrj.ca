'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from '@/lib/i18n/hooks'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface ContactInquiryFormProps {
  onSuccess?: () => void
  className?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Contact inquiry form component
 * Handles form submission and displays success/error states
 */
export function ContactInquiryForm({
  onSuccess,
  className,
}: ContactInquiryFormProps) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Name is required')
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      return false
    }
    if (!formData.message.trim()) {
      setErrorMessage('Message is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        // Call success callback after a short delay
        setTimeout(() => {
          onSuccess?.()
        }, 2000)
      } else {
        setStatus('error')
        setErrorMessage(
          data.error?.message ||
            'Failed to send your inquiry. Please try again or contact us directly.'
        )
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        'Network error. Please check your connection and try again.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('contact.form.success.title', 'Thank You!')}
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          {t(
            'contact.form.success.message',
            'We have received your inquiry and will get back to you soon.'
          )}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-900"
        >
          {t('contact.form.name', 'Full Name')} <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder={t('contact.form.namePlaceholder', 'Enter your full name')}
          disabled={status === 'submitting'}
          className="w-full"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-900"
        >
          {t('contact.form.email', 'Email')} <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder={t('contact.form.emailPlaceholder', 'Enter your email address')}
          disabled={status === 'submitting'}
          className="w-full"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-sm font-medium text-gray-900"
        >
          {t('contact.form.phone', 'Phone Number')} <span className="text-gray-400">(Optional)</span>
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t('contact.form.phonePlaceholder', 'Enter your phone number')}
          disabled={status === 'submitting'}
          className="w-full"
        />
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-gray-900"
        >
          {t('contact.form.subject', 'Subject')} <span className="text-gray-400">(Optional)</span>
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder={t('contact.form.subjectPlaceholder', 'What is this regarding?')}
          disabled={status === 'submitting'}
          className="w-full"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-gray-900"
        >
          {t('contact.form.message', 'Message')} <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder={t(
            'contact.form.messagePlaceholder',
            'Tell us how we can help you...'
          )}
          disabled={status === 'submitting'}
          rows={6}
          className="w-full resize-none"
        />
      </div>

      {/* Error Message */}
      {status === 'error' && errorMessage && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full"
        size="lg"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('contact.form.submitting', 'Sending...')}
          </>
        ) : (
          t('contact.form.submit', 'Send Inquiry')
        )}
      </Button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 text-center">
        {t(
          'contact.form.privacy',
          'By submitting this form, you agree to our privacy policy. We will never share your information.'
        )}
      </p>
    </form>
  )
}
