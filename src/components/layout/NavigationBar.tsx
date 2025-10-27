import { useState } from 'react'
import { Menu, X, Home, User, Code2, Briefcase, FolderGit2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

const navigationItems: NavItem[] = [
  { id: 'home', label: 'HOME', icon: <Home className="w-4 h-4" />, href: '#home' },
  { id: 'about', label: 'ABOUT', icon: <User className="w-4 h-4" />, href: '#about' },
  { id: 'skills', label: 'SKILLS', icon: <Code2 className="w-4 h-4" />, href: '#skills' },
  { id: 'experience', label: 'EXPERIENCE', icon: <Briefcase className="w-4 h-4" />, href: '#experience' },
  { id: 'projects', label: 'PROJECTS', icon: <FolderGit2 className="w-4 h-4" />, href: '#projects' },
  { id: 'contact', label: 'CONTACT', icon: <Mail className="w-4 h-4" />, href: '#contact' },
]

export function NavigationBar() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-primary bg-background/95 backdrop-blur-md">
      {/* Scanline effect on navbar */}
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Callsign/Logo */}
          <div className="flex items-center gap-3">
            <div className="font-mono text-primary font-bold text-lg tracking-wider">
              [CALLSIGN: PORTFOLIO]
            </div>
            <Badge variant="outline" className="hidden sm:flex font-mono text-xs border-primary/50 text-primary">
              v2.0
            </Badge>
          </div>

          {/* Center/Right: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id, item.href)}
                className={`
                  font-mono text-xs tracking-wide
                  ${activeSection === item.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }
                  transition-all duration-200
                `}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </div>

          {/* Right: System Status & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* System Status Indicators (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-3 font-mono text-xs text-primary/70">
              <span>[SYS: ONLINE]</span>
              <span className="hidden xl:inline">[CONN: SECURE]</span>
            </div>

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-primary hover:bg-primary/10"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-background border-l-2 border-primary"
              >
                <SheetHeader>
                  <SheetTitle className="font-mono text-primary text-left">
                    [NAVIGATION MENU]
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-8">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? 'default' : 'ghost'}
                      onClick={() => handleNavClick(item.id, item.href)}
                      className={`
                        w-full justify-start font-mono text-sm
                        ${activeSection === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Button>
                  ))}
                </div>

                {/* Mobile System Status */}
                <div className="absolute bottom-8 left-6 right-6">
                  <div className="font-mono text-xs text-primary/60 space-y-1">
                    <div>[STATUS: READY]</div>
                    <div>[SYSTEM: ONLINE]</div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Bottom accent line with grid pattern */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </nav>
  )
}
