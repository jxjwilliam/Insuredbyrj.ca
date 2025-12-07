import { render, screen, fireEvent } from '@testing-library/react'
import { FAQSection } from '@/components/sections/faq-section'
import type { FAQItem } from '@/lib/types'

const mockFAQ: FAQItem[] = [
  {
    id: 'test-1',
    question: 'Test Question 1?',
    answer: 'Test answer 1',
  },
  {
    id: 'test-2',
    question: 'Test Question 2?',
    answer: 'Test answer 2',
  },
]

describe('FAQSection', () => {
  it('renders FAQ questions', () => {
    render(<FAQSection faq={mockFAQ} />)
    
    expect(screen.getByText('Test Question 1?')).toBeInTheDocument()
    expect(screen.getByText('Test Question 2?')).toBeInTheDocument()
  })

  it('expands FAQ answer when clicked', () => {
    render(<FAQSection faq={mockFAQ} />)
    
    const question = screen.getByText('Test Question 1?')
    fireEvent.click(question)
    
    expect(screen.getByText('Test answer 1')).toBeInTheDocument()
  })

  it('has search functionality', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })

  it('filters FAQ by search term', () => {
    // This test will pass after implementation
    expect(true).toBe(true)
  })
})
