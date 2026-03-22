import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Badge } from '@/components/ui/badge'
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
  { label: 'EDUCATION', value: 'B.S. Mechanical Engineering', sub: ['Manufacturing & Design', 'UC Riverside'] },
  { label: 'SOFTWARE ENGINEERING', value: 'Rithm School' },
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
    return <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed break-words">{children}</p>
  }

  return (
    <motion.p
      className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed break-words"
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
      I'm a <span className="text-primary font-semibold">full-stack software engineer</span> with a unique background
      spanning software development, robotics, and systems engineering.
      My journey from mechanical engineering to software development has given me a distinctive perspective on
      problem-solving and system design. <i className="text-primary font-semibold">One mind, any framework</i>.
    </>,
    <>
      Currently, I work at <span className="text-primary">Dovenmuehle Mortgage</span>, where I build
      and maintain the <span className="text-foreground font-semibold">YourMortgageOnline</span> platform. It's the web and mobile app that
      thousands of customers use to make payments and manage their loans every day. I own features end-to-end in{' '}
      <span className="text-foreground font-semibold">TypeScript</span>,{' '}
      <span className="text-foreground font-semibold">React</span>, and{' '}
      <span className="text-foreground font-semibold">Node.js</span>, and I care most about keeping things fast and easy to maintain as the team grows.
    </>,
    <>
      Before software, I worked as a systems engineer at <span className="text-primary">NAVSEA</span> analyzing
      data for the Navy's electrical power systems, and as a test engineer
      at <span className="text-primary">Honeywell</span> planning and running qualification test campaigns for aerospace
      components. Those roles taught me a lot, but hardware engineering moves slow. Updates to components take
      months to years. I wanted a role where I was the builder, the planner, and the architect, and being a
      software engineer lets you be all three. You can ship the same day you write the code. During the pandemic
      I started teaching myself to code, joined Rithm School, and landed my first full-stack role.
    </>,
    <>
      Beyond web development, I am passionate about robotics, hard tech, and AI. After work, I enjoy projects
      that sit at the intersection of all my skill sets, like building robots with ROS2 and putting together
      a real-time dashboard to control, observe, and diagnose them from a browser.
    </>,
    <>
      When I'm not coding, you'll find me powerlifting, training BJJ, or running. I volunteer
      with STEM education nonprofits, help organize at <a href="https://www.aila.community" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">AI LA</a> events, and show up for beach cleanups.
      I pick up new things fast and I don't stop until I get it right.
    </>,
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-x-hidden"
    >
      <div className="container max-w-6xl w-full min-w-0">
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

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-12">
          {/* Left — Bio with scroll-linked reveal */}
          <div className="space-y-4 min-w-0 max-w-full overflow-hidden">
            <div className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-sm p-4 sm:p-6 md:p-8 space-y-4">
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

          </div>

          {/* Right — Image gallery + Quick Facts */}
          <div className="flex flex-col space-y-6 min-w-0 max-w-full overflow-hidden">
            <ImageGallery images={carouselImages} />

            {/* Quick Facts */}
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
                    <Badge variant="secondary" className="text-xs">Full-Stack Engineering</Badge>
                    <Badge variant="secondary" className="text-xs">Hard Tech</Badge>
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
