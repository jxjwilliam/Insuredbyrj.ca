'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Building2, Award, Users, Heart } from 'lucide-react'
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
  layout = 'split',
  className,
}: CompanyBackgroundSectionProps) {
  return (
    <section
      id="about"
      className={cn('py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50', className)}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-500">Insured by Rajan</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Learn more about Rajan Thind and why British Columbia families trust
            us with their protection.
          </p>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            'max-w-6xl mx-auto',
            layout === 'split' && 'grid lg:grid-cols-2 gap-12 items-start',
            layout === 'centered' && 'max-w-4xl'
          )}
        >
          {/* Image Section */}
          {showImage && background.imageUrl && (
            <div className="mb-8 lg:mb-0">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={background.imageUrl}
                  alt={`${background.ownerName} - ${background.ownerTitle}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="space-y-8">
            {/* Company & Owner Info */}
            <div>
              <h3 className="text-2xl font-bold mb-2">{background.companyName}</h3>
              <p className="text-lg text-muted-foreground mb-4">
                {background.ownerName} — {background.ownerTitle}
              </p>
              {background.brandAffiliation && (
                <Badge variant="outline" className="mb-4">
                  <Building2 className="h-3 w-3 mr-1" />
                  {background.brandAffiliation.name} {background.brandAffiliation.type}
                </Badge>
              )}
            </div>

            {/* Biography */}
            <div>
              <h4 className="font-semibold text-lg mb-3">Our Story</h4>
              <p className="text-gray-700 leading-relaxed">{background.biography}</p>
            </div>

            <Separator />

            {/* Philosophy */}
            <div>
              <h4 className="font-semibold text-lg mb-3">Our Philosophy</h4>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;{background.philosophy}&rdquo;
              </p>
            </div>

            <Separator />

            {/* Experience */}
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Experience & Expertise
              </h4>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>{background.experience.years}+ Years</strong> of dedicated service
                </p>
                {background.experience.specialties.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Specialties:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                      {background.experience.specialties.map((specialty, idx) => (
                        <li key={idx}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {background.experience.certifications.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Certifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {background.experience.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="secondary">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Brand Affiliation Benefits */}
            {background.brandAffiliation && background.brandAffiliation.benefits.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Benefits of {background.brandAffiliation.name} Affiliation
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
                    {background.brandAffiliation.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Values */}
            {background.values.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Our Values
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {background.values.map((value, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span className="text-sm text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Differentiators */}
            {background.differentiators.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    What Makes Us Different
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
                    {background.differentiators.map((diff, idx) => (
                      <li key={idx}>{diff}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* CTA */}
            <div className="pt-6">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  Get in Touch with Rajan
                  <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
