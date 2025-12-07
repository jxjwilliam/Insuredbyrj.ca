'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error boundary component for catching and displaying errors gracefully
 * Provides user-friendly error messages with retry options
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service in production
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className="m-4 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
              Something went wrong
            </CardTitle>
            <CardDescription className="text-red-700">
              We encountered an unexpected error. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-red-600">
              If this problem persists, please contact us at{' '}
              <a
                href="mailto:infinity@insureline.com"
                className="underline hover:text-red-800"
              >
                infinity@insureline.com
              </a>{' '}
              or{' '}
              <a href="tel:778-830-0142" className="underline hover:text-red-800">
                778-830-0142
              </a>
              .
            </p>
            <div className="flex gap-2">
              <Button onClick={this.handleRetry} variant="outline">
                Try Again
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
              >
                Go to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}
