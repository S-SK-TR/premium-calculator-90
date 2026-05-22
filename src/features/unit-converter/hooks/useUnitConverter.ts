import { useStore } from '@/core/store/useStore'

interface UnitConversion {
  value: number
  fromUnit: string
  toUnit: string
  result: number | null
  timestamp: string
}

export function useUnitConverter() {
  const {
    unitConversions,
    addUnitConversion,
    clearUnitConversions
  } = useStore((state) => ({
    unitConversions: state.unitConversions,
    addUnitConversion: state.unitConverterActions.addConversion,
    clearUnitConversions: state.unitConverterActions.clearConversions
  }))

  const convertUnits = (value: number, fromUnit: string, toUnit: string): number => {
    // Length conversions
    if (fromUnit === 'meter' && toUnit === 'feet') return value * 3.28084
    if (fromUnit === 'feet' && toUnit === 'meter') return value / 3.28084
    if (fromUnit === 'inch' && toUnit === 'feet') return value / 12
    if (fromUnit === 'feet' && toUnit === 'inch') return value * 12
    if (fromUnit === 'yard' && toUnit === 'feet') return value * 3
    if (fromUnit === 'feet' && toUnit === 'yard') return value / 3

    // Weight conversions
    if (fromUnit === 'kilogram' && toUnit === 'pound') return value * 2.20462
    if (fromUnit === 'pound' && toUnit === 'kilogram') return value / 2.20462
    if (fromUnit === 'gram' && toUnit === 'ounce') return value * 0.035274
    if (fromUnit === 'ounce' && toUnit === 'gram') return value / 0.035274

    // Temperature conversions
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (value * 9/5) + 32
    if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return (value - 32) * 5/9
    if (fromUnit === 'celsius' && toUnit === 'kelvin') return value + 273.15
    if (fromUnit === 'kelvin' && toUnit === 'celsius') return value - 273.15
    if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return ((value - 32) * 5/9) + 273.15
    if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return ((value - 273.15) * 9/5) + 32

    return value // Same unit
  }

  const handleConvert = (value: number, fromUnit: string, toUnit: string) => {
    const result = convertUnits(value, fromUnit, toUnit)
    const conversion: UnitConversion = {
      value,
      fromUnit,
      toUnit,
      result,
      timestamp: new Date().toISOString()
    }
    addUnitConversion(conversion)
    return result
  }

  return {
    unitConversions,
    convertUnits: handleConvert,
    clearConversions: clearUnitConversions
  }
}