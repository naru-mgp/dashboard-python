import { formatPrice, formatPercent } from '../../utils/formatters'

export default function PriceDisplay({ price, change, size = 'md', showAnimation = false }) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-3xl font-bold',
    xl: 'text-4xl font-bold',
  }

  const changeColor = change >= 0 ? 'text-success' : 'text-danger'

  return (
    <div className="flex flex-col">
      <span className={`font-heading tracking-tight text-text-primary ${sizeClasses[size]}`}>
        {formatPrice(price)}
      </span>
      {change !== undefined && change !== null && (
        <span className={`text-sm font-medium ${changeColor} mt-0.5`}>
          {formatPercent(change)}
        </span>
      )}
    </div>
  )
}
