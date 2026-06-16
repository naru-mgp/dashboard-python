export function groupSnapshots(snapshots) {
  const grouped = {}
  for (const snap of snapshots) {
    const key = snap.coin?.coingecko_id || snap.coin
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(snap)
  }
  return grouped
}

export function calculatePriceChanges(snapshots) {
  const grouped = groupSnapshots(snapshots)
  const changes = {}

  for (const [coinId, snaps] of Object.entries(grouped)) {
    const sorted = [...snaps].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    if (sorted.length >= 2) {
      const latest = sorted[0].price
      const previous = sorted[1].price
      changes[coinId] = {
        change: latest - previous,
        changePercent: previous !== 0 ? ((latest - previous) / previous) * 100 : 0,
        latestPrice: latest,
        previousPrice: previous,
        volume: sorted[0].volume || 0,
        marketCap: sorted[0].market_cap || 0,
        coin: sorted[0].coin,
      }
    } else if (sorted.length === 1) {
      changes[coinId] = {
        change: 0,
        changePercent: 0,
        latestPrice: sorted[0].price,
        previousPrice: sorted[0].price,
        volume: sorted[0].volume || 0,
        marketCap: sorted[0].market_cap || 0,
        coin: sorted[0].coin,
      }
    }
  }

  return changes
}

export function getTopGainers(changes, count = 3) {
  return Object.entries(changes)
    .filter(([, data]) => data.changePercent > 0)
    .sort(([, a], [, b]) => b.changePercent - a.changePercent)
    .slice(0, count)
    .map(([id, data]) => ({ id, ...data }))
}

export function getTopLosers(changes, count = 3) {
  return Object.entries(changes)
    .filter(([, data]) => data.changePercent < 0)
    .sort(([, a], [, b]) => a.changePercent - b.changePercent)
    .slice(0, count)
    .map(([id, data]) => ({ id, ...data }))
}
