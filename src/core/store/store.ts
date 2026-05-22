import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HistoryItem {
  id: string
  expression: string
  result: string
  timestamp: string
}

interface UnitConversion {
  value: number
  fromUnit: string
  toUnit: string
  result: number | null
  timestamp: string
}

interface GraphDataPoint {
  x: number;
  y: number;
}

interface GraphState {
  dataPoints: GraphDataPoint[];
  isDrawing: boolean;
  currentLine: GraphDataPoint[];
}

interface StoreState {
  theme: 'light' | 'dark'
  mobileMenuOpen: boolean
  calculator: {
    displayValue: string
    previousValue: string | null
    operation: string | null
    waitingForOperand: boolean
  }
  scientificCalculator: {
    currentFunction: string
    result: string
  }
  history: HistoryItem[]
  unitConversions: UnitConversion[]
  graph: GraphState
}

interface StoreActions {
  setTheme: (theme: 'light' | 'dark') => void
  setMobileMenuOpen: (isOpen: boolean) => void
  calculatorActions: {
    inputDigit: (digit: string) => void
    inputDecimal: () => void
    clear: () => void
    toggleSign: () => void
    inputPercent: () => void
    performOperation: (nextOperation: string) => void
  }
  scientificCalculatorActions: {
    setCurrentFunction: (func: string) => void
    setResult: (result: string) => void
  }
  historyActions: {
    addHistoryItem: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void
    clearHistory: () => void
  }
  unitConverterActions: {
    addConversion: (conversion: Omit<UnitConversion, 'timestamp'>) => void
    clearConversions: () => void
  }
}

export const useStore = create<StoreState & StoreActions>()(
  persist(
    (set) => ({
      theme: 'dark',
      mobileMenuOpen: false,
      calculator: {
        displayValue: '0',
        previousValue: null,
        operation: null,
        waitingForOperand: false
      },
      scientificCalculator: {
        currentFunction: '',
        result: '0'
      },
      history: [],
      unitConversions: [],
      graph: {
        dataPoints: [],
        isDrawing: false,
        currentLine: []
      },
      setTheme: (theme) => set({ theme }),
      setMobileMenuOpen: (isOpen) => set({ mobileMenuOpen: isOpen }),
      calculatorActions: {
        inputDigit: (digit) => set((state) => {
          const { displayValue, waitingForOperand } = state.calculator
          if (waitingForOperand) {
            return {
              calculator: {
                ...state.calculator,
                displayValue: digit,
                waitingForOperand: false
              }
            }
          }
          return {
            calculator: {
              ...state.calculator,
              displayValue: displayValue === '0' ? digit : displayValue + digit
            }
          }
        }),
        inputDecimal: () => set((state) => {
          const { displayValue, waitingForOperand } = state.calculator
          if (waitingForOperand) {
            return {
              calculator: {
                ...state.calculator,
                displayValue: '0.',
                waitingForOperand: false
              }
            }
          }
          if (displayValue.indexOf('.') === -1) {
            return {
              calculator: {
                ...state.calculator,
                displayValue: displayValue + '.',
                waitingForOperand: false
              }
            }
          }
          return state
        }),
        clear: () => set((state) => ({
          calculator: {
            ...state.calculator,
            displayValue: '0',
            previousValue: null,
            operation: null,
            waitingForOperand: false
          }
        })),
        toggleSign: () => set((state) => ({
          calculator: {
            ...state.calculator,
            displayValue: state.calculator.displayValue.charAt(0) === '-' ?
              state.calculator.displayValue.slice(1) :
              '-' + state.calculator.displayValue
          }
        })),
        inputPercent: () => set((state) => ({
          calculator: {
            ...state.calculator,
            displayValue: (parseFloat(state.calculator.displayValue) / 100).toString()
          }
        })),
        performOperation: (nextOperation) => set((state) => {
          const { displayValue, previousValue, operation } = state.calculator
          const inputValue = parseFloat(displayValue)

          if (previousValue == null) {
            return {
              calculator: {
                ...state.calculator,
                previousValue: inputValue,
                operation: nextOperation,
                waitingForOperand: true
              }
            }
          }

          if (operation) {
            const currentValue = previousValue || 0
            const newValue = performCalculation[currentValue, inputValue, operation]

            // Add to history
            const historyItem = {
              expression: `${currentValue} ${operation} ${inputValue}`,
              result: String(newValue)
            }
            set((state) => ({
              history: [
                {
                  id: Date.now().toString(),
                  timestamp: new Date().toISOString(),
                  ...historyItem
                },
                ...state.history
              ]
            }))

            return {
              calculator: {
                ...state.calculator,
                displayValue: String(newValue),
                previousValue: newValue,
                operation: nextOperation,
                waitingForOperand: true
              }
            }
          }

          return {
            calculator: {
              ...state.calculator,
              operation: nextOperation,
              waitingForOperand: true
            }
          }
        })
      },
      scientificCalculatorActions: {
        setCurrentFunction: (func) => set((state) => ({
          scientificCalculator: {
            ...state.scientificCalculator,
            currentFunction: func
          }
        })),
        setResult: (result) => set((state) => ({
          scientificCalculator: {
            ...state.scientificCalculator,
            result: result
          }
        }))
      },
      historyActions: {
        addHistoryItem: (item) => set((state) => ({
          history: [
            {
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
              ...item
            },
            ...state.history
          ]
        })),
        clearHistory: () => set({ history: [] })
      },
      unitConverterActions: {
        addConversion: (conversion) => set((state) => ({
          unitConversions: [
            {
              ...conversion,
              timestamp: new Date().toISOString()
            },
            ...state.unitConversions
          ]
        })),
        clearConversions: () => set({ unitConversions: [] })
      }
    }),
    {
      name: 'premium-calculator-store',
      partialize: (state) => ({
        theme: state.theme,
        history: state.history,
        unitConversions: state.unitConversions,
        graph: state.graph
      })
    }
  )
)

const performCalculation = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => a / b,
  '=': (a: number, b: number) => b
}