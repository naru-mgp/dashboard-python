import GlassCard from '../ui/GlassCard'
import { formatMarketCap, formatVolume, formatPercent } from '../../utils/formatters'
import { usePrevious } from '../../hooks/usePrevious'
import { calculatePriceChanges } from '../../utils/coinUtils'

function StatCard({ label, value, color, change }) {
  const prevValue = usePrevious(value)
  const changed = prevValue !== undefined && prevValue !== value
  const isUp = value > prevValue
  const flashClass = changed ? (isUp ? 'animate-flash-up' : 'animate-flash-down') : ''

  return (
    <GlassCard className={changed ? 'animate-pulse-glow' : ''}>
      <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
        {label}
      </p>
      <p className={`text-xl lg:text-2xl font-heading font-bold ${color} transition-all`}>
        {value}
      </p>
      {change !== undefined && (
        <p className={`text-xs font-medium mt-1 ${change >= 0 ? 'text-success' : 'text-danger'}`}>
          {formatPercent(change)}
        </p>
      )}
    </GlassCard>
  )
}

export default function MarketOverview({ snapshots }) {
  const totalMarketCap = snapshots.reduce((acc, s) => acc + (s.market_cap || 0), 0)
  const totalVolume = snapshots.reduce((acc, s) => acc + (s.volume || 0), 0)
  const coinCount = new Set(snapshots.map((s) => s.coin?.coingecko_id || s.coin)).size

  const changes = calculatePriceChanges(snapshots)
  const allChanges = Object.values(changes)
  const avgChange = allChanges.length > 0
    ? allChanges.reduce((sum, c) => sum + c.changePercent, 0) / allChanges.length
    : 0

  const stats = [
    { label: 'Market Cap Total', value: formatMarketCap(totalMarketCap), color: 'text-cyan' },
    { label: 'Volumen 24h', value: formatVolume(totalVolume), color: 'text-primary' },
    { label: 'Monedas Activas', value: coinCount.toString(), color: 'text-success' },
    { label: 'Cambio Medio', value: formatPercent(avgChange), color: avgChange >= 0 ? 'text-success' : 'text-danger', change: avgChange },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
