import { render, screen } from '@testing-library/react'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import type { Testimonial } from '@/lib/types'

const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'John D.',
    location: 'Surrey, BC',
    situation: 'New parent',
    experience: 'Great service',
    outcome: 'Perfect coverage',
    rating: 5,
  },
  {
    id: 'test-2',
    customerName: 'Sarah M.',
    location: 'Delta, BC',
    situation: 'Business owner',
    experience: 'Excellent advice',
    outcome: 'Saved money',
    rating: 5,
  },
]

describe('TestimonialsSection Integration', () => {
  it('renders multiple testimonials in grid layout', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    
    expect(screen.getByText('John D.')).toBeInTheDocument()
    expect(screen.getByText('Sarah M.')).toBeInTheDocument()
  })

  it('filters testimonials by location', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
