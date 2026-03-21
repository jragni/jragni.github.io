import { useState, useEffect, useRef, useCallback } from 'react'

export const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'] as const
export type SectionId = typeof SECTIONS[number]

interface UseActiveSectionOptions {
  threshold?: number
  rootMargin?: string
}

export function useActiveSection(options: UseActiveSectionOptions = {}): SectionId {
  const { threshold = 0.3, rootMargin = '-10% 0px -60% 0px' } = options
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id as SectionId
        if (SECTIONS.includes(id)) {
          setActiveSection(id)
        }
      }
    })
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    })

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [handleIntersect, threshold, rootMargin])

  // Fallback scroll listener — when user scrolls back to very top,
  // no section may be "intersecting" so we explicitly set active to 'home'.
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
