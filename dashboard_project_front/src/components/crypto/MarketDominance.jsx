import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import GlassCard from '../ui/GlassCard'
import { formatMarketCap } from '../../utils/formatters'

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']

function renderLabel({ name, percent }) {
  return `${name} ${(percent).toFixed(1)}%`
}

export default function MarketDominance({ snapshots }) {
  if (!snapshots || snapshots.length === 0) {
    return null
  }

  const grouped = {}
  for (const snap of snapshots) {
    const key = snap.coin?.coingecko_id || snap.coin
    if (!grouped[key] || new Date(snap.timestamp) > new Date(grouped[key].timestamp)) {
      grouped[key] = snap
    }
  }

  const totalMarketCap = Object.values(grouped).reduce((sum, s) => sum + (s.market_cap || 0), 0)

  const data = Object.entries(grouped)
    .map(([id, snap]) => ({
      name: snap.coin?.name || id,
      value: snap.market_cap || 0,
      percent: totalMarketCap > 0 ? ((snap.market_cap || 0) / totalMarketCap) * 100 : 0,
      symbol: snap.coin?.symbol || '',
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <GlassCard className="mb-6">
      <h2 className="font-heading font-semibold text-sm text-text-primary mb-4">
        Dominancia de Mercado
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="size-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(13, 13, 26, 0.9)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(16px)',
                  fontSize: '13px',
                }}
                formatter={(value, name, props) => [
                  `${formatMarketCap(value)} (${props.payload.percent.toFixed(1)}%)`,
                  props.payload.name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full space-y-2">
          {data.slice(0, 6).map((item, i) => (
            <div key={item.name} className="flex items-center gap-3">
              <span
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="flex-1 text-sm text-text-primary truncate">
                {item.name}
              </span>
              <span className="text-xs text-text-secondary tabular-nums w-16 text-right">
                {item.percent.toFixed(1)}%
              </span>
              <div className="w-20 h-1.5 bg-glass rounded-full overflow-hidden hidden sm:block">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(item.percent, 100)}%`,
                    backgroundColor: COLORS[i % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
