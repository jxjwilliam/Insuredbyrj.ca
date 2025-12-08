import type { Metadata, Viewport } from 'next'
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Insured by Rajan',
  },
}

export const viewport: Viewport = {
  themeColor: '#3B82F6',
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


