import { createContext, useContext } from 'react'
import { useStore } from './store'

const StoreContext = createContext<ReturnType<typeof useStore> | null>(null)

interface StoreProviderProps {
  children: React.ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={useStore()}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStoreContext() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider')
  }
  return context
}