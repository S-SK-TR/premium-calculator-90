import { motion } from 'framer-motion'
import { GraphCanvas } from './components/GraphCanvas'
import { GraphControls } from './components/GraphControls'
import { useGraph } from './hooks/useGraph'

interface GraphProps {
  className?: string
}

export function Graph({ className }: GraphProps) {
  const { graphData, updateGraph, resetGraph } = useGraph()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col h-full ${className}`}
    >
      <div className="flex-1 overflow-hidden">
        <GraphCanvas data={graphData} />
      </div>
      <div className="p-4 border-t border-[var(--border)]">
        <GraphControls
          onUpdate={updateGraph}
          onReset={resetGraph}
        />
      </div>
    </motion.div>
  )
}