import { ReactNode } from 'react'
import { NavigationBar } from './NavigationBar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background grid-overlay">
      {/* Global scanline effect */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-40" />

      {/* Vignette effect */}
      <div className="vignette fixed inset-0 pointer-events-none z-40" />

      {/* HUD Corner Brackets (Top corners) */}
      <div className="fixed top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 pointer-events-none z-40" />
      <div className="fixed top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/30 pointer-events-none z-40" />

      {/* HUD Corner Brackets (Bottom corners) */}
      <div className="fixed bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/30 pointer-events-none z-40" />
      <div className="fixed bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 pointer-events-none z-40" />

      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content Area */}
      <main className="relative z-10 pt-16">
        {children}
      </main>

      {/* Bottom HUD Status Bar (Optional decorative element) */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-background/80 backdrop-blur-sm border-t border-primary/20 z-30 pointer-events-none">
        <div className="container mx-auto px-4 h-full flex items-center justify-between text-xs font-mono text-primary/50">
          <span>TACTICAL PORTFOLIO SYSTEM</span>
          <span className="hidden sm:inline">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
