import { NavLink, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  LineChart,
  X,
  Star,
  TrendingUp,
  History,
  ChevronRight,
} from 'lucide-react'
import { formatPrice, formatPercent } from '../../utils/formatters'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
]

export default function Sidebar({ open, onClose, changes, favorites, recent }) {
  const { pathname } = useLocation()
  const inCoinDetail = pathname.startsWith('/coin/')

  const topCoins = changes
    ? Object.entries(changes)
        .sort(([, a], [, b]) => (b.marketCap || 0) - (a.marketCap || 0))
        .slice(0, 5)
    : []

  const favoriteCount = favorites.length

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-30 h-screen
          w-64 bg-surface-light/80 backdrop-blur-2xl
          border-r border-glass-border
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
              <LineChart className="size-4 text-white" />
            </div>
            <span className="font-heading font-semibold text-lg text-text-primary">
              CryptoDash
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-glass transition-colors"
          >
            <X className="size-5 text-text-secondary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <nav className="p-3 space-y-1">
            <p className="px-3 pt-3 pb-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Navegación
            </p>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-glass'
                  }`
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </NavLink>
            ))}

            <Link
              to={favoriteCount > 0 ? '/?favorites=true' : '/'}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-glass`}
            >
              <Star className="size-4" />
              <span>Favoritas</span>
              {favoriteCount > 0 && (
                <span className="ml-auto text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                  {favoriteCount}
                </span>
              )}
            </Link>
          </nav>

          {inCoinDetail && (
            <nav className="px-3 pb-2">
              <p className="px-3 pt-2 pb-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                Acción
              </p>
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-glass"
              >
                <LayoutDashboard className="size-4" />
                Volver al Dashboard
                <ChevronRight className="size-3.5 ml-auto" />
              </Link>
            </nav>
          )}

          {topCoins.length > 0 && (
            <div className="px-3 pb-2">
              <p className="px-3 pt-2 pb-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                Top Market Cap
              </p>
              <div className="space-y-0.5">
                {topCoins.map(([id, data]) => (
                  <Link
                    key={id}
                    to={`/coin/${id}`}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                      pathname === `/coin/${id}`
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-glass'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {data.coin?.name || id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs tabular-nums text-text-primary">
                        {formatPrice(data.latestPrice)}
                      </p>
                      {data.changePercent !== 0 && (
                        <p className={`text-xs tabular-nums ${data.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                          {formatPercent(data.changePercent)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {recent.length > 0 && (
            <div className="px-3 pb-2">
              <p className="px-3 pt-2 pb-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <History className="size-3" />
                Recientes
              </p>
              <div className="space-y-0.5">
                {recent.map((coin) => (
                  <Link
                    key={coin.id}
                    to={`/coin/${coin.id}`}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                      pathname === `/coin/${coin.id}`
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-glass'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{coin.name}</p>
                      <p className="text-xs text-text-muted uppercase">{coin.symbol}</p>
                    </div>
                    <ChevronRight className="size-3 text-text-muted" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-glass-border space-y-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <TrendingUp className="size-3 text-success" />
            <span className="flex-1">Datos en tiempo real</span>
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
          </div>
          <p className="text-xs text-text-muted">
            Datos vía CoinGecko
          </p>
        </div>
      </aside>
    </>
  )
}
