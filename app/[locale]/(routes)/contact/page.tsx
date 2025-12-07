import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { GoogleMap } from '@/components/ui/GoogleMap'
import { landingPageContent } from '@/lib/constants'

/**
 * Contact page with detailed contact information
 */
export default function ContactPage() {
  const contactDetails = landingPageContent.contactDetails
  const serviceAreas = landingPageContent.serviceAreas

  if (!contactDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Speak to a BC Advisor
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please reach out to us directly to speak with Rajan.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div id="main-content" className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600">
              We&apos;re here to help. Reach out to Rajan directly for
              personalized insurance advice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Phone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${contactDetails.phone.primary}`}
                  className="text-2xl font-bold text-blue-600 hover:underline"
                >
                  {contactDetails.phone.primary}
                </a>
                {contactDetails.responseTimes.phone && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Response time: {contactDetails.responseTimes.phone}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${contactDetails.email.primary}`}
                  className="text-lg font-semibold text-blue-600 hover:underline break-all"
                >
                  {contactDetails.email.primary}
                </a>
                {contactDetails.responseTimes.email && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Response time: {contactDetails.responseTimes.email}
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
                Office Location
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
                  <p className="text-sm font-medium mb-2">Service Areas:</p>
                  <p className="text-sm text-muted-foreground">
                    Primary: {serviceAreas.primary.join(', ')}
                    {serviceAreas.secondary &&
                      serviceAreas.secondary.length > 0 && (
                        <span>
                          {' '}
                          | Secondary: {serviceAreas.secondary.join(', ')}
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
                Office Hours
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
            <p className="font-medium mb-2">Preferred Contact Method:</p>
            <p className="text-gray-700">{contactDetails.responseTimes.preferred}</p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/get-quote">Get Your Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


