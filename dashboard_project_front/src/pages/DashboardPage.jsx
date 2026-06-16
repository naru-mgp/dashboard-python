import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useCoins } from '../hooks/useCoins'
import MarketOverview from '../components/crypto/MarketOverview'
import CoinTable from '../components/crypto/CoinTable'
import TopMovers from '../components/crypto/TopMovers'
import MarketDominance from '../components/crypto/MarketDominance'
import { getTopGainers, getTopLosers } from '../utils/coinUtils'

const DEFAULT_FILTERS = {
  priceMin: '',
  priceMax: '',
  changeDir: 'all',
  marketCapMin: '',
  marketCapMax: '',
}

function applyFilters(snapshots, filters, changes) {
  if (!snapshots || snapshots.length === 0) return []

  const latest = {}
  for (const snap of snapshots) {
    const key = snap.coin?.coingecko_id || snap.coin
    if (key && !latest[key]) latest[key] = snap
  }

  return Object.entries(latest).filter(([id, snap]) => {
    if (filters.priceMin !== '' && (snap.price ?? 0) < Number(filters.priceMin)) return false
    if (filters.priceMax !== '' && (snap.price ?? 0) > Number(filters.priceMax)) return false
    if (filters.marketCapMin !== '' && (snap.market_cap ?? 0) < Number(filters.marketCapMin)) return false
    if (filters.marketCapMax !== '' && (snap.market_cap ?? 0) > Number(filters.marketCapMax)) return false

    const change = changes?.[id]
    if (filters.changeDir === 'positive' && (change?.changePercent ?? 0) <= 0) return false
    if (filters.changeDir === 'negative' && (change?.changePercent ?? 0) >= 0) return false

    return true
  }).flatMap(([, snap]) => snap)
}

export default function DashboardPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const { search, snapshots, changes, favorites, toggleFavorite, showFavoritesOnly, setShowFavoritesOnly } = useOutletContext()
  const { data: coins } = useCoins()

  const gainers = useMemo(() => getTopGainers(changes || {}), [changes])
  const losers = useMemo(() => getTopLosers(changes || {}), [changes])

  const filteredSnapshots = useMemo(
    () => applyFilters(snapshots || [], filters, changes),
    [snapshots, filters, changes]
  )

  const handleFilterChange = (next) => setFilters(next)
  const handleFilterReset = () => setFilters(DEFAULT_FILTERS)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text-primary">
          Dashboard
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Resumen del mercado de criptomonedas en tiempo real
        </p>
      </div>

      <MarketOverview snapshots={snapshots || []} />

      <TopMovers gainers={gainers} losers={losers} />

      <MarketDominance snapshots={filteredSnapshots.length > 0 ? filteredSnapshots : (snapshots || [])} />

      <CoinTable
        coins={coins}
        snapshots={snapshots}
        search={search}
        changes={changes}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        showFavoritesOnly={showFavoritesOnly}
        onToggleShowFavorites={() => setShowFavoritesOnly((prev) => !prev)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterReset={handleFilterReset}
      />
    </div>
  )
}
