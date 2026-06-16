import { Search } from 'lucide-react'

export default function SearchInput({ value, onChange, placeholder = 'Buscar moneda...' }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full bg-glass border border-glass-border rounded-xl
          pl-10 pr-4 py-2.5 text-sm text-text-primary
          placeholder:text-text-muted
          focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20
          transition-all duration-200
        "
      />
    </div>
  )
}
