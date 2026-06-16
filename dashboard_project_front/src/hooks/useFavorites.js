import { useState, useCallback } from 'react'

const STORAGE_KEY = 'crypto_favorites'

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites)

  const toggleFavorite = useCallback((coinId) => {
    setFavorites((prev) => {
      const next = prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (coinId) => favorites.includes(coinId),
    [favorites]
  )

  return { favorites, toggleFavorite, isFavorite }
}
