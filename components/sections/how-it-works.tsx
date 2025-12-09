'use client'

import { Button } from '@/components/ui/button'
import { useContactDialog } from '@/components/shared/contact-dialog-provider'
import { useQuoteDialog } from '@/components/shared/quote-dialog-provider'
import { useProcessDetailDialog } from '@/components/shared/process-detail-dialog-provider'
import { useTranslation } from '@/lib/i18n/hooks'
import { ViewportAnimation } from '@/components/animations/viewport-animation'
import { GestureAnimation } from '@/components/animations/gesture-animation'
import { Clock, ClipboardCheck, Search, Shield, ArrowRight, Phone, Lock, Circle } from 'lucide-react'
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
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title.split(' ')[0]} <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
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
                    <div
                      className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 text-center"
                      data-testid="process-step"
                    >
                      <div className="relative inline-flex items-center justify-center mb-6">
                        {/* Icon Container - matching Why Choose style */}
                        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative">
                          <IconComponent className="text-2xl text-white" aria-hidden="true" />
                        </div>
                        {/* Step Number Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg z-20">
                          {stepNumber}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="inline-flex items-center text-sm text-primary font-semibold mb-6">
                        <Clock className="h-4 w-4 mr-2" />
                        {step.timeIndicator}
                      </div>

                      {/* View Detailed Information Button */}
                      {processDetail && (
                        <Button
                          onClick={() => openProcessDetailDialog(processDetail)}
                          variant="outline"
                          className="w-full min-h-[44px] border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          View Detailed Information
                        </Button>
                      )}
                    </div>
                  </GestureAnimation>
                </ViewportAnimation>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 benefits-card rounded-3xl p-8 lg:p-12 text-center relative shadow-2xl">
          <div className="absolute top-0 right-0 text-9xl text-white opacity-10 font-serif z-0 animate-infinity">
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
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={openContactDialog} variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 min-h-[44px]">
                <Phone className="mr-2 h-4 w-4" />
                Talk to Rajan
              </Button>
            </div>
            <p className="text-sm text-white mt-6 flex items-center flex-wrap gap-2">
              <Lock className="mr-2 h-4 w-4" />
              <span>No credit card required</span>
              <Circle className="h-1 w-1 fill-current mx-1" />
              <span>Free quotes</span>
              <Circle className="h-1 w-1 fill-current mx-1" />
              <span>No obligation</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

