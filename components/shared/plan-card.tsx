'use client'

import { CheckCircle2 } from 'lucide-react'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { useProductDialog } from '@/components/shared/product-dialog-provider'
import type { InsurancePlan, DetailedPlanInformation } from '@/lib/types'

interface PlanCardProps {
  plan: InsurancePlan
  detailedInfo?: DetailedPlanInformation
}

/**
 * Get gradient colors and accent color for each plan type
 */
function getPlanColors(planId: string) {
  switch (planId) {
    case 'term-life':
      return {
        gradient: 'from-[var(--primary-color)] to-[var(--accent-color)]',
        accentColor: 'text-[var(--primary-color)]',
        buttonBg: 'bg-[var(--primary-color)]',
        buttonHover: 'hover:bg-[var(--primary-button-hover-bg-color)]',
      }
    case 'whole-life':
      return {
        gradient: 'from-[var(--accent2-color)] to-[#D4AF37]',
        accentColor: 'text-[var(--accent2-color)]',
        buttonBg: 'bg-[var(--accent2-color)]',
        buttonHover: 'hover:bg-[var(--secondary-button-hover-bg-color)]',
      }
    case 'universal-life':
      return {
        gradient: 'from-[var(--dark-background-color)] to-[#334155]',
        accentColor: 'text-[var(--dark-text-color)]',
        buttonBg: 'bg-[var(--dark-background-color)]',
        buttonHover: 'hover:bg-[var(--dark-text-color)]',
      }
    case 'critical-illness':
      return {
        gradient: 'from-[#DC2626] to-[#991B1B]',
        accentColor: 'text-[#DC2626]',
        buttonBg: 'bg-[#DC2626]',
        buttonHover: 'hover:bg-[#991B1B]',
      }
    default:
      return {
        gradient: 'from-[var(--primary-color)] to-[var(--accent-color)]',
        accentColor: 'text-[var(--primary-color)]',
        buttonBg: 'bg-[var(--primary-color)]',
        buttonHover: 'hover:bg-[var(--primary-button-hover-bg-color)]',
      }
  }
}

/**
 * Insurance plan card component matching reference design
 * @param plan - Insurance plan data
 * @param detailedInfo - Optional detailed plan information
 */
export function PlanCard({ plan, detailedInfo }: PlanCardProps) {
  const { openDialog } = useProductDialog()
  const colors = getPlanColors(plan.id)
  
  // Parse price to format it like reference: "From $25/month"
  const priceMatch = plan.startingPrice.match(/^([^$]*)\$?([0-9]+)\/(.+)$/)
  const priceText = priceMatch ? priceMatch[1].trim() : 'From'
  const priceNumber = priceMatch ? priceMatch[2] : plan.startingPrice.replace(/[^0-9]/g, '')
  const priceUnit = priceMatch ? priceMatch[3] : 'month'

  const handleLearnMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    openDialog(plan, detailedInfo)
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[var(--light-border-color)] h-full flex flex-col">
      {/* Image Section with Gradient Overlay */}
      <div className={`relative h-48 bg-gradient-to-br ${colors.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <ImageWithFallback
          src={plan.imageUrl}
          alt={plan.imageAlt || `${plan.type} insurance plan`}
          fill
          className="object-cover opacity-80"
          aria-hidden="false"
        />
        {plan.isPopular && (
          <div className="absolute top-4 left-4 bg-[var(--accent2-color)] text-[var(--secondary-button-text-color)] px-3 py-1 rounded-full text-xs font-bold">
            Most Popular
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className={`text-2xl font-bold text-[var(--dark-text-color)] mb-2 font-[var(--font-family-heading)]`}>
          {plan.type}
        </h3>
        <p className="text-sm text-[var(--gray-text-color)] mb-4">
          {plan.description}
        </p>
        
        {/* Price */}
        <div className={`text-3xl font-bold ${colors.accentColor} mb-4`}>
          {priceText} $<span>{priceNumber}</span><span className="text-base font-normal text-[var(--gray-text-color)]">/{priceUnit}</span>
        </div>

        {/* Features List */}
        <ul className="space-y-2 mb-6 flex-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className={`${colors.accentColor} mt-1 mr-2 h-4 w-4 flex-shrink-0`} />
              <span className="text-sm text-[var(--gray-text-color)]">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Learn More Link */}
        <a
          href={plan.ctaLink || '#'}
          onClick={handleLearnMore}
          className={`block w-full text-center px-6 py-3 ${colors.buttonBg} text-white rounded-lg font-semibold ${colors.buttonHover} transition-all duration-300`}
          aria-label={`Learn more about ${plan.type} insurance plan`}
        >
          Learn More
        </a>
      </div>
    </div>
  )
}
