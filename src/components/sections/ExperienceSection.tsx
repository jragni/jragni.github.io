import { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, ChevronDown, Download } from 'lucide-react'
import { workExperienceList } from '@/data/constants'
import type { ExperienceCardProps } from '@/types/portfolio'

const PREVIEW_COUNT = 2

function CompanyInitial({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <div
      className="
        w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0
        border border-primary/40 bg-primary/10
        font-mono font-bold text-primary text-base
        tactical-glow
      "
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}

function ExperienceCard({ experience, index }: { experience: ExperienceCardProps; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const previewItems = experience.jobDescription.slice(0, PREVIEW_COUNT)
  const remainingItems = experience.jobDescription.slice(PREVIEW_COUNT)
  const hasMore = remainingItems.length > 0

  return (
    <div
      className="relative group"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Timeline dot */}
      <div
        className="hidden md:block absolute left-[-2.25rem] top-6 w-3 h-3 rounded-full bg-primary
                   ring-4 ring-background shadow shadow-primary/50 z-10"
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative border border-primary/20 hover:border-primary/40 bg-card/50 backdrop-blur-sm
                   rounded-sm transition-all duration-300 overflow-hidden"
      >
        {/* Left border accent — animated on hover */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/0 group-hover:bg-primary/60
                     transition-all duration-500"
          aria-hidden="true"
        />

        {/* Card header */}
        <div className="px-5 sm:px-6 pt-5 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex items-start gap-3">
              <CompanyInitial name={experience.companyName} />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  {experience.title}
                </h3>
                <a
                  href={experience.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors mt-0.5 hud-focus focus-visible:outline-none rounded-sm"
                >
                  <span className="text-sm font-medium">{experience.companyName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <Badge
              variant="outline"
              className="font-mono text-[10px] border-primary/40 text-primary self-start whitespace-nowrap"
            >
              {experience.date}
            </Badge>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mx-5 sm:mx-6 bg-primary/10" />

        {/* Responsibilities */}
        <div className="px-5 sm:px-6 py-4 space-y-3">
          <ul className="space-y-2.5">
            {previewItems.map((description, descIndex) => (
              <li key={descIndex} className="flex gap-3 text-foreground/80 text-sm leading-relaxed">
                <span className="text-primary mt-1 flex-shrink-0 text-xs">▹</span>
                <span>{description}</span>
              </li>
            ))}
          </ul>

          {/* Expandable items */}
          {hasMore && (
            <>
              <ul
                className={`space-y-2.5 overflow-hidden transition-all duration-300 list-none ${
                  expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {remainingItems.map((description, descIndex) => (
                  <li key={descIndex} className="flex gap-3 text-foreground/80 text-sm leading-relaxed">
                    <span className="text-primary mt-1 flex-shrink-0 text-xs">▹</span>
                    <span>{description}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setExpanded((v) => !v)}
                className="
                  flex items-center gap-1.5 font-mono text-[10px] text-primary/50
                  hover:text-primary transition-colors duration-150
                  hud-focus focus-visible:outline-none rounded-sm mt-1
                "
                aria-expanded={expanded}
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                />
                {expanded ? 'SHOW LESS' : `+${remainingItems.length} MORE`}
              </button>
            </>
          )}
        </div>

        {/* Technologies */}
        <div className="px-5 sm:px-6 pb-5">
          <div className="h-px bg-primary/10 mb-4" />
          <div className="hud-label mb-2.5">TECHNOLOGIES USED</div>
          <div className="flex flex-wrap gap-1.5">
            {experience.skills.map((skill, skillIndex) => (
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
      </div>
    </div>
  )
}

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('timeline-visible')
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="timeline-line-animated absolute left-[0.875rem] top-0 bottom-0 w-px bg-primary/30"
      aria-hidden="true"
    />
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="hud-label mb-2">// MISSION HISTORY</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[03]</span> EXPERIENCE
          </h2>
          <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md" />
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl">
            Professional journey across software engineering, robotics, and systems design
          </p>
        </div>

        {/* Timeline */}
        <div className="relative md:pl-9">
          {/* Animated vertical timeline line */}
          <TimelineLine />

          <div className="space-y-6 sm:space-y-8">
            {workExperienceList.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} index={index} />
            ))}
          </div>
        </div>

        {/* Resume CTA with HUD bracket framing */}
        <div className="mt-14 flex justify-center">
          <div className="relative inline-block">
            {/* HUD bracket corners */}
            <span className="absolute -top-3 -left-3 w-4 h-4 border-t-2 border-l-2 border-primary/60" aria-hidden="true" />
            <span className="absolute -top-3 -right-3 w-4 h-4 border-t-2 border-r-2 border-primary/60" aria-hidden="true" />
            <span className="absolute -bottom-3 -left-3 w-4 h-4 border-b-2 border-l-2 border-primary/60" aria-hidden="true" />
            <span className="absolute -bottom-3 -right-3 w-4 h-4 border-b-2 border-r-2 border-primary/60" aria-hidden="true" />

            <div className="border border-primary/20 bg-card/30 backdrop-blur-sm rounded-sm px-8 py-6 text-center space-y-4">
              <div className="hud-label text-primary/60">// FULL MISSION REPORT</div>
              <p className="text-foreground/80 text-sm">
                Want to see more details about my experience?
              </p>
              <a
                href="https://docs.google.com/document/d/1FHvri0eEL3-H8Sbb__7zwEXrtZoWXgaXoLcrwwaP2LI/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  btn-scan-hover hud-focus inline-flex items-center gap-2
                  px-6 py-3 font-mono text-sm font-semibold
                  bg-primary text-primary-foreground
                  hover:bg-primary/90
                  shadow-lg shadow-primary/20
                  transition-all duration-200 rounded-sm
                  focus-visible:outline-none
                "
              >
                <Download className="w-4 h-4" />
                Download Full Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
