import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'
import { workExperienceList } from '@/data/constants'

export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-5xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[03]</span> EXPERIENCE
          </h2>
          <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Professional journey across software engineering, robotics, and systems design
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />

          {workExperienceList.map((experience, index) => (
            <div key={index} className="relative">
              {/* Timeline Dot */}
              <div className="hidden md:block absolute left-8 top-8 w-4 h-4 -ml-[0.4375rem] rounded-full bg-primary ring-4 ring-background" />

              {/* Content */}
              <div className="md:ml-20">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {experience.title}
                        </CardTitle>
                        <a
                          href={experience.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-2"
                        >
                          <span className="text-lg font-semibold">{experience.companyName}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-primary/50 text-primary self-start"
                      >
                        {experience.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Responsibilities */}
                    <ul className="space-y-3">
                      {experience.jobDescription.map((description, descIndex) => (
                        <li key={descIndex} className="flex gap-3 text-foreground/80">
                          <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                          <span className="leading-relaxed">{description}</span>
                        </li>
                      ))}
                    </ul>

                    <Separator className="bg-primary/20" />

                    {/* Skills/Technologies */}
                    <div>
                      <div className="font-mono text-xs text-muted-foreground mb-3">
                        TECHNOLOGIES USED
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="text-xs bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Download Resume CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-card/30 backdrop-blur-sm border-primary/20 inline-block">
            <CardContent className="p-6">
              <p className="text-foreground/80 mb-4">
                Want to see more details about my experience?
              </p>
              <a
                href="https://docs.google.com/document/d/1FHvri0eEL3-H8Sbb__7zwEXrtZoWXgaXoLcrwwaP2LI/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-mono text-sm rounded hover:bg-primary/90 transition-colors"
              >
                Download Full Resume
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
