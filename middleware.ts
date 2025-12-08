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

  // Handle /en/* - redirect to remove /en prefix (English is default, no prefix needed)
  if (pathname.startsWith('/en')) {
    const pathWithoutEn = pathname.replace(/^\/en/, '') || '/'
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = pathWithoutEn
    
    const response = NextResponse.redirect(newUrl)
    response.cookies.set('NEXT_LOCALE', defaultLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })
    return response
  }

  // Check if pathname has a non-English locale prefix
  const nonDefaultLocales = supportedLocales.filter(locale => locale !== defaultLocale)
  const pathnameHasLocale = nonDefaultLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If pathname has a valid non-default locale, continue
  if (pathnameHasLocale) {
    const pathLocale = pathname.split('/')[1]
    if (isSupportedLocale(pathLocale)) {
      const response = NextResponse.next()
      response.cookies.set('NEXT_LOCALE', pathLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      })
      return response
    }
  }

  // For root paths (no locale prefix), rewrite to /en internally but keep URL as is
  // This serves English content at root without showing /en in URL
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/en${pathname === '/' ? '' : pathname}`

  const response = NextResponse.rewrite(newUrl)
  
  // Set cookie for locale persistence
  response.cookies.set('NEXT_LOCALE', defaultLocale, {
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
