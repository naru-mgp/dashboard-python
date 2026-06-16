import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import GlassCard from '../ui/GlassCard'
import LoadingSkeleton from '../ui/LoadingSkeleton'

function formatChartTime(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit' })
}

function formatTooltipPrice(value) {
  if (value >= 1) return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 6 })}`
}

function formatTooltipTime(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleString('es-ES')
}

export default function PriceChart({ history, coinName }) {
  if (!history) {
    return (
      <GlassCard>
        <LoadingSkeleton className="h-64" />
      </GlassCard>
    )
  }

  const chartData = [...history].reverse()

  const minPrice = Math.min(...chartData.map((d) => d.price))
  const maxPrice = Math.max(...chartData.map((d) => d.price))

  return (
    <GlassCard>
      <div className="mb-4">
        <h2 className="font-heading font-semibold text-sm text-text-primary">
          Historial de Precios {coinName ? `- ${coinName}` : ''}
        </h2>
        <p className="text-xs text-text-muted mt-0.5">
          Rango: ${minPrice.toLocaleString()} — ${maxPrice.toLocaleString()}
        </p>
      </div>

      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatChartTime}
              stroke="#475569"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
              stroke="#475569"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(13, 13, 26, 0.9)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                backdropFilter: 'blur(16px)',
                fontSize: '13px',
              }}
              labelFormatter={formatTooltipTime}
              formatter={(value) => [formatTooltipPrice(value), 'Precio']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
