import { useEffect } from 'react'

export function useScrollAnimation() {
  useEffect(() => {
    const sections = document.querySelectorAll('section')

    const observerOptions = {
      threshold: 0.15, // Trigger when 15% of section is visible
      rootMargin: '0px'
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible')
        } else {
          entry.target.classList.remove('section-visible')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])
}
