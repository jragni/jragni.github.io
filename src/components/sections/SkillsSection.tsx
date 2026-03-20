import { motion, useReducedMotion } from 'framer-motion'
import { SkillTabs } from '@/components/ui/skill-tabs'
import type { SkillDomain } from '@/components/ui/skill-tabs'
import { StaggerChildren, fadeUpChild } from '@/components/motion/StaggerChildren'

const hudDomains: SkillDomain[] = [
  {
    id: 'languages',
    label: 'LANGUAGES',
    skills: [
      { name: 'TypeScript', primary: true },
      { name: 'JavaScript', primary: true },
      { name: 'Python', primary: true },
      { name: 'SQL', primary: false },
      { name: 'C/C++', primary: false },
    ],
  },
  {
    id: 'frontend',
    label: 'FRONTEND & WEB',
    skills: [
      { name: 'React', primary: true },
      { name: 'Next.js', primary: true },
      { name: 'Redux', primary: true },
      { name: 'HTML/CSS', primary: true },
      { name: 'D3.js', primary: false },
      { name: 'Three.js', primary: false },
      { name: 'Tailwind CSS', primary: true },
      { name: 'Figma', primary: false },
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND & APIs',
    skills: [
      { name: 'Node.js', primary: true },
      { name: 'Express', primary: true },
      { name: 'Django', primary: true },
      { name: 'Flask', primary: false },
      { name: 'gRPC', primary: false },
      { name: 'REST APIs', primary: true },
    ],
  },
  {
    id: 'databases',
    label: 'DATABASES',
    skills: [
      { name: 'PostgreSQL', primary: true },
      { name: 'MySQL', primary: true },
      { name: 'Redis', primary: false },
      { name: 'SQLAlchemy', primary: false },
    ],
  },
  {
    id: 'devops',
    label: 'DEVOPS & TESTING',
    skills: [
      { name: 'Docker', primary: true },
      { name: 'AWS S3', primary: false },
      { name: 'Git/GitHub', primary: true },
      { name: 'PyTest', primary: false },
      { name: 'Jest', primary: false },
      { name: 'Jenkins', primary: false },
      { name: 'Travis CI', primary: false },
      { name: 'GitHub Actions', primary: true },
      { name: 'Jira', primary: false },
      { name: 'Postman', primary: false },
    ],
  },
  {
    id: 'robotics',
    label: 'ROBOTICS & ENG',
    skills: [
      { name: 'ROS/ROS2', primary: true },
      { name: 'OpenCV', primary: true },
      { name: 'YOLOv8', primary: true },
      { name: 'Computer Vision', primary: true },
      { name: 'MATLAB', primary: false },
      { name: 'SolidWorks', primary: false },
    ],
  },
]

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
    >
      <div className="container max-w-6xl">
        {/* Section Header */}
        <StaggerChildren className="mb-8 sm:mb-12">
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
            A diverse skill set spanning full-stack development, robotics, and systems engineering
          </motion.p>
        </StaggerChildren>

        {/* Tabbed skill visualization */}
        <div className="border border-primary/20 bg-card/30 backdrop-blur-sm rounded-sm p-6 sm:p-8">
          <div className="font-mono text-xs text-primary/60 mb-6 tracking-widest">&gt; SKILL.DOMAINS</div>
          <SkillTabs domains={hudDomains} />
        </div>

        {/* Learning note */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 border border-primary/15 bg-card/20 backdrop-blur-sm rounded-sm p-4 sm:p-6"
        >
          <div className="font-mono text-primary text-xs sm:text-sm mb-2">&gt; LEARNING &amp; GROWTH</div>
          <p className="text-sm sm:text-base text-foreground/80">
            Continuously expanding my skill set through hands-on projects, online courses, and contributions
            to open-source. Currently exploring advanced topics in AI/ML, cloud architecture, and real-time systems.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
