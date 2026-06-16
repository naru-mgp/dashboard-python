import { Link } from 'react-router-dom'
import GlassCard from '../ui/GlassCard'
import { formatPrice, formatPercent } from '../../utils/formatters'
import { TrendingUp, TrendingDown } from 'lucide-react'

function CoinMover({ coin, to }) {
  const isUp = coin.changePercent >= 0
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-glass-hover transition-colors"
    >
      <div className={`p-1.5 rounded-lg ${isUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
        {isUp ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-sm text-text-primary truncate">
          {coin.coin?.name || coin.id}
        </p>
        <p className="text-xs text-text-muted uppercase">
          {coin.coin?.symbol || ''}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-text-primary tabular-nums">
          {formatPrice(coin.latestPrice)}
        </p>
        <p className={`text-xs font-medium tabular-nums ${isUp ? 'text-success' : 'text-danger'}`}>
          {formatPercent(coin.changePercent)}
        </p>
      </div>
    </Link>
  )
}

export default function TopMovers({ gainers, losers }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="size-4 text-success" />
          <h2 className="font-heading font-semibold text-sm text-text-primary">
            Top Gainers
          </h2>
        </div>
        <div className="divide-y divide-glass-border">
          {gainers.length === 0 && (
            <p className="text-xs text-text-muted py-2">Sin datos</p>
          )}
          {gainers.map((coin) => (
            <CoinMover key={coin.id} coin={coin} to={`/coin/${coin.id}`} />
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="size-4 text-danger" />
          <h2 className="font-heading font-semibold text-sm text-text-primary">
            Top Losers
          </h2>
        </div>
        <div className="divide-y divide-glass-border">
          {losers.length === 0 && (
            <p className="text-xs text-text-muted py-2">Sin datos</p>
          )}
          {losers.map((coin) => (
            <CoinMover key={coin.id} coin={coin} to={`/coin/${coin.id}`} />
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
