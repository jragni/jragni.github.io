import type { ReactNode } from 'react'
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react'

interface SocialLink {
  name: string
  handle: string
  icon: ReactNode
  href: string
  description: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    handle: 'github.com/jragni',
    icon: <Github className="w-5 h-5" />,
    href: 'https://github.com/jragni',
    description: 'View my code and open-source contributions',
  },
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/jhensenagni',
    icon: <Linkedin className="w-5 h-5" />,
    href: 'https://www.linkedin.com/in/jhensenagni',
    description: 'Connect with me professionally',
  },
  {
    name: 'Email',
    handle: 'jhensenrayagni@gmail.com',
    icon: <Mail className="w-5 h-5" />,
    href: 'mailto:jhensenrayagni@gmail.com',
    description: 'Send me a message',
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <div className="hud-label mb-2 inline-block">// ESTABLISH CONTACT</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[05]</span> GET IN TOUCH
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-md mx-auto" />
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm always open to new opportunities, collaborations, and interesting conversations.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>

        {/* Main CTA with HUD framing */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="relative w-full max-w-xl">
            {/* HUD bracket corners */}
            <span className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-primary/50" aria-hidden="true" />
            <span className="absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-primary/50" aria-hidden="true" />
            <span className="absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-primary/50" aria-hidden="true" />
            <span className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-primary/50" aria-hidden="true" />

            <div className="border border-primary/20 bg-card/50 backdrop-blur-sm rounded-sm px-8 sm:px-12 py-8 sm:py-10 text-center space-y-6">
              {/* Availability status */}
              <div className="flex items-center justify-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary status-pulse" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm text-primary tracking-wider font-semibold">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>

              <div className="space-y-2">
                <div className="hud-label">// READY TO CONNECT?</div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  Let's build something amazing together
                </p>
              </div>

              <a
                href="mailto:jhensenrayagni@gmail.com"
                className="
                  btn-scan-hover hud-focus inline-flex items-center gap-3
                  px-8 py-4 font-mono text-sm sm:text-base font-semibold
                  bg-primary text-primary-foreground
                  hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30
                  shadow-lg shadow-primary/20
                  transition-all duration-200 rounded-sm
                  focus-visible:outline-none
                "
              >
                <Mail className="w-5 h-5" />
                Send Me an Email
              </a>
            </div>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="
                group border border-primary/20 hover:border-primary/50 bg-card/40 backdrop-blur-sm
                rounded-sm p-5 transition-all duration-300 hud-focus focus-visible:outline-none
                block
              "
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                  {link.icon}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                  {link.name}
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {link.description}
                </div>
                {/* Handle shown on hover */}
                <div className="font-mono text-[10px] text-primary/0 group-hover:text-primary/60 transition-colors duration-200 truncate">
                  {link.handle}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-primary/10 pt-8 text-center">
          <p className="text-foreground/50 text-xs sm:text-sm font-mono space-y-1">
            <span className="block">&gt; Built with React, TypeScript, Vite, and shadcn/ui</span>
            <span className="block text-primary/70">
              &copy; {new Date().getFullYear()} Jhensen Ray Agni &mdash; Designed &amp; Developed with care
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
