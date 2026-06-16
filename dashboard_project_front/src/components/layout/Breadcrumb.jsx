import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const LABELS = {
  '/': 'Dashboard',
}

export default function Breadcrumb({ coinName }) {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
      <Link to="/" className="hover:text-text-primary transition-colors">
        <Home className="size-3.5" />
      </Link>

      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1
        const label = isLast && coinName ? coinName : LABELS[`/${seg}`] || seg

        return (
          <span key={seg} className="flex items-center gap-1.5">
            <ChevronRight className="size-3" />
            {isLast ? (
              <span className="text-text-primary font-medium capitalize">{label}</span>
            ) : (
              <Link to={`/${seg}`} className="hover:text-text-primary transition-colors capitalize">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
