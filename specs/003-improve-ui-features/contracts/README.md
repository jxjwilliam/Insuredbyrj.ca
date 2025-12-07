# API Contracts: Improve UI and Add Common Features

**Date**: 2025-12-06  
**Feature**: Improve UI and Add Common Features

## Overview

This feature is primarily frontend-focused with minimal API requirements. The main API contract is for newsletter subscription, which will integrate with an external email service provider. Other features (footer, back-to-top, social sharing) are client-side only.

## Newsletter Subscription API

### Endpoint: POST /api/newsletter/subscribe

**Purpose**: Subscribe an email address to the newsletter.

**Request**:
```typescript
interface NewsletterSubscribeRequest {
  email: string
  source?: 'footer' | 'landing-page' // Where the subscription originated
  timestamp?: string // ISO 8601 timestamp
}
```

**Response (Success - 200)**:
```typescript
interface NewsletterSubscribeResponse {
  success: true
  message: string // "Thank you for subscribing!"
  subscriptionId?: string // Optional subscription ID
}
```

**Response (Duplicate - 200)**:
```typescript
interface NewsletterSubscribeResponse {
  success: true
  message: string // "You're already subscribed!"
  isDuplicate: true
}
```

**Response (Error - 400)**:
```typescript
interface NewsletterSubscribeErrorResponse {
  success: false
  error: {
    code: 'INVALID_EMAIL' | 'RATE_LIMIT_EXCEEDED' | 'SERVICE_UNAVAILABLE'
    message: string // User-friendly error message
    retryable: boolean // Whether user can retry
  }
}
```

**Response (Error - 500)**:
```typescript
interface NewsletterSubscribeErrorResponse {
  success: false
  error: {
    code: 'INTERNAL_ERROR' | 'SERVICE_UNAVAILABLE'
    message: string // "Please try again later or contact us directly"
    retryable: true
    alternativeContact?: {
      phone: string
      email: string
    }
  }
}
```

### Error Codes

- `INVALID_EMAIL`: Email format is invalid (should be caught client-side)
- `RATE_LIMIT_EXCEEDED`: Too many requests from same IP/email
- `SERVICE_UNAVAILABLE`: Email service provider is down
- `INTERNAL_ERROR`: Unexpected server error

### Rate Limiting

- Maximum 3 subscription attempts per email per hour
- Maximum 10 subscription attempts per IP per hour
- Rate limit headers:
  - `X-RateLimit-Remaining`: Number of requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when rate limit resets

### Implementation Notes

**Current Status**: Placeholder endpoint (returns mock success response)

**Future Integration**: 
- Will integrate with email service provider (Mailchimp, SendGrid, ConvertKit, etc.)
- Backend implementation deferred to future phase
- Frontend UI implementation proceeds with placeholder

**Client-Side Handling**:
- Validate email format before API call
- Show loading state during request
- Handle success, error, and duplicate states
- Provide retry option for retryable errors
- Show alternative contact method for service failures

## Google Maps API

### External API: Google Maps JavaScript API

**Purpose**: Display interactive map with office location.

**API Key**: Stored in environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

**Usage**:
- Load Maps JavaScript API script dynamically
- Initialize map with office location coordinates
- Display marker at office location
- Handle API loading errors gracefully

**Error Handling**:
- API key invalid: Show error message, fallback to static address
- API quota exceeded: Show error message, fallback to static address
- Network error: Show error message, fallback to static address

**No Custom Endpoint Required**: Uses Google Maps JavaScript API directly from client

## Social Sharing

### No API Required

**Implementation**: Client-side only
- Web Share API (native browser API) on mobile
- Platform-specific URLs on desktop
- No backend API calls needed

**Platform URLs**:
- Facebook: `https://www.facebook.com/sharer/sharer.php?u={encoded_url}`
- Twitter/X: `https://twitter.com/intent/tweet?url={encoded_url}&text={encoded_title}`
- LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url={encoded_url}`

## Footer Content

### No API Required

**Implementation**: Static content from `lib/constants.ts`
- No API calls needed
- Content managed through code

## Back-to-Top Button

### No API Required

**Implementation**: Client-side only
- Pure JavaScript/React implementation
- No backend interaction

## Testing Contracts

### Newsletter Subscription

**Test Cases**:
1. Valid email submission → Success response
2. Duplicate email submission → Duplicate response (friendly message)
3. Invalid email → 400 error with `INVALID_EMAIL` code
4. Rate limit exceeded → 400 error with `RATE_LIMIT_EXCEEDED` code
5. Service unavailable → 500 error with `SERVICE_UNAVAILABLE` code and retry option
6. Network error → Client-side error handling

**Mock Implementation** (for development):
```typescript
// Mock API response for development
const mockNewsletterSubscribe = async (email: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock duplicate detection (for testing)
  if (email === 'duplicate@example.com') {
    return {
      success: true,
      message: "You're already subscribed!",
      isDuplicate: true
    }
  }
  
  // Mock success
  return {
    success: true,
    message: "Thank you for subscribing!"
  }
}
```

## API Versioning

**Current Version**: v1 (placeholder)

**Future Considerations**:
- Newsletter subscription API may need versioning when backend is implemented
- Google Maps API versioning handled by Google

## Security Considerations

### Newsletter Subscription

- Email validation (client and server-side)
- Rate limiting to prevent abuse
- No sensitive data in requests
- HTTPS required for all API calls

### Google Maps API

- API key stored in environment variable (not in code)
- API key restricted to domain in Google Cloud Console
- No sensitive data exposed

### Social Sharing

- URLs sanitized to prevent XSS
- No user data collected
- Opens in new window/tab (security attributes)

## Documentation

### API Documentation

- Newsletter subscription: Documented in this file
- Google Maps: See [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- Social sharing: Client-side only, no API documentation needed

### Error Handling

All API errors must:
1. Return user-friendly error messages
2. Include error codes for programmatic handling
3. Indicate if error is retryable
4. Provide alternative contact methods for service failures
