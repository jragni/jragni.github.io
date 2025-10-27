import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code2, Database, Layers, Cpu, Wrench, GitBranch } from 'lucide-react'

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: <Code2 className="w-5 h-5" />,
    color: 'text-primary',
    skills: [
      'TypeScript',
      'JavaScript',
      'Python',
      'SQL',
      'C/C++',
    ],
  },
  {
    title: 'Frontend & Web',
    icon: <Layers className="w-5 h-5" />,
    color: 'text-primary',
    skills: [
      'React',
      'Next.js',
      'Redux',
      'HTML/CSS',
      'D3.js',
      'Three.js',
      'Tailwind CSS',
      'Figma',
    ],
  },
  {
    title: 'Backend & APIs',
    icon: <Database className="w-5 h-5" />,
    color: 'text-primary',
    skills: [
      'Node.js',
      'Express',
      'Django',
      'Flask',
      'gRPC',
      'REST APIs',
    ],
  },
  {
    title: 'Databases',
    icon: <Database className="w-5 h-5" />,
    color: 'text-primary',
    skills: [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'SQLAlchemy',
    ],
  },
  {
    title: 'DevOps & Testing',
    icon: <GitBranch className="w-5 h-5" />,
    color: 'text-primary',
    skills: [
      'Docker',
      'AWS S3',
      'Git/GitHub',
      'PyTest',
      'Jest',
      'Jenkins',
      'Travis CI',
      'GitHub Actions',
      'Jira',
      'Postman',
    ],
  },
  {
    title: 'Robotics & Engineering',
    icon: <Cpu className="w-5 h-5" />,
    color: 'text-primary',
    skills: [
      'ROS/ROS2',
      'OpenCV',
      'YOLOv8',
      'Computer Vision',
      'MATLAB',
      'SolidWorks',
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
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

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className={`${category.color} group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-foreground">
                    {category.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs bg-secondary/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
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
