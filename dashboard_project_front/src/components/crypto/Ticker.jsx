import { useMemo } from 'react'
import { formatPrice } from '../../utils/formatters'

export default function Ticker({ snapshots }) {
  const items = useMemo(() => {
    if (!snapshots || snapshots.length === 0) return []
    const seen = new Set()
    const unique = []
    for (const snap of snapshots) {
      const key = snap.coin?.coingecko_id || snap.coin
      if (!seen.has(key)) {
        seen.add(key)
        unique.push({
          id: key,
          name: snap.coin?.symbol?.toUpperCase() || key,
          price: snap.price,
        })
      }
    }
    return unique
  }, [snapshots])

  if (items.length === 0) return null

  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden h-9 bg-surface-light/60 border-b border-glass-border">
      <div className="absolute inset-0 pointer-events-none z-10 w-8 bg-gradient-to-r from-surface-light to-transparent" />
      <div className="absolute inset-0 pointer-events-none z-10 right-0 w-8 bg-gradient-to-l from-surface-light to-transparent" />

      <div className="flex ticker-scroll h-full items-center">
        {doubled.map((item, i) => (
          <span
            key={`${item.id}-${i}`}
            className="inline-flex items-center gap-2 shrink-0 px-4 text-xs border-r border-glass-border last:border-r-0"
          >
            <span className="font-medium text-text-primary">{item.name}</span>
            <span className="tabular-nums text-text-secondary">{formatPrice(item.price)}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
