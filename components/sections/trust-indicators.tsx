'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExpandableContent } from '@/components/shared/expandable-content'
import { AnimatedSection } from '@/components/shared/animated-section'
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
  const getCredentialById = (id?: string): TrustCredential | undefined => {
    if (!id || !credentials) return undefined
    return credentials.find((cred) => cred.id === id)
  }

  const groupCredentialsByType = () => {
    if (!credentials) return {}
    return credentials.reduce(
      (acc, cred) => {
        if (!acc[cred.type]) {
          acc[cred.type] = []
        }
        acc[cred.type].push(cred)
        return acc
      },
      {} as Record<string, TrustCredential[]>
    )
  }

  const groupedCredentials = groupCredentialsByType()
  const credentialTypes = Object.keys(groupedCredentials)

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
                <div className="text-xs text-gray-600">{indicator.label}</div>
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
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8">
              Our Credentials & Certifications
            </h3>
            <div className="space-y-6">
              {credentialTypes.map((type) => (
                <div key={type} className="space-y-4">
                  <h4 className="text-lg font-semibold capitalize mb-4">
                    {type === 'membership' ? 'Memberships' : `${type}s`}
                  </h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedCredentials[type].map((credential) => (
                      <div
                        key={credential.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-sm">{credential.title}</h5>
                          {credential.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {credential.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {credential.issuer}
                        </p>
                        {credential.description && (
                          <ExpandableContent
                            title="Learn More"
                            summary={credential.description.substring(0, 100) + '...'}
                            content={
                              <div className="space-y-2 text-sm">
                                <p>{credential.description}</p>
                                {credential.verificationUrl && (
                                  <Link
                                    href={credential.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1"
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
                        {credential.verificationUrl && !credential.description && (
                          <Link
                            href={credential.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1 mt-2"
                          >
                            Verify credential
                            <span aria-hidden="true">→</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  {credentialTypes.indexOf(type) < credentialTypes.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


