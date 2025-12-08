'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useContactDialog } from '@/components/shared/contact-dialog-provider'
import { useQuoteDialog } from '@/components/shared/quote-dialog-provider'
import { useProcessDetailDialog } from '@/components/shared/process-detail-dialog-provider'
import { useTranslation } from '@/lib/i18n/hooks'
import { ViewportAnimation } from '@/components/animations/viewport-animation'
import { GestureAnimation } from '@/components/animations/gesture-animation'
import { Clock, ClipboardCheck, Search, Shield } from 'lucide-react'
import type {
  HowItWorksSection as HowItWorksSectionType,
  ProcessDetail,
} from '@/lib/types'

interface HowItWorksSectionProps {
  howItWorks?: HowItWorksSectionType
  processDetails?: ProcessDetail[]
}

/**
 * Enhanced How It Works section component displaying three-step process with detailed information
 * Uses translations from i18n system
 * @param howItWorks - Optional How It Works section content data (for backward compatibility)
 * @param processDetails - Optional array of detailed process information
 */
export function HowItWorksSection({
  howItWorks,
  processDetails,
}: HowItWorksSectionProps) {
  const { openDialog: openContactDialog } = useContactDialog()
  const { openDialog: openQuoteDialog } = useQuoteDialog()
  const { openDialog: openProcessDetailDialog } = useProcessDetailDialog()
  const { t } = useTranslation()
  
  const stepIcons = [ClipboardCheck, Search, Shield]
  
  // Get translations for section header
  const title = t('howItWorks.title', howItWorks?.title || 'How It Works')
  const description = t('howItWorks.description', howItWorks?.description || 'Getting life insurance shouldn\'t be complicated.')
  
  // Get translations for steps
  const steps = [
    {
      title: t('howItWorks.steps.step1.title', howItWorks?.steps?.[0]?.title || 'Share Your Needs'),
      description: t('howItWorks.steps.step1.description', howItWorks?.steps?.[0]?.description || 'Tell us about yourself...'),
      timeIndicator: t('howItWorks.steps.step1.timeIndicator', howItWorks?.steps?.[0]?.timeIndicator || '2 minutes'),
    },
    {
      title: t('howItWorks.steps.step2.title', howItWorks?.steps?.[1]?.title || 'Get Instant Quotes'),
      description: t('howItWorks.steps.step2.description', howItWorks?.steps?.[1]?.description || 'Receive personalized quotes...'),
      timeIndicator: t('howItWorks.steps.step2.timeIndicator', howItWorks?.steps?.[1]?.timeIndicator || 'Instant results'),
    },
    {
      title: t('howItWorks.steps.step3.title', howItWorks?.steps?.[2]?.title || 'Get Protected'),
      description: t('howItWorks.steps.step3.description', howItWorks?.steps?.[2]?.description || 'Complete your application...'),
      timeIndicator: t('howItWorks.steps.step3.timeIndicator', howItWorks?.steps?.[2]?.timeIndicator || 'Same-day coverage'),
    },
  ]
  const getProcessDetail = (stepNumber: number): ProcessDetail | undefined => {
    return processDetails?.find((detail) => detail.stepNumber === stepNumber)
  }
  return (
    <section id="how-it-works" className="py-16 bg-white relative overflow-hidden">
      {/* Background Infinity Pattern */}
      <div className="absolute top-10 right-10 text-[10rem] text-blue-500 opacity-5 font-serif">
        ∞
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title.split(' ')[0]} <span className="text-blue-500">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line - positioned to connect icons, not through text */}
          <div className="hidden lg:block absolute top-[120px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500 via-amber-500 to-blue-500 z-0" />

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {steps.map((step, stepIndex) => {
              const stepNumber = stepIndex + 1
              const processDetail = getProcessDetail(stepNumber)
              const IconComponent = stepIcons[stepIndex] || ClipboardCheck
              return (
                <ViewportAnimation
                  key={stepNumber}
                  direction="up"
                  delay={stepIndex * 0.2}
                  duration={0.6}
                >
                  <GestureAnimation gesture="hover" hoverScale={1.05}>
                    <Card
                      className="group text-center border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-xl"
                      data-testid="process-step"
                    >
                  <CardContent className="p-6">
                    <div className="relative inline-flex items-center justify-center mb-6">
                      {/* Circle Background */}
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-20">
                        {stepNumber}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center text-sm text-blue-500 font-semibold mb-6">
                      <Clock className="h-4 w-4 mr-2" />
                      {step.timeIndicator}
                    </div>

                    {/* View Detailed Information Button */}
                    {processDetail && (
                      <Button
                        onClick={() => openProcessDetailDialog(processDetail)}
                        variant="outline"
                        className="w-full min-h-[44px]"
                      >
                        View Detailed Information
                      </Button>
                    )}
                  </CardContent>
                    </Card>
                  </GestureAnimation>
                </ViewportAnimation>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 text-9xl text-white opacity-10 font-serif">
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
              <Button onClick={openQuoteDialog} size="lg" className="min-h-[44px]">
                Start Your Free Quote
                <span className="ml-2">→</span>
              </Button>
              <Button onClick={openContactDialog} variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 min-h-[44px]">
                <span className="mr-2">📞</span>
                Talk to Rajan
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

