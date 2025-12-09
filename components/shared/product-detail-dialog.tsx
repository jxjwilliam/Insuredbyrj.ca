'use client'

import { Check, ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { useQuoteDialog } from '@/components/shared/quote-dialog-provider'
import type { InsurancePlan, DetailedPlanInformation } from '@/lib/types'

/**
 * Get gradient colors and accent color for each plan type
 */
function getPlanColors(planId: string) {
  switch (planId) {
    case 'term-life':
      return {
        accentColor: 'text-[var(--primary-color)]',
      }
    case 'whole-life':
      return {
        accentColor: 'text-[var(--accent2-color)]',
      }
    case 'universal-life':
      return {
        accentColor: 'text-[var(--dark-text-color)]',
      }
    case 'critical-illness':
      return {
        accentColor: 'text-[#DC2626]',
      }
    default:
      return {
        accentColor: 'text-[var(--primary-color)]',
      }
  }
}

interface ProductDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: InsurancePlan
  detailedInfo?: DetailedPlanInformation
}

/**
 * Product detail dialog component displaying comprehensive plan information
 * Shows plan details, eligibility, exclusions, use cases, and features
 */
export function ProductDetailDialog({
  open,
  onOpenChange,
  plan,
  detailedInfo,
}: ProductDetailDialogProps) {
  const { openDialog: openQuoteDialog } = useQuoteDialog()
  const colors = getPlanColors(plan.id)

  // Parse price to format it like the card: "From $25/month"
  const priceMatch = plan.startingPrice.match(/^([^$]*)\$?([0-9]+)\/(.+)$/)
  const priceText = priceMatch ? priceMatch[1].trim() : 'From'
  const priceNumber = priceMatch ? priceMatch[2] : plan.startingPrice.replace(/[^0-9]/g, '')
  const priceUnit = priceMatch ? priceMatch[3] : 'month'

  const handleGetQuote = () => {
    onOpenChange(false)
    // Open quote dialog after a brief delay for smooth transition
    setTimeout(() => {
      openQuoteDialog()
    }, 200)
  }

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
            {plan.type} Insurance
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 pt-2">
            {plan.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Plan Image */}
          <div className="relative h-48 w-full rounded-lg overflow-hidden">
            <ImageWithFallback
              src={plan.imageUrl}
              alt={plan.imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm text-[var(--gray-text-color)]">Starting from</p>
              <p className={`text-3xl font-bold ${colors.accentColor} font-[var(--font-family-heading)]`}>
                {priceText} $<span>{priceNumber}</span><span className="text-base font-normal text-[var(--gray-text-color)]">/{priceUnit}</span>
              </p>
            </div>
            {plan.isPopular && (
              <Badge className="bg-[var(--accent2-color)] text-[var(--secondary-button-text-color)] px-4 py-2">
                Most Popular
              </Badge>
            )}
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-blue-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Information */}
          {detailedInfo && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Detailed Information</h3>
              {renderDetailedContent()}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <Button onClick={handleGetQuote} className="flex-1" size="lg">
              Get Your Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

