# API Contracts: Clone Landing Page

**Date**: 2025-01-27  
**Feature**: Clone Landing Page  
**Last Updated**: 2025-01-27  
**Status**: ✅ Implemented (with enhancements from later specs)

## Overview

This feature established the foundation for the "Insured by Rajan" landing page. While originally specified as a static page with no backend API endpoints, the implementation has been enhanced with API routes for form submissions (added in Spec 003) and multi-language support (added in Spec 004).

## Current Implementation Status

### API Endpoints (Added in Spec 003)

The following API endpoints have been implemented and are now part of the application:

#### POST /api/contact/inquiry
**Purpose**: Handle contact form submissions

**Request Body**:
```typescript
{
  name: string        // Required
  email: string       // Required, validated format
  phone?: string      // Optional
  subject?: string    // Optional
  message: string     // Required
}
```

**Response (Success - 200)**:
```typescript
{
  success: true
  message: string
}
```

**Response (Error - 400)**:
```typescript
{
  success: false
  error: {
    code: 'MISSING_NAME' | 'MISSING_EMAIL' | 'INVALID_EMAIL' | 'MISSING_MESSAGE'
    message: string
  }
}
```

#### POST /api/newsletter/subscribe
**Purpose**: Handle newsletter subscription requests

**Request Body**:
```typescript
{
  email: string                    // Required, validated format
  source?: 'footer' | 'landing-page' // Optional, tracks subscription source
}
```

**Response (Success - 200)**:
```typescript
{
  success: true
  message: string
  subscriptionId?: string
  isDuplicate?: boolean  // true if email already subscribed
}
```

**Response (Error - 400/500)**:
```typescript
{
  success: false
  error: {
    code: 'INVALID_EMAIL' | 'SERVICE_UNAVAILABLE' | 'INTERNAL_ERROR'
    message: string
    retryable?: boolean
    alternativeContact?: {
      phone: string
      email: string
    }
  }
}
```

**Note**: These endpoints currently use mock implementations. Production integration with email services and CRM systems is pending.

## Route Contracts

### Page Routes (Locale-Based)

All routes are Next.js App Router pages with multi-language support via dynamic `[locale]` segments. Routes are statically generated for all supported locales at build time.

**Supported Locales**: `en`, `fr`, `pa`, `hi`

| Route Pattern | Generated Routes | Type | Description |
|--------------|------------------|------|-------------|
| `/[locale]` | `/en`, `/fr`, `/pa`, `/hi` | Page | Main landing page (all locales) |
| `/[locale]/get-quote` | `/en/get-quote`, `/fr/get-quote`, etc. | Page | Quote request page |
| `/[locale]/products/term-life` | `/en/products/term-life`, etc. | Page | Term life product detail page |
| `/[locale]/products/whole-life` | `/en/products/whole-life`, etc. | Page | Whole life product detail page |
| `/[locale]/products/universal-life` | `/en/products/universal-life`, etc. | Page | Universal life product detail page |
| `/[locale]/products/critical-illness` | `/en/products/critical-illness`, etc. | Page | Critical illness product detail page |

### Route Behavior

- **Static Generation**: All routes are pre-rendered at build time using `generateStaticParams()`
- **Locale Handling**: Middleware handles locale detection and routing
- **Default Locale**: Falls back to `en` if invalid locale is provided
- **Server Components**: All pages are server components by default (App Router)
- **SEO**: Hreflang tags generated for all locale variants

### Route Examples

- English: `https://insuredbyrajan.com/en`
- French: `https://insuredbyrajan.com/fr`
- Punjabi: `https://insuredbyrajan.com/pa`
- Hindi: `https://insuredbyrajan.com/hi`

## Original Specification (Historical)

**Original Scope**: This feature was originally specified as a static landing page with:
- No form submissions (out of scope per original spec)
- No data fetching from external APIs
- No user authentication
- No database operations

**Enhancements Added**:
- Contact form API (Spec 003)
- Newsletter subscription API (Spec 003)
- Multi-language support (Spec 004)
- Enhanced UI components (Spec 002, 003)

## Related API Contracts

For detailed API contracts of enhanced features, see:
- **Spec 003**: `/specs/003-improve-ui-features/contracts/README.md` - Newsletter and contact form APIs
- **Spec 004**: `/specs/004-multi-language-support/contracts/` - i18n API contracts


