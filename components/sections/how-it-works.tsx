import { Button } from '@/components/ui/button'
import type { HowItWorksSection as HowItWorksSectionType } from '@/lib/types'

interface HowItWorksSectionProps {
  howItWorks: HowItWorksSectionType
}

/**
 * How It Works section component displaying three-step process
 * @param howItWorks - How It Works section content data
 */
export function HowItWorksSection({
  howItWorks,
}: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      {/* Background Infinity Pattern */}
      <div className="absolute top-10 right-10 text-[10rem] text-blue-500 opacity-5 font-serif">
        ∞
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="text-blue-500">Works</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {howItWorks.description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-500 to-blue-500 transform -translate-y-1/2 z-0" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {howItWorks.steps.map((step) => (
              <div key={step.number} className="group text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  {/* Circle Background */}
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span className="text-3xl text-white">📋</span>
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-20">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="inline-flex items-center text-sm text-blue-500 font-semibold">
                  <span className="mr-2">⏱️</span>
                  {step.timeIndicator}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 text-9xl text-white opacity-5 font-serif">
            ∞
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Protect Your Family?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join over 10,000 British Columbia families who trust us with their
              life insurance. Start your free quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="/get-quote">
                  Start Your Free Quote
                  <span className="ml-2">→</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900">
                <a href="/contact">
                  <span className="mr-2">📞</span>
                  Talk to Rajan
                </a>
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              <span className="mr-2">🔒</span>
              No credit card required • Free quotes • No obligation
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

