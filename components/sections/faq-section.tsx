'use client'

import { useState, useMemo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from '@/lib/i18n/hooks'
import { useContactDialog } from '@/components/shared/contact-dialog-provider'
import type { FAQItem } from '@/lib/types'

interface FAQSectionProps {
  faq?: FAQItem[]
}

/**
 * Enhanced FAQ section component with search and category grouping
 * Uses translations from i18n system
 * @param faq - Optional array of FAQ items (for backward compatibility)
 */
export function FAQSection({ faq = [] }: FAQSectionProps) {
  const { t } = useTranslation()
  const { openDialog } = useContactDialog()
  
  // Get all FAQ items - try translations first, then fallback to props
  const faqItems: FAQItem[] = useMemo(() => {
    // Get FAQ items from translations or fallback to props
    const getFAQItem = (id: string): FAQItem | undefined => {
      const questionKey = `faq.${id}.question`
      const answerKey = `faq.${id}.answer`
      const question = t(questionKey)
      const answer = t(answerKey)
      
      // If translation exists (not just the key), use it
      if (question !== questionKey && answer !== answerKey) {
        return { id, question, answer }
      }
      
      // Fallback to prop FAQ item
      return faq.find((item) => item.id === id)
    }
    
    // Try to get FAQ from translations
    const faqIds = ['coverageAmount', 'termVsWhole', 'healthImpact', 'coverageSpeed', 'taxImplications', 'cancellation', 'claimsProcess']
    const translatedFAQ = faqIds
      .map((id) => getFAQItem(id))
      .filter((item): item is FAQItem => item !== undefined)
    
    // If we have translated FAQ, use it; otherwise use props
    return translatedFAQ.length > 0 ? translatedFAQ : faq
  }, [faq, t])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Categorize FAQ items with better logic
  const categorizeFAQ = (items: FAQItem[]) => {
    const categories: Record<string, FAQItem[]> = {
      general: [],
      coverage: [],
      pricing: [],
      application: [],
      claims: [],
    }

    items.forEach((item) => {
      const questionLower = item.question.toLowerCase()
      const answerLower = item.answer.toLowerCase()
      const idLower = item.id.toLowerCase()

      // Claims category
      if (
        questionLower.includes('claim') ||
        answerLower.includes('claim') ||
        idLower.includes('claim')
      ) {
        categories.claims.push(item)
      }
      // Pricing category
      else if (
        questionLower.includes('price') ||
        questionLower.includes('cost') ||
        questionLower.includes('premium') ||
        questionLower.includes('rate') ||
        questionLower.includes('tax') ||
        idLower.includes('price') ||
        idLower.includes('tax')
      ) {
        categories.pricing.push(item)
      }
      // Application/Process category
      else if (
        questionLower.includes('quickly') ||
        questionLower.includes('how quickly') ||
        questionLower.includes('get covered') ||
        questionLower.includes('cancel') ||
        questionLower.includes('application') ||
        idLower.includes('speed') ||
        idLower.includes('cancellation')
      ) {
        categories.application.push(item)
      }
      // Coverage category
      else if (
        questionLower.includes('coverage') ||
        questionLower.includes('need') ||
        questionLower.includes('amount') ||
        questionLower.includes('difference between') ||
        questionLower.includes('term') ||
        questionLower.includes('whole life') ||
        idLower.includes('coverage') ||
        idLower.includes('term') ||
        idLower.includes('whole')
      ) {
        categories.coverage.push(item)
      }
      // General category (health, etc.)
      else {
        categories.general.push(item)
      }
    })

    return categories
  }

  const categories = useMemo(() => categorizeFAQ(faqItems), [faqItems])

  // Filter FAQ based on category
  const filteredFAQ = useMemo(() => {
    return selectedCategory === 'all'
      ? faqItems
      : categories[selectedCategory as keyof typeof categories] || []
  }, [faqItems, selectedCategory, categories])

  // Render markdown-like formatting in answers
  const renderAnswer = (answer: string) => {
    // Simple markdown rendering for bold text
    const parts = answer.split(/(\*\*.*?\*\*)/g)
    return (
      <div className="text-gray-600 leading-relaxed whitespace-pre-line">
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={idx} className="font-semibold text-gray-900">
                {part.slice(2, -2)}
              </strong>
            )
          }
          return <span key={idx}>{part}</span>
        })}
      </div>
    )
  }

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Common <span className="text-primary">Questions</span> About Life
            Insurance
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Get quick answers to the most frequently asked questions about life
            insurance in British Columbia.
          </p>
        </div>

        {/* Category Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 h-auto bg-white p-1.5 rounded-lg shadow-md border border-gray-100">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md py-2.5 rounded-md transition-all duration-200 hover:bg-gray-50 data-[state=active]:hover:bg-primary/90"
              >
                All
                <Badge 
                  variant="secondary" 
                  className="badge-in-tab ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20"
                >
                  {faqItems.length}
                </Badge>
              </TabsTrigger>
              {categories.general.length > 0 && (
                <TabsTrigger 
                  value="general" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md py-2.5 rounded-md transition-all duration-200 hover:bg-gray-50 data-[state=active]:hover:bg-primary/90"
                >
                  General
                  <Badge 
                    variant="secondary" 
                    className="badge-in-tab ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20"
                  >
                    {categories.general.length}
                  </Badge>
                </TabsTrigger>
              )}
              {categories.coverage.length > 0 && (
                <TabsTrigger 
                  value="coverage" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md py-2.5 rounded-md transition-all duration-200 hover:bg-gray-50 data-[state=active]:hover:bg-primary/90"
                >
                  Coverage
                  <Badge 
                    variant="secondary" 
                    className="badge-in-tab ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20"
                  >
                    {categories.coverage.length}
                  </Badge>
                </TabsTrigger>
              )}
              {categories.pricing.length > 0 && (
                <TabsTrigger 
                  value="pricing" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md py-2.5 rounded-md transition-all duration-200 hover:bg-gray-50 data-[state=active]:hover:bg-primary/90"
                >
                  Pricing
                  <Badge 
                    variant="secondary" 
                    className="badge-in-tab ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20"
                  >
                    {categories.pricing.length}
                  </Badge>
                </TabsTrigger>
              )}
              {categories.application.length > 0 && (
                <TabsTrigger 
                  value="application" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md py-2.5 rounded-md transition-all duration-200 hover:bg-gray-50 data-[state=active]:hover:bg-primary/90"
                >
                  Process
                  <Badge 
                    variant="secondary" 
                    className="badge-in-tab ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20"
                  >
                    {categories.application.length}
                  </Badge>
                </TabsTrigger>
              )}
              {categories.claims.length > 0 && (
                <TabsTrigger 
                  value="claims" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md py-2.5 rounded-md transition-all duration-200 hover:bg-gray-50 data-[state=active]:hover:bg-primary/90"
                >
                  Claims
                  <Badge 
                    variant="secondary" 
                    className="badge-in-tab ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20"
                  >
                    {categories.claims.length}
                  </Badge>
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>

        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQ.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{renderAnswer(item.answer)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No FAQs match your search. Try different keywords or browse all
                categories.
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Button 
            onClick={openDialog} 
            className="min-h-[44px] bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 py-3 rounded-lg font-semibold"
          >
            <span className="mr-2 text-lg">💬</span>
            Chat With an Expert
          </Button>
        </div>
      </div>
    </section>
  )
}


