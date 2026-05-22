import { useStore } from '@/core/store/useStore';

export const useHistory = () => {
  const history = useStore((state) => state.history);
  const addHistoryItem = useStore((state) => state.historyActions.addHistoryItem);
  const clearHistory = useStore((state) => state.historyActions.clearHistory);

  return {
    history,
    addHistoryItem,
    clearHistory
  };
};