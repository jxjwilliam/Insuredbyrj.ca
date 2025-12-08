import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { landingPageContent } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Privacy Policy | Insured by Rajan',
  description:
    'Privacy Policy for Insured by Rajan. Learn how we collect, use, and protect your personal information in compliance with PIPEDA.',
}

/**
 * Privacy Policy page
 * Based on PIPEDA (Personal Information Protection and Electronic Documents Act) principles
 * Adapted from industry standard insurance broker privacy policies
 */
export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header navigation={landingPageContent.navigation} />
      
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <article className="max-w-4xl mx-auto prose prose-lg prose-slate">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 italic">Last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </header>

          <div className="prose prose-slate max-w-none">
            <p className="lead">
              At Insured by Rajan, we value our relationship with you as a customer. It is our responsibility to protect and keep private our customers&apos; and partners&apos; Personal Information. We place a high priority on your personal privacy and remain committed to protect it.
            </p>

            <p>
              By using the Insured by Rajan website or by choosing to submit Personal Information through one of our insurance brokers, you signify your consent to all of the terms of this Privacy Policy.
            </p>

            <p>
              Insured by Rajan reserves the right to modify this Privacy Policy at any time. Please ensure that you review the Privacy Policy periodically so that you understand how we may use your Personal Information that we may collect.
            </p>

            <p>
              Our Privacy Policy has been developed to comply with the Ten Privacy Principles set out in the federal government&apos;s privacy legislation &quot;The Personal Information Protection and Electronic Documents Act&quot; (PIPEDA).
            </p>

            <Separator className="my-8" />

            <section>
              <h2>Principle 1 – Accountability</h2>
              <p>
                We are responsible for all Personal Information in our possession or control, whether supplied to us directly by you or by a third party. This does not include the name, title or business address or telephone number of an employee of an organization, or information made available in public records.
              </p>
              <p>
                If at any time you have a concern about the handling of your Personal Information, then please reach out to our privacy officer.
              </p>
            </section>

            <section>
              <h2>Principle 2 – Identified Purposes</h2>
              <p>
                We will collect, use and disclose Personal Information as is reasonably required to:
              </p>
              <ul>
                <li>Identify you and ensure the accuracy of your Personal Information</li>
                <li>Establish and maintain communications with you</li>
                <li>Provide services to you</li>
                <li>Understand your needs</li>
                <li>Analyze and assess risks on a prudent basis, which may require us to gather information from prior insurance files, insurance companies, financial institutions and related intermediaries</li>
                <li>Offer and provide insurance products and services to you</li>
                <li>Determine and facilitate your payment of premiums and fees</li>
                <li>Investigate and settle your claims</li>
                <li>Service your ongoing insurance needs</li>
                <li>Respond to your inquiries and contact you through telephone, email, and other appropriate communication channels</li>
                <li>Meet regulatory and legal requirements</li>
                <li>Protect against fraud or other illegal activities</li>
              </ul>
              <p>
                We also may collect, use or disclose your information to our affiliated companies, your agent and/or broker, operators of insurance industry databases, government agencies, other insurers, reinsurers, credit bureaus and/or any other person, corporation, firm or enterprise as reasonably required for the purposes stated above.
              </p>
              <p>
                Information may be collected by entities, or transferred, outside of Canada for processing, storage, analysis or disaster recovery and may be subject to disclosure to those authorized under applicable laws of the foreign jurisdiction.
              </p>
              <p>
                If we use your information for any other purpose than listed above, we will explain the purpose and obtain your consent.
              </p>
            </section>

            <section>
              <h2>Principle 3 – Consent</h2>
              <p>
                By applying for insurance, continuing your business relationship with Insured by Rajan, or by providing Insured by Rajan with Personal Information, you provide your consent for the ongoing collection, use and disclosure of your Personal Information as described in this Privacy Policy.
              </p>
              <p>
                We will obtain your consent for the collection, use or disclosure of your Personal Information except in situations where consent is not required by law. Your consent may be provided expressly (oral or written), implicitly or through an authorized representative. In most cases, your consent may be withdrawn with reasonable notice. If you choose to do so, we will explain the implications of withdrawing your consent.
              </p>
            </section>

            <section>
              <h2>Principle 4 – Limiting Collection</h2>
              <p>
                We will collect, use or disclose your Personal Information that is required to do business with you or as required by law.
              </p>
            </section>

            <section>
              <h2>Principle 5 – Limiting Use, Disclosure, and Retention</h2>
              <p>
                We will not use or disclose your Personal Information for purposes other than those for which it was collected except with your implied or expressed consent or as required by law.
              </p>

              <h3>Disclosure within Insured by Rajan</h3>
              <p>
                Insured by Rajan and/or its affiliate companies may internally share your Personal Information for the purposes mentioned in our Privacy Policy. Only companies with legitimate business reasons will have access to your Personal Information.
              </p>

              <h3>Disclosure to Third Parties</h3>
              <p>
                We may share your Personal Information to third parties which may include:
              </p>
              <ul>
                <li>Brokers, agents, adjustors, private investigators</li>
                <li>Industry databases, government agencies</li>
                <li>Reinsurers, other vendors, other insurance carriers</li>
                <li>Regulatory organizations, payment vendors</li>
                <li>Credit and consumer reporting agencies</li>
              </ul>
              <p>
                Our Third-Party partners are subject to PIPEDA and other privacy requirements. Only companies with legitimate business reasons will have access to your Personal Information.
              </p>

              <h3>Disclosure Outside of Canada</h3>
              <p>
                Insured by Rajan may use service providers located outside of Canada or related companies located outside of Canada to collect, use and store your Personal Information for the purposes mentioned in our Privacy Policy.
              </p>

              <h3>Retention Periods</h3>
              <p>
                We will retain your Personal Information only for as long as necessary for the identified Purposes or as required by law.
              </p>

              <h3>Business Transactions</h3>
              <p>
                If we enter talks about a merger, acquisition or asset sale with a third party, we may share Personal Information that is deemed necessary in order to satisfy the business needs of such transactions. We will provide notice on our website if a business transaction is subject to a new privacy statement.
              </p>
            </section>

            <section>
              <h2>Principle 6 – Accuracy</h2>
              <p>
                We will maintain your Personal Information in our possession and control as accurate, complete, and up to date based on the most recent information available to Insured by Rajan.
              </p>
            </section>

            <section>
              <h2>Principle 7 – Safeguards</h2>
              <p>
                We will maintain reasonable physical, electronic and procedural safeguards to ensure your Personal Information is protected against loss, theft, unauthorized access, disclosure, copying, use or modification.
              </p>
            </section>

            <section>
              <h2>Principle 8 – Openness</h2>
              <p>
                At your request, we will make available information about our policies and procedures relating to the management of your Personal Information. You can contact our Privacy Officer with any requests to access to your Personal Information.
              </p>
            </section>

            <section>
              <h2>Principle 9 – Individual Access</h2>
              <p>
                Upon your request, we will inform you of the existence, use and disclosure of your Personal Information which is in our possession and control. You have the right to request changes if required. We will respond to your request within 30 days of receiving your written request.
              </p>

              <h3>Refusal of Request for Disclosure</h3>
              <p>
                We will make every effort to disclose your Personal Information. If a request for disclosure is denied, we will provide an explanation.
              </p>
              <p>Examples of reasons for non-disclosure include:</p>
              <ul>
                <li>Cost Preventative</li>
                <li>Personal Information that contains information about other individuals that cannot be released</li>
                <li>Commercial Proprietary Reasons</li>
                <li>Legal and Security Litigation Reasons</li>
              </ul>
            </section>

            <section>
              <h2>Principle 10 – Questions</h2>
              <p>
                For more information related to our Privacy Principles, or to raise a concern or make an enquiry, please contact us.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2>Questions?</h2>
              <p>
                If you have questions, comments or complaints please email{' '}
                <a href="mailto:privacy@insuredbyrajan.com" className="text-blue-600 hover:text-blue-800 underline">
                  privacy@insuredbyrajan.com
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

