export default function StatusBadge({ live = false, label = 'Live' }) {
  return (
    <div className="flex items-center gap-2 text-xs text-text-secondary">
      <span className="relative flex size-2">
        {live && (
          <span className="absolute inline-flex size-full rounded-full bg-success opacity-75 animate-ping" />
        )}
        <span className={`relative inline-flex size-2 rounded-full ${live ? 'bg-success' : 'bg-text-muted'}`} />
      </span>
      {label}
    </div>
  )
}
