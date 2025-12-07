import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { BackToTopButton } from '@/components/shared/back-to-top-button'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Insured by Rajan: British Columbia's Trusted Life Insurance Agency",
  description:
    'Protecting British Columbia families with transparent, affordable life insurance coverage. Get the peace of mind you deserve.',
  keywords: [
    'life insurance',
    'British Columbia',
    'BC insurance',
    'term life',
    'whole life',
    'universal life',
    'critical illness insurance',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} suppressHydrationWarning>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <BackToTopButton />
      </body>
    </html>
  )
}


