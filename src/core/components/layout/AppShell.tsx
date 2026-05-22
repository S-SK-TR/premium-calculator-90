import { Outlet, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HelpCircle, Settings, Info, Menu, X, History } from 'lucide-react'
import { useStore } from '@/core/store/store'

const navItems = [
  { to: '/calculator', icon: HelpCircle, label: 'Hesap Makinesi' },
  { to: '/history', icon: History, label: 'Geçmiş' },
  { to: '/settings', icon: Settings, label: 'Ayarlar' },
  { to: '/about', icon: Info, label: 'Hakkında' }
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
}

// PREMIUM UI: Glassmorphism efektli premium tasarım
// PREMIUM UI: Mobil uyumlu responsive tasarım
// PREMIUM UI: Framer Motion ile dinamik animasyonlar

export function AppShell() {
  const { theme, setTheme, mobileMenuOpen, setMobileMenuOpen } = useStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    mobileMenuOpen: state.mobileMenuOpen,
    setMobileMenuOpen: state.setMobileMenuOpen
  }))

  return (
    <div className="flex h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-md">
        <div className="h-16 flex items-center justify-center border-b border-[var(--border)]">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Premium Calc</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive ? 'bg-[var(--brand-500)]/10 text-[var(--brand-500)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]/50 hover:text-[var(--text-primary)]'}
              `}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-md">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-elevated)]/50 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h2 className="text-lg font-semibold">Hesap Makinesi</h2>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg hover:bg-[var(--bg-elevated)]/50 transition-colors"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[var(--bg-surface)]/90 backdrop-blur-md border-t border-[var(--border)]">
        <div className="flex h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200
                ${isActive ? 'text-[var(--brand-500)]' : 'text-[var(--text-muted)]'}
              `}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 z-40 bg-[var(--bg-surface)]/95 backdrop-blur-md border-r border-[var(--border)] w-64"
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Premium Calc</h1>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[var(--bg-elevated)]/50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive ? 'bg-[var(--brand-500)]/10 text-[var(--brand-500)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]/50 hover:text-[var(--text-primary)]'}
                `}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  )
}