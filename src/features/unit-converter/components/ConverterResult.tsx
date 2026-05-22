import { Card } from '@/core/components/ui/Card'
import { motion } from 'framer-motion'

interface ConverterResultProps {
  result: string
  className?: string
}

export function ConverterResult({ result, className }: ConverterResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={className}
    >
      <Card className="p-6 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Sonuç</h3>
        <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg">
          <p className="font-mono text-lg font-medium text-[var(--text-primary)]">{result}</p>
        </div>
      </Card>
    </motion.div>
  )
}