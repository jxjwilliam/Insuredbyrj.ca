'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star, MapPin, CheckCircle2 } from 'lucide-react'
import { StaggerChildren } from '@/components/animations/stagger-children'
import type { Testimonial } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string // Section title (default: "What Our Customers Say")
  className?: string
}

/**
 * Component for displaying customer testimonials with detailed stories
 * @param testimonials - Array of testimonial data
 * @param title - Section title
 * @param showCarousel - Whether to use carousel layout (not implemented yet)
 * @param itemsPerView - Number of testimonials visible at once
 * @param autoPlay - Auto-advance carousel (not implemented yet)
 * @param className - Additional CSS classes
 */
export function TestimonialsSection({
  testimonials,
  title = 'What Our Customers Say',
  className,
}: TestimonialsSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null)

  // Get unique locations and situations for filtering
  const locations = Array.from(new Set(testimonials.map((t) => t.location)))
  const situations = Array.from(
    new Set(testimonials.map((t) => t.situation.split('.')[0]))
  )

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (selectedLocation && testimonial.location !== selectedLocation) {
      return false
    }
    if (
      selectedSituation &&
      !testimonial.situation.toLowerCase().includes(selectedSituation.toLowerCase())
    ) {
      return false
    }
    return true
  })

  const renderStars = (rating?: number) => {
    if (!rating) return null
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
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

        {/* Filters */}
        {(locations.length > 1 || situations.length > 1) && (
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by:</span>
              <select
                value={selectedLocation || ''}
                onChange={(e) =>
                  setSelectedLocation(e.target.value || null)
                }
                className="px-3 py-1 border rounded-md text-sm"
                aria-label="Filter testimonials by location"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <select
                value={selectedSituation || ''}
                onChange={(e) =>
                  setSelectedSituation(e.target.value || null)
                }
                className="px-3 py-1 border rounded-md text-sm"
                aria-label="Filter testimonials by situation"
              >
                <option value="">All Situations</option>
                {situations.map((situation) => (
                  <option key={situation} value={situation}>
                    {situation}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        <StaggerChildren staggerDelay={0.15} animation="slideUp">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="h-full flex flex-col hover:shadow-lg transition-shadow"
              >
              <CardContent className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {testimonial.customerName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  {testimonial.rating && renderStars(testimonial.rating)}
                </div>

                {/* Situation */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Situation:
                  </p>
                  <p className="text-sm">{testimonial.situation}</p>
                </div>

                {/* Experience */}
                <div className="mb-3 flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Experience:
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {testimonial.experience}
                  </p>
                </div>

                {/* Outcome */}
                <div className="pt-3 border-t">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Result:
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    {testimonial.outcome}
                  </p>
                </div>

                {/* Date */}
                {testimonial.date && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(testimonial.date).toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                )}
              </CardContent>
            </Card>
            ))}
          </div>
        </StaggerChildren>

        {/* Empty State */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No testimonials match the selected filters.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
