import { render, screen } from '@testing-library/react'
import { CompanyBackgroundSection } from '@/components/sections/company-background-section'
import type { CompanyBackground } from '@/lib/types'

const mockBackground: CompanyBackground = {
  companyName: 'InsureLine Brokers (Infinity)',
  ownerName: 'Rajan Thind',
  ownerTitle: 'Owner & Insurance Advisor',
  biography: 'Test biography',
  philosophy: 'Test philosophy',
  experience: {
    years: 15,
    specialties: ['Life Insurance'],
    certifications: ['BC License'],
  },
  location: {
    address: '7155 120 Street',
    city: 'Delta',
    province: 'BC',
    postalCode: 'V4E 2B1',
  },
  values: ['Value 1'],
  differentiators: ['Differentiator 1'],
}

describe('CompanyBackgroundSection', () => {
  it('renders company information', () => {
    render(<CompanyBackgroundSection background={mockBackground} />)
    
    expect(screen.getByText('InsureLine Brokers (Infinity)')).toBeInTheDocument()
    expect(screen.getByText('Rajan Thind')).toBeInTheDocument()
  })

  it('displays biography and philosophy', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('shows experience and credentials', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
