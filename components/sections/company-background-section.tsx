'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useContactDialog } from '@/components/shared/contact-dialog-provider'
import { useTranslation } from '@/lib/i18n/hooks'
import { landingPageContent } from '@/lib/constants'
import {
  Building2,
  Award,
  Users,
  Heart,
  MapPin,
  CheckCircle2,
  Sparkles,
  Shield,
} from 'lucide-react'
import type { CompanyBackground } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CompanyBackgroundSectionProps {
  background: CompanyBackground
  showImage?: boolean // Whether to show professional headshot
  layout?: 'default' | 'split' | 'centered' // Layout variant
  className?: string
}

/**
 * Component for company and advisor background information
 * @param background - Company background data
 * @param showImage - Whether to show professional headshot
 * @param layout - Layout variant
 * @param className - Additional CSS classes
 */
export function CompanyBackgroundSection({
  background,
  showImage = true,
  className,
}: CompanyBackgroundSectionProps) {
  const { openDialog } = useContactDialog()
  const { t } = useTranslation()
  return (
    <section
      id="about"
      className={cn('py-16 bg-gradient-to-br from-orange-50/50 via-white to-green-50/50', className)}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
            <Users className="h-8 w-8 text-[#FF671F]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-[#FF671F]">Insured by Rajan</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Learn more about Rajan Thind and why British Columbia families trust
            us with their protection.
          </p>
        </div>

        {/* Hero Card with Image and Key Info */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50/30">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Image Section */}
                {showImage && background.imageUrl && (
                  <div className="lg:col-span-1 relative h-64 lg:h-auto bg-gradient-to-br from-orange-100 to-orange-200">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50">
                        <Image
                          src={background.imageUrl}
                          alt={`${background.ownerName} - ${background.ownerTitle}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 400px"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Info Section */}
                <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {background.ownerName}
                      </h3>
                      <p className="text-xl text-[#FF671F] font-semibold mb-4">
                        {background.ownerTitle}
                      </p>
                      <p className="text-lg text-gray-700 font-medium">
                        {background.companyName}
                      </p>
                    </div>

                    {background.brandAffiliation && (
                      <div className="flex items-center gap-3 pt-2">
                        <Badge
                          variant="outline"
                          className="bg-orange-50 border-orange-200 text-[#FF671F] px-4 py-2 text-sm font-semibold"
                        >
                          <Building2 className="h-4 w-4 mr-2" />
                          {background.brandAffiliation.name} {background.brandAffiliation.type}
                        </Badge>
                      </div>
                    )}

                    {background.location && (
                      <div className="pt-2">
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPin className="h-5 w-5 text-[#046A38]" />
                          <span className="text-sm">{background.location.fullAddress}</span>
                        </div>
                        {landingPageContent.serviceAreas && (
                          <div className="flex items-start gap-2 text-gray-600">
                            <span className="text-sm font-medium text-gray-700">
                              {t('contact.serviceAreas', 'Service Areas')}:
                            </span>
                            <span className="text-sm">
                              {t('contact.primary', 'Primary')}: {landingPageContent.serviceAreas.primary.join(', ')}
                              {landingPageContent.serviceAreas.secondary &&
                                landingPageContent.serviceAreas.secondary.length > 0 && (
                                  <span>
                                    {' '}
                                    | {t('contact.secondary', 'Secondary')}: {landingPageContent.serviceAreas.secondary.join(', ')}
                                  </span>
                                )}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Our Story Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-[#FF671F]" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Our Story</h4>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {background.biography}
                </p>
              </CardContent>
            </Card>

            {/* Philosophy Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#FF671F] rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Our Philosophy</h4>
                </div>
                <blockquote className="text-gray-700 leading-relaxed text-base italic border-l-4 border-[#FF671F] pl-6">
                  &ldquo;{background.philosophy}&rdquo;
                </blockquote>
              </CardContent>
            </Card>
          </div>

          {/* Experience & Expertise Card */}
          <Card className="border-0 shadow-lg mb-8 bg-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Experience & Expertise</h4>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100">
                  <div className="text-4xl font-bold text-[#FF671F] mb-2">
                    {background.experience.years}+
                  </div>
                  <div className="text-sm font-semibold text-gray-700">Years of Service</div>
                </div>

                {background.experience.specialties.length > 0 && (
                  <div className="md:col-span-2">
                    <h5 className="font-semibold text-gray-900 mb-3">Specialties</h5>
                    <div className="space-y-2">
                      {background.experience.specialties.map((specialty, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <CheckCircle2 className="h-5 w-5 text-[#046A38] mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {background.experience.certifications.length > 0 && (
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Certifications</h5>
                  <div className="flex flex-wrap gap-3">
                    {background.experience.certifications.map((cert, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-green-100 text-[#046A38] border-green-200 px-4 py-2 text-sm font-semibold"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Values and Differentiators Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Values Card */}
            {background.values.length > 0 && (
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Our Values</h4>
                  </div>
                  <div className="space-y-3">
                    {background.values.map((value, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-pink-50 to-white rounded-lg border border-pink-100 hover:border-pink-200 transition-colors"
                      >
                        <CheckCircle2 className="h-5 w-5 text-pink-600 mt-0.5 shrink-0" />
                        <span className="text-gray-700 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Differentiators Card */}
            {background.differentiators.length > 0 && (
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">What Makes Us Different</h4>
                  </div>
                  <div className="space-y-3">
                    {background.differentiators.map((diff, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-100 hover:border-purple-200 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{idx + 1}</span>
                        </div>
                        <span className="text-gray-700 font-medium">{diff}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Brand Affiliation Benefits Card */}
          {background.brandAffiliation && background.brandAffiliation.benefits.length > 0 && (
            <div className="mb-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 text-9xl text-white opacity-10 font-serif">
                ∞
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white">
                    Benefits of {background.brandAffiliation.name} Affiliation
                  </h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {background.brandAffiliation.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors text-left"
                    >
                      <CheckCircle2 className="h-5 w-5 text-white mt-0.5 shrink-0" />
                      <span className="text-white font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center pt-8">
            <Button onClick={openDialog} size="lg" className="px-8 py-6 text-lg font-semibold shadow-lg">
              Get in Touch with Rajan
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
