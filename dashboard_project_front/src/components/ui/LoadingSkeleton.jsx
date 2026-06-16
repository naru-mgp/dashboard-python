export default function LoadingSkeleton({ className = '', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            bg-glass border border-glass-border rounded-xl
            overflow-hidden relative
            ${className}
          `}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        </div>
      ))}
    </>
  )
}
