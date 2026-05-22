import { useStore } from '@/core/store/useStore';

interface GraphDataPoint {
  x: number;
  y: number;
}

interface GraphState {
  dataPoints: GraphDataPoint[];
  isDrawing: boolean;
  currentLine: GraphDataPoint[];
}

type GraphActions = {
  addDataPoint: (point: GraphDataPoint) => void;
  startDrawing: () => void;
  endDrawing: () => void;
  clearGraph: () => void;
};

export const useGraph = (): GraphState & GraphActions => {
  const store = useStore();

  const graphState = store((state) => state.graph || {
    dataPoints: [],
    isDrawing: false,
    currentLine: []
  });

  const addDataPoint = (point: GraphDataPoint) => {
    if (graphState.isDrawing) {
      store.setState((state) => ({
        graph: {
          ...state.graph,
          currentLine: [...state.graph.currentLine, point]
        }
      }));
    }
  };

  const startDrawing = () => {
    store.setState((state) => ({
      graph: {
        ...state.graph,
        isDrawing: true,
        currentLine: []
      }
    }));
  };

  const endDrawing = () => {
    store.setState((state) => ({
      graph: {
        ...state.graph,
        isDrawing: false,
        dataPoints: [...state.graph.dataPoints, ...state.graph.currentLine],
        currentLine: []
      }
    }));
  };

  const clearGraph = () => {
    store.setState((state) => ({
      graph: {
        ...state.graph,
        dataPoints: [],
        currentLine: []
      }
    }));
  };

  return {
    ...graphState,
    addDataPoint,
    startDrawing,
    endDrawing,
    clearGraph
  };
};
