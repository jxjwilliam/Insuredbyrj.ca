'use client'

import { ArrowRight } from 'lucide-react'
import { PlanCard } from '@/components/shared/plan-card'
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
      className="py-20 bg-gradient-to-br from-[var(--light-background-color)] via-white to-[var(--light-background-color)]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--dark-text-color)] mb-6 font-[var(--font-family-heading)]">
            {(() => {
              const title = t('insurancePlans.title', 'Life Insurance Plans for Every Need')
              const parts = title.split('Plans')
              return (
                <>
                  {parts[0]}
                  <span className="text-[var(--primary-color)]">Plans</span>
                  {parts[1]}
                </>
              )
            })()}
          </h2>
          <p className="text-lg text-[var(--gray-text-color)] leading-relaxed">
            {t('insurancePlans.description', 'From affordable term coverage to lifelong protection, we have the right plan to secure your family\'s financial future.')}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              detailedInfo={getDetailedInfo(plan.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-[var(--gray-text-color)] mb-4">
            {t('insurancePlans.ctaText', 'Not sure which plan is right for you?')}
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              openQuoteDialog()
            }}
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t('insurancePlans.ctaButton', 'Get Personalized Recommendations')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

