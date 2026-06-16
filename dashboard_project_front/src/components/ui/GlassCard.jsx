export default function GlassCard({ children, className = '', hover = false, glow = false }) {
  return (
    <div
      className={`
        bg-glass border border-glass-border rounded-2xl p-5
        backdrop-blur-xl
        ${hover ? 'transition-all duration-300 hover:bg-glass-hover hover:border-primary/20 hover:-translate-y-0.5 cursor-pointer' : ''}
        ${glow ? 'animate-glow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
