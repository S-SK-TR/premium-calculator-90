import { motion } from 'framer-motion'
import { ConverterForm } from './components/ConverterForm'
import { ConverterResult } from './components/ConverterResult'
import { useUnitConverter } from './hooks/useUnitConverter'

interface UnitConverterProps {
  className?: string
}

export function UnitConverter({ className }: UnitConverterProps) {
  const {
    inputValue,
    outputValue,
    fromUnit,
    toUnit,
    category,
    handleInputChange,
    handleUnitChange,
    handleCategoryChange,
    swapUnits
  } = useUnitConverter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full ${className}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <ConverterForm
            inputValue={inputValue}
            fromUnit={fromUnit}
            toUnit={toUnit}
            category={category}
            onInputChange={handleInputChange}
            onUnitChange={handleUnitChange}
            onCategoryChange={handleCategoryChange}
            onSwapUnits={swapUnits}
          />
        </div>
        <div className="flex-1">
          <ConverterResult
            outputValue={outputValue}
            fromUnit={fromUnit}
            toUnit={toUnit}
          />
        </div>
      </div>
    </motion.div>
  )
}