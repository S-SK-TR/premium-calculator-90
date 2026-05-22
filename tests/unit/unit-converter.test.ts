import { renderHook, act } from '@testing-library/react';
import { useUnitConverter } from '@/features/unit-converter/hooks/useUnitConverter';

describe('useUnitConverter', () => {
  it('should convert meters to feet correctly', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    act(() => {
      result.current.setFromValue('1');
      result.current.setFromUnit('m');
      result.current.setToUnit('ft');
    });
    
    expect(result.current.convertedValue).toBeCloseTo(3.28084, 5);
  });

  it('should convert kilograms to pounds correctly', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    act(() => {
      result.current.setFromValue('1');
      result.current.setFromUnit('kg');
      result.current.setToUnit('lb');
    });
    
    expect(result.current.convertedValue).toBeCloseTo(2.20462, 5);
  });

  it('should convert Celsius to Fahrenheit correctly', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    act(() => {
      result.current.setFromValue('0');
      result.current.setFromUnit('°C');
      result.current.setToUnit('°F');
    });
    
    expect(result.current.convertedValue).toBe(32);
  });

  it('should handle empty input', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    act(() => {
      result.current.setFromValue('');
    });
    
    expect(result.current.convertedValue).toBe(0);
  });

  it('should handle invalid number input', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    act(() => {
      result.current.setFromValue('abc');
    });
    
    expect(result.current.convertedValue).toBe(0);
  });
});
