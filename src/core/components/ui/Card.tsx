import { motion } from 'framer-motion'
import { cn } from '@/shared/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Card({ header, children, footer, className, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        "glass-card bg-[var(--bg-surface)]/80 backdrop-blur-xl border border-[var(--border)]/30 rounded-2xl shadow-lg",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-[var(--border)]/20">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-[var(--border)]/20">
          {footer}
        </div>
      )}
    </motion.div>
  )
}