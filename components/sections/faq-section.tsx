'use client'

import { useState, useMemo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Search } from 'lucide-react'
import type { FAQItem } from '@/lib/types'

interface FAQSectionProps {
  faq: FAQItem[]
}

/**
 * Enhanced FAQ section component with search and category grouping
 * @param faq - Array of FAQ items
 */
export function FAQSection({ faq }: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Categorize FAQ items
  const categorizeFAQ = (items: FAQItem[]) => {
    const categories: Record<string, FAQItem[]> = {
      coverage: [],
      claims: [],
      pricing: [],
      general: [],
    }

    items.forEach((item) => {
      const questionLower = item.question.toLowerCase()
      const answerLower = item.answer.toLowerCase()

      if (
        questionLower.includes('claim') ||
        answerLower.includes('claim') ||
        item.id.includes('claim')
      ) {
        categories.claims.push(item)
      } else if (
        questionLower.includes('price') ||
        questionLower.includes('cost') ||
        questionLower.includes('premium') ||
        questionLower.includes('rate') ||
        item.id.includes('price')
      ) {
        categories.pricing.push(item)
      } else if (
        questionLower.includes('coverage') ||
        questionLower.includes('need') ||
        questionLower.includes('amount') ||
        item.id.includes('coverage')
      ) {
        categories.coverage.push(item)
      } else {
        categories.general.push(item)
      }
    })

    return categories
  }

  const categories = useMemo(() => categorizeFAQ(faq), [faq])

  // Filter FAQ based on search and category
  const filteredFAQ = useMemo(() => {
    let items =
      selectedCategory === 'all'
        ? faq
        : categories[selectedCategory as keyof typeof categories] || []

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      )
    }

    return items
  }, [faq, searchQuery, selectedCategory, categories])

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

        {/* Search and Category Filters */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search FAQ questions and answers"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="coverage">
                Coverage
                <Badge variant="secondary" className="ml-2 text-xs">
                  {categories.coverage.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="claims">
                Claims
                <Badge variant="secondary" className="ml-2 text-xs">
                  {categories.claims.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pricing">
                Pricing
                <Badge variant="secondary" className="ml-2 text-xs">
                  {categories.pricing.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQ.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left hover:text-blue-500">
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


