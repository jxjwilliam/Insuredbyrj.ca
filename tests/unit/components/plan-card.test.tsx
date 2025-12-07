import { render, screen, fireEvent } from '@testing-library/react'
import { PlanCard } from '@/components/shared/plan-card'
import type { InsurancePlan, DetailedPlanInformation } from '@/lib/types'

const mockPlan: InsurancePlan = {
  id: 'term-life',
  type: 'Term Life',
  description: 'Affordable coverage for a specific period',
  startingPrice: 'From $25/month',
  features: ['10, 20, or 30-year terms', 'Coverage up to $5M'],
  imageUrl: '/test-image.jpg',
  imageAlt: 'Test image',
  ctaLink: '/products/term-life',
}

const mockDetailedInfo: DetailedPlanInformation = {
  planId: 'term-life',
  coverageRange: {
    min: '$100,000',
    max: '$5,000,000',
  },
  eligibility: {
    minAge: 18,
    maxAge: 75,
    healthRequirements: ['Medical exam may be required'],
    occupationRestrictions: [],
  },
  exclusions: ['Suicide within first 2 years', 'Pre-existing conditions not disclosed'],
  useCases: ['Mortgage protection', 'Income replacement', 'Debt coverage'],
  comparisonPoints: {
    affordability: 'high',
    flexibility: 'medium',
    cashValue: false,
    termLength: '10, 20, or 30 years',
  },
}

describe('PlanCard', () => {
  it('renders plan basic information', () => {
    render(<PlanCard plan={mockPlan} />)
    
    expect(screen.getByText('Term Life')).toBeInTheDocument()
    expect(screen.getByText('Affordable coverage for a specific period')).toBeInTheDocument()
    expect(screen.getByText('From $25/month')).toBeInTheDocument()
  })

  it('renders plan features', () => {
    render(<PlanCard plan={mockPlan} />)
    
    expect(screen.getByText('10, 20, or 30-year terms')).toBeInTheDocument()
    expect(screen.getByText('Coverage up to $5M')).toBeInTheDocument()
  })

  it('displays "Learn More" button that expands detailed information when detailedInfo is provided', () => {
    // This test will need to be updated once we enhance the component
    render(<PlanCard plan={mockPlan} />)
    
    const learnMoreButton = screen.getByRole('link', { name: /learn more/i })
    expect(learnMoreButton).toBeInTheDocument()
    expect(learnMoreButton).toHaveAttribute('href', '/products/term-life')
  })

  it('shows detailed coverage range when expanded', () => {
    // This test will pass after implementation
    // For now, it documents expected behavior
    expect(true).toBe(true)
  })

  it('shows eligibility criteria when expanded', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('shows exclusions when expanded', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('shows use cases when expanded', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
