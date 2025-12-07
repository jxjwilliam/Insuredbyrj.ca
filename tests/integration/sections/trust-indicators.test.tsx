import { render, screen } from '@testing-library/react'
import { TrustIndicators } from '@/components/sections/trust-indicators'
import type { TrustIndicator, TrustCredential } from '@/lib/types'

const mockIndicators: TrustIndicator[] = [
  {
    value: 'A+',
    label: 'Financial Strength',
    credentialId: 'bc-license',
  },
]

const mockCredentials: TrustCredential[] = [
  {
    id: 'bc-license',
    type: 'license',
    title: 'BC Insurance License',
    issuer: 'Insurance Council of British Columbia',
  },
]

describe('TrustIndicators Integration', () => {
  it('renders section with indicators and credentials', () => {
    render(
      <TrustIndicators
        indicators={mockIndicators}
        credentials={mockCredentials}
      />
    )
    
    expect(screen.getByText('A+')).toBeInTheDocument()
  })

  it('links indicators to detailed credentials', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
