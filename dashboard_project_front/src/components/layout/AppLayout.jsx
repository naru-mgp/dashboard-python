import { useState, useMemo, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSnapshots } from '../../hooks/useSnapshots'
import { useFavorites } from '../../hooks/useFavorites'
import { useRecentCoins } from '../../hooks/useRecentCoins'
import { calculatePriceChanges } from '../../utils/coinUtils'
import { formatTimestamp } from '../../utils/formatters'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { data: snapshots, isFetching, dataUpdatedAt, refetch } = useSnapshots()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { recent, addRecent } = useRecentCoins()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('favorites') === 'true') {
      setShowFavoritesOnly(true)
      setSearch('')
    }
  }, [location.search])

  const changes = useMemo(() => {
    if (!snapshots) return {}
    return calculatePriceChanges(snapshots)
  }, [snapshots])

  const lastUpdate = dataUpdatedAt ? formatTimestamp(new Date(dataUpdatedAt).toISOString()) : ''

  return (
    <div className="flex min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        changes={changes}
        favorites={favorites}
        recent={recent}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          search={search}
          onSearchChange={setSearch}
          isFetching={isFetching}
          lastUpdate={lastUpdate}
          onRefresh={refetch}
          snapshots={snapshots}
        />

        <main className="flex-1 p-4 lg:p-6">
          <Outlet context={{
            search,
            snapshots,
            changes,
            favorites,
            toggleFavorite,
            isFavorite,
            showFavoritesOnly,
            setShowFavoritesOnly,
            addRecent,
            recent,
          }} />
        </main>
      </div>
    </div>
  )
}
