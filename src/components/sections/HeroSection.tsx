import { useState, useEffect, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import type { Variants } from '@/types/motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'

// ── Boot sequence phases ──────────────────────────────────────────────────────
type BootPhase = 'idle' | 'grid' | 'brackets' | 'init-text' | 'content'

const BOOT_TIMING: Record<BootPhase, number> = {
  idle: 0,
  grid: 200,
  brackets: 600,
  'init-text': 1100,
  content: 2000,
}

// ── Name letters for spring animation ────────────────────────────────────────
const NAME = 'Jhensen Ray Agni'.split('')

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
      delay: i * 0.04,
    },
  }),
}

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      staggerChildren: 0.15,
    },
  },
}

const childVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 16 } },
}

// ── Role type-animation strings ──────────────────────────────────────────────
const ROLES = [
  'A Software Engineer',
  'A Robotics Engineer',
  'A Mechanical Engineer',
  'A Systems Engineer',
  'A Problem Solver',
  'A Full-Stack Developer',
  'A Frontend Engineer',
]

function useTypewriter(strings: string[], speed = 50, pause = 1800) {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = strings[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) {
            setDisplayText(current.slice(0, charIndex + 1))
            setCharIndex((c) => c + 1)
          } else {
            setTimeout(() => setIsDeleting(true), pause)
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(current.slice(0, charIndex - 1))
            setCharIndex((c) => c - 1)
          } else {
            setIsDeleting(false)
            setRoleIndex((r) => (r + 1) % strings.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    )
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex, strings, speed, pause])

  return displayText
}

// ── Datetime display ──────────────────────────────────────────────────────────
function useLiveDatetime() {
  const [dt, setDt] = useState('')
  useEffect(() => {
    const update = () =>
      setDt(
        new Date().toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return dt
}

// ── Initializing text ─────────────────────────────────────────────────────────
function InitText() {
  const [dots, setDots] = useState('')
  useEffect(() => {
    let count = 0
    const id = setInterval(() => {
      count = (count + 1) % 4
      setDots('.'.repeat(count))
    }, 300)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="font-mono text-primary text-lg tracking-widest">
      INITIALIZING{dots}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export function HeroSection() {
  const [bootPhase, setBootPhase] = useState<BootPhase>('idle')
  const prefersReducedMotion = useReducedMotion()
  const roleText = useTypewriter(ROLES)
  const datetime = useLiveDatetime()
  const sectionRef = useRef<HTMLElement>(null)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const gridX = useTransform(mouseX, [-1, 1], [-6, 6])
  const gridY = useTransform(mouseY, [-1, 1], [-6, 6])

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Boot sequence
  useEffect(() => {
    if (prefersReducedMotion) {
      setBootPhase('content')
      return
    }
    const timers: ReturnType<typeof setTimeout>[] = []
    const phases: BootPhase[] = ['grid', 'brackets', 'init-text', 'content']
    phases.forEach((phase) => {
      timers.push(setTimeout(() => setBootPhase(phase), BOOT_TIMING[phase]))
    })
    return () => timers.forEach(clearTimeout)
  }, [prefersReducedMotion])

  // Mouse tracking for parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !sectionRef.current) return
    const { width, height } = sectionRef.current.getBoundingClientRect()
    mouseX.set(((e.clientX / width) * 2 - 1) * 1)
    mouseY.set(((e.clientY / height) * 2 - 1) * 1)
  }

  const showContent = bootPhase === 'content'
  const showBrackets = ['brackets', 'init-text', 'content'].includes(bootPhase)
  const showInitText = bootPhase === 'init-text'
  const showGrid = bootPhase !== 'idle'

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax grid layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={
          prefersReducedMotion
            ? undefined
            : { x: gridX, y: gridY }
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: showGrid ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(100,255,218,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </motion.div>

      {/* Boot corner brackets */}
      <AnimatePresence>
        {showBrackets && (
          <>
            {[
              { cls: 'top-8 left-8 border-l-2 border-t-2', origin: 'top left' },
              { cls: 'top-8 right-8 border-r-2 border-t-2', origin: 'top right' },
              { cls: 'bottom-16 left-8 border-l-2 border-b-2', origin: 'bottom left' },
              { cls: 'bottom-16 right-8 border-r-2 border-b-2', origin: 'bottom right' },
            ].map(({ cls, origin }, i) => (
              <motion.div
                key={i}
                className={`absolute w-12 h-12 border-primary/60 pointer-events-none ${cls}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: i * 0.05,
                }}
                style={{ transformOrigin: origin }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Initializing text */}
      <AnimatePresence>
        {showInitText && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InitText />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 container max-w-6xl"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6 sm:space-y-8">
              {/* Greeting */}
              <motion.div variants={childVariant} className="font-mono text-primary text-sm tracking-widest">
                &gt; HELLO, I'M
              </motion.div>

              {/* Animated name */}
              <motion.h1
                variants={childVariant}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight"
                style={{ perspective: 600 }}
              >
                {NAME.map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={prefersReducedMotion ? undefined : letterVariants}
                    className="inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Role typewriter */}
              <motion.div
                variants={childVariant}
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-muted-foreground min-h-[3rem] sm:min-h-[4rem]"
              >
                <span className="font-mono text-primary">&gt;</span>{' '}
                <span className="font-mono">{roleText}</span>
                <span className="cursor-blink font-mono text-primary">|</span>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={childVariant}
                className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
              >
                <span className="font-mono text-primary">&gt;</span> Full-stack software engineer specializing in{' '}
                <span className="text-foreground font-semibold">web development</span>,{' '}
                <span className="text-foreground font-semibold">robotics</span>, and{' '}
                <span className="text-foreground font-semibold">AI systems</span>.
                Building innovative solutions at the intersection of software and hardware.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={childVariant}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    onClick={() => scrollToSection('#projects')}
                    className="font-mono bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto"
                    style={{
                      boxShadow: '0 0 20px rgba(100,255,218,0.2)',
                    }}
                  >
                    View My Work
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection('#contact')}
                    className="font-mono border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                  >
                    Get In Touch
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    variant="ghost"
                    className="font-mono text-muted-foreground hover:text-foreground hover:bg-secondary/50 w-full sm:w-auto"
                    asChild
                  >
                    <a
                      href="https://docs.google.com/document/d/1FHvri0eEL3-H8Sbb__7zwEXrtZoWXgaXoLcrwwaP2LI/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Resume
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Scroll chevron */}
              <motion.div
                variants={childVariant}
                className="pt-8 sm:pt-12 flex flex-col items-center gap-2"
                aria-hidden="true"
              >
                <span className="font-mono text-xs text-muted-foreground tracking-widest">SCROLL TO EXPLORE</span>
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating HUD panels */}
      <AnimatePresence>
        {showContent && (
          <>
            {/* STATUS panel */}
            <motion.div
              className="absolute top-24 right-6 lg:right-12 hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              aria-label="Status panel"
            >
              <div className="border border-primary/30 bg-background/60 backdrop-blur-sm px-3 py-2 font-mono text-xs space-y-1">
                <div className="text-primary/50 text-[10px] tracking-widest mb-1">SYS.STATUS</div>
                <div className="flex items-center gap-2 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary status-dot" />
                  STATUS: AVAILABLE
                </div>
                <div className="text-muted-foreground">34.0522 / -118.2437</div>
                <div className="text-muted-foreground text-[10px]">{datetime}</div>
              </div>
            </motion.div>

            {/* STACK panel */}
            <motion.div
              className="absolute bottom-20 right-6 lg:right-12 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              aria-label="Tech stack panel"
            >
              <div className="border border-primary/20 bg-background/60 backdrop-blur-sm px-3 py-2 font-mono text-xs space-y-1">
                <div className="text-primary/50 text-[10px] tracking-widest mb-1">STACK.ACTIVE</div>
                {['React', 'TypeScript', 'Node.js', 'ROS2'].map((tech) => (
                  <div key={tech} className="text-muted-foreground">
                    <span className="text-primary mr-1">▹</span>{tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
