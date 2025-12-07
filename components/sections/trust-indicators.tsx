'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ExpandableContent } from '@/components/shared/expandable-content'
import { AnimatedSection } from '@/components/shared/animated-section'
import { useTranslation } from '@/lib/i18n/hooks'
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


  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Trust Indicators Stats */}
        <AnimatedSection animation="fadeIn" delay={0.2}>
          <div className="grid grid-cols-3 gap-6 mb-12">
          {indicators.map((indicator, index) => {
            const credential = getCredentialById(indicator.credentialId)
            return (
              <div
                key={index}
                className="text-center cursor-pointer hover:scale-105 transition-transform"
                aria-label={`${indicator.value} - ${indicator.label}`}
              >
                <div className="text-3xl font-bold text-blue-500 mb-1">
                  {indicator.value}
                </div>
                <div className="text-xs text-gray-600">{translateLabel(indicator.label)}</div>
                {credential && credential.badge && (
                  <Badge variant="outline" className="mt-2 text-xs">
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
          <div className="mt-20">
            {/* Section Header - Matching Why Choose style */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <span className="text-3xl text-blue-500 font-serif">∞</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-blue-500">Credentials & Certifications</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Trusted credentials and certifications that demonstrate our commitment to excellence and regulatory compliance.
              </p>
            </div>

            {/* Credentials Grid - Matching Why Choose card style */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {credentials.map((credential) => {
                // Map icon names to emojis
                const iconMap: Record<string, string> = {
                  'shield-check': '🛡️',
                  'building': '🏢',
                  'award': '🏆',
                  'calendar': '📅',
                  'map-pin': '📍',
                  'handshake': '🤝',
                }
                const icon = iconMap[credential.icon || ''] || '✅'

                return (
                  <div
                    key={credential.id}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-2xl text-white">{icon}</span>
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
                      <ExpandableContent
                        title="Learn More"
                        summary={credential.description.substring(0, 80) + '...'}
                        content={
                          <div className="space-y-3 text-sm text-gray-600">
                            <p className="leading-relaxed">{credential.description}</p>
                            {credential.verificationUrl && (
                              <Link
                                href={credential.verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 font-medium"
                              >
                                Verify credential
                                <span aria-hidden="true">→</span>
                              </Link>
                            )}
                          </div>
                        }
                        variant="collapsible"
                      />
                    )}

                    {/* Verification Link (if no description) */}
                    {credential.verificationUrl && !credential.description && (
                      <Link
                        href={credential.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 text-sm font-medium mt-4"
                      >
                        Verify credential
                        <span aria-hidden="true">→</span>
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


