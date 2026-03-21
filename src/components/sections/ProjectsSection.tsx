import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Maximize2 } from 'lucide-react'
import { ProjectModal } from '@/components/ui/project-modal'
import { projectsList } from '@/data/constants'
import type { ProjectCardDetails } from '@/types/portfolio'
import { StaggerChildren, fadeUpChild } from '@/components/motion/StaggerChildren'

interface ProjectCardProps {
  project: ProjectCardDetails
  index: number
  featured: boolean
  onExpand: (project: ProjectCardDetails, layoutId: string) => void
}

function ImageFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center font-mono text-primary text-sm">
      [PROJECT IMAGE]
    </div>
  )
}

function ProjectCardImage({ project }: { project: ProjectCardDetails }) {
  const [failed, setFailed] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {failed ? (
        <ImageFallback />
      ) : (
        <motion.img
          src={project.src}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.4 }}
          onError={() => setFailed(true)}
        />
      )}
    </>
  )
}

function ProjectCard({ project, index, onExpand }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const layoutId = `project-card-${index}`
  const numLabel = `[${String(index + 1).padStart(2, '0')}]`
  const isGithub = project.href.includes('github.com')

  return (
    <motion.div
      layoutId={prefersReducedMotion ? undefined : layoutId}
      variants={fadeUpChild}
      className="group relative border border-primary/30 bg-card/50 backdrop-blur-sm rounded-sm overflow-hidden flex flex-col"
      whileHover={prefersReducedMotion ? undefined : {
        y: -6,
        borderColor: 'rgba(100,255,218,0.55)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.4), 0 0 20px rgba(100,255,218,0.1)',
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Project image */}
      <div className="relative aspect-video bg-secondary/30 overflow-hidden">
        <ProjectCardImage project={project} />

        {/* Teal overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-primary/10 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-70 pointer-events-none" />

        {/* Expand button */}
        <button
          onClick={() => onExpand(project, layoutId)}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-background/70 border border-primary/30 text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 rounded-sm"
          aria-label={`Expand ${project.title}`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Project number */}
        <div className="absolute top-2 left-2 font-mono text-xs text-primary bg-background/70 px-1.5 py-0.5">
          {numLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-foreground/70 mt-1 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex-1">
          <div className="font-mono text-xs text-muted-foreground mb-2">TECH STACK</div>
          <div className="flex flex-wrap gap-1.5">
            {project.skills.slice(0, 6).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-xs bg-secondary/50 hover:bg-primary/15 hover:text-primary transition-colors cursor-default"
              >
                {skill}
              </Badge>
            ))}
            {project.skills.length > 6 && (
              <Badge variant="secondary" className="text-xs text-muted-foreground">
                +{project.skills.length - 6}
              </Badge>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {isGithub ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="font-mono border-primary/50 text-primary hover:bg-primary/10 flex-1 text-xs"
                asChild
              >
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3.5 h-3.5 mr-1.5" />
                  Code
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="font-mono text-muted-foreground hover:text-primary text-xs"
                onClick={() => onExpand(project, layoutId)}
              >
                <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
                Details
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="font-mono border-primary/50 text-primary hover:bg-primary/10 flex-1 text-xs"
                asChild
              >
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  View Project
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="font-mono text-muted-foreground hover:text-primary text-xs"
                onClick={() => onExpand(project, layoutId)}
              >
                <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
                Details
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectCardDetails | null>(null)
  const [activeLayoutId, setActiveLayoutId] = useState('')

  const handleExpand = (project: ProjectCardDetails, layoutId: string) => {
    setActiveProject(project)
    setActiveLayoutId(layoutId)
  }

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <StaggerChildren className="mb-8 sm:mb-12">
          <motion.h2
            variants={fadeUpChild}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            <span className="text-primary font-mono">[04]</span> FEATURED PROJECTS
          </motion.h2>
          <motion.div
            variants={fadeUpChild}
            className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md"
          />
          <motion.p
            variants={fadeUpChild}
            className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl"
          >
            A showcase of my work in web development, robotics, and AI systems
          </motion.p>
        </StaggerChildren>

        {/* Bento grid */}
        <StaggerChildren
          className="grid md:grid-cols-2 gap-6"
          staggerDelay={0.1}
        >
          {projectsList.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              featured={index < 2}
              onExpand={handleExpand}
            />
          ))}
        </StaggerChildren>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block border border-primary/20 bg-card/30 backdrop-blur-sm rounded-sm p-6">
            <p className="text-foreground/80 mb-4">Interested in seeing more of my work?</p>
            <Button
              variant="outline"
              className="font-mono border-primary text-primary hover:bg-primary/10"
              asChild
            >
              <a href="https://github.com/jragni" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View GitHub Profile
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Project modal */}
      <ProjectModal
        project={activeProject}
        layoutId={activeLayoutId}
        onClose={() => setActiveProject(null)}
        onExitComplete={() => setActiveLayoutId('')}
      />
    </section>
  )
}
