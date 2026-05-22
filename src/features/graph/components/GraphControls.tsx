import { Button } from '@/core/components/ui/Button'
import { Card } from '@/core/components/ui/Card'
import { useStore } from '@/core/store/useStore'
import { motion } from 'framer-motion'
import { HelpCircle, BarChart, PieChart, ZoomIn, ZoomOut, RotateCcw, Save } from 'lucide-react'

interface GraphControlsProps {
  onChartTypeChange: (type: 'line' | 'bar' | 'pie') => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
  onSave: () => void
}

export function GraphControls({
  onChartTypeChange,
  onZoomIn,
  onZoomOut,
  onResetView,
  onSave
}: GraphControlsProps) {
  const { theme } = useStore()

  return (
    <Card className="p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChartTypeChange('line')}
          icon={HelpCircle}
        >
          Çizgi Grafik
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChartTypeChange('bar')}
          icon={BarChart}
        >
          Çubuk Grafik
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChartTypeChange('pie')}
          icon={PieChart}
        >
          Pasta Grafik
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onZoomIn}
          icon={ZoomIn}
        >
          Yakınlaştır
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onZoomOut}
          icon={ZoomOut}
        >
          Uzaklaştır
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onResetView}
          icon={RotateCcw}
        >
          Sıfırla
        </Button>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={onSave}
        icon={Save}
        className="w-full"
      >
        Grafiği Kaydet
      </Button>
    </Card>
  )
}