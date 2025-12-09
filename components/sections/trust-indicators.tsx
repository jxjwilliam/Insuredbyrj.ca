'use client'

import { Shield, Building2, Award, Calendar, MapPin, Handshake, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { AnimatedSection } from '@/components/shared/animated-section'
import { useTranslation } from '@/lib/i18n/hooks'
import { parseFormattedNumber, formatNumberForDisplay } from '@/lib/utils'
import type { TrustIndicator, TrustCredential } from '@/lib/types'

interface TrustIndicatorsProps {
  indicators: TrustIndicator[]
  credentials?: TrustCredential[]
  showDetails?: boolean
}

/**
 * Enhanced trust indicators component displaying statistics and detailed credentials
 * @param indicators - Array of trust indicator data
 * @param credentials - Optional array of detailed trust credentials
 * @param showDetails - Whether to show detailed credential information
 */
export function TrustIndicators({
  indicators,
  credentials,
  showDetails = true,
}: TrustIndicatorsProps) {
  const { t } = useTranslation()
  
  const getCredentialById = (id?: string): TrustCredential | undefined => {
    if (!id || !credentials) return undefined
    return credentials.find((cred) => cred.id === id)
  }
  
  // Translate indicator labels
  const translateLabel = (label: string): string => {
    const labelMap: Record<string, string> = {
      'Financial Strength': 'trustIndicators.financialStrength',
      'Families Protected': 'trustIndicators.familiesProtected',
      'Years of Service': 'trustIndicators.yearsOfService',
    }
    const key = labelMap[label]
    return key ? t(key, label) : label
  }

  // Check if a value is numeric and can be animated
  const isNumericValue = (value: string): boolean => {
    const parsed = parseFormattedNumber(value)
    return parsed.numericValue > 0 || value.match(/^[\d.]+[KMB]?\+?$/i) !== null
  }


  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Trust Indicators Stats */}
        <AnimatedSection animation="fadeIn" delay={0.2}>
          <div className="grid grid-cols-3 gap-8 mb-12">
          {indicators.map((indicator, index) => {
            const credential = getCredentialById(indicator.credentialId)
            const isNumeric = isNumericValue(indicator.value)
            const parsed = isNumeric ? parseFormattedNumber(indicator.value) : null
            
            return (
              <div
                key={index}
                className="text-center cursor-pointer hover:scale-105 transition-transform"
                aria-label={`${indicator.value} - ${indicator.label}`}
              >
                <div className="text-3xl font-bold text-primary mb-1">
                  {isNumeric && parsed ? (
                    <NumberTicker
                      value={parsed.originalValue}
                      startValue={0}
                      delay={index * 200}
                      duration={2000}
                      className="text-3xl font-bold text-primary"
                      formatValue={(val) => formatNumberForDisplay(val, parsed.displayFormat, parsed.suffix)}
                    />
                  ) : (
                    indicator.value
                  )}
                </div>
                <div className="text-xs text-gray-600">{translateLabel(indicator.label)}</div>
                {credential && credential.badge && (
                  <Badge variant="outline" className="mt-2 text-xs bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors">
                    {credential.badge}
                  </Badge>
                )}
              </div>
            )
          })}
          </div>
        </AnimatedSection>

        {/* Detailed Credentials Section */}
        {showDetails && credentials && credentials.length > 0 && (
          <div className="mt-16">
            {/* Section Header - Matching Why Choose style */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary">Credentials & Certifications</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Trusted credentials and certifications that demonstrate our commitment to excellence and regulatory compliance.
              </p>
            </div>

            {/* Credentials Grid - Matching Why Choose card style */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {credentials.map((credential) => {
                // Map icon names to Lucide React icons
                const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                  'shield-check': Shield,
                  'building': Building2,
                  'award': Award,
                  'calendar': Calendar,
                  'map-pin': MapPin,
                  'handshake': Handshake,
                }
                const IconComponent = iconMap[credential.icon || ''] || CheckCircle2

                return (
                  <div
                    key={credential.id}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Badge */}
                    {credential.badge && (
                      <Badge 
                        variant="secondary" 
                        className="mb-3 text-xs"
                      >
                        {credential.badge}
                      </Badge>
                    )}

                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {credential.title}
                    </h4>

                    {/* Issuer */}
                    <p className="text-sm text-gray-600 mb-4">
                      {credential.issuer}
                    </p>

                    {/* Description */}
                    {credential.description && (
                      <Tooltip
                        content={
                          <div className="space-y-3">
                            <p className="leading-relaxed text-sm">{credential.description}</p>
                            {credential.verificationUrl && (
                              <Link
                                href={credential.verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 hover:underline inline-flex items-center gap-1 font-medium text-sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Verify credential
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Link>
                            )}
                          </div>
                        }
                        containerClassName="w-full"
                      >
                        {credential.id === 'bc-insurance-license' ? (
                          <p className="text-sm text-gray-600 leading-relaxed cursor-pointer hover:text-primary transition-colors font-raleway">
                            {credential.description}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600 leading-relaxed cursor-pointer hover:text-primary transition-colors line-clamp-3">
                            {credential.description}
                          </p>
                        )}
                      </Tooltip>
                    )}

                    {/* Verification Link (if no description) */}
                    {credential.verificationUrl && !credential.description && (
                      <Link
                        href={credential.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 hover:underline inline-flex items-center gap-1 text-sm font-medium mt-4"
                      >
                        Verify credential
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


