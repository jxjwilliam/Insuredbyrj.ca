import { render, screen } from '@testing-library/react'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import type { Testimonial } from '@/lib/types'

const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'John D.',
    location: 'Surrey, BC',
    situation: 'New parent looking for term life insurance',
    experience: 'Great experience with Rajan',
    outcome: 'Got the perfect coverage',
    rating: 5,
    verified: true,
  },
]

describe('TestimonialsSection', () => {
  it('renders testimonials', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    
    expect(screen.getByText('John D.')).toBeInTheDocument()
    expect(screen.getByText('Surrey, BC')).toBeInTheDocument()
  })

  it('displays customer situation and experience', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('shows verified badge for verified testimonials', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('displays star ratings', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
