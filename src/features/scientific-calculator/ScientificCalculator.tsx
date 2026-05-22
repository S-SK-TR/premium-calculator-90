import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, HelpCircle } from 'lucide-react'
import { Card } from '@/core/components/ui/Card'
import { ScientificKeypad } from './components/ScientificKeypad'
import { FunctionDisplay } from './components/FunctionDisplay'
import { useScientificHelpCircle } from './hooks/useScientificHelpCircle'

interface ScientificHelpCircleProps {
  className?: string
}

export function ScientificHelpCircle({ className }: ScientificHelpCircleProps) {
  const {
    currentFunction,
    result,
    handleFunctionClick,
    handleCalculate
  } = useScientificHelpCircle()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col h-full ${className}`}
    >
      <div className="flex-1 flex flex-col gap-4 p-4">
        <Card className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-slate-800">
            <HelpCircle size={20} className="text-blue-400" />
            <h2 className="text-lg font-medium">Scientific Functions</h2>
          </div>
          <FunctionDisplay functionName={currentFunction} result={result} />
        </Card>

        <Card className="flex-1">
          <div className="flex items-center gap-2 p-4 border-b border-slate-800">
            <HelpCircle size={20} className="text-blue-400" />
            <h2 className="text-lg font-medium">Scientific Keypad</h2>
          </div>
          <ScientificKeypad
            onFunctionClick={handleFunctionClick}
            onCalculate={handleCalculate}
          />
        </Card>
      </div>
    </motion.div>
  )
}