import { Card } from '@/core/components/ui/Card'
import { useStore } from '@/core/store'

interface FunctionDisplayProps {
  className?: string
}

export function FunctionDisplay({ className }: FunctionDisplayProps) {
  const { currentFunction, result } = useStore(state => state.scientificCalculator)

  return (
    <Card className={`p-4 text-right ${className}`}>
      <div className="text-sm text-gray-500 dark:text-gray-400 h-5">
        {currentFunction || ' '}
      </div>
      <div className="text-2xl font-bold mt-1">
        {result || '0'}
      </div>
    </Card>
  )
}