import { Card } from '@/core/components/ui/Card'
import { motion } from 'framer-motion'

interface GraphCanvasProps {
  width?: number
  height?: number
  className?: string
}

export function GraphCanvas({ width = 600, height = 400, className }: GraphCanvasProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full h-full bg-[var(--bg-surface)] rounded-xl p-4"
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-full"
            >
              {/* X ekseni */}
              <line
                x1="40"
                y1={height - 40}
                x2={width - 20}
                y2={height - 40}
                stroke="var(--text-muted)"
                strokeWidth="1"
              />
              {/* Y ekseni */}
              <line
                x1="40"
                y1="20"
                x2="40"
                y2={height - 40}
                stroke="var(--text-muted)"
                strokeWidth="1"
              />
              {/* Grafik çizgisi (örnek) */}
              <path
                d={`M40,${height - 40} L${width - 20},${height - 40}`}
                stroke="var(--brand-500)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Card>
  )
}