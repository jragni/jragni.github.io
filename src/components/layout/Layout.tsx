import { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { NavigationBar } from './NavigationBar'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface LayoutProps {
  children: ReactNode
}

const SECTION_LABELS: Record<string, string> = {
  home: 'HERO',
  about: 'ABOUT',
  skills: 'SKILLS',
  experience: 'EXPERIENCE',
  projects: 'PROJECTS',
  contact: 'CONTACT',
}

export function Layout({ children }: LayoutProps) {
  const prefersReducedMotion = useReducedMotion()
  const activeSection = useActiveSection()
  const scrollPct = useScrollProgress()

  const cornerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 20,
        delay: 0.2,
      },
    },
  }

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

      {/* Refined scanlines - barely perceptible */}
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
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/40 pointer-events-none z-40"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={cornerVariants}
        style={{ transformOrigin: 'top left' }}
      />
      <motion.div
        className="fixed top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/40 pointer-events-none z-40"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={{ ...cornerVariants, visible: { ...cornerVariants.visible, transition: { ...cornerVariants.visible.transition as object, delay: 0.3 } } }}
        style={{ transformOrigin: 'top right' }}
      />
      <motion.div
        className="fixed bottom-8 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/40 pointer-events-none z-40"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={{ ...cornerVariants, visible: { ...cornerVariants.visible, transition: { ...cornerVariants.visible.transition as object, delay: 0.4 } } }}
        style={{ transformOrigin: 'bottom left' }}
      />
      <motion.div
        className="fixed bottom-8 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/40 pointer-events-none z-40"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        variants={{ ...cornerVariants, visible: { ...cornerVariants.visible, transition: { ...cornerVariants.visible.transition as object, delay: 0.5 } } }}
        style={{ transformOrigin: 'bottom right' }}
      />

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
          <span className="text-primary/60">TACTICAL PORTFOLIO SYSTEM</span>
          <motion.span
            key={activeSection}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:block text-primary/80 tracking-widest"
          >
            SECTION: {SECTION_LABELS[activeSection] ?? activeSection.toUpperCase()}
          </motion.span>
          <span className="text-primary/60">
            <span className="text-primary">{scrollPct}</span>%
          </span>
        </div>
      </div>
    </div>
  )
}
