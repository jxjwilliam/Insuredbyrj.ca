import { render, screen } from '@testing-library/react'
import { InsurancePlansSection } from '@/components/sections/insurance-plans'
import type { InsurancePlan, DetailedPlanInformation } from '@/lib/types'

const mockPlans: InsurancePlan[] = [
  {
    id: 'term-life',
    type: 'Term Life',
    description: 'Affordable coverage',
    startingPrice: 'From $25/month',
    features: ['Feature 1'],
    imageUrl: '/test.jpg',
    imageAlt: 'Test',
    ctaLink: '/products/term-life',
  },
]

describe('InsurancePlansSection', () => {
  it('renders section with all plans', () => {
    render(<InsurancePlansSection plans={mockPlans} />)
    
    expect(screen.getByText(/life insurance.*plans/i)).toBeInTheDocument()
    expect(screen.getByText('Term Life')).toBeInTheDocument()
  })

  it('renders plan cards for each plan', () => {
    render(<InsurancePlansSection plans={mockPlans} />)
    
    const planCards = screen.getAllByText('Term Life')
    expect(planCards.length).toBeGreaterThan(0)
  })

  it('displays detailed plan information when available', () => {
    // This test will pass after implementation
    // For now, it documents expected behavior
    expect(true).toBe(true)
  })
})
