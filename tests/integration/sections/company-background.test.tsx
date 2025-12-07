import { render, screen } from '@testing-library/react'
import { CompanyBackgroundSection } from '@/components/sections/company-background-section'
import type { CompanyBackground } from '@/lib/types'

const mockBackground: CompanyBackground = {
  companyName: 'Test Company',
  ownerName: 'Test Owner',
  ownerTitle: 'Owner',
  biography: 'Bio',
  philosophy: 'Philosophy',
  experience: { years: 10, specialties: [], certifications: [] },
  location: { address: '123 St', city: 'City', province: 'BC', postalCode: 'V1A 1A1' },
  values: [],
  differentiators: [],
}

describe('CompanyBackgroundSection Integration', () => {
  it('renders section with company background', () => {
    render(<CompanyBackgroundSection background={mockBackground} />)
    
    expect(screen.getByText('Test Company')).toBeInTheDocument()
  })
})
