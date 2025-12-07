'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PricingCalculator } from '@/components/shared/pricing-calculator'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { PricingScenario, InsurancePlan } from '@/lib/types'
import { landingPageContent } from '@/lib/constants'

interface PricingSectionProps {
  scenarios: PricingScenario[]
  plans?: InsurancePlan[]
  title?: string // Section title (default: "Pricing Examples")
  className?: string
}

/**
 * Component for displaying detailed pricing information with examples
 * @param scenarios - Array of pricing scenario data
 * @param plans - Optional array of insurance plans for tabs
 * @param title - Section title
 * @param className - Additional CSS classes
 */
export function PricingSection({
  scenarios,
  plans,
  title = 'Pricing Examples',
  className,
}: PricingSectionProps) {
  // Get plans from constants if not provided
  const displayPlans = plans || landingPageContent.insurancePlans

  // Group scenarios by plan
  const scenariosByPlan = displayPlans.map((plan) => ({
    plan,
    planScenarios: scenarios.filter((s) => s.planId === plan.id),
  }))

  const pricingFactors = [
    {
      factor: 'Age',
      description:
        'Younger applicants typically receive lower premiums. Premiums increase with age as risk increases.',
      impact: 'High',
    },
    {
      factor: 'Health Status',
      description:
        'Excellent health results in the best rates. Pre-existing conditions may increase premiums but coverage is still available.',
      impact: 'High',
    },
    {
      factor: 'Coverage Amount',
      description:
        'Higher coverage amounts result in higher premiums. The relationship is generally proportional.',
      impact: 'High',
    },
    {
      factor: 'Term Length',
      description:
        'For term life, longer terms (30 years) cost more than shorter terms (10 years) for the same coverage.',
      impact: 'Medium',
    },
    {
      factor: 'Lifestyle',
      description:
        'Smoking, high-risk hobbies, and certain occupations can increase premiums. Non-smokers receive better rates.',
      impact: 'Medium',
    },
    {
      factor: 'Gender',
      description:
        'Statistically, women tend to receive slightly lower premiums due to longer life expectancy.',
      impact: 'Low',
    },
  ]

  return (
    <section
      id="pricing"
      className={`py-16 bg-white ${className || ''}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Get an idea of what life insurance costs with these representative
            pricing examples. Your actual premium will be based on your specific
            circumstances.
          </p>
        </div>

        {/* Pricing by Plan Type */}
        <Tabs defaultValue={displayPlans[0]?.id} className="mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {scenariosByPlan.map(({ plan, planScenarios }) => {
              if (planScenarios.length === 0) return null
              return (
                <TabsTrigger
                  key={plan.id}
                  value={plan.id}
                  disabled={planScenarios.length === 0}
                >
                  {plan.type}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {scenariosByPlan.map(({ plan, planScenarios }) => {
            if (planScenarios.length === 0) return null
            return (
              <TabsContent key={plan.id} value={plan.id}>
                <PricingCalculator
                  planId={plan.id}
                  scenarios={planScenarios}
                  showDisclaimer={true}
                />
              </TabsContent>
            )
          })}
        </Tabs>

        {/* Pricing Factors */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            What Affects Your Premium?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingFactors.map((factor, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{factor.factor}</h4>
                    <Badge
                      variant={
                        factor.impact === 'High'
                          ? 'destructive'
                          : factor.impact === 'Medium'
                            ? 'default'
                            : 'secondary'
                      }
                    >
                      {factor.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {factor.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">What&apos;s Included in Your Premium?</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">✓ Included:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Death benefit coverage</li>
                <li>Policy administration</li>
                <li>Underwriting and risk assessment</li>
                <li>Customer support</li>
                <li>Claims processing</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Additional Costs (if applicable):</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Medical exam fees (if required)</li>
                <li>Policy riders (optional add-ons)</li>
                <li>Late payment fees (if applicable)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
