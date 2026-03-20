import { useState, useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion'
import type { Variants } from '@/types/motion'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, ChevronDown } from 'lucide-react'
import { workExperienceList } from '@/data/constants'
import { StaggerChildren, fadeUpChild } from '@/components/motion/StaggerChildren'

// ── SVG Timeline with scroll-driven pathLength ────────────────────────────────
function TimelineSVG({ progress }: { progress: ReturnType<typeof useTransform> }) {
  return (
    <svg
      className="absolute left-6 top-0 bottom-0 hidden md:block"
      width="2"
      style={{ height: '100%' }}
      aria-hidden="true"
    >
      {/* Background track */}
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="100%"
        stroke="rgba(100,255,218,0.15)"
        strokeWidth="2"
      />
      {/* Animated fill */}
      <motion.line
        x1="1"
        y1="0"
        x2="1"
        y2="100%"
        stroke="rgba(100,255,218,0.7)"
        strokeWidth="2"
        pathLength="1"
        style={{ pathLength: progress }}
      />
    </svg>
  )
}

// ── Card variants ─────────────────────────────────────────────────────────────
const cardLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
}

const cardRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
}

// ── Experience card ────────────────────────────────────────────────────────────
interface ExpCardProps {
  experience: typeof workExperienceList[0]
  index: number
}

function ExperienceCard({ experience, index }: ExpCardProps) {
  const [expanded, setExpanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const variant = index % 2 === 0 ? cardLeft : cardRight
  const letter = experience.companyName[0]

  return (
    <motion.div
      ref={ref}
      variants={prefersReducedMotion ? undefined : variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5% 0px' }}
      className="relative"
    >
      {/* Timeline dot */}
      <motion.div
        className="hidden md:flex absolute left-6 top-8 w-3 h-3 -ml-[5px] rounded-full bg-primary ring-4 ring-background items-center justify-center"
        whileInView={{
          boxShadow: [
            '0 0 0 0 rgba(100,255,218,0.4)',
            '0 0 0 6px rgba(100,255,218,0)',
          ],
        }}
        viewport={{ once: false, margin: '-20% 0px -30% 0px' }}
        transition={{ duration: 1.2, repeat: Infinity }}
        aria-hidden="true"
      />

      {/* Card */}
      <motion.div
        className="md:ml-16 border border-primary/30 bg-card/50 backdrop-blur-sm rounded-sm overflow-hidden"
        whileHover={prefersReducedMotion ? undefined : {
          y: -4,
          boxShadow: '0 16px 40px rgba(0,0,0,0.4), 0 0 16px rgba(100,255,218,0.12)',
          borderColor: 'rgba(100,255,218,0.5)',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-5 sm:p-6">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
            <div className="flex items-start gap-4">
              {/* Company letter logo */}
              <motion.div
                className="flex-shrink-0 w-10 h-10 border border-primary/60 bg-primary/10 rounded-sm flex items-center justify-center font-mono font-bold text-primary text-lg"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                aria-hidden="true"
              >
                {letter}
              </motion.div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {experience.title}
                </h3>
                <a
                  href={experience.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-semibold mt-0.5"
                >
                  {experience.companyName}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <Badge
              variant="outline"
              className="font-mono text-xs border-primary/40 text-primary self-start flex-shrink-0"
            >
              {experience.date}
            </Badge>
          </div>

          {/* Expandable details */}
          <motion.button
            className="w-full text-left mb-3"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`exp-details-${index}`}
          >
            <div className="flex items-center justify-between font-mono text-xs text-primary/60 hover:text-primary transition-colors">
              <span>{expanded ? 'COLLAPSE DETAILS' : 'EXPAND DETAILS'}</span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </div>
          </motion.button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id={`exp-details-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 mb-4">
                  {experience.jobDescription.map((desc, di) => (
                    <li key={di} className="flex gap-2 text-foreground/80 text-sm leading-relaxed">
                      <span className="text-primary mt-1 flex-shrink-0">▹</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tech chips */}
          <div>
            <div className="font-mono text-xs text-muted-foreground mb-2">TECHNOLOGIES</div>
            <StaggerChildren className="flex flex-wrap gap-1.5">
              {experience.skills.map((skill, si) => (
                <motion.div key={si} variants={fadeUpChild}>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary/50 hover:bg-primary/15 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-20"
    >
      <div className="container max-w-5xl">
        {/* Section Header */}
        <StaggerChildren className="mb-8 sm:mb-12">
          <motion.h2
            variants={fadeUpChild}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            <span className="text-primary font-mono">[03]</span> EXPERIENCE
          </motion.h2>
          <motion.div
            variants={fadeUpChild}
            className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md"
          />
          <motion.p
            variants={fadeUpChild}
            className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl"
          >
            Professional journey across software engineering, robotics, and systems design
          </motion.p>
        </StaggerChildren>

        {/* Timeline */}
        <div className="relative space-y-8 pl-0 md:pl-4">
          <TimelineSVG progress={pathProgress} />

          {workExperienceList.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block border border-primary/20 bg-card/30 backdrop-blur-sm rounded-sm p-6">
            <p className="text-foreground/80 mb-4">Want to see more details about my experience?</p>
            <a
              href="https://docs.google.com/document/d/1FHvri0eEL3-H8Sbb__7zwEXrtZoWXgaXoLcrwwaP2LI/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-mono text-sm rounded-sm hover:bg-primary/90 transition-colors"
            >
              Download Full Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
