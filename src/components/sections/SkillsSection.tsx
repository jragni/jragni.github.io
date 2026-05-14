import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Code2, Database, Layers, Cpu, GitBranch, Server } from 'lucide-react'
import { StaggerChildren, fadeUpChild } from '@/components/motion/StaggerChildren'

interface SkillCategory {
  title: string
  icon: ReactNode
  primarySkills: string[]
  secondarySkills: string[]
  description: string
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: <Code2 className="w-4 h-4" />,
    primarySkills: ['TypeScript', 'JavaScript', 'Python'],
    secondarySkills: ['SQL', 'C/C++'],
    description: 'Core programming languages across web, scripting, and systems',
  },
  {
    title: 'Frontend & Web',
    icon: <Layers className="w-4 h-4" />,
    primarySkills: ['React', 'Next.js', 'Tailwind CSS', 'Redux'],
    secondarySkills: ['HTML/CSS', 'shadcn/ui', 'D3.js', 'Three.js', 'WebRTC', 'WebSocket', 'Figma'],
    description: 'Modern UI frameworks and visual tooling',
  },
  {
    title: 'Backend & APIs',
    icon: <Server className="w-4 h-4" />,
    primarySkills: ['Node.js', 'Express', 'FastAPI', 'Django'],
    secondarySkills: ['Koa', 'Flask', 'tRPC', 'REST APIs', 'JWT', 'OIDC', 'SAML 2.0'],
    description: 'Server-side frameworks and API design',
  },
  {
    title: 'Databases',
    icon: <Database className="w-4 h-4" />,
    primarySkills: ['PostgreSQL', 'MySQL', 'Redis'],
    secondarySkills: ['SQLAlchemy'],
    description: 'Relational and in-memory data stores',
  },
  {
    title: 'DevOps & Testing',
    icon: <GitBranch className="w-4 h-4" />,
    primarySkills: ['Docker', 'AWS S3', 'Git/GitHub', 'Jest', 'Playwright'],
    secondarySkills: ['Nginx', 'Linux', 'AWS EC2', 'AWS Elastic Beanstalk', 'PyTest', 'Jenkins', 'Travis CI', 'GitHub Actions', 'Jira', 'Postman'],
    description: 'CI/CD pipelines, containers, and testing',
  },
  {
    title: 'Systems & Hardware',
    icon: <Cpu className="w-4 h-4" />,
    primarySkills: ['ROS/ROS2', 'OpenCV', 'YOLOv11', 'YOLOv8'],
    secondarySkills: ['Computer Vision', 'SLAM Toolbox', 'Nav2', 'Arduino', 'KiCad', 'MATLAB', 'SolidWorks'],
    description: 'Autonomous systems, computer vision, and CAD',
  },
]

function SkillPanel({ category, index }: { category: SkillCategory; index: number }) {
  const prefersReducedMotion = useReducedMotion()
  const allSkills = [...category.primarySkills, ...category.secondarySkills]

  return (
    <motion.div
      variants={fadeUpChild}
      className="border border-primary/20 hover:border-primary/40 bg-card/40 backdrop-blur-sm rounded-sm
                 transition-colors duration-300 group overflow-hidden"
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${index * 50}ms` }}
      whileHover={prefersReducedMotion ? undefined : {
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 16px rgba(100,255,218,0.08)',
      }}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          <div className="text-primary group-hover:scale-110 transition-transform duration-200">
            {category.icon}
          </div>
          <span className="font-mono text-xs sm:text-sm font-semibold text-foreground tracking-wide">
            {category.title}
          </span>
        </div>
        <span className="font-mono text-[10px] text-primary/30 tracking-widest">
          {allSkills.length} TOOLS
        </span>
      </div>

      {/* Panel Content */}
      <div className="p-4 space-y-3">
        <p className="text-[11px] text-muted-foreground/70 font-mono leading-relaxed hidden sm:block">
          {category.description}
        </p>

        {/* All skills — uniform styling */}
        <div className="flex flex-wrap gap-1.5">
          {allSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-1 rounded-sm font-mono text-xs
                bg-primary/10 text-primary border border-primary/30
                hover:bg-primary/20 hover:border-primary/60
                hover:shadow hover:shadow-primary/20
                transition-all duration-150 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <StaggerChildren className="mb-10 sm:mb-14">
          <motion.h2
            variants={fadeUpChild}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            <span className="text-primary font-mono">[02]</span> SKILLS &amp; EXPERTISE
          </motion.h2>
          <motion.div
            variants={fadeUpChild}
            className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md"
          />
          <motion.p
            variants={fadeUpChild}
            className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl"
          >
            Full-stack engineering skills built across production web systems and defense-adjacent technical environments
          </motion.p>
        </StaggerChildren>

        {/* Skills Grid */}
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.07}>
          {skillCategories.map((category, index) => (
            <SkillPanel key={index} category={category} index={index} />
          ))}
        </StaggerChildren>

        {/* Learning & Growth note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <div className="border border-primary/15 bg-card/20 backdrop-blur-sm rounded-sm px-5 py-4">
            <div className="font-mono text-xs text-primary/60 mb-2 tracking-widest">// LEARNING &amp; GROWTH</div>
            <p className="text-sm sm:text-base text-foreground/70">
              I learn by building. Right now I'm spending most of my side-project time on cloud architecture,
              real-time systems, and UI for mission-critical workflows.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
