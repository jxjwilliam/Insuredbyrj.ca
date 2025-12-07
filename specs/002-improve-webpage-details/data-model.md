# Data Model: Improve Webpage with More Details

**Date**: 2025-01-27  
**Feature**: Improve Webpage with More Details  
**Phase**: 1 - Design & Contracts

## Overview

This feature extends the existing landing page data model with detailed content entities. All content remains static (TypeScript constants) with no database or persistent data storage. New entities support detailed plan information, testimonials, pricing scenarios, company background, enhanced trust indicators, and comprehensive FAQ expansion.

## New Entities

### DetailedPlanInformation

Represents expanded insurance plan details with comprehensive coverage information.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface DetailedPlanInformation {
  planId: string; // References InsurancePlan.id
  coverageRange: {
    min: string; // e.g., "$100,000"
    max: string; // e.g., "$5,000,000"
  };
  eligibility: {
    minAge?: number;
    maxAge?: number;
    healthRequirements: string[];
    occupationRestrictions?: string[];
  };
  exclusions: string[]; // What is not covered
  useCases: string[]; // Real-world scenarios where plan is appropriate
  comparisonPoints: {
    affordability: 'low' | 'medium' | 'high';
    flexibility: 'low' | 'medium' | 'high';
    cashValue: boolean;
    termLength?: string; // For term life
  };
  additionalFeatures?: string[]; // Optional features
}
```

**Fields**:
- `planId: string` - Links to existing `InsurancePlan.id`
- `coverageRange: { min, max }` - Coverage amount range
- `eligibility: { minAge?, maxAge?, healthRequirements, occupationRestrictions? }` - Who can apply
- `exclusions: string[]` - What is not covered
- `useCases: string[]` - Real-world scenarios
- `comparisonPoints: { affordability, flexibility, cashValue, termLength? }` - For plan comparison
- `additionalFeatures?: string[]` - Optional features

### TrustCredential

Represents detailed trust indicators including certifications, licenses, and professional credentials.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface TrustCredential {
  id: string;
  type: 'certification' | 'license' | 'membership' | 'award' | 'partnership';
  title: string; // e.g., "BC Insurance License"
  issuer: string; // e.g., "Insurance Council of British Columbia"
  description?: string; // Additional details
  verificationUrl?: string; // Link to verify credential
  icon?: string; // Icon identifier
  badge?: string; // Badge text (e.g., "A+ Rating")
}
```

**Fields**:
- `id: string` - Unique identifier
- `type: 'certification' | 'license' | 'membership' | 'award' | 'partnership'` - Credential type
- `title: string` - Credential name
- `issuer: string` - Issuing organization
- `description?: string` - Additional details
- `verificationUrl?: string` - Link to verify (if available)
- `icon?: string` - Icon identifier
- `badge?: string` - Badge text for display

### Testimonial

Represents detailed customer testimonials with specific situations and outcomes.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface Testimonial {
  id: string;
  customerName: string; // Full name or initials
  location: string; // City, BC
  situation: string; // Customer's situation (e.g., "New parent looking for term life")
  experience: string; // Detailed account of experience
  outcome: string; // Result/benefit received
  rating?: number; // 1-5 stars
  date?: string; // Date of testimonial
  imageUrl?: string; // Optional customer photo (with permission)
  verified?: boolean; // Whether testimonial is verified
}
```

**Fields**:
- `id: string` - Unique identifier
- `customerName: string` - Name or initials
- `location: string` - Customer location
- `situation: string` - Customer's situation
- `experience: string` - Detailed experience account
- `outcome: string` - Result/benefit
- `rating?: number` - Star rating (1-5)
- `date?: string` - Date of testimonial
- `imageUrl?: string` - Optional photo
- `verified?: boolean` - Verification status

### PricingScenario

Represents example pricing information for different customer profiles.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface PricingScenario {
  id: string;
  planId: string; // References InsurancePlan.id
  profile: {
    age: number;
    gender?: 'male' | 'female' | 'other';
    healthStatus: 'excellent' | 'good' | 'fair' | 'pre-existing';
    coverageAmount: string; // e.g., "$500,000"
    termLength?: string; // For term life (e.g., "20 years")
  };
  monthlyPremium: string; // e.g., "$45/month"
  annualPremium: string; // e.g., "$540/year"
  notes?: string; // Additional pricing notes
  disclaimer: string; // Standard disclaimer about representative pricing
}
```

**Fields**:
- `id: string` - Unique identifier
- `planId: string` - Links to `InsurancePlan.id`
- `profile: { age, gender?, healthStatus, coverageAmount, termLength? }` - Customer profile
- `monthlyPremium: string` - Monthly premium estimate
- `annualPremium: string` - Annual premium estimate
- `notes?: string` - Additional notes
- `disclaimer: string` - Pricing disclaimer

### CompanyBackground

Represents detailed company and advisor background information.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface CompanyBackground {
  companyName: string; // "InsureLine Brokers (Infinity)"
  ownerName: string; // "Rajan Thind"
  ownerTitle: string; // "Owner & Insurance Advisor"
  biography: string; // 150-200 word personal bio
  philosophy: string; // Company philosophy/approach
  experience: {
    years: number; // Years of experience
    specialties: string[]; // Areas of expertise
    certifications: string[]; // Professional certifications
  };
  location: {
    address: string; // "7155 120 Street, Delta, BC V4E 2B1"
    city: string; // "Delta"
    province: string; // "BC"
    postalCode: string; // "V4E 2B1"
  };
  brandAffiliation?: {
    name: string; // "InsureLine"
    type: string; // "Franchisee"
    benefits: string[]; // Benefits of affiliation
  };
  values: string[]; // Company values
  differentiators: string[]; // What makes company unique
  imageUrl?: string; // Professional headshot URL
}
```

**Fields**:
- `companyName: string` - Company name
- `ownerName: string` - Owner/advisor name
- `ownerTitle: string` - Owner title
- `biography: string` - Personal bio (150-200 words)
- `philosophy: string` - Company philosophy
- `experience: { years, specialties, certifications }` - Experience details
- `location: { address, city, province, postalCode }` - Office location
- `brandAffiliation?: { name, type, benefits }` - Franchise/brand info
- `values: string[]` - Company values
- `differentiators: string[]` - Unique selling points
- `imageUrl?: string` - Professional headshot

### ProcessDetail

Represents detailed sub-steps within the "How It Works" process.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface ProcessDetail {
  stepNumber: number; // References ProcessStep.number
  subSteps: {
    title: string;
    description: string;
    timeRequired?: string; // e.g., "5 minutes"
    requiredDocuments?: string[]; // Documents needed
    questions?: string[]; // Example questions asked
  }[];
  medicalExamInfo?: {
    required: boolean;
    description: string;
    scheduling: string; // How to schedule
    whatToExpect: string[]; // What happens during exam
  };
  postApplication: {
    timeline: string; // Expected timeline
    nextSteps: string[]; // What happens after submission
    contactInfo: string; // Who to contact
  };
}
```

**Fields**:
- `stepNumber: number` - Links to `ProcessStep.number`
- `subSteps: Array<{ title, description, timeRequired?, requiredDocuments?, questions? }>` - Detailed sub-steps
- `medicalExamInfo?: { required, description, scheduling, whatToExpect }` - Medical exam details
- `postApplication: { timeline, nextSteps, contactInfo }` - Post-application information

### ClaimsProcessInfo

Represents detailed information about the claims process.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface ClaimsProcessInfo {
  howToFile: {
    steps: string[]; // Step-by-step process
    contactMethods: {
      phone: string;
      email: string;
      online?: string; // Online portal URL
    };
    requiredDocuments: string[]; // Documents needed to file claim
  };
  timeline: {
    initialFiling: string; // Time to file
    review: string; // Review period
    approval: string; // Approval timeline
    payout: string; // Payout timeline
  };
  whatToExpect: string[]; // What happens during claims process
  support: {
    available: boolean;
    description: string; // How company supports during claims
    contactInfo: string;
  };
}
```

**Fields**:
- `howToFile: { steps, contactMethods, requiredDocuments }` - How to file a claim
- `timeline: { initialFiling, review, approval, payout }` - Claims timeline
- `whatToExpect: string[]` - Process expectations
- `support: { available, description, contactInfo }` - Support information

### ContactDetails

Represents comprehensive contact information.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface ContactDetails {
  phone: {
    primary: string; // "778-830-0142"
    secondary?: string; // Optional secondary number
    tollFree?: string; // Optional toll-free number
  };
  email: {
    primary: string; // "infinity@insureline.com"
    general?: string; // Optional general inquiry email
  };
  address: {
    street: string; // "7155 120 Street"
    city: string; // "Delta"
    province: string; // "BC"
    postalCode: string; // "V4E 2B1"
    fullAddress: string; // Full formatted address
  };
  officeHours: {
    weekdays: string; // e.g., "Monday - Friday: 9:00 AM - 5:00 PM"
    saturday?: string; // Optional Saturday hours
    sunday?: string; // Optional Sunday hours
  };
  responseTimes: {
    phone: string; // e.g., "Within 24 hours"
    email: string; // e.g., "Within 48 hours"
    preferred: string; // Preferred contact method
  };
  socialMedia?: {
    linkedIn?: string; // LinkedIn profile URL
    facebook?: string; // Facebook page URL
    instagram?: string; // Instagram handle
  };
}
```

**Fields**:
- `phone: { primary, secondary?, tollFree? }` - Phone numbers
- `email: { primary, general? }` - Email addresses
- `address: { street, city, province, postalCode, fullAddress }` - Office address
- `officeHours: { weekdays, saturday?, sunday? }` - Business hours
- `responseTimes: { phone, email, preferred }` - Expected response times
- `socialMedia?: { linkedIn?, facebook?, instagram? }` - Social media links

### ServiceArea

Represents service areas and coverage regions.

**Type**: TypeScript interface  
**Location**: `lib/types.ts`

```typescript
export interface ServiceArea {
  primary: string[]; // Primary cities (e.g., ["Surrey", "Delta"])
  secondary?: string[]; // Secondary cities (e.g., ["Abbotsford", "Langley"])
  province: string; // "British Columbia" or "BC"
  description?: string; // Service area description
}
```

**Fields**:
- `primary: string[]` - Primary service cities
- `secondary?: string[]` - Secondary service cities
- `province: string` - Province served
- `description?: string` - Service area description

## Enhanced Existing Entities

### InsurancePlan (Extended)

Add optional field for detailed information reference:

```typescript
export interface InsurancePlan {
  // ... existing fields
  detailedInfoId?: string; // References DetailedPlanInformation (optional for backward compatibility)
}
```

### TrustIndicator (Extended)

Add optional field for detailed credential reference:

```typescript
export interface TrustIndicator {
  // ... existing fields
  credentialId?: string; // References TrustCredential (optional for backward compatibility)
}
```

### ProcessStep (Extended)

Add optional field for detailed process information:

```typescript
export interface ProcessStep {
  // ... existing fields
  detailId?: string; // References ProcessDetail (optional for backward compatibility)
}
```

### FAQItem (Extended)

No changes needed - existing structure supports detailed answers.

## Updated LandingPageContent Interface

```typescript
export interface LandingPageContent {
  // Existing fields
  hero: HeroSection;
  trustIndicators: TrustIndicator[];
  whyChoose: WhyChooseSection;
  insurancePlans: InsurancePlan[];
  howItWorks: HowItWorksSection;
  whyBC: WhyBCSection;
  faq: FAQItem[];
  navigation: NavigationItem[];
  
  // New detailed content fields
  detailedPlanInfo?: DetailedPlanInformation[]; // Optional for backward compatibility
  trustCredentials?: TrustCredential[]; // Optional for backward compatibility
  testimonials?: Testimonial[]; // Optional - new section
  pricingScenarios?: PricingScenario[]; // Optional - new section
  companyBackground?: CompanyBackground; // Optional - new section
  processDetails?: ProcessDetail[]; // Optional - enhanced How It Works
  claimsProcess?: ClaimsProcessInfo; // Optional - new section
  contactDetails?: ContactDetails; // Optional - enhanced contact info
  serviceAreas?: ServiceArea; // Optional - service area info
}
```

## Content Storage

**Location**: `lib/constants.ts`

All new content will be stored alongside existing content in the `landingPageContent` constant, with new optional fields added for backward compatibility.

## Validation Rules

- **Type Safety**: TypeScript compiler enforces all structures
- **Required Fields**: All required fields must be present (TypeScript will error if missing)
- **Optional Fields**: New detailed content fields are optional to maintain backward compatibility
- **References**: `planId` in `DetailedPlanInformation` must reference existing `InsurancePlan.id`
- **Testimonials**: Minimum 3 testimonials recommended for social proof
- **Pricing Scenarios**: Minimum 2 scenarios per plan type recommended
- **Trust Credentials**: All credentials should have verification URLs when available

## State Management

No client-side state management needed for content (static). Interactive state for new features:

- **Expandable Plan Details**: Which plan details are expanded (managed by component state or accordion)
- **Testimonial Carousel**: Current testimonial index (if using carousel)
- **Pricing Calculator**: User input state (age, coverage, etc.) for interactive calculator
- **Modal/Dialog State**: Open/closed state for detailed information modals

## Image Handling

- **Professional Headshots**: Store in `/public/images/` or use external URLs
- **Testimonial Photos**: Store in `/public/images/testimonials/` (with customer permission)
- **Fallback Images**: Use existing placeholder system

## No Database Required

This feature requires no database, API endpoints, or data persistence. All content is:
- Static (TypeScript constants)
- Version controlled (in code)
- Type-safe (TypeScript interfaces)
- Easy to update (edit constants file)
