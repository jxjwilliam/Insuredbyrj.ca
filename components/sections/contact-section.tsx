'use client'

import { Phone, Mail, Clock, MessageSquare } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/hooks'
import { useContactDialog } from '@/components/shared/contact-dialog-provider'
import { landingPageContent } from '@/lib/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GoogleMap } from '@/components/ui/GoogleMap'

/**
 * Contact section component displaying contact information
 * Uses translations from i18n system
 */
export function ContactSection() {
  const { t } = useTranslation()
  const { openDialog } = useContactDialog()
  const contactDetails = landingPageContent.contactDetails

  if (!contactDetails) {
    return null
  }

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('contact.title', 'Get in Touch')}
            </h2>
            <p className="text-base text-gray-600">
              {t('contact.description', 'We\'re here to help. Reach out to Rajan directly for personalized insurance advice.')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
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

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {t('contact.hours.title', 'Office Hours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-medium">{contactDetails.officeHours.weekdays}</p>
                  {contactDetails.officeHours.saturday && (
                    <p className="text-muted-foreground">{contactDetails.officeHours.saturday}</p>
                  )}
                  {contactDetails.officeHours.sunday && (
                    <p className="text-muted-foreground">{contactDetails.officeHours.sunday}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Office Location */}
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="w-full h-[600px] rounded-lg overflow-hidden">
                <GoogleMap className="h-full" />
              </div>
            </CardContent>
          </Card>

          {/* Contact Form CTA */}
          <div className="text-center mt-8">
            <Button onClick={openDialog} size="lg" className="px-8">
              <MessageSquare className="h-5 w-5 mr-2" />
              {t('contact.formButton', 'Send Us a Message')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
