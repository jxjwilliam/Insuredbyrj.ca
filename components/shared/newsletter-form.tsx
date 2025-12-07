'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { footerContent } from '@/lib/constants'
import type { NewsletterSubscription } from '@/lib/types'

interface NewsletterFormProps {
  source: 'footer' | 'landing-page'
  className?: string
}

/**
 * Newsletter subscription form component
 * Handles email validation, submission states, and error handling
 */
export function NewsletterForm({ source, className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<NewsletterSubscription['subscriptionStatus']>('pending')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const config = footerContent.newsletterForm

  // Email validation regex (RFC 5322 compliant)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validateEmail = (emailValue: string): boolean => {
    return emailRegex.test(emailValue.trim())
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate email
    if (!email.trim()) {
      setErrorMessage('Please enter your email address')
      setStatus('error')
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('pending')
    setErrorMessage('')

    try {
      // Placeholder API call - will be replaced with actual endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.isDuplicate) {
          setStatus('duplicate')
          setEmail('')
        } else {
          setStatus('success')
          setEmail('')
        }
      } else {
        setStatus('error')
        setErrorMessage(data.error?.message || config.errorMessage)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        `${config.errorMessage} Contact us at ${footerContent.contactDetails.email.primary} or ${footerContent.contactDetails.phone.primary}`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetry = () => {
    setStatus('pending')
    setErrorMessage('')
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Newsletter subscription form">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder={config.placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') {
                setStatus('pending')
                setErrorMessage('')
              }
            }}
            disabled={isSubmitting || status === 'success'}
            className="flex-1"
            aria-label="Email address"
            aria-invalid={status === 'error'}
            aria-describedby={
              status === 'error' ? 'email-error' : status === 'success' ? 'email-success' : undefined
            }
          />
          <Button
            type="submit"
            disabled={isSubmitting || status === 'success'}
            aria-label="Subscribe to newsletter"
          >
            {isSubmitting ? 'Subscribing...' : config.buttonText}
          </Button>
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div
            id="email-error"
            className="text-sm text-red-600 space-y-2"
            role="alert"
            aria-live="polite"
          >
            <p>{errorMessage || config.errorMessage}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="text-sm"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Success Message */}
        {status === 'success' && (
          <div
            id="email-success"
            className="text-sm text-green-600"
            role="alert"
            aria-live="polite"
          >
            {config.successMessage}
          </div>
        )}

        {/* Duplicate Message */}
        {status === 'duplicate' && (
          <div
            className="text-sm text-blue-600"
            role="alert"
            aria-live="polite"
          >
            {config.duplicateMessage}
          </div>
        )}
      </form>
    </div>
  )
}
