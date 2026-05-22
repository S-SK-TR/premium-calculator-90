import { renderHook, act } from '@testing-library/react';
import { useBasicCalculator } from '@/features/basic-calculator/hooks/useBasicCalculator';

describe('Basic Calculator Hook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useBasicCalculator());
    expect(result.current.displayValue).toBe('0');
    expect(result.current.operation).toBe(null);
    expect(result.current.previousValue).toBe(null);
  });

  it('should handle number input', () => {
    const { result } = renderHook(() => useBasicCalculator());
    act(() => result.current.handleNumberInput('5'));
    expect(result.current.displayValue).toBe('5');
    act(() => result.current.handleNumberInput('3'));
    expect(result.current.displayValue).toBe('53');
  });

  it('should handle decimal input', () => {
    const { result } = renderHook(() => useBasicCalculator());
    act(() => result.current.handleNumberInput('5'));
    act(() => result.current.handleDecimalInput());
    expect(result.current.displayValue).toBe('5.');
    act(() => result.current.handleNumberInput('3'));
    expect(result.current.displayValue).toBe('5.3');
  });

  it('should handle basic operations', () => {
    const { result } = renderHook(() => useBasicCalculator());
    act(() => result.current.handleNumberInput('10'));
    act(() => result.current.handleOperation('+'));
    act(() => result.current.handleNumberInput('5'));
    act(() => result.current.handleOperation('='));
    expect(result.current.displayValue).toBe('15');
  });

  it('should handle clear operation', () => {
    const { result } = renderHook(() => useBasicCalculator());
    act(() => result.current.handleNumberInput('10'));
    act(() => result.current.handleOperation('+'));
    act(() => result.current.handleClear());
    expect(result.current.displayValue).toBe('0');
    expect(result.current.operation).toBe(null);
    expect(result.current.previousValue).toBe(null);
  });

  it('should handle percentage operation', () => {
    const { result } = renderHook(() => useBasicCalculator());
    act(() => result.current.handleNumberInput('50'));
    act(() => result.current.handlePercentage());
    expect(result.current.displayValue).toBe('0.5');
  });

  it('should handle sign change', () => {
    const { result } = renderHook(() => useBasicCalculator());
    act(() => result.current.handleNumberInput('50'));
    act(() => result.current.handleSignChange());
    expect(result.current.displayValue).toBe('-50');
  });
});
