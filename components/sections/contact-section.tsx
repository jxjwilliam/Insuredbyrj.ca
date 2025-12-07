'use client'

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/hooks'
import { landingPageContent } from '@/lib/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleMap } from '@/components/ui/GoogleMap'

/**
 * Contact section component displaying contact information
 * Uses translations from i18n system
 */
export function ContactSection() {
  const { t } = useTranslation()
  const contactDetails = landingPageContent.contactDetails
  const serviceAreas = landingPageContent.serviceAreas

  if (!contactDetails) {
    return null
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('contact.title', 'Get in Touch')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('contact.description', 'We\'re here to help. Reach out to Rajan directly for personalized insurance advice.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Phone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  {t('contact.phone.title', 'Phone')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${contactDetails.phone.primary.replace(/\s/g, '-')}`}
                  className="text-2xl font-bold text-blue-600 hover:underline"
                  aria-label={`Call us at ${contactDetails.phone.primary}`}
                >
                  {contactDetails.phone.primary}
                </a>
                {contactDetails.responseTimes.phone && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('contact.responseTime', 'Response time')}: {contactDetails.responseTimes.phone}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {t('contact.email.title', 'Email')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${contactDetails.email.primary}`}
                  className="text-lg font-semibold text-blue-600 hover:underline break-all"
                  aria-label={`Email us at ${contactDetails.email.primary}`}
                >
                  {contactDetails.email.primary}
                </a>
                {contactDetails.responseTimes.email && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('contact.responseTime', 'Response time')}: {contactDetails.responseTimes.email}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Office Location */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t('contact.location.title', 'Office Location')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold mb-4">
                {contactDetails.address.fullAddress}
              </p>
              <div className="mb-4">
                <GoogleMap />
              </div>
              {serviceAreas && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">
                    {t('contact.serviceAreas', 'Service Areas')}:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.primary', 'Primary')}: {serviceAreas.primary.join(', ')}
                    {serviceAreas.secondary &&
                      serviceAreas.secondary.length > 0 && (
                        <span>
                          {' '}
                          | {t('contact.secondary', 'Secondary')}: {serviceAreas.secondary.join(', ')}
                        </span>
                      )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Office Hours */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {t('contact.hours.title', 'Office Hours')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{contactDetails.officeHours.weekdays}</p>
                {contactDetails.officeHours.saturday && (
                  <p className="text-sm text-muted-foreground">
                    {contactDetails.officeHours.saturday}
                  </p>
                )}
                {contactDetails.officeHours.sunday && (
                  <p className="text-sm text-muted-foreground">
                    {contactDetails.officeHours.sunday}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preferred Contact Method */}
          <div className="bg-blue-50 rounded-lg p-6 mb-12">
            <p className="font-medium mb-2">
              {t('contact.preferredMethod', 'Preferred Contact Method')}:
            </p>
            <p className="text-gray-700">{contactDetails.responseTimes.preferred}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
