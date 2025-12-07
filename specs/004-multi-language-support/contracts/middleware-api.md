# Next.js Middleware API Contract

## Middleware Function

### `middleware(request: NextRequest): NextResponse`

Next.js middleware function that handles locale detection and routing.

**Location**: `middleware.ts` (project root)

**Parameters**:
- `request` (NextRequest): Incoming request object

**Returns**: NextResponse (redirect or pass-through)

## Behavior

### URL Analysis

1. **Check for Locale Prefix**: 
   - If URL is `/pa/...` or `/hi/...` or `/en/...` → Pass through
   - If URL is `/` or `/contact` → Needs locale detection

2. **Locale Detection Priority**:
   1. Check cookie `NEXT_LOCALE`
   2. Check `Accept-Language` header
   3. Default to `'en'`

3. **Redirect Logic**:
   - If no locale in URL → Redirect to `/{detected-locale}{pathname}`
   - If invalid locale in URL → Redirect to `/{default-locale}{pathname}`
   - If valid locale → Set cookie and pass through

### Cookie Management

- **Set Cookie**: `NEXT_LOCALE={locale}; Path=/; Max-Age=31536000; SameSite=Lax`
- **Read Cookie**: From `request.cookies.get('NEXT_LOCALE')`

### Header Analysis

- **Accept-Language**: Parse `request.headers.get('accept-language')`
- **Matching**: Match first supported language from header
- **Fallback**: Use default locale if no match

## Route Matching

### Matcher Configuration

```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**Excluded Paths**:
- `/api/*` - API routes (no locale needed)
- `/_next/*` - Next.js internal files
- `/favicon.ico` - Static assets

### Supported Routes

All routes under `app/[locale]/` are handled:
- `/en/` → English homepage
- `/pa/` → Punjabi homepage
- `/hi/contact` → Hindi contact page
- `/en/products/term-life` → English term life page

## Error Handling

- **Invalid Locale**: Redirects to default locale (`/en/...`)
- **Missing Cookie**: Creates new cookie with detected/default locale
- **Header Parse Error**: Falls back to default locale

## Performance

- **Edge Runtime**: Runs at edge, minimal latency
- **Caching**: Cookie-based caching reduces redirects on subsequent requests
- **Static Routes**: Works with `generateStaticParams` for static generation

## Example Flow

```
Request: GET /contact
├── No locale in URL
├── Check cookie: NEXT_LOCALE=pa
├── Redirect to: /pa/contact
└── Set cookie: NEXT_LOCALE=pa

Request: GET /fr/about (invalid locale)
├── Locale 'fr' not supported
├── Redirect to: /en/about
└── Set cookie: NEXT_LOCALE=en

Request: GET /pa/contact (valid)
├── Locale 'pa' in URL
├── Valid locale, pass through
└── Set cookie: NEXT_LOCALE=pa
```
