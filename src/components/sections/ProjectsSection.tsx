import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Maximize2 } from 'lucide-react'
import { projectsList } from '@/data/constants'
import { ProjectModal } from '@/components/ui/project-modal'
import type { ProjectCardDetails } from '@/types/portfolio'

function formatProjectNumber(index: number): string {
  return `[${String(index + 1).padStart(2, '0')}]`
}

function ProjectImage({ src, alt, featured = false }: { src: string; alt: string; featured?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className={`w-full ${featured ? 'aspect-video sm:aspect-[16/7]' : 'aspect-video'} flex items-center justify-center bg-secondary/30`}>
        <div className="font-mono text-primary text-center">
          <div className="text-xl mb-1">[ ]</div>
          <div className="text-xs text-muted-foreground">[IMAGE]</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${featured ? 'aspect-video sm:aspect-[16/7]' : 'aspect-video'} bg-secondary/30 overflow-hidden`}>
      {!loaded && <div className="absolute inset-0 img-skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
      {/* Teal overlay on hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-300" />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
    </div>
  )
}

interface ProjectCardProps {
  project: ProjectCardDetails
  index: number
  featured?: boolean
  onExpand: (project: ProjectCardDetails, number: string) => void
}

function ProjectCard({ project, index, featured = false, onExpand }: ProjectCardProps) {
  const projectNumber = formatProjectNumber(index)
  const isGithub = project.href.includes('github.com')

  return (
    <div
      className={`
        relative border border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur-sm
        rounded-sm overflow-hidden transition-all duration-300 group flex flex-col
        ${featured ? 'md:col-span-2' : ''}
      `}
    >
      {/* Image */}
      <div className="relative">
        <ProjectImage src={project.src} alt={project.title} featured={featured} />

        {/* "VIEW PROJECT" hover overlay text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="font-mono text-xs sm:text-sm font-bold text-primary tracking-[0.2em] bg-background/60 backdrop-blur-sm px-4 py-2 rounded-sm border border-primary/30">
            VIEW PROJECT
          </div>
        </div>

        {/* Project number badge */}
        <div className="absolute top-3 left-3 font-mono text-xs text-primary/80 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-sm border border-primary/20">
          {projectNumber}
        </div>

        {/* Expand button */}
        <button
          onClick={() => onExpand(project, projectNumber)}
          className="
            absolute top-3 right-3 p-1.5 rounded-sm
            bg-background/80 backdrop-blur-sm border border-primary/20
            text-muted-foreground hover:text-primary hover:border-primary/60
            transition-all duration-150 hud-focus focus-visible:outline-none
            opacity-0 group-hover:opacity-100
          "
          aria-label={`Expand details for ${project.title}`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="space-y-3">
          <div className="hud-label">TECH STACK</div>
          <div className="flex flex-wrap gap-1.5">
            {project.skills.map((skill, skillIndex) => (
              <Badge
                key={skillIndex}
                variant="secondary"
                className="text-xs bg-secondary/40 hover:bg-primary/15 hover:text-primary hover:border-primary/30 border border-transparent transition-all duration-150"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {isGithub ? (
            <>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  btn-scan-hover hud-focus inline-flex items-center gap-1.5
                  flex-1 justify-center px-3 py-2 font-mono text-xs
                  border border-primary/30 text-primary hover:bg-primary/10
                  transition-all duration-200 rounded-sm focus-visible:outline-none
                "
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  btn-scan-hover hud-focus inline-flex items-center gap-1.5
                  flex-1 justify-center px-3 py-2 font-mono text-xs
                  bg-primary text-primary-foreground hover:bg-primary/90
                  transition-all duration-200 rounded-sm focus-visible:outline-none
                "
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Demo
              </a>
            </>
          ) : (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                btn-scan-hover hud-focus inline-flex items-center gap-1.5
                flex-1 justify-center px-3 py-2 font-mono text-xs
                bg-primary text-primary-foreground hover:bg-primary/90
                transition-all duration-200 rounded-sm focus-visible:outline-none
              "
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Project
            </a>
          )}
          <button
            onClick={() => onExpand(project, projectNumber)}
            className="
              btn-scan-hover hud-focus inline-flex items-center gap-1.5
              px-3 py-2 font-mono text-xs
              border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/40
              transition-all duration-200 rounded-sm focus-visible:outline-none
            "
            aria-label={`Details for ${project.title}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const [modalProject, setModalProject] = useState<{ project: ProjectCardDetails; number: string } | null>(null)

  const handleExpand = (project: ProjectCardDetails, number: string) => {
    setModalProject({ project, number })
  }

  const handleCloseModal = () => {
    setModalProject(null)
  }

  return (
    <>
      <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="container max-w-6xl">
          {/* Section Header */}
          <div className="mb-10 sm:mb-14">
            <div className="hud-label mb-2">// MISSION PORTFOLIO</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-primary font-mono">[04]</span> FEATURED PROJECTS
            </h2>
            <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md" />
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl">
              A showcase of my work in web development, robotics, and AI systems
            </p>
          </div>

          {/* Projects Grid — first card spans full width on desktop */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {projectsList.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                featured={index === 0}
                onExpand={handleExpand}
              />
            ))}
          </div>

          {/* More Projects CTA */}
          <div className="mt-12 flex justify-center">
            <a
              href="https://github.com/jragni"
              target="_blank"
              rel="noopener noreferrer"
              className="
                btn-scan-hover hud-focus inline-flex items-center gap-2
                px-6 py-3 font-mono text-sm
                border border-primary/30 text-primary hover:bg-primary/10
                transition-all duration-200 rounded-sm focus-visible:outline-none
              "
            >
              <Github className="w-4 h-4" />
              View GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalProject && (
        <ProjectModal
          project={modalProject.project}
          projectNumber={modalProject.number}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
