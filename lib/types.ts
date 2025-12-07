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
}

export interface ProcessStep {
  number: number
  title: string
  description: string
  timeIndicator: string
  icon: string
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

export interface LandingPageContent {
  hero: HeroSection
  trustIndicators: TrustIndicator[]
  whyChoose: WhyChooseSection
  insurancePlans: InsurancePlan[]
  howItWorks: HowItWorksSection
  whyBC: WhyBCSection
  faq: FAQItem[]
  navigation: NavigationItem[]
}

