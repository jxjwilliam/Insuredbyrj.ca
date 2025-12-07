import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}

