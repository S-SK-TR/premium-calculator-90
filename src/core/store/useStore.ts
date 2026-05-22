import { useStoreContext } from './store-context'

export function useStore() {
  const store = useStoreContext()
  return store
}