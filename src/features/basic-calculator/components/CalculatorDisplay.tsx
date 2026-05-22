import { Card } from '@/core/components/ui/Card'
import { useStore } from '@/core/store/useStore'
import { motion } from 'framer-motion'

interface CalculatorDisplayProps {
  className?: string
}

export function CalculatorDisplay({ className }: CalculatorDisplayProps) {
  const { currentExpression, result } = useStore(state => ({
    currentExpression: state.calculator.currentExpression,
    result: state.calculator.result
  }))

  return (
    <Card className={`glass-card p-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-end gap-2"
      >
        <div className="text-2xl font-mono text-slate-400 min-h-[32px] overflow-hidden">
          {currentExpression || ' '}
        </div>
        <div className="text-4xl font-bold font-mono text-white">
          {result !== null ? result : '0'}
        </div>
      </motion.div>
    </Card>
  )
}