import { TypeAnimation } from 'react-type-animation'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ opacity: 1, transform: 'none' }} /* Override scroll animation for hero */
    >
      {/* HUD floating panel: STATUS top-right */}
      <div
        className="absolute top-24 right-4 sm:right-8 lg:right-16 hud-float z-20"
        aria-hidden="true"
      >
        <div className="border border-primary/30 bg-card/60 backdrop-blur-sm px-3 py-2 rounded-sm">
          <div className="hud-label mb-1">STATUS</div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary status-pulse" />
            <span className="font-mono text-xs text-primary">AVAILABLE</span>
          </div>
          <div className="hud-label mt-1 text-primary/40">OPEN TO WORK</div>
        </div>
      </div>

      {/* HUD floating panel: coordinates bottom-left */}
      <div
        className="absolute bottom-20 left-4 sm:left-8 lg:left-16 hud-float z-20"
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      >
        <div className="border border-primary/20 bg-card/40 backdrop-blur-sm px-3 py-2 rounded-sm">
          <div className="hud-label mb-1">COORDINATES</div>
          <div className="font-mono text-[10px] text-primary/50">34.0522° N</div>
          <div className="font-mono text-[10px] text-primary/50">118.2437° W</div>
          <div className="hud-label mt-1 text-primary/30">LOS ANGELES, CA</div>
        </div>
      </div>

      <div className="container max-w-6xl relative z-10">
        {/* Terminal boot sequence */}
        <div className="mb-8 sm:mb-10 font-mono text-xs sm:text-sm text-primary/60 space-y-1" aria-label="System boot sequence">
          <div className="boot-line">
            <span className="text-primary/40">&gt;&gt;</span> SYSTEM INITIALIZING...
          </div>
          <div className="boot-line">
            <span className="text-primary/40">&gt;&gt;</span> LOADING PORTFOLIO MODULES
            <span className="text-primary/40 ml-2">........</span>
            <span className="text-primary ml-1">OK</span>
          </div>
          <div className="boot-line">
            <span className="text-primary/40">&gt;&gt;</span> AUTHENTICATING OPERATOR
            <span className="text-primary/40 ml-2">..........</span>
            <span className="text-primary ml-1">OK</span>
          </div>
          <div className="boot-line">
            <span className="text-primary/40">&gt;&gt;</span> ESTABLISHING UPLINK
            <span className="text-primary/40 ml-2">............</span>
            <span className="text-primary ml-1">CONNECTED</span>
          </div>
          <div className="boot-line text-primary/80">
            <span className="text-primary">&gt;&gt;</span> READY<span className="terminal-cursor ml-1" />
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Main Heading */}
          <div className="hero-reveal hero-reveal-1 space-y-3 sm:space-y-4">
            <div className="font-mono text-sm text-primary/60 tracking-widest">
              // OPERATOR PROFILE
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
              <span className="block mb-2 text-foreground/70 text-2xl sm:text-3xl md:text-4xl font-medium">
                Hello, I'm
              </span>
              <span
                className="block text-primary glitch-name"
                data-text="Jhensen Ray Agni"
              >
                Jhensen Ray Agni
              </span>
            </h1>

            <div className="text-xl sm:text-2xl md:text-4xl font-bold text-muted-foreground min-h-[2.5rem] sm:min-h-[3.5rem]">
              <span className="font-mono text-primary/80">&gt;</span>{' '}
              <TypeAnimation
                sequence={[
                  'A Software Engineer',
                  2000,
                  'A Robotics Engineer',
                  2000,
                  'A Mechanical Engineer',
                  2000,
                  'A Systems Engineer',
                  2000,
                  'A Problem Solver',
                  2000,
                  'A Full-Stack Developer',
                  2000,
                  'A Frontend Engineer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </div>

          {/* Description */}
          <div className="hero-reveal hero-reveal-2">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              <span className="font-mono text-primary/80">&gt;</span>{' '}
              Full-stack software engineer specializing in{' '}
              <span className="text-foreground font-semibold">web development</span>,{' '}
              <span className="text-foreground font-semibold">robotics</span>, and{' '}
              <span className="text-foreground font-semibold">AI systems</span>.
              Building innovative solutions at the intersection of software and hardware.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-reveal hero-reveal-3 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
            {/* Primary CTA */}
            <button
              onClick={() => scrollToSection('#projects')}
              className="
                btn-scan-hover hud-focus
                relative inline-flex items-center justify-center gap-2
                px-6 py-3 font-mono text-sm font-semibold
                bg-primary text-primary-foreground
                border border-primary
                shadow-lg shadow-primary/20
                hover:shadow-xl hover:shadow-primary/30
                hover:bg-primary/90
                transition-all duration-200 rounded-sm
                focus-visible:outline-none
              "
            >
              {/* HUD bracket corners */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary-foreground/40" aria-hidden="true" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary-foreground/40" aria-hidden="true" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary-foreground/40" aria-hidden="true" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary-foreground/40" aria-hidden="true" />
              View My Work
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="
                btn-scan-hover hud-focus
                relative inline-flex items-center justify-center gap-2
                px-6 py-3 font-mono text-sm font-semibold
                border border-primary text-primary
                hover:bg-primary/10
                transition-all duration-200 rounded-sm
                focus-visible:outline-none
              "
            >
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/60" aria-hidden="true" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/60" aria-hidden="true" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/60" aria-hidden="true" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/60" aria-hidden="true" />
              Get In Touch
            </button>

            {/* Tertiary - Resume */}
            <a
              href="https://docs.google.com/document/d/1FHvri0eEL3-H8Sbb__7zwEXrtZoWXgaXoLcrwwaP2LI/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="
                btn-scan-hover hud-focus
                relative inline-flex items-center justify-center gap-2
                px-6 py-3 font-mono text-sm
                text-muted-foreground
                border border-transparent hover:border-primary/20
                hover:text-foreground hover:bg-secondary/50
                transition-all duration-200 rounded-sm
                focus-visible:outline-none
              "
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>

          {/* Tactical Chevron Scroll Indicator */}
          <div className="hero-reveal hero-reveal-4 pt-8 sm:pt-10 flex flex-col items-center gap-1">
            <div className="font-mono text-[10px] text-muted-foreground/60 tracking-[0.2em] mb-2">
              SCROLL TO EXPLORE
            </div>
            <div className="flex flex-col items-center gap-1" aria-hidden="true">
              <ChevronDown className="w-4 h-4 text-primary/60 chevron-drop" />
              <ChevronDown className="w-4 h-4 text-primary/40 chevron-drop" />
              <ChevronDown className="w-4 h-4 text-primary/20 chevron-drop" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
