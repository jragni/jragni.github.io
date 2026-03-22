import { useState, useEffect, useRef, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import type { Variants } from '@/types/motion'
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react'
import { StaggerChildren, fadeUpChild } from '@/components/motion/StaggerChildren'

// ── Terminal typing sequence — toned down copy ────────────────────────────────
const TERMINAL_LINES = [
  { text: '> Checking availability...', delay: 0 },
  { text: '> Connection established.', delay: 800 },
  { text: '> Ready to connect.', delay: 1600 },
]

function TerminalTyping({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setLines(TERMINAL_LINES.map((l) => l.text))
      onComplete()
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line.text])
          if (i === TERMINAL_LINES.length - 1) {
            setTimeout(onComplete, 300)
          }
        }, line.delay),
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [onComplete, prefersReducedMotion])

  return (
    <div className="space-y-1">
      {lines.map((line, i) => (
        <div key={i} className={`text-xs sm:text-sm ${i === lines.length - 1 ? 'text-primary' : 'text-muted-foreground'}`}>
          {line}
        </div>
      ))}
    </div>
  )
}

// ── Social link card ──────────────────────────────────────────────────────────
interface SocialLink {
  name: string
  icon: React.ReactNode
  href: string
  description: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: <Github className="w-5 h-5" />,
    href: 'https://github.com/jragni',
    description: 'View my code and open-source contributions',
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="w-5 h-5" />,
    href: 'https://www.linkedin.com/in/jhensenagni',
    description: 'Connect with me professionally',
  },
  {
    name: 'Email',
    icon: <Mail className="w-5 h-5" />,
    href: 'mailto:jhensenrayagni@gmail.com',
    description: 'Send me a message',
  },
]

const socialCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

// ── Contact Section ───────────────────────────────────────────────────────────
export function ContactSection() {
  const [terminalDone, setTerminalDone] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const prefersReducedMotion = useReducedMotion()

  // Stable callback reference so TerminalTyping effect doesn't re-fire
  const handleTerminalComplete = useCallback(() => setTerminalDone(true), [])

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-20"
    >
      <div className="container max-w-4xl">
        {/* Section Header */}
        <StaggerChildren className="mb-8 sm:mb-12 text-center">
          <motion.h2
            variants={fadeUpChild}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            <span className="text-primary font-mono">[05]</span> GET IN TOUCH
          </motion.h2>
          <motion.div
            variants={fadeUpChild}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-md mx-auto"
          />
          <motion.p
            variants={fadeUpChild}
            className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            I'm always open to new opportunities, collaborations, and interesting conversations.
            Whether you have a question or just want to say hi, feel free to reach out!
          </motion.p>
        </StaggerChildren>

        {/* Terminal-style contact card */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div
            className="border border-primary/30 bg-[#0a192f] rounded-sm overflow-hidden"
            role="region"
            aria-label="Contact"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-card/80 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/60" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs text-primary/70 tracking-widest">Ready to connect?</span>
              <div className="w-12" />
            </div>

            {/* Terminal body */}
            <div className="p-6 font-mono text-sm">
              {/* Terminal output */}
              {isInView && <TerminalTyping onComplete={handleTerminalComplete} />}

              {/* Availability indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary status-dot" aria-hidden="true" />
                OPEN TO OPPORTUNITIES
              </div>

              {/* Email button — reveals after terminal finishes */}
              <AnimatePresence>
                {terminalDone && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
                    className="mt-6"
                  >
                    <motion.a
                      href="mailto:jhensenrayagni@gmail.com"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-sm hover:bg-primary/90 transition-colors"
                      whileHover={prefersReducedMotion ? undefined : {
                        scale: 1.03,
                        boxShadow: '0 0 20px rgba(100,255,218,0.3)',
                      }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      aria-label="Send email to jhensenrayagni@gmail.com"
                    >
                      <Mail className="w-4 h-4" />
                      Send Me an Email
                    </motion.a>
                    <div className="mt-2 text-xs text-muted-foreground font-mono">
                      &gt; jhensenrayagni@gmail.com
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <StaggerChildren
          className="grid sm:grid-cols-3 gap-4"
          staggerDelay={0.12}
        >
          {socialLinks.map((link) => (
            <motion.div
              key={link.name}
              variants={socialCardVariants}
              whileHover={prefersReducedMotion ? undefined : {
                y: -6,
                boxShadow: '0 12px 32px rgba(0,0,0,0.3), 0 0 16px rgba(100,255,218,0.1)',
                borderColor: 'rgba(100,255,218,0.5)',
              }}
              transition={{ duration: 0.2 }}
              className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-sm"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 space-y-3"
                aria-label={`${link.name}: ${link.description}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-primary">{link.icon}</div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{link.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{link.description}</div>
                </div>
              </a>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* Footer */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="border border-primary/15 bg-card/20 backdrop-blur-sm rounded-sm p-6">
            <p className="text-foreground/60 text-sm font-mono">
              &gt; Built with React, TypeScript, Vite, and shadcn/ui
              <br />
              <span className="text-primary">© {new Date().getFullYear()} Jhensen Ray Agni</span> · Designed &amp; built by hand
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
