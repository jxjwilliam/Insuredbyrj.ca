import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * Placeholder quote request page
 */
export default function GetQuotePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get Your Free Quote
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This page is coming soon. For now, please contact us directly to get
          your free life insurance quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


