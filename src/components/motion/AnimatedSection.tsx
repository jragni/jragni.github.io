import { ReactNode, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Variants } from '@/types/motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
  threshold?: number
}

const buildVariants = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: delay,
    },
  },
})

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  id,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, {
    once: true,
    margin: '-5% 0px',
    amount: threshold,
  })

  const variants = prefersReducedMotion ? reducedVariants : buildVariants(delay)

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
