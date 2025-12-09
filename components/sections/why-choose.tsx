'use client'

import { useTranslation } from '@/lib/i18n/hooks'
import { HeartPulse, Wallet, Users, Clock, Shield, Lock, Award } from 'lucide-react'
import { ViewportAnimation } from '@/components/animations/viewport-animation'
import { GestureAnimation } from '@/components/animations/gesture-animation'
import { Badge } from '@/components/ui/badge'
import { landingPageContent } from '@/lib/constants'
import type { WhyChooseSection as WhyChooseSectionType } from '@/lib/types'

interface WhyChooseSectionProps {
  whyChoose?: WhyChooseSectionType
}

/**
 * Why Choose section component displaying four benefit points
 * Uses translations from i18n system
 * @param whyChoose - Optional Why Choose section content data (for backward compatibility)
 */
export function WhyChooseSection({ whyChoose }: WhyChooseSectionProps) {
  const { t } = useTranslation()
  
  // Get translations or fallback to props
  const title = t('whyChoose.title', whyChoose?.title || 'Why Choose Insured by Rajan')
  const description = t('whyChoose.description', whyChoose?.description || 'We\'re not just another insurance broker.')
  
  // Icon mapping
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'heart-pulse': HeartPulse,
    'hand-holding-dollar': Wallet,
    'users': Users,
    'clock': Clock,
  }
  
  // Color scheme - alternating between primary (blue) and accent (amber/orange)
  const colorSchemes = [
    { bg: 'bg-primary', icon: HeartPulse },
    { bg: 'bg-amber-500', icon: Wallet },
    { bg: 'bg-primary', icon: Users },
    { bg: 'bg-amber-500', icon: Clock },
  ]
  
  // Translate benefits
  const benefits = [
    {
      title: t('whyChoose.benefits.bcLicensed.title', whyChoose?.benefits?.[0]?.title || 'BC-Licensed Expert'),
      description: t('whyChoose.benefits.bcLicensed.description', whyChoose?.benefits?.[0]?.description || 'Fully licensed and regulated...'),
      icon: whyChoose?.benefits?.[0]?.icon || 'heart-pulse',
    },
    {
      title: t('whyChoose.benefits.transparentPricing.title', whyChoose?.benefits?.[1]?.title || 'Transparent Pricing'),
      description: t('whyChoose.benefits.transparentPricing.description', whyChoose?.benefits?.[1]?.description || 'No hidden fees...'),
      icon: whyChoose?.benefits?.[1]?.icon || 'hand-holding-dollar',
    },
    {
      title: t('whyChoose.benefits.familyFirst.title', whyChoose?.benefits?.[2]?.title || 'Family-First Approach'),
      description: t('whyChoose.benefits.familyFirst.description', whyChoose?.benefits?.[2]?.description || 'We treat every client...'),
      icon: whyChoose?.benefits?.[2]?.icon || 'users',
    },
    {
      title: t('whyChoose.benefits.fastSimple.title', whyChoose?.benefits?.[3]?.title || 'Fast & Simple Process'),
      description: t('whyChoose.benefits.fastSimple.description', whyChoose?.benefits?.[3]?.description || 'Get a quote in minutes...'),
      icon: whyChoose?.benefits?.[3]?.icon || 'clock',
    },
  ]
  
  return (
    <section id="why-choose" className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title.split('Insured by Rajan')[0]}
            <span className="text-primary">Insured by Rajan</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Certifications Section - Left Side */}
        {landingPageContent.companyBackground?.experience?.certifications &&
          landingPageContent.companyBackground.experience.certifications.length > 0 && (
            <div className="max-w-6xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-primary/5 to-white rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  Certifications & Credentials
                </h3>
                <div className="flex flex-wrap gap-3">
                  {landingPageContent.companyBackground.experience.certifications.map((cert, idx) => (
                    <ViewportAnimation
                      key={idx}
                      direction="up"
                      delay={idx * 0.05}
                      duration={0.3}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-300 px-5 py-2.5 text-sm font-semibold shadow-md cursor-default"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        {cert}
                      </Badge>
                    </ViewportAnimation>
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || colorSchemes[index].icon
            const colorScheme = colorSchemes[index]
            
            return (
              <ViewportAnimation
                key={index}
                direction="up"
                delay={index * 0.1}
                duration={0.6}
              >
                <GestureAnimation gesture="hover" hoverScale={1.05}>
                  <div
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                  >
                <div className={`w-16 h-16 ${colorScheme.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="text-2xl text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </GestureAnimation>
              </ViewportAnimation>
            )
          })}
        </div>

        {/* Trust Badge Bar */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">
                  Licensed in BC
                </div>
                <div className="text-xs text-gray-600">Fully Regulated</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="flex items-center space-x-3">
              <Lock className="h-8 w-8 text-primary" />
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">
                  Secure & Private
                </div>
                <div className="text-xs text-gray-600">Your Data Protected</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-primary" />
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">
                  Award-Winning Service
                </div>
                <div className="text-xs text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


