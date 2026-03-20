import { ReactNode } from 'react'
import { NavigationBar } from './NavigationBar'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface LayoutProps {
  children: ReactNode
}

const SECTION_LABELS: Record<string, string> = {
  home: 'SECTOR: HOME',
  about: 'SECTOR: ABOUT',
  skills: 'SECTOR: SKILLS',
  experience: 'SECTOR: EXPERIENCE',
  projects: 'SECTOR: PROJECTS',
  contact: 'SECTOR: CONTACT',
}

export function Layout({ children }: LayoutProps) {
  const activeSection = useActiveSection()
  const scrollProgress = useScrollProgress()

  return (
    <div className="min-h-screen bg-background grid-overlay">
      {/* Global scanline effect */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-30" />

      {/* Vignette effect */}
      <div className="vignette fixed inset-0 pointer-events-none z-40" />

      {/* HUD Corner Brackets - animated entrance */}
      {/* Top-left */}
      <div
        className="fixed top-0 left-0 border-l-2 border-t-2 border-primary/40 pointer-events-none z-40"
        style={{
          width: '4rem',
          height: '4rem',
          animation: 'bracket-in-tl 0.6s ease-out 0.1s forwards',
          opacity: 0,
        }}
      />
      {/* Top-right */}
      <div
        className="fixed top-0 right-0 border-r-2 border-t-2 border-primary/40 pointer-events-none z-40"
        style={{
          width: '4rem',
          height: '4rem',
          animation: 'bracket-in-tr 0.6s ease-out 0.2s forwards',
          opacity: 0,
        }}
      />
      {/* Bottom-left */}
      <div
        className="fixed bottom-8 left-0 border-l-2 border-b-2 border-primary/40 pointer-events-none z-40"
        style={{
          width: '4rem',
          height: '4rem',
          animation: 'bracket-in-bl 0.6s ease-out 0.3s forwards',
          opacity: 0,
        }}
      />
      {/* Bottom-right */}
      <div
        className="fixed bottom-8 right-0 border-r-2 border-b-2 border-primary/40 pointer-events-none z-40"
        style={{
          width: '4rem',
          height: '4rem',
          animation: 'bracket-in-br 0.6s ease-out 0.4s forwards',
          opacity: 0,
        }}
      />

      {/* Navigation Bar */}
      <NavigationBar scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="relative z-10 pt-16">
        {children}
      </main>

      {/* Bottom HUD Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-background/90 backdrop-blur-sm border-t border-primary/20 z-30 pointer-events-none">
        <div className="h-full flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Left: section indicator */}
            <span className="font-mono text-[10px] sm:text-xs text-primary/60 tracking-wider">
              {SECTION_LABELS[activeSection] ?? 'SECTOR: HOME'}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Center: date */}
            <span className="hidden sm:block font-mono text-[10px] text-primary/40">
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>

            {/* Right: scroll percent */}
            <span className="font-mono text-[10px] sm:text-xs text-primary/60 tracking-wider">
              SCROLL: {scrollProgress}%
            </span>

            {/* Scroll progress mini bar */}
            <div className="w-12 sm:w-20 h-1 bg-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary/60 transition-all duration-100 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
