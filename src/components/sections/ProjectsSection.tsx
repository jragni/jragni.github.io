import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import { projectsList } from '@/data/constants'

export function ProjectsSection() {
  const getGithubLink = (href: string) => {
    if (href.includes('github.com')) return href
    return null
  }

  const getLiveLink = (href: string) => {
    return href
  }

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[04]</span> FEATURED PROJECTS
          </h2>
          <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            A showcase of my work in web development, robotics, and AI systems
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projectsList.map((project, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col"
            >
              {/* Project Image */}
              <div className="relative aspect-video bg-secondary/30 overflow-hidden">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center font-mono text-primary text-sm">[PROJECT IMAGE]</div>'
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-foreground/70 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                {/* Tech Stack */}
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-3">
                    TECH STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, skillIndex) => (
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {getGithubLink(project.href) ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-mono border-primary text-primary hover:bg-primary/10 flex-1"
                        asChild
                      >
                        <a
                          href={getGithubLink(project.href)!}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      {!project.href.endsWith('.com') && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-mono border-primary text-primary hover:bg-primary/10 flex-1"
                          asChild
                        >
                          <a
                            href={getLiveLink(project.href)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-mono border-primary text-primary hover:bg-primary/10 w-full"
                      asChild
                    >
                      <a
                        href={getLiveLink(project.href)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-card/30 backdrop-blur-sm border-primary/20 inline-block">
            <CardContent className="p-6">
              <p className="text-foreground/80 mb-4">
                Interested in seeing more of my work?
              </p>
              <Button
                variant="outline"
                className="font-mono border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <a
                  href="https://github.com/jragni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View GitHub Profile
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
