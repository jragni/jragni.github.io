import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { StatCounter } from '@/components/ui/stat-counter'
import { ImageGallery } from '@/components/ui/image-gallery'
import { carouselImages } from './constants'
import { StaggerChildren, fadeUpChild } from '@/components/motion/StaggerChildren'

interface QuickFact {
  label: string
  value: string
  sub?: string[]
}

const quickFacts: QuickFact[] = [
  { label: 'LOCATION', value: 'Los Angeles, CA' },
  { label: 'EXPERIENCE', value: '5+ Years' },
  { label: 'EDUCATION', value: 'B.S. Mechanical Engineering', sub: ['Manufacturing & Design', 'UC Riverside', 'Software Engineering — Rithm School'] },
]

const stats = [
  { value: 5, label: 'YEARS EXP', suffix: '+' },
  { value: 15, label: 'PROJECTS', suffix: '+' },
  { value: 92, label: 'PPE ACCURACY', suffix: '%' },
]

interface RevealParagraphProps {
  children: React.ReactNode
  index: number
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
  total: number
}

function RevealParagraph({ children, index, scrollProgress, total }: RevealParagraphProps) {
  const prefersReducedMotion = useReducedMotion()
  const start = 0.05 + (index / total) * 0.3
  const end = start + 0.15

  const opacity = useTransform(scrollProgress, [start, end], [0, 1])
  const y = useTransform(scrollProgress, [start, end], [20, 0])

  if (prefersReducedMotion) {
    return <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">{children}</p>
  }

  return (
    <motion.p
      className="text-base sm:text-lg text-foreground/80 leading-relaxed"
      style={{ opacity, y }}
    >
      {children}
    </motion.p>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const paragraphs = [
    <>
      I'm a <span className="text-primary font-semibold">full-stack software engineer</span> with
      a unique background spanning software development, robotics, and systems engineering. My journey
      from mechanical engineering to software development has given me a distinctive perspective on
      problem-solving and system design. <i className="text-primary font-semibold">One mind, any framework</i>.
    </>,
    <>
      Currently, I work at <span className="text-primary">Dovenmuehle Mortgage</span>, where I develop
      and maintain web and mobile applications that serve thousands of mortgage customers. I specialize
      in architecting full-stack solutions with{' '}
      <span className="text-foreground font-semibold">TypeScript</span>,{' '}
      <span className="text-foreground font-semibold">React</span>, and{' '}
      <span className="text-foreground font-semibold">Node.js</span>, focusing on scalability, performance optimization, and intuitive user experiences.
    </>,
    <>
      Beyond web development, I'm passionate about <span className="text-primary">robotics and AI</span>.
      I've built autonomous robots using ROS2, developed computer vision systems with YOLO, and created
      real-time telemetry dashboards. I love working at the intersection of software and hardware,
      where code meets the physical world.
    </>,
    <>
      When I'm not coding, you'll find me powerlifting at the gym, training in BJJ, or volunteering for beach cleanups.
      I also enjoy tinkering with robotics projects and contributing to open-source. I believe in continuous learning—whether
      it's mastering a new framework, perfecting a lift, or learning a new technique on the mat.
    </>,
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
    >
      <div className="container max-w-5xl">
        {/* Section Header */}
        <StaggerChildren className="mb-8 sm:mb-12">
          <motion.h2
            variants={fadeUpChild}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            <span className="text-primary font-mono">[01]</span> ABOUT ME
          </motion.h2>
          <motion.div
            variants={fadeUpChild}
            className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md"
          />
        </StaggerChildren>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Bio with scroll-linked reveal */}
          <div className="space-y-4">
            <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-sm p-6 sm:p-8 space-y-4">
              {paragraphs.map((para, i) => (
                <RevealParagraph
                  key={i}
                  index={i}
                  total={paragraphs.length}
                  scrollProgress={scrollYProgress}
                >
                  {para}
                </RevealParagraph>
              ))}
            </div>

            {/* Stats dashboard */}
            <div className="border border-primary/20 bg-card/30 backdrop-blur-sm rounded-sm p-4">
              <div className="font-mono text-xs text-primary/60 mb-4 tracking-widest">&gt; METRICS.SUMMARY</div>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <StatCounter
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    suffix={stat.suffix}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — Image gallery + Quick Facts */}
          <div className="flex flex-col space-y-6">
            <ImageGallery images={carouselImages} />

            {/* Quick Facts — HUD data readout */}
            <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-sm p-4 sm:p-6">
              <div className="font-mono text-xs text-primary mb-4 tracking-widest">&gt; QUICK FACTS</div>
              <StaggerChildren className="space-y-3">
                {quickFacts.map((fact) => (
                  <motion.div key={fact.label} variants={fadeUpChild}>
                    <div className="font-mono text-xs text-muted-foreground mb-0.5">{fact.label}</div>
                    <div className="text-xs sm:text-sm text-foreground">{fact.value}</div>
                    {fact.sub?.map((s) => (
                      <div key={s} className="text-xs text-muted-foreground">{s}</div>
                    ))}
                    <div className="mt-2 h-px bg-primary/15" />
                  </motion.div>
                ))}

                <motion.div variants={fadeUpChild}>
                  <div className="font-mono text-xs text-muted-foreground mb-2">FOCUS AREAS</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">Web Dev</Badge>
                    <Badge variant="secondary" className="text-xs">Robotics</Badge>
                    <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                  </div>
                </motion.div>
              </StaggerChildren>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
