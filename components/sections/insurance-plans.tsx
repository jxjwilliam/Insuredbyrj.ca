import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlanCard } from '@/components/shared/plan-card'
import type { InsurancePlan } from '@/lib/types'

interface InsurancePlansSectionProps {
  plans: InsurancePlan[]
}

/**
 * Insurance plans section component displaying all plan cards
 * @param plans - Array of insurance plan data
 */
export function InsurancePlansSection({
  plans,
}: InsurancePlansSectionProps) {
  return (
    <section
      id="plans"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Life Insurance <span className="text-blue-500">Plans</span> for Every
            Need
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            From affordable term coverage to lifelong protection, we have the right
            plan to secure your family&apos;s financial future.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Not sure which plan is right for you?
          </p>
          <Button asChild>
            <Link href="/get-quote">
              Get Personalized Recommendations
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

