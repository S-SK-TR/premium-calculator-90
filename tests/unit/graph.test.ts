import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Graph } from '@/features/graph/Graph'
import { GraphCanvas } from '@/features/graph/components/GraphCanvas'
import { GraphControls } from '@/features/graph/components/GraphControls'
import { useGraph } from '@/features/graph/hooks/useGraph'

// Mock the useGraph hook
vi.mock('@/features/graph/hooks/useGraph')

const mockUseGraph = {
  functionType: 'linear',
  setFunctionType: vi.fn(),
  xRange: [-10, 10],
  setXRange: vi.fn(),
  yRange: [-10, 10],
  setYRange: vi.fn(),
  gridLines: true,
  toggleGridLines: vi.fn(),
  zoom: 1,
  setZoom: vi.fn(),
  pan: { x: 0, y: 0 },
  setPan: vi.fn(),
  resetView: vi.fn(),
  canvasRef: { current: null }
}

beforeEach(() => {
  vi.mocked(useGraph).mockReturnValue(mockUseGraph)
})

describe('Graph Component', () => {
  it('renders GraphCanvas and GraphControls', () => {
    render(<Graph />)
    expect(screen.getByTestId('graph-canvas')).toBeInTheDocument()
    expect(screen.getByTestId('graph-controls')).toBeInTheDocument()
  })

  it('displays the correct function type in controls', () => {
    render(<Graph />)
    expect(screen.getByText('Linear')).toBeInTheDocument()
  })

  it('calls setFunctionType when function type changes', () => {
    render(<Graph />)
    fireEvent.change(screen.getByTestId('function-select'), { target: { value: 'quadratic' } })
    expect(mockUseGraph.setFunctionType).toHaveBeenCalledWith('quadratic')
  })

  it('toggles grid lines when button is clicked', () => {
    render(<Graph />)
    fireEvent.click(screen.getByTestId('grid-toggle'))
    expect(mockUseGraph.toggleGridLines).toHaveBeenCalled()
  })

  it('resets view when reset button is clicked', () => {
    render(<Graph />)
    fireEvent.click(screen.getByTestId('reset-button'))
    expect(mockUseGraph.resetView).toHaveBeenCalled()
  })
})

describe('GraphCanvas Component', () => {
  it('renders canvas element', () => {
    render(<GraphCanvas {...mockUseGraph} />)
    expect(screen.getByTestId('graph-canvas')).toBeInTheDocument()
  })

  it('draws grid lines when enabled', () => {
    const mockContext = {
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      strokeStyle: '',
      lineWidth: 0
    }
    const canvasRef = { current: { getContext: () => mockContext } }
    render(<GraphCanvas {...mockUseGraph} canvasRef={canvasRef} />)
    expect(mockContext.beginPath).toHaveBeenCalled()
  })
})

describe('GraphControls Component', () => {
  it('renders all control elements', () => {
    render(<GraphControls {...mockUseGraph} />)
    expect(screen.getByTestId('function-select')).toBeInTheDocument()
    expect(screen.getByTestId('grid-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('reset-button')).toBeInTheDocument()
  })

  it('displays current x and y ranges', () => {
    render(<GraphControls {...mockUseGraph} />)
    expect(screen.getByText('X Range: -10 to 10')).toBeInTheDocument()
    expect(screen.getByText('Y Range: -10 to 10')).toBeInTheDocument()
  })
})