'use client'

import { Button } from '@/components/ui/button'
import { PlanCard } from '@/components/shared/plan-card'
import { StaggerChildren } from '@/components/animations/stagger-children'
import { ViewportAnimation } from '@/components/animations/viewport-animation'
import { useTranslation } from '@/lib/i18n/hooks'
import { useQuoteDialog } from '@/components/shared/quote-dialog-provider'
import type { InsurancePlan, DetailedPlanInformation } from '@/lib/types'

interface InsurancePlansSectionProps {
  plans?: InsurancePlan[]
  detailedPlanInfo?: DetailedPlanInformation[]
}

/**
 * Insurance plans section component displaying all plan cards with detailed information
 * Uses translations from i18n system
 * @param plans - Optional array of insurance plan data (for backward compatibility)
 * @param detailedPlanInfo - Optional array of detailed plan information
 */
export function InsurancePlansSection({
  plans = [],
  detailedPlanInfo,
}: InsurancePlansSectionProps) {
  const { t } = useTranslation()
  const { openDialog: openQuoteDialog } = useQuoteDialog()
  
  const getDetailedInfo = (planId: string): DetailedPlanInformation | undefined => {
    return detailedPlanInfo?.find((info) => info.planId === planId)
  }

  return (
    <section
      id="plans"
      className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <ViewportAnimation direction="up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('insurancePlans.title', 'Life Insurance Plans for Every Need')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('insurancePlans.description', 'From affordable term coverage to lifelong protection, we have the right plan to secure your family\'s financial future.')}
            </p>
          </div>
        </ViewportAnimation>

        {/* Plans Grid */}
        <StaggerChildren staggerDelay={0.1} animation="fadeIn" whileInView={true}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                detailedInfo={getDetailedInfo(plan.id)}
              />
            ))}
          </div>
        </StaggerChildren>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            {t('insurancePlans.ctaText', 'Not sure which plan is right for you?')}
          </p>
          <Button onClick={openQuoteDialog} className="min-h-[44px]">
            {t('insurancePlans.ctaButton', 'Get Personalized Recommendations')}
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

