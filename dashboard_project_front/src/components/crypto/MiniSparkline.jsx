import { useMemo } from 'react'

export default function MiniSparkline({ data, color = '#6366f1', width = 80, height = 32 }) {
  const path = useMemo(() => {
    if (!data || data.length < 2) return ''
    const prices = data.map((d) => d.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const range = max - min || 1

    const padding = 2
    const plotWidth = width - padding * 2
    const plotHeight = height - padding * 2

    return prices
      .map((price, i) => {
        const x = padding + (i / (prices.length - 1)) * plotWidth
        const y = padding + (1 - (price - min) / range) * plotHeight
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
  }, [data, width, height])

  if (!path) return <div style={{ width, height }} />

  const colorEnd = color === '#10b981' ? 'rgba(16,185,129,0)' : 'rgba(99,102,241,0)'

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={`${path} L${width - 2},${height} L2,${height} Z`}
        fill={`url(#grad-${color.replace('#', '')})`}
      />
    </svg>
  )
}
