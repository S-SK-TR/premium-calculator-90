import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={cn(
              "relative z-10 bg-[var(--bg-surface)] rounded-2xl shadow-2xl border border-[var(--border)]",
              {
                'max-w-sm w-full': size === 'sm',
                'max-w-md w-full': size === 'md',
                'max-w-lg w-full': size === 'lg'
              },
              className
            )}
          >
            {/* Header */}
            {(title || onClose) && (
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                {title && (
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {title}
                  </h3>
                )}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
                    aria-label="Kapat"
                  >
                    <X size={18} className="text-[var(--text-muted)]" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}