import { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface HudDomain {
  domain: string
  skills: string[]
}

const hudDomains: HudDomain[] = [
  {
    domain: 'Frontend',
    skills: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Redux', 'HTML/CSS', 'D3.js', 'Three.js', 'Tailwind CSS', 'Figma'],
  },
  {
    domain: 'Backend',
    skills: ['Python', 'SQL', 'C/C++', 'Node.js', 'Express', 'Django', 'Flask', 'gRPC', 'REST APIs', 'PostgreSQL', 'MySQL', 'Redis', 'SQLAlchemy', 'Docker', 'AWS S3', 'Git/GitHub', 'PyTest', 'Jest', 'Jenkins', 'Travis CI', 'GitHub Actions', 'Jira', 'Postman'],
  },
  {
    domain: 'Robotics',
    skills: ['ROS/ROS2', 'OpenCV', 'YOLOv8', 'Computer Vision', 'MATLAB', 'SolidWorks'],
  },
]

export function SkillsSection() {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rows = panelRef.current?.querySelectorAll('[data-skill-row]')
    if (!rows) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const row = entry.target as HTMLElement
            const index = Number(row.dataset.skillRow ?? 0)
            setTimeout(() => {
              row.classList.remove('opacity-0', 'translate-y-4')
              row.classList.add('opacity-100', 'translate-y-0')
            }, index * 120)
          }
        })
      },
      { threshold: 0.2 }
    )
    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-background">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[02]</span> SKILLS & EXPERTISE
          </h2>
          <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md" />
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl">
            A diverse skill set spanning full-stack development, robotics, and systems engineering
          </p>
        </div>

        {/* HUD Skills Panel */}
        <div ref={panelRef} className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-sm">
          <div className="px-4 py-2 border-b border-primary/20 flex items-center gap-3">
            <span className="font-mono text-primary text-xs">SYS.SKILLS_MAP v2.1</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="p-4 sm:p-6 space-y-6">
            {hudDomains.map((domain, domainIndex) => (
              <div
                key={domainIndex}
                className="opacity-0 translate-y-4 transition-all duration-500"
                style={{
                  transitionDelay: `${domainIndex * 120}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                data-skill-row={domainIndex}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-0.5 h-5 bg-primary flex-shrink-0" />
                  <span className="font-mono text-primary text-xs uppercase tracking-widest">{domain.domain}</span>
                </div>
                <div className="flex flex-wrap gap-2 pl-3.5">
                  {domain.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs bg-secondary/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-colors cursor-default font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-1.5 inline-block flex-shrink-0" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-12">
          <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4 sm:p-6">
              <div className="font-mono text-primary text-xs sm:text-sm mb-3">&gt; LEARNING & GROWTH</div>
              <p className="text-sm sm:text-base text-foreground/80">
                Continuously expanding my skill set through hands-on projects, online courses, and contributions
                to open-source. Currently exploring advanced topics in AI/ML, cloud architecture, and real-time systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
