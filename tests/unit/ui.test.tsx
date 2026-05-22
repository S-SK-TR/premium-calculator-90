import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/core/components/ui/Button'
import { Card } from '@/core/components/ui/Card'
import { Modal } from '@/core/components/ui/Modal'

// Mock Framer Motion animations
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>
  }
}))

describe('UI Components', () => {
  describe('Button', () => {
    it('renders correctly with default props', () => {
      render(<Button>Click Me</Button>)
      expect(screen.getByText('Click Me')).toBeInTheDocument()
    })

    it('handles click events', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click Me</Button>)
      fireEvent.click(screen.getByText('Click Me'))
      expect(handleClick).toHaveBeenCalled()
    })

    it('applies variant classes correctly', () => {
      const { container } = render(<Button variant="primary">Primary</Button>)
      expect(container.firstChild).toHaveClass('bg-blue-600')
    })
  })

  describe('Card', () => {
    it('renders children correctly', () => {
      render(<Card><div>Card Content</div></Card>)
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('applies glassmorphism classes', () => {
      const { container } = render(<Card><div>Glass Card</div></Card>)
      expect(container.firstChild).toHaveClass('backdrop-blur')
    })
  })

  describe('Modal', () => {
    it('renders when open', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      )
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(
        <Modal isOpen={false} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      )
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })

    it('calls onClose when clicking outside', () => {
      const handleClose = vi.fn()
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      )
      fireEvent.click(screen.getByTestId('modal-overlay'))
      expect(handleClose).toHaveBeenCalled()
    })
  })
})
