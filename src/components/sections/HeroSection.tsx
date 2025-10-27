import { TypeAnimation } from 'react-type-animation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download } from 'lucide-react'

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="container max-w-6xl">
        <div className="space-y-6 sm:space-y-8">
          {/* System Status */}
          <div className="font-mono text-primary text-xs sm:text-sm flex items-center gap-2 sm:gap-4">
            <span>&gt; SYSTEM INITIALIZED</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">ONLINE</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
              <span className="block mb-2">Hello, I'm</span>
              <span className="block text-primary">Jhensen Ray Agni</span>
            </h1>

            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-muted-foreground min-h-[3rem] sm:min-h-[4rem]">
              <span className="font-mono text-primary">&gt;</span>{' '}
              <TypeAnimation
                sequence={[
                  'A Robotics Engineer',
                  2000,
                  'A Software Engineer',
                  2000,
                  'A Mechanical Engineer',
                  2000,
                  'A Systems Engineer',
                  2000,
                  'A Problem Solver',
                  2000,
                  'A Full-Stack Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed pt-4">
              <span className="font-mono text-primary">&gt;</span> Full-stack software engineer specializing in{' '}
              <span className="text-foreground font-semibold">web development</span>,{' '}
              <span className="text-foreground font-semibold">robotics</span>, and{' '}
              <span className="text-foreground font-semibold">AI systems</span>.
              Building innovative solutions at the intersection of software and hardware.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => scrollToSection('#projects')}
              className="font-mono bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto"
            >
              View My Work
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('#contact')}
              className="font-mono border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
            >
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="font-mono text-muted-foreground hover:text-foreground hover:bg-secondary/50 w-full sm:w-auto"
              asChild
            >
              <a href="#" download>
                <Download className="mr-2 w-4 h-4" />
                Resume
              </a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 sm:pt-12 flex flex-col items-center gap-2 animate-bounce">
            <div className="font-mono text-xs text-muted-foreground">SCROLL TO EXPLORE</div>
            <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
