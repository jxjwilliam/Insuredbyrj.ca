# Data Model: Improve UI and Add Common Features

**Date**: 2025-12-06  
**Feature**: Improve UI and Add Common Features

## Overview

This feature is primarily frontend-focused with minimal data persistence requirements. The main data entities relate to newsletter subscriptions, footer content, and social sharing metadata. Most data is static content managed through TypeScript constants.

## Entities

### FooterContent

Represents footer information displayed on all pages.

**Fields**:
- `companyInfo`: Company name, tagline, logo URL
- `quickLinks`: Array of navigation links (Why Choose, Plans, How It Works, FAQ, Contact)
- `contactDetails`: Phone, email, office address
- `socialMediaLinks`: Array of social media platform links (Facebook, Twitter/X, LinkedIn)
- `legalLinks`: Array of legal page links (Privacy Policy, Terms of Service)
- `newsletterForm`: Newsletter subscription form configuration
- `copyright`: Copyright text and year

**Relationships**:
- References `ContactDetails` from `landingPageContent`
- References `NavigationItem[]` from `landingPageContent`
- Contains embedded `NewsletterFormConfig`

**Validation Rules**:
- All links must be valid URLs
- Email addresses must be valid format
- Social media links must open in new tabs
- Legal links must exist or be placeholders

**State Transitions**: N/A (static content)

### NewsletterSubscription

Represents email subscription data (frontend state, backend persistence deferred).

**Fields**:
- `email`: string (required, validated)
- `subscriptionStatus`: 'pending' | 'success' | 'error' | 'duplicate'
- `subscriptionTimestamp`: Date (optional, set on success)
- `errorMessage`: string (optional, set on error)

**Relationships**:
- Submitted to external email service provider (API endpoint TBD)

**Validation Rules**:
- Email must match RFC 5322 format
- Email must be validated client-side before submission
- Duplicate emails handled gracefully (show friendly message)
- Error states must provide retry option

**State Transitions**:
1. `pending` → `success`: Subscription successful
2. `pending` → `error`: Service failure
3. `pending` → `duplicate`: Email already subscribed
4. `error` → `pending`: User retries submission

### SocialShareData

Represents sharing information for social media platforms.

**Fields**:
- `url`: string (current page URL)
- `title`: string (page title)
- `description`: string (page description/meta description)
- `platform`: 'facebook' | 'twitter' | 'linkedin'
- `shareTimestamp`: Date (optional, for analytics)

**Relationships**:
- Generated from page metadata
- Used by social sharing buttons component

**Validation Rules**:
- URL must be absolute and valid
- Title and description should be sanitized
- Platform must be one of supported platforms

**State Transitions**: N/A (ephemeral, created on share action)

### AccessibilitySettings

Represents user preferences for accessibility features.

**Fields**:
- `prefersReducedMotion`: boolean (from CSS media query)
- `keyboardNavigationActive`: boolean (tracks if user is navigating via keyboard)
- `screenReaderActive`: boolean (detected from user agent or ARIA live regions)

**Relationships**:
- Detected from browser/OS settings
- Used to conditionally enable/disable animations

**Validation Rules**:
- `prefersReducedMotion` must be respected for all animations
- Settings detected automatically, not user-configurable

**State Transitions**: N/A (read-only, detected from environment)

### PrintConfiguration

Represents print-specific settings and content visibility.

**Fields**:
- `hideNavigation`: boolean (default: true)
- `hideFooter`: boolean (default: true)
- `hideBackToTop`: boolean (default: true)
- `hideSocialSharing`: boolean (default: true)
- `optimizeLayout`: boolean (default: true)
- `paperSize`: 'letter' | 'a4' (default: 'letter')
- `orientation`: 'portrait' | 'landscape' (default: 'portrait')

**Relationships**:
- Applied via CSS `@media print` rules
- Not stored, applied at render time

**Validation Rules**:
- All settings are boolean flags
- Applied automatically when user prints

**State Transitions**: N/A (applied via CSS, not stateful)

### GoogleMapConfig

Represents Google Maps component configuration.

**Fields**:
- `apiKey`: string (from environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
- `center`: { lat: number, lng: number } (office location coordinates)
- `zoom`: number (default: 15)
- `markerPosition`: { lat: number, lng: number } (office location)
- `markerTitle`: string (office address)
- `mapTypeId`: 'roadmap' | 'satellite' | 'hybrid' | 'terrain' (default: 'roadmap')
- `styles`: GoogleMapStyle[] (optional custom styling)

**Relationships**:
- References office address from `ContactDetails`
- Uses Google Maps JavaScript API

**Validation Rules**:
- API key must be valid Google Maps API key
- Coordinates must be valid lat/lng values
- Zoom must be between 1 and 20
- Marker position must match center or be close

**State Transitions**: N/A (static configuration)

## Data Flow

### Newsletter Subscription Flow

```
User Input (Email) 
  → Client-side Validation
  → Loading State (pending)
  → API Request (deferred, placeholder)
  → Success State (success) OR Error State (error) OR Duplicate State (duplicate)
  → User Feedback (success message, error message with retry, or duplicate message)
```

### Social Sharing Flow

```
User Clicks Share Button
  → Detect Platform
  → Generate Share URL with pre-filled content
  → Open Share Dialog (Web Share API on mobile) OR Platform URL (desktop)
  → User Completes Share
  → Return to Page (maintain scroll position)
```

### Back-to-Top Flow

```
User Scrolls Down (> 300px)
  → Show Back-to-Top Button
  → User Clicks Button
  → Smooth Scroll Animation (GSAP or framer-motion)
  → Scroll to Top
  → Hide Back-to-Top Button
```

## Type Definitions

### TypeScript Interfaces

```typescript
interface FooterContent {
  companyInfo: {
    name: string
    tagline?: string
    logoUrl?: string
  }
  quickLinks: NavigationItem[]
  contactDetails: ContactDetails
  socialMediaLinks: SocialMediaLink[]
  legalLinks: LegalLink[]
  newsletterForm: NewsletterFormConfig
  copyright: {
    text: string
    year: number
  }
}

interface NewsletterFormConfig {
  placeholder: string
  buttonText: string
  successMessage: string
  errorMessage: string
  duplicateMessage: string
}

interface SocialMediaLink {
  platform: 'facebook' | 'twitter' | 'linkedin'
  url: string
  label: string
  icon: React.ComponentType
}

interface LegalLink {
  label: string
  href: string
}

interface GoogleMapConfig {
  apiKey: string
  center: { lat: number; lng: number }
  zoom: number
  markerPosition: { lat: number; lng: number }
  markerTitle: string
  mapTypeId: 'roadmap' | 'satellite' | 'hybrid' | 'terrain'
  styles?: google.maps.MapTypeStyle[]
}
```

## Data Sources

### Static Content
- Footer content: `lib/constants.ts` (new `footerContent` export)
- Newsletter form config: `lib/constants.ts`
- Social media links: `lib/constants.ts` (from `contactDetails.socialMedia`)
- Legal links: `lib/constants.ts` (new `legalLinks` array)

### Dynamic Content
- Newsletter subscription state: React component state (frontend only)
- Social share data: Generated from page metadata at runtime
- Google Maps config: From `contactDetails.address` + environment variable

### External Services
- Newsletter subscription: Email service provider API (TBD, placeholder for now)
- Google Maps: Google Maps JavaScript API (requires API key)

## Data Validation

### Client-Side Validation

**Newsletter Email**:
- Format: RFC 5322 compliant
- Required field
- Real-time validation on input
- Clear error messages

**Social Share URLs**:
- Must be absolute URLs
- Must be valid URL format
- Sanitized to prevent XSS

**Google Maps**:
- API key validation (check if loaded)
- Coordinate validation (lat: -90 to 90, lng: -180 to 180)
- Error handling for API failures

## Data Persistence

### Frontend State
- Newsletter subscription form state: React component state (ephemeral)
- Back-to-top button visibility: React component state (ephemeral)
- Social sharing: No persistence needed

### Backend Persistence (Future)
- Newsletter subscriptions: Email service provider database (deferred)
- Analytics: Social share tracking (optional, future enhancement)

## Migration Considerations

### New Constants
- Add `footerContent` to `lib/constants.ts`
- Add `legalLinks` to `lib/constants.ts`
- Update `ContactDetails` type to include `socialMedia` links

### Type Updates
- Add new interfaces to `lib/types.ts`
- Update `LandingPageContent` interface if needed

### No Database Migrations
- No database changes required (frontend-only feature)
- Newsletter subscription backend integration deferred
