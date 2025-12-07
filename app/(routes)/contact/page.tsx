import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * Placeholder contact page
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Speak to a BC Advisor
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This page is coming soon. For now, please reach out to us directly to
          speak with Rajan.
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


