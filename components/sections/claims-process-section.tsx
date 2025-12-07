'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Clock, Phone, Mail, CheckCircle2 } from 'lucide-react'
import type { ClaimsProcessInfo } from '@/lib/types'

interface ClaimsProcessSectionProps {
  claimsInfo: ClaimsProcessInfo
  title?: string // Section title (default: "Claims Process")
  layout?: 'steps' | 'timeline' | 'accordion' // Display layout
  className?: string
}

/**
 * Component for detailed claims process information
 * @param claimsInfo - Claims process information data
 * @param title - Section title
 * @param layout - Display layout variant
 * @param className - Additional CSS classes
 */
export function ClaimsProcessSection({
  claimsInfo,
  title = 'Claims Process',
  layout = 'steps',
  className,
}: ClaimsProcessSectionProps) {
  return (
    <section
      id="claims-process"
      className={`py-20 bg-white ${className || ''}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We&apos;re here to support you through every step of the claims
            process. Our team works directly with the insurance carrier to ensure
            your claim is processed quickly and smoothly.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* How to File */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                How to File a Claim
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Steps */}
              <div>
                <h4 className="font-semibold mb-4">Step-by-Step Process</h4>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-2">
                  {claimsInfo.howToFile.steps.map((step, idx) => (
                    <li key={idx} className="pl-2">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <Separator />

              {/* Contact Methods */}
              <div>
                <h4 className="font-semibold mb-3">Contact Us</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${claimsInfo.howToFile.contactMethods.phone}`}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {claimsInfo.howToFile.contactMethods.phone}
                  </a>
                  <a
                    href={`mailto:${claimsInfo.howToFile.contactMethods.email}`}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {claimsInfo.howToFile.contactMethods.email}
                  </a>
                </div>
              </div>

              <Separator />

              {/* Required Documents */}
              <div>
                <h4 className="font-semibold mb-3">Required Documents</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
                  {claimsInfo.howToFile.requiredDocuments.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Claims Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Initial Filing
                  </p>
                  <p className="font-semibold">{claimsInfo.timeline.initialFiling}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Review Period
                  </p>
                  <p className="font-semibold">{claimsInfo.timeline.review}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Approval
                  </p>
                  <p className="font-semibold">{claimsInfo.timeline.approval}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Payout
                  </p>
                  <p className="font-semibold">{claimsInfo.timeline.payout}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What to Expect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                What to Expect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-2">
                {claimsInfo.whatToExpect.map((item, idx) => (
                  <li key={idx} className="pl-2">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Support */}
          {claimsInfo.support.available && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle>Claims Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{claimsInfo.support.description}</p>
                <p className="text-sm font-medium">
                  <strong>Contact:</strong> {claimsInfo.support.contactInfo}
                </p>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <div className="text-center pt-6">
            <Button asChild size="lg">
              <Link href="/contact">
                Need Help with a Claim? Contact Us
                <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
