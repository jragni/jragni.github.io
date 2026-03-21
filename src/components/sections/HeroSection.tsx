import { useState, useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import type { Variants } from '@/types/motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'

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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      staggerChildren: 0.15,
      delayChildren: 0.2,
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = strings[roleIndex]
    timerRef.current = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) {
            setDisplayText(current.slice(0, charIndex + 1))
            setCharIndex((c) => c + 1)
          } else {
            timerRef.current = setTimeout(() => setIsDeleting(true), pause)
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
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [charIndex, isDeleting, roleIndex, strings, speed, pause])

  return displayText
}

// ── Main Component ────────────────────────────────────────────────────────────
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const roleText = useTypewriter(ROLES)
  const sectionRef = useRef<HTMLElement>(null)

  // Mouse parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const gridX = useTransform(mouseX, [-1, 1], [-6, 6])
  const gridY = useTransform(mouseY, [-1, 1], [-6, 6])

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !sectionRef.current) return
    const { width, height } = sectionRef.current.getBoundingClientRect()
    mouseX.set(((e.clientX / width) * 2 - 1) * 1)
    mouseY.set(((e.clientY / height) * 2 - 1) * 1)
  }

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
        style={prefersReducedMotion ? undefined : { x: gridX, y: gridY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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

      {/* Main content — staggered reveal, no boot sequence */}
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

          {/* Animated name — word-aware wrapping */}
          <motion.h1
            variants={childVariant}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight"
            style={{ perspective: 600 }}
          >
            {'Jhensen Ray Agni'.split(' ').map((word, wi, words) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split('').map((char, ci) => {
                  const globalIndex = words.slice(0, wi).join(' ').length + (wi > 0 ? 1 : 0) + ci
                  return (
                    <motion.span
                      key={globalIndex}
                      custom={globalIndex}
                      variants={prefersReducedMotion ? undefined : letterVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  )
                })}
                {wi < words.length - 1 && '\u00A0'}
              </span>
            ))}
          </motion.h1>

          {/* Role typewriter */}
          <motion.div
            variants={childVariant}
            className="text-xl sm:text-3xl md:text-5xl font-bold text-muted-foreground min-h-[2.5rem] sm:min-h-[4rem]"
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
                style={{ boxShadow: '0 0 20px rgba(100,255,218,0.2)' }}
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

          {/* Scroll chevron — animated, no text */}
          <motion.div
            variants={childVariant}
            className="pt-8 sm:pt-12 flex flex-col items-center gap-1"
            aria-hidden="true"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-primary/60" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}
