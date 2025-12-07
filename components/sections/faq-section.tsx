'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { FAQItem } from '@/lib/types'

interface FAQSectionProps {
  faq: FAQItem[]
}

/**
 * FAQ section component with accordion functionality
 * Only one question can be expanded at a time (accordion pattern)
 * @param faq - Array of FAQ items
 */
export function FAQSection({ faq }: FAQSectionProps) {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Common <span className="text-blue-500">Questions</span> About Life
            Insurance
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Get quick answers to the most frequently asked questions about life
            insurance in British Columbia.
          </p>
        </div>

        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left hover:text-blue-500">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Button asChild>
            <Link href="/contact">
              <span className="mr-2">💬</span>
              Chat With an Expert
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


