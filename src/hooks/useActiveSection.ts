import { useState, useEffect, useRef, useCallback } from 'react'

export const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'] as const
export type SectionId = typeof SECTIONS[number]

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const ratiosRef = useRef<Map<string, number>>(new Map())

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const ratios = ratiosRef.current
    for (const entry of entries) {
      ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
    }

    let bestId: string | null = null
    let bestRatio = 0
    for (const [id, ratio] of ratios) {
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestId = id
      }
    }

    if (bestId && SECTIONS.includes(bestId as SectionId)) {
      setActiveSection(bestId as SectionId)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: [0, 0.1, 0.2, 0.3, 0.5],
      rootMargin: '-10% 0px -40% 0px',
    })

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [handleIntersect])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return activeSection
}
