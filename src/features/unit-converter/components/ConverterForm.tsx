import { useState } from 'react'
import { Card } from '@/core/components/ui/Card'
import { Button } from '@/core/components/ui/Button'
import { motion } from 'framer-motion'
import { ConverterResult } from './ConverterResult'
import { useUnitConverter } from '../hooks/useUnitConverter'

interface UnitConverterProps {
  className?: string
}

export function ConverterForm({ className }: UnitConverterProps) {
  const [inputValue, setInputValue] = useState('')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('feet')
  const [result, setResult] = useState<string | null>(null)
  const { convertUnits } = useUnitConverter()

  const unitTypes = {
    length: ['meter', 'feet', 'inch', 'yard'],
    weight: ['kilogram', 'pound', 'gram', 'ounce'],
    temperature: ['celsius', 'fahrenheit', 'kelvin']
  }

  const handleConvert = () => {
    if (!inputValue) return

    const value = parseFloat(inputValue)
    const convertedValue = convertUnits(value, fromUnit, toUnit)
    setResult(`${value} ${fromUnit} = ${convertedValue?.toFixed(2)} ${toUnit}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Birim Dönüştürücü</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Değer</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 border rounded-lg bg-[var(--bg-surface)] border-[var(--border)]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dönüştürülecek Birim</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2 border rounded-lg bg-[var(--bg-surface)] border-[var(--border)]"
              >
                {Object.entries(unitTypes).map(([category, units]) => (
                  <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Hedef Birim</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2 border rounded-lg bg-[var(--bg-surface)] border-[var(--border)]"
              >
                {Object.entries(unitTypes).map(([category, units]) => (
                  <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <Button
            onClick={handleConvert}
            className="w-full md:w-auto"
          >
            Dönüştür
          </Button>

          {result && (
            <ConverterResult result={result} />
          )}
        </div>
      </Card>
    </motion.div>
  )
}