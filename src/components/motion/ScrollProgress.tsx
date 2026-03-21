import { useScroll, useSpring, motion, useReducedMotion } from 'framer-motion'

interface ScrollProgressProps {
  className?: string
  color?: string
  height?: number
  position?: 'top' | 'bottom'
}

export function ScrollProgress({
  className = '',
  color = '#64FFDA',
  height = 2,
  position = 'top',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const positionClass = position === 'top' ? 'top-0' : 'bottom-0'

  return (
    <motion.div
      className={`fixed left-0 right-0 z-[100] origin-left ${positionClass} ${className}`}
      style={{
        scaleX: prefersReducedMotion ? scrollYProgress : scaleX,
        height,
        background: color,
        transformOrigin: 'left center',
        boxShadow: `0 0 8px ${color}60`,
      }}
    />
  )
}
