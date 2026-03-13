import { ReactNode } from 'react'
import { NavigationBar } from './NavigationBar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background grid-overlay">
      {/* Global scanline effect — reduced from 40% to 15% */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-15" />

      {/* Vignette effect — lightened */}
      <div className="vignette-light fixed inset-0 pointer-events-none z-40" />

      {/* HUD Corner Brackets — subtler at 20% opacity */}
      <div className="fixed top-0 left-0 w-8 h-8 sm:w-16 sm:h-16 border-l-2 border-t-2 border-primary/20 pointer-events-none z-40" />
      <div className="fixed top-0 right-0 w-8 h-8 sm:w-16 sm:h-16 border-r-2 border-t-2 border-primary/20 pointer-events-none z-40" />
      <div className="fixed bottom-0 left-0 w-8 h-8 sm:w-16 sm:h-16 border-l-2 border-b-2 border-primary/20 pointer-events-none z-40" />
      <div className="fixed bottom-0 right-0 w-8 h-8 sm:w-16 sm:h-16 border-r-2 border-b-2 border-primary/20 pointer-events-none z-40" />

      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content Area */}
      <main className="relative z-10 pt-16 pb-8">
        {children}
      </main>

      {/* Bottom HUD Status Bar — slightly more subtle */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-background/60 backdrop-blur-sm border-t border-primary/10 z-30 pointer-events-none">
        <div className="container mx-auto px-4 h-full flex items-center justify-between text-xs font-mono text-primary/40">
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
