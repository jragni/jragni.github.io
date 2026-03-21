import { useReducedMotion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ContactSection } from '@/components/sections/ContactSection'

function App() {
  // useReducedMotion is consumed in each component via Framer Motion's built-in hook.
  // Calling it here at the root ensures the preference is picked up on first render.
  useReducedMotion()

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </Layout>
  )
}

export default App
