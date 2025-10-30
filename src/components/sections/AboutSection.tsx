import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="container max-w-5xl">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[01]</span> ABOUT ME
          </h2>
          <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Bio */}
          <div className="flex flex-col">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30 flex-1">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                  I'm a <span className="text-primary font-semibold">full-stack software engineer</span> with
                  a unique background spanning software development, robotics, and systems engineering. My journey
                  from mechanical engineering to software development has given me a distinctive perspective on
                  problem-solving and system design. <i className="text-primary font-semibold">One mind, any framework</i>.
                </p>

                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Currently, I work at <span className="text-primary">Dovenmuehle Mortgage</span>, where I develop
                  and maintain web and mobile applications that serve thousands of mortgage customers. I specialize
                  in architecting full-stack solutions with{' '}
                  <span className="text-foreground font-semibold">TypeScript</span>,{' '}
                  <span className="text-foreground font-semibold">React</span>, and{' '}
                  <span className="text-foreground font-semibold">Node.js</span>, focusing on scalability, performance optimization, and intuitive user experiences.
                </p>

                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Beyond web development, I'm passionate about <span className="text-primary">robotics and AI</span>.
                  I've built autonomous robots using ROS2, developed computer vision systems with YOLO, and created
                  real-time telemetry dashboards. I love working at the intersection of software and hardware,
                  where code meets the physical world.
                </p>

                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  When I'm not coding, you'll find me powerlifting at the gym, training in BJJ, or volunteering for beach cleanups.
                  I also enjoy tinkering with robotics projects and contributing to open-source. I believe in continuous learning—whether
                  it's mastering a new framework, perfecting a lift, or learning a new technique on the mat.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Image and Quick Facts */}
          <div className="flex flex-col space-y-6 sm:space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30 overflow-hidden">
              <div className="aspect-square relative bg-secondary/30 flex items-center justify-center">
                <img
                  src="/surf.png"
                  alt="Jhensen Ray Agni"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = '<div class="font-mono text-primary text-sm">[IMAGE]</div>'
                  }}
                />
              </div>
            </Card>

            {/* Quick Facts */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h3 className="font-mono text-primary text-xs sm:text-sm mb-4">&gt; QUICK FACTS</h3>

                <div className="space-y-3">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">LOCATION</div>
                    <div className="text-xs sm:text-sm text-foreground">Los Angeles, CA</div>
                  </div>

                  <div className="h-px bg-primary/20" />

                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">EXPERIENCE</div>
                    <div className="text-xs sm:text-sm text-foreground">5+ Years</div>
                  </div>

                  <div className="h-px bg-primary/20" />

                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">FOCUS AREAS</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">Web Dev</Badge>
                      <Badge variant="secondary" className="text-xs">Robotics</Badge>
                      <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                    </div>
                  </div>

                  <div className="h-px bg-primary/20" />

                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">EDUCATION</div>
                    <div className="text-xs sm:text-sm text-foreground">B.S. Mechanical Engineering</div>
                    <div className="text-xs text-muted-foreground">Manufacturing & Design</div>
                    <div className="text-xs text-muted-foreground">UC Riverside</div>
                    <div className="text-xs sm:text-sm text-foreground mt-2">Software Engineering</div>
                    <div className="text-xs text-muted-foreground">Rithm School</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
