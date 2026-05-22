import { Button } from '@/core/components/ui/Button'
import { HelpCircle } from 'lucide-react'

interface HelpCircleKeypadProps {
  onButtonClick: (value: string) => void
}

export function HelpCircleKeypad({ onButtonClick }: HelpCircleKeypadProps) {
  const buttons = [
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '/', label: '÷', variant: 'secondary' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '*', label: '×', variant: 'secondary' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '-', label: '-', variant: 'secondary' },
    { value: '0', label: '0' },
    { value: '.', label: '.' },
    { value: '=', label: '=', variant: 'primary' },
    { value: '+', label: '+', variant: 'secondary' },
    { value: 'C', label: 'C', variant: 'destructive' }
  ]

  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((button) => (
        <Button
          key={button.value}
          variant={button.variant || 'ghost'}
          size="lg"
          onClick={() => onButtonClick(button.value)}
          className={button.value === '0' ? 'col-span-2' : ''}
        >
          {button.label}
        </Button>
      ))}
    </div>
  )
}