import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * Placeholder product detail page for Universal Life insurance
 */
export default function UniversalLifePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Universal Life Insurance</h1>
        <p className="text-lg text-gray-600 mb-8">
          This product detail page is coming soon. Learn more about our universal life
          insurance plans.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/get-quote">Get a Quote</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


