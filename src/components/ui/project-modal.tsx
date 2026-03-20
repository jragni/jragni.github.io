import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ProjectCardDetails } from '@/types/portfolio'

interface ProjectModalProps {
  project: ProjectCardDetails | null
  layoutId: string
  onClose: () => void
  onExitComplete?: () => void
}

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function ProjectModal({ project, layoutId, onClose, onExitComplete }: ProjectModalProps) {
  const prefersReducedMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
        ).filter((el) => !el.closest('[aria-hidden="true"]'))

        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!project) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    // Move initial focus to close button
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, handleKey])

  const isGithub = project ? project.href.includes('github.com') : false

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            layoutId={prefersReducedMotion ? undefined : layoutId}
            className="fixed inset-4 sm:inset-8 lg:inset-16 z-[71] overflow-y-auto"
            initial={prefersReducedMotion ? { opacity: 0, scale: 0.95 } : undefined}
            animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : undefined}
            exit={prefersReducedMotion ? { opacity: 0, scale: 0.95 } : undefined}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <div className="bg-[#112240] border border-primary/40 rounded-sm overflow-hidden min-h-full">
              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary/10 transition-colors rounded-sm"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large image */}
              <div className="relative aspect-video overflow-hidden bg-background/50">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{project.description}</p>
                </div>

                {/* Tech stack */}
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-3">TECH STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {isGithub ? (
                    <>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/10 font-mono text-sm transition-colors rounded-sm"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    </>
                  ) : (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm transition-colors rounded-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
