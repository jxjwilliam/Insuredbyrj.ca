// Tailwind CSS v4 uses CSS-first configuration via @theme in globals.css
// This file is kept for content path detection and IDE support
// Most configuration is now in app/globals.css using @theme directive

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
}

export default config
