import { useState } from 'react'
import { Filter, RotateCcw } from 'lucide-react'

export default function FilterBar({ filters, onChange, onReset }) {
  const [open, setOpen] = useState(false)

  const activeCount = [
    filters.priceMin !== '',
    filters.priceMax !== '',
    filters.changeDir !== 'all',
    filters.marketCapMin !== '',
    filters.marketCapMax !== '',
  ].filter(Boolean).length

  return (
    <div className="border-b border-glass-border">
      <div className="px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          <Filter className="size-3.5" />
          Filtros
          {activeCount > 0 && (
            <span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </button>

        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            <RotateCcw className="size-3" />
            Restablecer
          </button>
        )}
      </div>

      {open && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Precio mínimo</label>
              <input
                type="number"
                step="any"
                placeholder="0"
                value={filters.priceMin}
                onChange={(e) => onChange({ ...filters, priceMin: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Precio máximo</label>
              <input
                type="number"
                step="any"
                placeholder="∞"
                value={filters.priceMax}
                onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Market Cap mínimo</label>
              <input
                type="number"
                step="any"
                placeholder="0"
                value={filters.marketCapMin}
                onChange={(e) => onChange({ ...filters, marketCapMin: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Market Cap máximo</label>
              <input
                type="number"
                step="any"
                placeholder="∞"
                value={filters.marketCapMax}
                onChange={(e) => onChange({ ...filters, marketCapMax: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Cambio 24h</label>
            <div className="flex gap-2">
              {(['all', 'positive', 'negative']).map((dir) => (
                <button
                  key={dir}
                  onClick={() => onChange({ ...filters, changeDir: dir })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filters.changeDir === dir
                      ? dir === 'all'
                        ? 'bg-primary/20 text-primary border border-primary/20'
                        : dir === 'positive'
                          ? 'bg-success/20 text-success border border-success/20'
                          : 'bg-danger/20 text-danger border border-danger/20'
                      : 'bg-glass text-text-muted border border-glass-border hover:text-text-secondary'
                  }`}
                >
                  {dir === 'all' ? 'Todos' : dir === 'positive' ? 'Positivo' : 'Negativo'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
