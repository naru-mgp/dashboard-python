import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCoins } from '../hooks/useCoins'
import { useCoinHistory, useLastSnapshot } from '../hooks/useCoinHistory'
import PriceDisplay from '../components/ui/PriceDisplay'
import GlassCard from '../components/ui/GlassCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import StatusBadge from '../components/ui/StatusBadge'
import Breadcrumb from '../components/layout/Breadcrumb'
import PriceChart from '../components/crypto/PriceChart'
import HistoryTable from '../components/crypto/HistoryTable'
import { formatMarketCap, formatVolume } from '../utils/formatters'
import { useEffect } from 'react'

export default function CoinDetailPage() {
  const { coinId } = useParams()
  const navigate = useNavigate()
  const { addRecent } = useOutletContext()
  const { data: coins } = useCoins()
  const { data: history } = useCoinHistory(coinId)
  const { data: lastSnapshot, isFetching } = useLastSnapshot(coinId)

  const coin = coins?.find((c) => c.coingecko_id === coinId)
  const coinIndex = coins?.findIndex((c) => c.coingecko_id === coinId)
  const prevCoin = coinIndex > 0 ? coins[coinIndex - 1] : null
  const nextCoin = coinIndex !== -1 && coinIndex < (coins?.length || 0) - 1 ? coins[coinIndex + 1] : null

  useEffect(() => {
    if (coin) {
      addRecent(coin.coingecko_id, coin.name, coin.symbol)
    }
  }, [coin, addRecent])

  if (!coin) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <LoadingSkeleton className="h-4 w-32" />
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-64" />
      </div>
    )
  }

  const price = lastSnapshot?.price
  const marketCap = lastSnapshot?.market_cap

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <Breadcrumb coinName={coin.name} />
        <div className="flex items-center gap-1">
          {prevCoin && (
            <button
              onClick={() => navigate(`/coin/${prevCoin.coingecko_id}`)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-glass transition-colors"
            >
              <ChevronLeft className="size-3.5" />
              {prevCoin.symbol.toUpperCase()}
            </button>
          )}
          {nextCoin && (
            <button
              onClick={() => navigate(`/coin/${nextCoin.coingecko_id}`)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-glass transition-colors"
            >
              {nextCoin.symbol.toUpperCase()}
              <ChevronRight className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text-primary">
              {coin.name}
            </h1>
            <span className="text-sm font-medium text-text-muted uppercase bg-glass px-2.5 py-0.5 rounded-lg border border-glass-border">
              {coin.symbol}
            </span>
          </div>
          <StatusBadge live={!isFetching} label="Tiempo real" />
        </div>

        {price !== undefined && (
          <div className="text-right">
            <PriceDisplay price={price} size="xl" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
        <GlassCard>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
            Market Cap
          </p>
          <p className="text-lg font-heading font-bold text-text-primary">
            {formatMarketCap(marketCap)}
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
            Volumen 24h
          </p>
          <p className="text-lg font-heading font-bold text-text-primary">
            {formatVolume(lastSnapshot?.volume)}
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
            Snapshots
          </p>
          <p className="text-lg font-heading font-bold text-text-primary">
            {history?.length || 0}
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
            ID CoinGecko
          </p>
          <p className="text-sm font-mono text-text-primary truncate">
            {coin.coingecko_id}
          </p>
        </GlassCard>
      </div>

      <div className="mb-6">
        <PriceChart history={history} coinName={coin.name} />
      </div>

      <HistoryTable history={history} />
    </div>
  )
}
