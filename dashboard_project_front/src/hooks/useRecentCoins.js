import { useState, useCallback } from 'react'

const STORAGE_KEY = 'crypto_recent'
const MAX_RECENT = 5

function loadRecent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useRecentCoins() {
  const [recent, setRecent] = useState(loadRecent)

  const addRecent = useCallback((coinId, coinName, coinSymbol) => {
    setRecent((prev) => {
      const filtered = prev.filter((c) => c.id !== coinId)
      const next = [{ id: coinId, name: coinName, symbol: coinSymbol }, ...filtered].slice(0, MAX_RECENT)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { recent, addRecent }
}
