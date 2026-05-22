import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { History } from '@/features/history/History'
import { HistoryList } from '@/features/history/components/HistoryList'
import { HistoryItem } from '@/features/history/components/HistoryItem'
import { useHistory } from '@/features/history/hooks/useHistory'

// Mock the useHistory hook
vi.mock('@/features/history/hooks/useHistory')

const mockHistoryItems = [
  { id: '1', expression: '2+2', result: '4', timestamp: new Date().toISOString() },
  { id: '2', expression: '3*5', result: '15', timestamp: new Date().toISOString() }
]

describe('History Component', () => {
  beforeEach(() => {
    vi.mocked(useHistory).mockReturnValue({
      history: mockHistoryItems,
      clearHistory: vi.fn()
    })
  })

  it('renders history list with items', () => {
    render(<History />)
    expect(screen.getByText('2+2')).toBeInTheDocument()
    expect(screen.getByText('3*5')).toBeInTheDocument()
  })

  it('displays empty state when no history', () => {
    vi.mocked(useHistory).mockReturnValue({
      history: [],
      clearHistory: vi.fn()
    })
    render(<History />)
    expect(screen.getByText('Henüz geçmiş işlem yok')).toBeInTheDocument()
  })

  it('clears history when button is clicked', () => {
    const clearMock = vi.fn()
    vi.mocked(useHistory).mockReturnValue({
      history: mockHistoryItems,
      clearHistory: clearMock
    })
    render(<History />)
    screen.getByText('Geçmişi Temizle').click()
    expect(clearMock).toHaveBeenCalled()
  })
})

describe('HistoryList Component', () => {
  it('renders list of history items', () => {
    render(<HistoryList items={mockHistoryItems} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})

describe('HistoryItem Component', () => {
  it('displays expression and result', () => {
    render(<HistoryItem item={mockHistoryItems[0]} />)
    expect(screen.getByText('2+2')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
