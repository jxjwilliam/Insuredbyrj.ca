import type { Metadata } from 'next'
import './globals.css'

/**
 * Root layout - minimal wrapper
 * 
 * The actual layout with I18nProvider is in app/[locale]/layout.tsx
 * This root layout is kept minimal as Next.js requires a root layout.
 * All locale-specific logic is handled in the [locale] layout.
 */
export const metadata: Metadata = {
  title: "Insured by Rajan: British Columbia's Trusted Life Insurance Agency",
  description:
    'Protecting British Columbia families with transparent, affordable life insurance coverage. Get the peace of mind you deserve.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Root layout is a pass-through
  // The [locale] layout provides the actual HTML structure
  return children
}


