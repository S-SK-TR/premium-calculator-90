import { HistoryList } from './components/HistoryList'
import { Card } from '@/core/components/ui/Card'

interface HistoryProps {
  className?: string
}

export function History({ className }: HistoryProps) {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <Card className="p-6">
        <HistoryList />
      </Card>
    </div>
  )
}