import { useState, useEffect } from 'react'
import { Menu, X, User, Code2, Briefcase, FolderGit2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useActiveSection, type SectionId } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface NavItem {
  id: SectionId
  label: string
  number: string
  icon: React.ReactNode
  href: string
}

const navigationItems: NavItem[] = [
  { id: 'about', label: 'ABOUT', number: '01', icon: <User className="w-4 h-4" />, href: '#about' },
  { id: 'skills', label: 'SKILLS', number: '02', icon: <Code2 className="w-4 h-4" />, href: '#skills' },
  { id: 'experience', label: 'EXPERIENCE', number: '03', icon: <Briefcase className="w-4 h-4" />, href: '#experience' },
  { id: 'projects', label: 'PROJECTS', number: '04', icon: <FolderGit2 className="w-4 h-4" />, href: '#projects' },
  { id: 'contact', label: 'CONTACT', number: '05', icon: <Mail className="w-4 h-4" />, href: '#contact' },
]

export function NavigationBar() {
  const activeSection = useActiveSection()
  const scrollProgress = useScrollProgress()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/98 backdrop-blur-md border-b border-primary/30 shadow-lg shadow-primary/5'
          : 'bg-background/80 backdrop-blur-sm border-b border-primary/20'
      }`}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      <div className="relative w-full px-4">
        <div className="flex items-center justify-between h-16 max-w-screen-2xl mx-auto">
          {/* Left: Callsign/Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center min-w-0 flex-shrink-0 hover:opacity-80 transition-opacity focus-visible:outline-none hud-focus"
            aria-label="Scroll to top"
          >
            <div className="font-mono text-primary font-bold text-base md:text-lg tracking-wider whitespace-nowrap">
              <span className="hidden sm:inline">[CALLSIGN: JRAGNI PORTFOLIO]</span>
              <span className="sm:hidden">[JRAGNI]</span>
            </div>
          </button>

          {/* Center/Right: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    group relative flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs tracking-wide
                    transition-all duration-200 focus-visible:outline-none hud-focus btn-scan-hover
                    ${isActive
                      ? 'bg-primary/10 text-primary border border-primary/40 shadow shadow-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={`text-[10px] font-mono ${isActive ? 'text-primary' : 'text-muted-foreground/50'}`}>
                    [{item.number}]
                  </span>
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-px bg-primary/60" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right: System Status & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* System Status Indicators (hidden on mobile) */}
            <div className="hidden lg:flex items-center font-mono text-xs text-primary/70 whitespace-nowrap gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary status-pulse"></span>
              <span>SYS: ONLINE</span>
            </div>

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-primary hover:bg-primary/10 hud-focus"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-background border-l-2 border-primary/60 scanlines"
              >
                <SheetHeader className="mb-8">
                  <SheetTitle className="font-mono text-primary text-left text-sm tracking-widest">
                    // NAVIGATION MENU
                  </SheetTitle>
                  <div className="h-px bg-gradient-to-r from-primary/60 to-transparent mt-2" />
                </SheetHeader>

                {/* Staggered nav items */}
                <div className="flex flex-col gap-1">
                  {navigationItems.map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.href)}
                        className={`
                          menu-item-stagger w-full flex items-center gap-3 px-4 py-3 rounded
                          font-mono text-sm text-left transition-all duration-200
                          focus-visible:outline-none hud-focus
                          ${isActive
                            ? 'bg-primary/10 text-primary border border-primary/30'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent'
                          }
                        `}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="text-[10px] text-primary/60">[{item.number}]</span>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                        {isActive && <span className="ml-auto text-primary text-[10px]">●</span>}
                      </button>
                    )
                  })}
                </div>

                {/* Mobile System Status */}
                <div className="absolute bottom-8 left-6 right-6 space-y-3">
                  <div className="h-px bg-primary/20" />
                  <div className="font-mono text-xs text-primary/60 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary status-pulse" />
                      <span>[STATUS: READY]</span>
                    </div>
                    <div>[SYSTEM: ONLINE]</div>
                    <div className="text-primary/40 text-[10px]">SCROLL: {scrollProgress}%</div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Scroll progress bar at bottom of nav */}
      <div className="relative h-px bg-primary/10">
        <div
          className="absolute left-0 top-0 h-full bg-primary transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div
          className="absolute top-0 h-full w-4 bg-primary/60 blur-sm transition-all duration-100 ease-out"
          style={{ left: `calc(${scrollProgress}% - 8px)` }}
        />
      </div>
    </nav>
  )
}
