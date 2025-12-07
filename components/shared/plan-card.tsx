'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { ExpandableContent } from '@/components/shared/expandable-content'
import type { InsurancePlan, DetailedPlanInformation } from '@/lib/types'

interface PlanCardProps {
  plan: InsurancePlan
  detailedInfo?: DetailedPlanInformation
}

/**
 * Insurance plan card component displaying plan details with expandable detailed information
 * @param plan - Insurance plan data
 * @param detailedInfo - Optional detailed plan information
 */
export function PlanCard({ plan, detailedInfo }: PlanCardProps) {
  const renderDetailedContent = () => {
    if (!detailedInfo) return null

    return (
      <div className="space-y-6 pt-4">
        {/* Coverage Range */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Coverage Range</h4>
          <p className="text-sm text-muted-foreground">
            {detailedInfo.coverageRange.min} - {detailedInfo.coverageRange.max}
          </p>
        </div>

        <Separator />

        {/* Eligibility */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Eligibility</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            {detailedInfo.eligibility.minAge && detailedInfo.eligibility.maxAge && (
              <p>
                Age: {detailedInfo.eligibility.minAge} - {detailedInfo.eligibility.maxAge} years
              </p>
            )}
            {detailedInfo.eligibility.healthRequirements.length > 0 && (
              <div>
                <p className="font-medium mb-1">Health Requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {detailedInfo.eligibility.healthRequirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            {detailedInfo.eligibility.occupationRestrictions &&
              detailedInfo.eligibility.occupationRestrictions.length > 0 && (
                <div>
                  <p className="font-medium mb-1">Occupation Restrictions:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    {detailedInfo.eligibility.occupationRestrictions.map((restriction, idx) => (
                      <li key={idx}>{restriction}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>

        <Separator />

        {/* Exclusions */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Exclusions</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
            {detailedInfo.exclusions.map((exclusion, idx) => (
              <li key={idx}>{exclusion}</li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Use Cases */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Best For</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
            {detailedInfo.useCases.map((useCase, idx) => (
              <li key={idx}>{useCase}</li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Comparison Points */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Plan Characteristics</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">
              Affordability: {detailedInfo.comparisonPoints.affordability}
            </Badge>
            <Badge variant="outline">
              Flexibility: {detailedInfo.comparisonPoints.flexibility}
            </Badge>
            {detailedInfo.comparisonPoints.cashValue && (
              <Badge variant="outline">Cash Value</Badge>
            )}
            {detailedInfo.comparisonPoints.termLength && (
              <Badge variant="outline">{detailedInfo.comparisonPoints.termLength}</Badge>
            )}
          </div>
        </div>

        {/* Additional Features */}
        {detailedInfo.additionalFeatures && detailedInfo.additionalFeatures.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm mb-2">Additional Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                {detailedInfo.additionalFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <Card
      className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      data-testid="plan-card"
    >
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <ImageWithFallback
          src={plan.imageUrl}
          alt={plan.imageAlt}
          fill
          className="object-cover opacity-80"
        />
        {plan.isPopular && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Most Popular
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{plan.type}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="text-3xl font-bold text-blue-500 mt-4">
          {plan.startingPrice}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mt-1 mr-2">✓</span>
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Detailed Information Section */}
        {detailedInfo && (
          <div className="mb-6">
            <ExpandableContent
              title="View Detailed Information"
              summary="Coverage ranges, eligibility, exclusions, and more"
              content={renderDetailedContent()}
              variant="collapsible"
            />
          </div>
        )}

        <Button asChild className="w-full">
          <Link href={plan.ctaLink}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  )
}


