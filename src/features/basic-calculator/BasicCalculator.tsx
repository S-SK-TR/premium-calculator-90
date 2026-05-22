import { CalculatorDisplay } from './components/CalculatorDisplay'
import { CalculatorKeypad } from './components/CalculatorKeypad'
import { useBasicCalculator } from './hooks/useBasicCalculator'
import { motion } from 'framer-motion'

interface BasicCalculatorProps {
  className?: string
}

export function BasicCalculator({ className }: BasicCalculatorProps) {
  const {
    displayValue,
    inputDigit,
    inputDecimal,
    clear,
    toggleSign,
    inputPercent,
    performOperation
  } = useBasicCalculator()

  const handleButtonClick = (value: string) => {
    switch (value) {
      case 'C':
        clear()
        break
      case '+/-':
        toggleSign()
        break
      case '%':
        inputPercent()
        break
      case '.':
        inputDecimal()
        break
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        performOperation(value)
        break
      default:
        inputDigit(value)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-md mx-auto p-4 ${className}`}
    >
      <CalculatorDisplay value={displayValue} />
      <div className="mt-4">
        <CalculatorKeypad onButtonClick={handleButtonClick} />
      </div>
    </motion.div>
  )
}