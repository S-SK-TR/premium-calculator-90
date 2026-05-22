import { useStore } from '@/core/store/useStore'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import { History } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { HistoryItem } from './HistoryItem'

interface HistoryListProps {
  className?: string
}

export function HistoryList({ className }: HistoryListProps) {
  const { history, historyActions } = useStore((state) => ({
    history: state.history,
    historyActions: state.historyActions
  }))

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <History size={20} />
          Geçmiş İşlemler
        </h2>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => historyActions.clearHistory()}
          >
            Temizle
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-500">Henüz geçmiş işlem yok</p>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <AnimatePresence>
            {history.map((item) => (
              <HistoryItem
                key={item.id}
                id={item.id}
                expression={item.expression}
                result={item.result}
                timestamp={item.timestamp}
                onDelete={historyActions.removeHistoryItem}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}