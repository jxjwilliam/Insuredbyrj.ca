import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSupportedLanguages, getDefaultLocale, isSupportedLocale } from './lib/i18n/config'

/**
 * Next.js middleware for locale detection and URL routing
 * 
 * Detects user's preferred language from:
 * 1. URL path prefix (e.g., /en/, /pa/, /hi/)
 * 2. Cookie (NEXT_LOCALE)
 * 3. Accept-Language header
 * 
 * Redirects to appropriate locale-prefixed URL if needed.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const supportedLocales = getSupportedLanguages().map((lang) => lang.code)
  const defaultLocale = getDefaultLocale()

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If pathname already has a valid locale, continue
  if (pathnameHasLocale) {
    // Extract locale from pathname
    const pathLocale = pathname.split('/')[1]
    if (isSupportedLocale(pathLocale)) {
      // Set cookie for locale persistence
      const response = NextResponse.next()
      response.cookies.set('NEXT_LOCALE', pathLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      })
      return response
    }
  }

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next()
  }

  // Detect locale from cookie, Accept-Language header, or default
  let locale = defaultLocale

  // 1. Check cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    locale = cookieLocale
  } else {
    // 2. Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage) {
      // Parse Accept-Language header (e.g., "en-US,en;q=0.9,fr;q=0.8")
      const languages = acceptLanguage
        .split(',')
        .map((lang) => lang.split(';')[0].trim().toLowerCase())
        .map((lang) => lang.split('-')[0]) // Extract base language code

      // Find first supported language
      for (const lang of languages) {
        if (isSupportedLocale(lang)) {
          locale = lang
          break
        }
      }
    }
  }

  // Redirect to locale-prefixed URL
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  const response = NextResponse.redirect(newUrl)
  
  // Set cookie for locale persistence
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
