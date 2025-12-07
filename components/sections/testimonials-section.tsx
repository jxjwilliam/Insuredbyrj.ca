'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star, MapPin, CheckCircle2 } from 'lucide-react'
import { Marquee, MarqueeItem } from '@/components/ui/marquee'
import type { Testimonial } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string // Section title (default: "What Our Customers Say")
  className?: string
}

/**
 * Component for displaying customer testimonials in a marquee layout
 * Simplified cards showing key information
 * @param testimonials - Array of testimonial data
 * @param title - Section title
 * @param className - Additional CSS classes
 */
export function TestimonialsSection({
  testimonials,
  title = 'What Our Customers Say',
  className,
}: TestimonialsSectionProps) {
  const renderStars = (rating?: number) => {
    if (!rating) return null
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-3 w-3',
              i < rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-gray-200 text-gray-200'
            )}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{rating} out of 5 stars</span>
      </div>
    )
  }

  // Get a short quote from experience or outcome
  const getShortQuote = (testimonial: Testimonial): string => {
    // Use outcome if available, otherwise truncate experience
    if (testimonial.outcome) {
      return testimonial.outcome.length > 120
        ? testimonial.outcome.substring(0, 120) + '...'
        : testimonial.outcome
    }
    return testimonial.experience.length > 120
      ? testimonial.experience.substring(0, 120) + '...'
      : testimonial.experience
  }

  return (
    <section
      id="testimonials"
      className={cn('py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50', className)}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Real stories from British Columbia families who trust us with their
            protection.
          </p>
        </div>

        {/* Testimonials Marquee */}
        <Marquee pauseOnHover className="[--duration:40s]">
          {testimonials.map((testimonial) => (
            <MarqueeItem key={testimonial.id} className="w-[350px]">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base mb-1">
                          {testimonial.customerName}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          <span>{testimonial.location}</span>
                        </div>
                      </div>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs shrink-0">
                          <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    {testimonial.rating && (
                      <div className="mt-2">{renderStars(testimonial.rating)}</div>
                    )}
                  </div>

                  {/* Quote */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      &ldquo;{getShortQuote(testimonial)}&rdquo;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
