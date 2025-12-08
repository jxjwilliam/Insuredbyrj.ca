'use client'

import { Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { useProductDialog } from '@/components/shared/product-dialog-provider'
import { Card3D } from '@/components/ui/3d-card'
import { GestureAnimation } from '@/components/animations/gesture-animation'
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
  const { openDialog } = useProductDialog()

  const handleLearnMore = () => {
    openDialog(plan, detailedInfo)
  }

  return (
    <Card3D intensity={10}>
      <GestureAnimation gesture="hover" hoverScale={1.02}>
        <Card
          className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full"
          data-testid="plan-card"
        >
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <ImageWithFallback
          src={plan.imageUrl}
          alt={plan.imageAlt || `${plan.type} insurance plan`}
          fill
          className="object-cover opacity-80"
          aria-hidden="false"
        />
        {plan.isPopular && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Most Popular
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-2xl" id={`plan-${plan.id}-title`}>{plan.type}</CardTitle>
        <CardDescription id={`plan-${plan.id}-description`}>{plan.description}</CardDescription>
        <div className="text-3xl font-bold text-blue-500 mt-4">
          {plan.startingPrice}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="text-blue-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <Button 
          onClick={handleLearnMore} 
          className="w-full min-h-[44px]"
          aria-label={`Learn more about ${plan.type} insurance plan`}
          aria-describedby={`plan-${plan.id}-title plan-${plan.id}-description`}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
      </GestureAnimation>
    </Card3D>
  )
}


