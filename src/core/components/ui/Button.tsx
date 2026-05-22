import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/shared/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'calculator' | 'scientific'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ElementType
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  icon: Icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20': variant === 'primary',
          'bg-[var(--bg-elevated)] hover:bg-[var(--border)] text-[var(--text-primary)] border border-[var(--border)]': variant === 'secondary',
          'hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]': variant === 'ghost',
          'bg-rose-600 hover:bg-rose-500 text-white': variant === 'destructive',
          'bg-gray-800 hover:bg-gray-700 text-white': variant === 'calculator',
          'bg-purple-600 hover:bg-purple-500 text-white': variant === 'scientific',
          'h-8 px-3 text-xs': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </motion.button>
  )
}