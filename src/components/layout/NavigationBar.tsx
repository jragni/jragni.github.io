import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from 'framer-motion'
import { Menu, X, User, Code2, Briefcase, FolderGit2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useActiveSection } from '@/hooks/useActiveSection'
import type { SectionId } from '@/hooks/useActiveSection'

interface NavItem {
  id: SectionId | 'home'
  label: string
  icon: React.ReactNode
  href: string
}

const navigationItems: NavItem[] = [
  { id: 'about', label: 'ABOUT', icon: <User className="w-4 h-4" />, href: '#about' },
  { id: 'skills', label: 'SKILLS', icon: <Code2 className="w-4 h-4" />, href: '#skills' },
  { id: 'experience', label: 'EXPERIENCE', icon: <Briefcase className="w-4 h-4" />, href: '#experience' },
  { id: 'projects', label: 'PROJECTS', icon: <FolderGit2 className="w-4 h-4" />, href: '#projects' },
  { id: 'contact', label: 'CONTACT', icon: <Mail className="w-4 h-4" />, href: '#contact' },
]

export function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const activeSection = useActiveSection()
  const prefersReducedMotion = useReducedMotion()

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Desktop floating pill nav */}
      <motion.nav
        className="fixed top-4 left-1/2 z-50 hidden lg:flex"
        style={{ x: '-50%' }}
        initial={prefersReducedMotion ? false : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.6 }}
        aria-label="Primary navigation"
      >
        <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#112240]/80 backdrop-blur-md border border-primary/20 shadow-[0_0_20px_rgba(100,255,218,0.08)]">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="font-mono text-primary font-bold text-sm tracking-wider px-3 py-1.5 hover:opacity-80 transition-opacity mr-2"
            aria-label="Go to top"
          >
            [JRA]
          </button>

          <div className="w-px h-4 bg-primary/20 mr-2" />

          {/* Nav items with LayoutGroup for pill animation */}
          <LayoutGroup>
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <motion.button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs tracking-wide transition-colors duration-150 ${
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{item.icon}</span>
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {hoveredId === item.id && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 8, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-card border border-primary/20 font-mono text-xs text-primary whitespace-nowrap pointer-events-none"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </LayoutGroup>

          <div className="w-px h-4 bg-primary/20 ml-2" />

          {/* Status indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-primary/70">
            <span className="w-1.5 h-1.5 rounded-full bg-primary status-dot" />
            <span className="hidden xl:inline">ONLINE</span>
          </div>
        </div>
      </motion.nav>

      {/* Mobile nav — top bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 lg:hidden flex items-center justify-between h-14 px-4 bg-[#112240]/90 backdrop-blur-md border-b border-primary/20"
        initial={prefersReducedMotion ? false : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.4 }}
      >
        <button
          onClick={() => handleNavClick('#home')}
          className="font-mono text-primary font-bold text-sm tracking-wider"
          aria-label="Go to top"
        >
          [JRA]
        </button>

        <Button
          variant="ghost"
          className="min-w-[44px] min-h-[44px] h-11 w-11 text-primary border border-primary/40 hover:bg-primary/10 hover:border-primary/70"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Mobile bottom-sheet nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[56] lg:hidden bg-[#112240] border-t border-primary/30 rounded-t-2xl overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80) setMobileMenuOpen(false)
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-primary/30" />
              </div>

              <div className="px-6 pb-8 pt-2 space-y-1">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                      }`}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  )
                })}

                <div className="pt-4 font-mono text-xs text-primary/50 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary status-dot" />
                  SYS: ONLINE
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
