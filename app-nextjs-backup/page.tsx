/**
 * HomePage
 */
"use client"

import AboutSection from "./About";
import ExperienceSection from "./ExperienceSection";
import Header from "./Header";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import CallToAction from "./CallToAction";

export default function Home() {

  return (
    <div className="md:flex md:gap-4 md:mx-auto min-h-screen max-w-screen-xl px-6 md:px-12 py-6 md:py-12 font-sans lg:py-0 items-start visible relative">
      <Header className="md:sticky md:top-0"/>
      <main id="main-content" className="w-full md:w-[52%]" >
        <AboutSection/>
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CallToAction />
      </main>
    </div>
  );
}
