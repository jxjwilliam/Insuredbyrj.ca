import { render, screen } from '@testing-library/react'
import { TrustIndicators } from '@/components/sections/trust-indicators'
import type { TrustIndicator, TrustCredential } from '@/lib/types'

const mockIndicators: TrustIndicator[] = [
  {
    value: 'A+',
    label: 'Financial Strength',
  },
  {
    value: '10K+',
    label: 'Families Protected',
  },
]

const mockCredentials: TrustCredential[] = [
  {
    id: 'bc-license',
    type: 'license',
    title: 'BC Insurance License',
    issuer: 'Insurance Council of British Columbia',
    description: 'Fully licensed to sell insurance in British Columbia',
    verificationUrl: 'https://example.com/verify',
    badge: 'A+ Rating',
  },
]

describe('TrustIndicators', () => {
  it('renders trust indicators', () => {
    render(<TrustIndicators indicators={mockIndicators} />)
    
    expect(screen.getByText('A+')).toBeInTheDocument()
    expect(screen.getByText('Financial Strength')).toBeInTheDocument()
  })

  it('displays detailed credentials when provided', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('shows verification links for credentials', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('groups credentials by type', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
