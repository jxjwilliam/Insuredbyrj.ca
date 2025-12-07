import { render, screen, fireEvent } from '@testing-library/react'
import { ExpandableContent } from '@/components/shared/expandable-content'

describe('ExpandableContent', () => {
  const defaultProps = {
    title: 'Test Title',
    summary: 'Brief summary text',
    content: <div>Detailed content here</div>,
  }

  it('renders title and summary when collapsed', () => {
    render(<ExpandableContent {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Brief summary text')).toBeInTheDocument()
    expect(screen.queryByText('Detailed content here')).not.toBeInTheDocument()
  })

  it('expands to show detailed content when clicked', () => {
    render(<ExpandableContent {...defaultProps} />)
    
    const button = screen.getByRole('button', { name: /test title/i })
    fireEvent.click(button)
    
    expect(screen.getByText('Detailed content here')).toBeInTheDocument()
    expect(screen.queryByText('Brief summary text')).not.toBeInTheDocument()
  })

  it('collapses when clicked again', () => {
    render(<ExpandableContent {...defaultProps} defaultExpanded />)
    
    const button = screen.getByRole('button', { name: /test title/i })
    fireEvent.click(button)
    
    expect(screen.queryByText('Detailed content here')).not.toBeInTheDocument()
  })

  it('supports keyboard navigation with Enter key', () => {
    render(<ExpandableContent {...defaultProps} />)
    
    const button = screen.getByRole('button', { name: /test title/i })
    fireEvent.keyDown(button, { key: 'Enter' })
    
    expect(screen.getByText('Detailed content here')).toBeInTheDocument()
  })

  it('supports keyboard navigation with Space key', () => {
    render(<ExpandableContent {...defaultProps} />)
    
    const button = screen.getByRole('button', { name: /test title/i })
    fireEvent.keyDown(button, { key: ' ' })
    
    expect(screen.getByText('Detailed content here')).toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    render(<ExpandableContent {...defaultProps} />)
    
    const button = screen.getByRole('button', { name: /test title/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-controls')
  })

  it('calls onExpandChange callback when toggled', () => {
    const onExpandChange = jest.fn()
    render(<ExpandableContent {...defaultProps} onExpandChange={onExpandChange} />)
    
    const button = screen.getByRole('button', { name: /test title/i })
    fireEvent.click(button)
    
    expect(onExpandChange).toHaveBeenCalledWith(true)
  })
})
