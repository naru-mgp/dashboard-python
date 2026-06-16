import { useNavigate } from 'react-router-dom'
import { Menu, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react'
import SearchInput from '../ui/SearchInput'
import StatusBadge from '../ui/StatusBadge'
import Ticker from '../crypto/Ticker'

export default function Header({ onMenuClick, search, onSearchChange, isFetching, lastUpdate, onRefresh, snapshots }) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-2xl border-b border-glass-border">
      <div className="flex items-center gap-2 px-4 lg:px-6 h-16">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-glass transition-colors"
        >
          <Menu className="size-5 text-text-secondary" />
        </button>

        <div className="hidden sm:flex items-center gap-1 mr-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-lg hover:bg-glass transition-colors text-text-muted hover:text-text-primary"
            title="Atrás"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="p-1.5 rounded-lg hover:bg-glass transition-colors text-text-muted hover:text-text-primary"
            title="Adelante"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={onSearchChange} />
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <StatusBadge live={!isFetching} label={lastUpdate} />
        </div>

        <button
          onClick={onRefresh}
          disabled={isFetching}
          className="p-2 rounded-xl hover:bg-glass transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`size-4 text-text-secondary ${isFetching ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <Ticker snapshots={snapshots || []} />
    </header>
  )
}
