import { useState, useEffect } from 'react'

export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      if (docHeight <= 0) {
        setScrollProgress(0)
        return
      }

      const progress = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)))
      setScrollProgress(progress)
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return scrollProgress
}
