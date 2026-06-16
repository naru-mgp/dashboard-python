import { useState, useMemo } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Star } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import CoinRow from './CoinRow'
import LoadingSkeleton from '../ui/LoadingSkeleton'
import FilterBar from './FilterBar'

function groupLatestSnapshots(snapshots) {
  const grouped = {}
  for (const snap of snapshots) {
    const key = snap.coin?.coingecko_id || snap.coin
    if (key && !grouped[key]) {
      grouped[key] = snap
    }
  }
  return grouped
}



export default function CoinTable({ coins, snapshots, search = '', changes, favorites, onToggleFavorite, showFavoritesOnly, onToggleShowFavorites, filters, onFilterChange, onFilterReset }) {
  const [sortKey, setSortKey] = useState('marketCap')
  const [sortDir, setSortDir] = useState('desc')

  const latestSnapshots = snapshots ? groupLatestSnapshots(snapshots) : {}

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const SortIcon = ({ columnKey }) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="size-3 text-text-muted" />
    return sortDir === 'asc'
      ? <ArrowUp className="size-3 text-primary" />
      : <ArrowDown className="size-3 text-primary" />
  }

  const maxVolume = useMemo(() => {
    if (!snapshots) return 1
    return Math.max(...snapshots.map((s) => s.volume || 0), 1)
  }, [snapshots])

  const filtered = useMemo(() => {
    let list = coins || []

    list = list.filter(
      (c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol?.toLowerCase().includes(search.toLowerCase())
    )

    if (showFavoritesOnly) {
      list = list.filter((c) => favorites.includes(c.coingecko_id))
    }

    list = list.filter((c) => {
      const snap = latestSnapshots[c.coingecko_id]
      const price = snap?.price ?? 0
      const marketCap = snap?.market_cap ?? 0
      const change = changes?.[c.coingecko_id]?.changePercent ?? 0

      if (filters.priceMin !== '' && price < Number(filters.priceMin)) return false
      if (filters.priceMax !== '' && price > Number(filters.priceMax)) return false
      if (filters.marketCapMin !== '' && marketCap < Number(filters.marketCapMin)) return false
      if (filters.marketCapMax !== '' && marketCap > Number(filters.marketCapMax)) return false
      if (filters.changeDir === 'positive' && change <= 0) return false
      if (filters.changeDir === 'negative' && change >= 0) return false

      return true
    })

    const sorted = [...list].sort((a, b) => {
      const aSnap = latestSnapshots[a.coingecko_id]
      const bSnap = latestSnapshots[b.coingecko_id]
      const aChange = changes?.[a.coingecko_id]
      const bChange = changes?.[b.coingecko_id]

      let aVal = 0, bVal = 0
      switch (sortKey) {
        case 'price':
          aVal = aSnap?.price ?? 0
          bVal = bSnap?.price ?? 0
          break
        case 'marketCap':
          aVal = aSnap?.market_cap ?? 0
          bVal = bSnap?.market_cap ?? 0
          break
        case 'volume':
          aVal = aSnap?.volume ?? 0
          bVal = bSnap?.volume ?? 0
          break
        case 'change':
          aVal = aChange?.changePercent ?? 0
          bVal = bChange?.changePercent ?? 0
          break
      }
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal
    })

    return sorted
  }, [coins, search, sortKey, sortDir, latestSnapshots, changes, favorites, showFavoritesOnly, filters])

  if (!coins) {
    return (
      <GlassCard>
        <div className="space-y-4">
          <LoadingSkeleton className="h-12" count={6} />
        </div>
      </GlassCard>
    )
  }

  const favoriteCount = coins.filter((c) => favorites.includes(c.coingecko_id)).length

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="px-4 py-3 border-b border-glass-border flex items-center justify-between">
        <h2 className="font-heading font-semibold text-sm text-text-primary">Monedas</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleShowFavorites}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              showFavoritesOnly
                ? 'text-warning'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Star className={`size-3.5 ${showFavoritesOnly ? 'fill-warning' : ''}`} />
            {showFavoritesOnly ? `Favoritas (${favoriteCount})` : 'Favoritas'}
          </button>
          <span className="text-xs text-text-muted">{filtered.length} monedas</span>
        </div>
      </div>

      <FilterBar filters={filters} onChange={onFilterChange} onReset={onFilterReset} />

      <div className="flex items-center gap-4 px-4 py-2 border-b border-glass-border bg-glass/30">
        <div className="w-5 shrink-0" />
        <div className="flex-1" />
        <div className="hidden sm:block w-20" />
        <button
          onClick={() => handleSort('price')}
          className="flex items-center gap-1 text-right text-xs font-medium text-text-muted uppercase tracking-wider hover:text-text-secondary transition-colors"
        >
          Precio <SortIcon columnKey="price" />
        </button>
        <button
          onClick={() => handleSort('marketCap')}
          className="text-right w-24 hidden md:flex items-center justify-end gap-1 text-xs font-medium text-text-muted uppercase tracking-wider hover:text-text-secondary transition-colors"
        >
          Market Cap <SortIcon columnKey="marketCap" />
        </button>
        <button
          onClick={() => handleSort('volume')}
          className="text-right w-20 hidden lg:flex items-center justify-end gap-1 text-xs font-medium text-text-muted uppercase tracking-wider hover:text-text-secondary transition-colors"
        >
          Volumen <SortIcon columnKey="volume" />
        </button>
      </div>

      <div className="divide-y divide-glass-border">
        {filtered.map((coin) => (
          <CoinRow
            key={coin.coingecko_id || coin.name}
            coin={coin}
            snapshot={latestSnapshots[coin.coingecko_id]}
            changePercent={changes?.[coin.coingecko_id]?.changePercent}
            isFavorite={favorites.includes(coin.coingecko_id)}
            onToggleFavorite={onToggleFavorite}
            sortConfig={{ maxVolume }}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-text-muted text-sm">
          {showFavoritesOnly ? 'No tienes monedas favoritas aún' : 'No se encontraron monedas'}
        </div>
      )}
    </GlassCard>
  )
}
