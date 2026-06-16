import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { formatPrice, formatMarketCap, formatPercent } from '../../utils/formatters'
import { usePrevious } from '../../hooks/usePrevious'
import MiniSparkline from './MiniSparkline'

function PriceCell({ price, changePercent }) {
  const prevPrice = usePrevious(price)
  const changed = prevPrice !== undefined && prevPrice !== price
  const isUp = price > prevPrice
  const flashClass = changed ? (isUp ? 'animate-flash-up' : 'animate-flash-down') : ''

  return (
    <div className={`text-right px-2 py-1 rounded-lg transition-colors ${flashClass}`}>
      <p className="font-medium text-sm text-text-primary tabular-nums">
        {formatPrice(price)}
      </p>
      {changePercent !== undefined && (
        <p className={`text-xs font-medium tabular-nums ${changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
          {formatPercent(changePercent)}
        </p>
      )}
    </div>
  )
}

export default function CoinRow({ coin, snapshot, history, changePercent, isFavorite, onToggleFavorite, sortConfig }) {
  const coinId = coin.coingecko_id || coin
  const coinName = coin.name || ''
  const coinSymbol = coin.symbol || ''
  const price = snapshot?.price ?? 0
  const marketCap = snapshot?.market_cap ?? 0
  const volume = snapshot?.volume ?? 0

  const maxVolume = sortConfig?.maxVolume || 1
  const volumePercent = (volume / maxVolume) * 100

  const color = changePercent >= 0 ? '#10b981' : '#6366f1'

  return (
    <div
      className="
        flex items-center gap-4 px-4 py-3
        border-b border-glass-border last:border-b-0
        hover:bg-glass-hover transition-colors duration-150
        group
      "
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          onToggleFavorite(coinId)
        }}
        className="p-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Star
          className={`size-3.5 ${isFavorite ? 'text-warning fill-warning opacity-100' : 'text-text-muted'}`}
        />
      </button>

      <Link to={`/coin/${coinId}`} className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex-1 min-w-0">
          <p className="font-heading font-semibold text-sm text-text-primary truncate">
            {coinName}
          </p>
          <p className="text-xs text-text-muted uppercase">{coinSymbol}</p>
        </div>

        {history && history.length > 0 && (
          <div className="hidden sm:block">
            <MiniSparkline data={history} color={color} />
          </div>
        )}

        <PriceCell price={price} changePercent={changePercent} />

        <div className="text-right w-24 hidden md:block">
          <p className="text-sm text-text-secondary tabular-nums">
            {formatMarketCap(marketCap)}
          </p>
        </div>

        <div className="text-right w-20 hidden lg:block">
          <div className="flex items-center gap-1.5 justify-end">
            <div className="w-12 h-1.5 bg-glass rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/60 transition-all duration-300"
                style={{ width: `${volumePercent}%` }}
              />
            </div>
            <span className="text-xs text-text-muted tabular-nums w-14">
              {formatMarketCap(volume)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
