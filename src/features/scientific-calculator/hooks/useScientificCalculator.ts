import { useStore } from '@/core/store/useStore'

export const useScientificCalculator = () => {
  const {
    scientificCalculator: { currentFunction, result },
    scientificCalculatorActions: { setCurrentFunction, setResult }
  } = useStore()

  const calculateScientific = (value: string, func: string) => {
    const num = parseFloat(value)
    let calculatedResult: number

    switch (func) {
      case 'sin':
        calculatedResult = Math.sin(num)
        break
      case 'cos':
        calculatedResult = Math.cos(num)
        break
      case 'tan':
        calculatedResult = Math.tan(num)
        break
      case 'log':
        calculatedResult = Math.log10(num)
        break
      case 'ln':
        calculatedResult = Math.log(num)
        break
      case 'sqrt':
        calculatedResult = Math.sqrt(num)
        break
      case 'pow':
        calculatedResult = Math.pow(num, 2)
        break
      case 'pi':
        calculatedResult = Math.PI
        break
      case 'e':
        calculatedResult = Math.E
        break
      default:
        calculatedResult = num
    }

    setResult(calculatedResult.toString())
    setCurrentFunction(func)
  }

  const clearScientific = () => {
    setResult('0')
    setCurrentFunction('')
  }

  return {
    currentFunction,
    result,
    calculateScientific,
    clearScientific
  }
}