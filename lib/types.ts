/**
 * TypeScript type definitions for landing page content entities
 */

export interface CTAButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: string
}

export interface TrustIndicator {
  value: string
  label: string
  color?: string
  credentialId?: string // References TrustCredential (optional for backward compatibility)
}

export interface HeroSection {
  headline: string
  subheadline: string
  primaryCTA: CTAButton
  secondaryCTA: CTAButton
  trustMicrocopy: string[]
  imageUrl: string
  imageAlt: string
}

export interface BenefitPoint {
  title: string
  description: string
  icon: string
  color?: string
}

export interface WhyChooseSection {
  title: string
  description: string
  benefits: BenefitPoint[]
}

export interface InsurancePlan {
  id: string
  type: string
  description: string
  startingPrice: string
  features: string[]
  imageUrl: string
  imageAlt: string
  ctaLink: string
  isPopular?: boolean
  color?: string
  detailedInfoId?: string // References DetailedPlanInformation (optional for backward compatibility)
}

export interface ProcessStep {
  number: number
  title: string
  description: string
  timeIndicator: string
  icon: string
  detailId?: string // References ProcessDetail (optional for backward compatibility)
}

export interface HowItWorksSection {
  title: string
  description: string
  steps: ProcessStep[]
}

export interface ValueProposition {
  title: string
  description: string
  icon: string
}

export interface Statistic {
  value: string
  label: string
}

export interface WhyBCSection {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  valuePropositions: ValueProposition[]
  statistics?: Statistic[]
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface NavigationItem {
  label: string
  href: string
  isAnchor?: boolean
}

// New detailed content interfaces
export interface DetailedPlanInformation {
  planId: string // References InsurancePlan.id
  coverageRange: {
    min: string // e.g., "$100,000"
    max: string // e.g., "$5,000,000"
  }
  eligibility: {
    minAge?: number
    maxAge?: number
    healthRequirements: string[]
    occupationRestrictions?: string[]
  }
  exclusions: string[] // What is not covered
  useCases: string[] // Real-world scenarios where plan is appropriate
  comparisonPoints: {
    affordability: 'low' | 'medium' | 'high'
    flexibility: 'low' | 'medium' | 'high'
    cashValue: boolean
    termLength?: string // For term life
  }
  additionalFeatures?: string[] // Optional features
}

export interface TrustCredential {
  id: string
  type: 'certification' | 'license' | 'membership' | 'award' | 'partnership'
  title: string // e.g., "BC Insurance License"
  issuer: string // e.g., "Insurance Council of British Columbia"
  description?: string // Additional details
  verificationUrl?: string // Link to verify credential
  icon?: string // Icon identifier
  badge?: string // Badge text (e.g., "A+ Rating")
}

export interface Testimonial {
  id: string
  customerName: string // Full name or initials
  location: string // City, BC
  situation: string // Customer's situation (e.g., "New parent looking for term life")
  experience: string // Detailed account of experience
  outcome: string // Result/benefit received
  rating?: number // 1-5 stars
  date?: string // Date of testimonial
  imageUrl?: string // Optional customer photo (with permission)
  verified?: boolean // Whether testimonial is verified
}

export interface PricingScenario {
  id: string
  planId: string // References InsurancePlan.id
  profile: {
    age: number
    gender?: 'male' | 'female' | 'other'
    healthStatus: 'excellent' | 'good' | 'fair' | 'pre-existing'
    coverageAmount: string // e.g., "$500,000"
    termLength?: string // For term life (e.g., "20 years")
  }
  monthlyPremium: string // e.g., "$45/month"
  annualPremium: string // e.g., "$540/year"
  notes?: string // Additional pricing notes
  disclaimer: string // Standard disclaimer about representative pricing
}

export interface CompanyBackground {
  companyName: string // "InsureLine Brokers (Infinity)"
  ownerName: string // "Rajan Thind"
  ownerTitle: string // "Owner & Insurance Advisor"
  biography: string // 150-200 word personal bio
  philosophy: string // Company philosophy/approach
  experience: {
    years: number // Years of experience
    specialties: string[] // Areas of expertise
    certifications: string[] // Professional certifications
  }
  location: {
    address: string // "7155 120 Street"
    city: string // "Delta"
    province: string // "BC"
    postalCode: string // "V4E 2B1"
    fullAddress: string // Full formatted address
  }
  brandAffiliation?: {
    name: string // "InsureLine"
    type: string // "Franchisee"
    benefits: string[] // Benefits of affiliation
  }
  values: string[] // Company values
  differentiators: string[] // What makes company unique
  imageUrl?: string // Professional headshot URL
}

export interface ProcessDetail {
  stepNumber: number // References ProcessStep.number
  subSteps: {
    title: string
    description: string
    timeRequired?: string // e.g., "5 minutes"
    requiredDocuments?: string[] // Documents needed
    questions?: string[] // Example questions asked
  }[]
  medicalExamInfo?: {
    required: boolean
    description: string
    scheduling: string // How to schedule
    whatToExpect: string[] // What happens during exam
  }
  postApplication: {
    timeline: string // Expected timeline
    nextSteps: string[] // What happens after submission
    contactInfo: string // Who to contact
  }
}

export interface ClaimsProcessInfo {
  howToFile: {
    steps: string[] // Step-by-step process
    contactMethods: {
      phone: string
      email: string
      online?: string // Online portal URL
    }
    requiredDocuments: string[] // Documents needed to file claim
  }
  timeline: {
    initialFiling: string // Time to file
    review: string // Review period
    approval: string // Approval timeline
    payout: string // Payout timeline
  }
  whatToExpect: string[] // What happens during claims process
  support: {
    available: boolean
    description: string // How company supports during claims
    contactInfo: string
  }
}

export interface ContactDetails {
  phone: {
    primary: string // "778-830-0142"
    secondary?: string // Optional secondary number
    tollFree?: string // Optional toll-free number
  }
  email: {
    primary: string // "infinity@insureline.com"
    general?: string // Optional general inquiry email
  }
  address: {
    street: string // "7155 120 Street"
    city: string // "Delta"
    province: string // "BC"
    postalCode: string // "V4E 2B1"
    fullAddress: string // Full formatted address
  }
  officeHours: {
    weekdays: string // e.g., "Monday - Friday: 9:00 AM - 5:00 PM"
    saturday?: string // Optional Saturday hours
    sunday?: string // Optional Sunday hours
  }
  responseTimes: {
    phone: string // e.g., "Within 24 hours"
    email: string // e.g., "Within 48 hours"
    preferred: string // Preferred contact method
  }
  socialMedia?: {
    linkedIn?: string // LinkedIn profile URL
    facebook?: string // Facebook page URL
    instagram?: string // Instagram handle
  }
}

export interface ServiceArea {
  primary: string[] // Primary cities (e.g., ["Surrey", "Delta"])
  secondary?: string[] // Secondary cities (e.g., ["Abbotsford", "Langley"])
  province: string // "British Columbia" or "BC"
  description?: string // Service area description
}

export interface LandingPageContent {
  hero: HeroSection
  trustIndicators: TrustIndicator[]
  whyChoose: WhyChooseSection
  insurancePlans: InsurancePlan[]
  howItWorks: HowItWorksSection
  whyBC: WhyBCSection
  faq: FAQItem[]
  navigation: NavigationItem[]
  // New detailed content fields (optional for backward compatibility)
  detailedPlanInfo?: DetailedPlanInformation[]
  trustCredentials?: TrustCredential[]
  testimonials?: Testimonial[]
  pricingScenarios?: PricingScenario[]
  companyBackground?: CompanyBackground
  processDetails?: ProcessDetail[]
  claimsProcess?: ClaimsProcessInfo
  contactDetails?: ContactDetails
  serviceAreas?: ServiceArea
}

// Footer and common features types
export interface SocialMediaLink {
  platform: 'facebook' | 'twitter' | 'linkedin'
  url: string
  label: string
}

export interface LegalLink {
  label: string
  href: string
}

export interface NewsletterFormConfig {
  placeholder: string
  buttonText: string
  successMessage: string
  errorMessage: string
  duplicateMessage: string
}

export interface FooterContent {
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

export interface NewsletterSubscription {
  email: string
  subscriptionStatus: 'pending' | 'success' | 'error' | 'duplicate'
  subscriptionTimestamp?: Date
  errorMessage?: string
}

export interface GoogleMapConfig {
  apiKey: string
  center: { lat: number; lng: number }
  zoom: number
  markerPosition: { lat: number; lng: number }
  markerTitle: string
  mapTypeId: 'roadmap' | 'satellite' | 'hybrid' | 'terrain'
}


