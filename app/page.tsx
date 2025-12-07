import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/sections/hero-section'
import { TrustIndicators } from '@/components/sections/trust-indicators'
import { WhyChooseSection } from '@/components/sections/why-choose'
import { InsurancePlansSection } from '@/components/sections/insurance-plans'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { WhyBCSection } from '@/components/sections/why-bc'
import { FAQSection } from '@/components/sections/faq-section'
import { landingPageContent } from '@/lib/constants'

/**
 * Main landing page component
 * Assembles all content sections in order
 */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header navigation={landingPageContent.navigation} />
      <HeroSection hero={landingPageContent.hero} />
      <TrustIndicators indicators={landingPageContent.trustIndicators} />
      <WhyChooseSection whyChoose={landingPageContent.whyChoose} />
      <InsurancePlansSection plans={landingPageContent.insurancePlans} />
      <HowItWorksSection howItWorks={landingPageContent.howItWorks} />
      <WhyBCSection whyBC={landingPageContent.whyBC} />
      <FAQSection faq={landingPageContent.faq} />
    </main>
  )
}

