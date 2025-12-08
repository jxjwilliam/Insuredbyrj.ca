import { getSupportedLanguages } from '@/lib/i18n/config'

/**
 * Generate static params for non-English locales
 * English is served at root, so excluded here
 */
export async function generateStaticParams() {
  const supportedLocales = getSupportedLanguages()
    .map((lang) => lang.code)
    .filter((locale) => locale !== 'en')
  return supportedLocales.map((locale) => ({
    locale,
  }))
}

/**
 * Layout for routes under [locale]/(routes)
 * This layout ensures generateStaticParams is available for all child routes
 */
export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
