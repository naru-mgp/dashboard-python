import GlassCard from '../ui/GlassCard'
import LoadingSkeleton from '../ui/LoadingSkeleton'
import { formatPrice, formatDate } from '../../utils/formatters'

export default function HistoryTable({ history }) {
  if (!history) {
    return (
      <GlassCard>
        <LoadingSkeleton className="h-48" />
      </GlassCard>
    )
  }

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="px-4 py-3 border-b border-glass-border">
        <h2 className="font-heading font-semibold text-sm text-text-primary">
          Últimos Snapshots
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">
                Fecha
              </th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-text-muted uppercase tracking-wider">
                Precio
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border">
            {history.slice(0, 20).map((snap, i) => (
              <tr key={i} className="hover:bg-glass-hover transition-colors">
                <td className="px-4 py-2.5 text-text-secondary">
                  {formatDate(snap.timestamp)}
                </td>
                <td className="px-4 py-2.5 text-text-primary text-right font-medium tabular-nums">
                  {formatPrice(snap.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
