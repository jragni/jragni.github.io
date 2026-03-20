import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Variants } from '@/types/motion'

export interface SkillItem {
  name: string
  primary?: boolean
}

export interface SkillDomain {
  id: string
  label: string
  skills: SkillItem[]
}

interface SkillTabsProps {
  domains: SkillDomain[]
  className?: string
}

const reducedMotionVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

const badgeVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 22 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 16 } },
}

export function SkillTabs({ domains, className = '' }: SkillTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const prefersReducedMotion = useReducedMotion()

  const handleTabClick = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1)
    setActiveIndex(i)
  }

  const activeDomain = domains[activeIndex]

  return (
    <div className={className}>
      {/* Tab bar */}
      <div
        className="relative flex gap-1 overflow-x-auto pb-px scrollbar-hide border-b border-primary/20 mb-8"
        role="tablist"
        aria-label="Skill domains"
      >
        {domains.map((domain, i) => (
          <motion.button
            key={domain.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-controls={`skills-panel-${domain.id}`}
            id={`skills-tab-${domain.id}`}
            onClick={() => handleTabClick(i)}
            className={`relative px-4 py-2.5 font-mono text-xs tracking-widest whitespace-nowrap transition-colors flex-shrink-0 ${
              i === activeIndex
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
            // Mobile swipe support via drag
            drag={false}
          >
            {domain.label}
            {i === activeIndex && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Skills panel */}
      <div
        id={`skills-panel-${activeDomain.id}`}
        role="tabpanel"
        aria-labelledby={`skills-tab-${activeDomain.id}`}
        className="min-h-[200px]"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeDomain.id}
            custom={direction}
            variants={prefersReducedMotion ? reducedMotionVariants : badgeVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {activeDomain.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariant}
                  className="relative"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                >
                  <div
                    className={`relative overflow-hidden border font-mono text-xs px-3 py-2 rounded-sm ${
                      skill.primary
                        ? 'border-primary/60 text-primary bg-primary/5'
                        : 'border-primary/20 text-muted-foreground bg-card/50'
                    }`}
                  >
                    <span className="relative z-10">{skill.name}</span>
                    {/* Proficiency bar */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-0.5 ${
                        skill.primary ? 'bg-primary' : 'bg-primary/40'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: skill.primary ? '90%' : '70%' }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.8,
                        ease: 'easeOut',
                        delay: prefersReducedMotion ? 0 : 0.1,
                      }}
                      style={skill.primary ? { boxShadow: '0 0 6px rgba(100,255,218,0.4)' } : undefined}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
