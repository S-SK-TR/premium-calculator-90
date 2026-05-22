import { useStore } from '@/core/store/useStore';

export const useBasicCalculator = () => {
  const {
    calculator,
    calculatorActions: {
      inputDigit,
      inputDecimal,
      clear,
      toggleSign,
      inputPercent,
      performOperation
    }
  } = useStore();

  return {
    displayValue: calculator.displayValue,
    previousValue: calculator.previousValue,
    operation: calculator.operation,
    waitingForOperand: calculator.waitingForOperand,
    inputDigit,
    inputDecimal,
    clear,
    toggleSign,
    inputPercent,
    performOperation
  };
};
