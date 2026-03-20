import { useEffect, useRef, useState } from 'react'
import { X, ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ProjectCardDetails } from '@/types/portfolio'

interface ProjectModalProps {
  project: ProjectCardDetails
  projectNumber: string
  onClose: () => void
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className="aspect-video w-full flex items-center justify-center bg-secondary/30">
        <span className="font-mono text-primary text-sm">[PROJECT IMAGE]</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-secondary/30 overflow-hidden">
      {!loaded && <div className="absolute inset-0 img-skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
    </div>
  )
}

export function ProjectModal({ project, projectNumber, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const isGithub = project.href.includes('github.com')

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Scanlines on backdrop */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-2xl bg-card border border-primary/40 rounded-sm shadow-2xl shadow-primary/10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* HUD corner brackets */}
        <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/70 z-10 pointer-events-none" aria-hidden="true" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary/70 z-10 pointer-events-none" aria-hidden="true" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary/70 z-10 pointer-events-none" aria-hidden="true" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/70 z-10 pointer-events-none" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-primary/20">
          <div>
            <div className="hud-label mb-1">// PROJECT DETAILS {projectNumber}</div>
            <h2 id="project-modal-title" className="text-lg sm:text-xl font-bold text-foreground">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="
              text-muted-foreground hover:text-primary transition-colors
              p-1 rounded-sm hud-focus focus-visible:outline-none ml-4 flex-shrink-0
            "
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <ProjectImage src={project.src} alt={project.title} />

          <div className="px-6 py-5 space-y-5">
            {/* Description */}
            <div>
              <div className="hud-label mb-2">// DESCRIPTION</div>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <div className="hud-label mb-2">// TECH STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-primary/20 flex gap-3">
          {isGithub ? (
            <>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  btn-scan-hover hud-focus inline-flex items-center gap-2
                  flex-1 justify-center px-4 py-2.5 font-mono text-xs
                  border border-primary/40 text-primary hover:bg-primary/10
                  transition-all duration-200 rounded-sm focus-visible:outline-none
                "
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  btn-scan-hover hud-focus inline-flex items-center gap-2
                  flex-1 justify-center px-4 py-2.5 font-mono text-xs
                  bg-primary text-primary-foreground hover:bg-primary/90
                  transition-all duration-200 rounded-sm focus-visible:outline-none
                "
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </>
          ) : (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                btn-scan-hover hud-focus inline-flex items-center gap-2
                flex-1 justify-center px-4 py-2.5 font-mono text-xs
                bg-primary text-primary-foreground hover:bg-primary/90
                transition-all duration-200 rounded-sm focus-visible:outline-none
              "
            >
              <ExternalLink className="w-4 h-4" />
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
