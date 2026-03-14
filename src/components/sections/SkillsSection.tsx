import { useEffect, useRef } from 'react'
import { type IconType } from 'react-icons'
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiRedux,
  SiTailwindcss,
  SiHtml5,
  SiD3,
  SiThreedotjs,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiCplusplus,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiMysql,
  SiSqlalchemy,
  SiGithubactions,
  SiJest,
  SiPytest,
  SiJenkins,
  SiTravisci,
  SiRos,
  SiOpencv,
  SiGnubash,
  SiVite,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { TbApi, TbBrowserCheck, TbCube } from 'react-icons/tb'
import { BsCpu } from 'react-icons/bs'
import { VscEye } from 'react-icons/vsc'

interface Skill {
  name: string
  icon: IconType
  primary?: boolean
}

interface HudDomain {
  domain: string
  skills: Skill[]
}

const hudDomains: HudDomain[] = [
  {
    domain: 'Languages',
    skills: [
      { name: 'TypeScript', icon: SiTypescript, primary: true },
      { name: 'JavaScript', icon: SiJavascript, primary: true },
      { name: 'Python', icon: SiPython, primary: true },
      { name: 'C/C++', icon: SiCplusplus },
      { name: 'SQL', icon: SiGnubash },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'HTML/CSS', icon: SiHtml5 },
    ],
  },
  {
    domain: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, primary: true },
      { name: 'Next.js', icon: SiNextdotjs, primary: true },
      { name: 'Vite', icon: SiVite, primary: true },
      { name: 'Redux', icon: SiRedux },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'D3.js', icon: SiD3 },
      { name: 'Three.js', icon: SiThreedotjs },
    ],
  },
  {
    domain: 'Backend & APIs',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, primary: true },
      { name: 'Express', icon: SiExpress, primary: true },
      { name: 'Django', icon: SiDjango },
      { name: 'Flask', icon: SiFlask },
      { name: 'tRPC', icon: TbApi },
      { name: 'REST APIs', icon: TbApi },
    ],
  },
  {
    domain: 'Data & Infrastructure',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, primary: true },
      { name: 'Redis', icon: SiRedis, primary: true },
      { name: 'Docker', icon: SiDocker, primary: true },
      { name: 'AWS S3', icon: FaAws },
      { name: 'MySQL', icon: SiMysql },
      { name: 'SQLAlchemy', icon: SiSqlalchemy },
    ],
  },
  {
    domain: 'DevOps & Testing',
    skills: [
      { name: 'GitHub Actions', icon: SiGithubactions, primary: true },
      { name: 'Jest', icon: SiJest, primary: true },
      { name: 'PyTest', icon: SiPytest },
      { name: 'Playwright', icon: TbBrowserCheck },
      { name: 'Jenkins', icon: SiJenkins },
      { name: 'Travis CI', icon: SiTravisci },
    ],
  },
  {
    domain: 'Robotics & Vision',
    skills: [
      { name: 'ROS/ROS2', icon: SiRos, primary: true },
      { name: 'OpenCV', icon: SiOpencv, primary: true },
      { name: 'YOLOv8', icon: VscEye, primary: true },
      { name: 'Computer Vision', icon: BsCpu },
      { name: 'MATLAB', icon: SiGnubash },
      { name: 'SolidWorks', icon: TbCube },
    ],
  },
]

export function SkillsSection() {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = panelRef.current?.querySelectorAll('[data-skill-card]')
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement
            const index = Number(card.dataset.skillCard ?? 0)
            setTimeout(() => {
              card.classList.remove('opacity-0', 'translate-y-4')
              card.classList.add('opacity-100', 'translate-y-0')
            }, index * 120)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

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
            What I ship with — from TypeScript and React in production to ROS2 and computer vision in the lab
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={panelRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hudDomains.map((domain, domainIndex) => (
            <div
              key={domainIndex}
              className={`
                opacity-0 translate-y-4 transition-all duration-500
                ${domainIndex === hudDomains.length - 1 && hudDomains.length % 2 !== 0 ? 'md:col-span-2 md:max-w-[calc(50%-0.5rem)]' : ''}
              `}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              data-skill-card={domainIndex}
            >
              <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-sm h-full">
                {/* Domain Header */}
                <div className="px-4 py-2.5 border-b border-primary/20">
                  <span className="font-mono text-primary text-xs tracking-widest uppercase">{domain.domain}</span>
                </div>

                {/* Skills */}
                <div className="p-4 flex flex-wrap gap-2">
                  {domain.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon
                    return (
                      <div
                        key={skillIndex}
                        className={`
                          inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono
                          transition-all duration-200 cursor-default border
                          bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:shadow-[0_0_10px_rgba(100,255,218,0.3)]
                        `}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                        {skill.name}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
