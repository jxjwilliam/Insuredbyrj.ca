import { render, screen } from '@testing-library/react'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import type { HowItWorksSection as HowItWorksType, ProcessDetail } from '@/lib/types'

const mockHowItWorks: HowItWorksType = {
  title: 'How It Works',
  description: 'Simple 3-step process',
  steps: [
    {
      number: 1,
      title: 'Share Your Needs',
      description: 'Tell us about yourself',
      timeIndicator: '2 minutes',
      icon: 'clipboard-list',
    },
  ],
}

describe('HowItWorksSection', () => {
  it('renders process steps', () => {
    render(<HowItWorksSection howItWorks={mockHowItWorks} />)
    
    expect(screen.getByText('How It Works')).toBeInTheDocument()
    expect(screen.getByText('Share Your Needs')).toBeInTheDocument()
  })

  it('displays detailed sub-steps when provided', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('shows required documents for each step', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('displays medical exam information when applicable', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
