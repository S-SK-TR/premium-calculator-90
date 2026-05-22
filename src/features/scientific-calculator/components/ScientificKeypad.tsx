import { Button } from '@/core/components/ui/Button'
import { useStore } from '@/core/store/useStore'
import { motion } from 'framer-motion'

interface ScientificKeypadProps {
  className?: string
}

export function ScientificKeypad({ className }: ScientificKeypadProps) {
  const { appendToExpression, calculateScientific } = useStore()

  const handleScientificOperation = (operation: string) => {
    appendToExpression(operation)
    calculateScientific(operation)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`grid grid-cols-4 gap-2 ${className}`}
    >
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('sin(')}
      >
        sin
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('cos(')}
      >
        cos
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('tan(')}
      >
        tan
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('log(')}
      >
        log
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('ln(')}
      >
        ln
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('π')}
      >
        π
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('e')}
      >
        e
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('^')}
      >
        x^y
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('sqrt(')}
      >
        √
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('(')}
      >
        (
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation(')')}
      >
        )
      </Button>
      <Button
        variant="calculator"
        onClick={() => handleScientificOperation('!')}
      >
        x!
      </Button>
    </motion.div>
  )
}