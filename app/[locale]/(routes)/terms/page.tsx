import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { landingPageContent } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Terms of Service | Insured by Rajan',
  description:
    'Terms of Service for Insured by Rajan. Review our terms and conditions for using our insurance services and website.',
}

/**
 * Terms of Service page
 * Standard terms of service for insurance broker services
 * Covers website use, service terms, and legal disclaimers
 */
export default function TermsOfServicePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header navigation={landingPageContent.navigation} />
      
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <article className="max-w-4xl mx-auto prose prose-lg prose-slate">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600 italic">Last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </header>

          <div className="prose prose-slate max-w-none">
            <p className="lead">
              Welcome to Insured by Rajan. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, services, and insurance products. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Insured by Rajan website, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2>2. Services Provided</h2>
              <p>
                Insured by Rajan is a licensed insurance broker providing:
              </p>
              <ul>
                <li>Life insurance products and services</li>
                <li>Insurance quotes and comparisons</li>
                <li>Insurance policy consultation and advice</li>
                <li>Policy management and customer support</li>
                <li>Educational resources and information about insurance products</li>
              </ul>
              <p>
                We act as an intermediary between you and insurance companies. We do not underwrite insurance policies but facilitate the purchase of insurance products from licensed insurers.
              </p>
            </section>

            <section>
              <h2>3. Eligibility</h2>
              <p>
                To use our services, you must:
              </p>
              <ul>
                <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Provide accurate and complete information when requested</li>
                <li>Reside in a jurisdiction where our services are available</li>
              </ul>
            </section>

            <section>
              <h2>4. Use of Website</h2>
              <p>
                You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul>
                <li>Use the website in any way that violates any applicable law or regulation</li>
                <li>Transmit any harmful, offensive, or illegal content</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Use automated systems to access the website without permission</li>
                <li>Copy, modify, or distribute content from the website without authorization</li>
              </ul>
            </section>

            <section>
              <h2>5. Insurance Quotes and Applications</h2>
              <p>
                When requesting insurance quotes or submitting applications:
              </p>
              <ul>
                <li>You must provide accurate, complete, and truthful information</li>
                <li>Quotes are estimates based on the information provided and are subject to change</li>
                <li>Final premiums and coverage terms are determined by the insurance company</li>
                <li>We reserve the right to refuse service to anyone at any time</li>
                <li>Submission of an application does not guarantee policy approval</li>
              </ul>
              <p>
                Providing false or misleading information may result in denial of coverage, policy cancellation, or legal action.
              </p>
            </section>

            <section>
              <h2>6. Insurance Policies</h2>
              <p>
                Insurance policies are issued by licensed insurance companies, not by Insured by Rajan. The terms, conditions, and coverage of your insurance policy are governed by:
              </p>
              <ul>
                <li>The insurance policy contract issued by the insurance company</li>
                <li>Applicable provincial and federal insurance laws</li>
                <li>The insurance company&apos;s terms and conditions</li>
              </ul>
              <p>
                Insured by Rajan is not responsible for the claims-paying ability of insurance companies or the terms of insurance policies.
              </p>
            </section>

            <section>
              <h2>7. Fees and Commissions</h2>
              <p>
                Insured by Rajan receives commissions from insurance companies for policies sold through our services. These commissions are included in the premiums you pay and do not result in additional charges to you. We may also charge service fees for certain administrative services, which will be disclosed to you in advance.
              </p>
            </section>

            <section>
              <h2>8. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Insured by Rajan or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.
              </p>
            </section>

            <section>
              <h2>9. Disclaimers</h2>
              <p>
                <strong>No Warranty:</strong> The information on this website is provided &quot;as is&quot; without warranty of any kind. We do not guarantee the accuracy, completeness, or timeliness of information on this website.
              </p>
              <p>
                <strong>Not Professional Advice:</strong> The information provided on this website is for general informational purposes only and does not constitute professional insurance, legal, or financial advice. You should consult with qualified professionals for advice specific to your situation.
              </p>
              <p>
                <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, Insured by Rajan shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services or website.
              </p>
            </section>

            <section>
              <h2>10. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Insured by Rajan, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section>
              <h2>11. Privacy</h2>
              <p>
                Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2>12. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this website. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2>13. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to our services at any time, with or without cause or notice, for any reason including violation of these Terms.
              </p>
            </section>

            <section>
              <h2>14. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of British Columbia, Canada, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of British Columbia.
              </p>
            </section>

            <section>
              <h2>15. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:info@insuredbyrajan.com" className="text-blue-600 hover:text-blue-800 underline">info@insuredbyrajan.com</a></li>
                <li>Phone: Available on our Contact page</li>
              </ul>
            </section>

            <section>
              <h2>16. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2>17. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Insured by Rajan regarding your use of our services and supersede all prior agreements and understandings.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2>Questions About These Terms?</h2>
              <p>
                If you have questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:info@insuredbyrajan.com" className="text-blue-600 hover:text-blue-800 underline">
                  info@insuredbyrajan.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  )
}

