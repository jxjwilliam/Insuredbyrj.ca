import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { HeroSection } from '@/components/sections/hero-section'
import { TrustIndicators } from '@/components/sections/trust-indicators'
import { WhyChooseSection } from '@/components/sections/why-choose'
import { InsurancePlansSection } from '@/components/sections/insurance-plans'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { WhyBCSection } from '@/components/sections/why-bc'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { CompanyBackgroundSection } from '@/components/sections/company-background-section'
import { ClaimsProcessSection } from '@/components/sections/claims-process-section'
import { FAQSection } from '@/components/sections/faq-section'
import { ContactSection } from '@/components/sections/contact-section'
import { landingPageContent } from '@/lib/constants'
import { getSupportedLanguages } from '@/lib/i18n/config'

/**
 * Generate static params for all supported locales
 */
export async function generateStaticParams() {
  const supportedLocales = getSupportedLanguages().map((lang) => lang.code)
  return supportedLocales.map((locale) => ({
    locale,
  }))
}

interface HomePageProps {
  params: Promise<{ locale: string }>
}

/**
 * Main landing page component
 * Assembles all content sections in order
 * Components now use translations via useTranslation() hook
 * Receives locale from URL params
 */
export default async function HomePage({ params }: HomePageProps) {
  // Locale is handled by layout, not needed here but kept for future use
  await params
  return (
    <main id="main-content" className="min-h-screen">
      <Header navigation={landingPageContent.navigation} />
      <HeroSection />
      <TrustIndicators
        indicators={landingPageContent.trustIndicators}
        credentials={landingPageContent.trustCredentials}
        showDetails={true}
      />
      <WhyChooseSection whyChoose={landingPageContent.whyChoose} />
      <InsurancePlansSection
        plans={landingPageContent.insurancePlans}
        detailedPlanInfo={landingPageContent.detailedPlanInfo}
      />
      <HowItWorksSection
        howItWorks={landingPageContent.howItWorks}
        processDetails={landingPageContent.processDetails}
      />
      {landingPageContent.testimonials && landingPageContent.testimonials.length > 0 && (
        <TestimonialsSection testimonials={landingPageContent.testimonials} />
      )}
      {landingPageContent.pricingScenarios &&
        landingPageContent.pricingScenarios.length > 0 && (
          <PricingSection
            scenarios={landingPageContent.pricingScenarios}
            plans={landingPageContent.insurancePlans}
          />
        )}
      {landingPageContent.companyBackground && (
        <CompanyBackgroundSection
          background={landingPageContent.companyBackground}
          showImage={true}
        />
      )}
      {landingPageContent.claimsProcess && (
        <ClaimsProcessSection claimsInfo={landingPageContent.claimsProcess} />
      )}
      <WhyBCSection whyBC={landingPageContent.whyBC} />
      <NewsletterSection />
      <FAQSection faq={landingPageContent.faq} />
      <ContactSection />
      <Footer />
    </main>
  )
}


