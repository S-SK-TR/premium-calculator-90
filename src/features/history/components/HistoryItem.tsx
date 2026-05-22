import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import { motion } from 'framer-motion'
import { History } from 'lucide-react'

interface HistoryItemProps {
  id: string
  expression: string
  result: string
  timestamp: string
  onDelete: (id: string) => void
}

export function HistoryItem({ id, expression, result, timestamp, onDelete }: HistoryItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 hover:shadow-lg transition-shadow duration-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              {new Date(timestamp).toLocaleString('tr-TR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="font-mono text-lg">{expression}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-xl font-bold">{result}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              aria-label="Geçmiş öğesini sil"
            >
              <History size={16} className="text-red-500" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}