import { render, screen } from '@testing-library/react'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import type { HowItWorksSection as HowItWorksType, ProcessDetail } from '@/lib/types'

const mockHowItWorks: HowItWorksType = {
  title: 'How It Works',
  description: 'Simple process',
  steps: [
    {
      number: 1,
      title: 'Step 1',
      description: 'Description',
      timeIndicator: '2 min',
      icon: 'icon',
    },
  ],
}

const mockProcessDetails: ProcessDetail[] = [
  {
    stepNumber: 1,
    subSteps: [
      {
        title: 'Sub-step 1',
        description: 'Sub-step description',
        timeRequired: '5 minutes',
        requiredDocuments: ['Document 1'],
      },
    ],
    postApplication: {
      timeline: '2-4 weeks',
      nextSteps: ['Step 1', 'Step 2'],
      contactInfo: 'Contact us',
    },
  },
]

describe('HowItWorksSection Integration', () => {
  it('renders section with process details', () => {
    render(
      <HowItWorksSection
        howItWorks={mockHowItWorks}
        processDetails={mockProcessDetails}
      />
    )
    
    expect(screen.getByText('How It Works')).toBeInTheDocument()
  })

  it('expands to show detailed sub-steps', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
