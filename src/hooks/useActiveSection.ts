import { useState, useEffect, useRef } from 'react'

export type SectionId = 'home' | 'about' | 'skills' | 'experience' | 'projects' | 'contact'

const SECTION_IDS: SectionId[] = ['home', 'about', 'skills', 'experience', 'projects', 'contact']

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const activeSectionRef = useRef<SectionId>('home')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sectionVisibility: Record<string, number> = {}

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionVisibility[entry.target.id] = entry.intersectionRatio
        })

        // Find the section with the highest intersection ratio
        let maxRatio = 0
        let mostVisible: SectionId = activeSectionRef.current

        SECTION_IDS.forEach((id) => {
          const ratio = sectionVisibility[id] ?? 0
          if (ratio > maxRatio) {
            maxRatio = ratio
            mostVisible = id
          }
        })

        if (maxRatio > 0) {
          setActiveSection(mostVisible)
          activeSectionRef.current = mostVisible
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-64px 0px -20% 0px',
      }
    )

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)

    sections.forEach((section) => {
      if (section && observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return activeSection
}
