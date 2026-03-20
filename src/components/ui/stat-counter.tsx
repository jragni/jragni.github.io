import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useTransform, useReducedMotion } from 'framer-motion'

interface StatCounterProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  className?: string
}

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const spring = useSpring(0, prefersReducedMotion
    ? { stiffness: 1000, damping: 100, restDelta: 0.5 }
    : { stiffness: 60, damping: 20 })
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`)

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}

export function StatCounter({ value, label, suffix = '', prefix = '', className = '' }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView) setStarted(true)
  }, [isInView])

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="font-mono text-3xl sm:text-4xl font-bold text-primary">
        {started || prefersReducedMotion ? (
          <AnimatedNumber value={value} suffix={suffix} prefix={prefix} />
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </div>
      <div className="font-mono text-xs text-muted-foreground tracking-widest mt-1">
        {label}
      </div>
    </div>
  )
}
