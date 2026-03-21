import { ReactNode } from 'react'

interface TerminalWindowProps {
  title?: string
  children: ReactNode
  className?: string
}

export function TerminalWindow({ title = 'TERMINAL', children, className = '' }: TerminalWindowProps) {
  return (
    <div
      className={`border border-primary/30 bg-[#0a192f] rounded-sm overflow-hidden ${className}`}
      role="region"
      aria-label={title}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card/80 border-b border-primary/20">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/60" aria-hidden="true" />
        </div>
        <span className="font-mono text-xs text-primary/70 tracking-widest">{title}</span>
        <div className="w-12" />
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-sm">{children}</div>
    </div>
  )
}
