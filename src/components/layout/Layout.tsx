import { ReactNode, useState, useEffect } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { NavigationBar } from './NavigationBar'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'

interface LayoutProps {
  children: ReactNode
}

const SECTION_LABELS: Record<string, string> = {
  home: 'HOME',
  about: 'ABOUT',
  skills: 'SKILLS',
  experience: 'EXPERIENCE',
  projects: 'PROJECTS',
  contact: 'CONTACT',
}

// Corner brackets defined as data array to eliminate duplicated spreads
const corners = [
  { className: 'top-0 left-0 border-l-2 border-t-2', origin: 'top left', delay: 0.2 },
  { className: 'top-0 right-0 border-r-2 border-t-2', origin: 'top right', delay: 0.3 },
  { className: 'bottom-8 left-0 border-l-2 border-b-2', origin: 'bottom left', delay: 0.4 },
  { className: 'bottom-8 right-0 border-r-2 border-b-2', origin: 'bottom right', delay: 0.5 },
] as const

const cornerBase = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
  },
} as const

export function Layout({ children }: LayoutProps) {
  const prefersReducedMotion = useReducedMotion()
  const activeSection = useActiveSection()

  // Derive scroll percentage from Framer Motion's scrollYProgress
  const { scrollYProgress } = useScroll()
  const [pct, setPct] = useState(0)
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setPct(Math.round(v * 100))
    })
  }, [scrollYProgress])

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(100,255,218,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          animation: prefersReducedMotion ? 'none' : 'grid-drift 30s linear infinite',
        }}
      />

      {/* Refined scanlines — barely perceptible */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(100,255,218,0.015) 0px, rgba(100,255,218,0.015) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[3]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(10,25,47,0.7) 100%)',
        }}
      />

      {/* HUD Corner Brackets — animated in on load */}
      {corners.map((corner, i) => (
        <motion.div
          key={i}
          className={`fixed w-16 h-16 border-primary/40 pointer-events-none z-40 ${corner.className}`}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={{
            hidden: cornerBase.hidden,
            visible: {
              ...cornerBase.visible,
              transition: {
                type: 'spring',
                stiffness: 120,
                damping: 20,
                delay: corner.delay,
              },
            },
          }}
          style={{ transformOrigin: corner.origin }}
        />
      ))}

      {/* Ambient teal particles */}
      {!prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
          {[
            { top: '20%', left: '8%', delay: '0s', size: '3px' },
            { top: '55%', left: '92%', delay: '1.2s', size: '2px' },
            { top: '75%', left: '5%', delay: '2.4s', size: '4px' },
            { top: '35%', left: '96%', delay: '0.8s', size: '2px' },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-primary/50"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                animation: `float-particle 6s ease-in-out ${p.delay} infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Scroll progress bar */}
      <ScrollProgress position="top" height={2} />

      {/* Navigation */}
      <NavigationBar />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {children}
      </main>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-background/85 backdrop-blur-sm border-t border-primary/20 z-30 pointer-events-none">
        <div className="h-full flex items-center justify-between px-4 text-xs font-mono">
          <span className="text-primary/60">JHENSEN RAY AGNI</span>
          <motion.span
            key={activeSection}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:block text-primary/80 tracking-widest"
          >
            {SECTION_LABELS[activeSection] ?? activeSection.toUpperCase()}
          </motion.span>
          <span className="text-primary/60">
            <span className="text-primary">{pct}</span>%
          </span>
        </div>
      </div>
    </div>
  )
}
