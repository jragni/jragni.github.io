/**
 * HomePage
 */
"use client"

import AboutSection from "./About";
import ExperienceSection from "./ExperienceSection";
import Header from "./Header";

export default function Home() {

  return (
    <div className="md:flex md:gap-4 mx-auto min-h-screen min-w-screen max-w-screen-xl px-6 md:py-12 font-sans md:px-12 lg:py-0 relative items-start visible">
      <Header className="md:sticky md:top-0"/>
      <main className="w-screen md:w-[52%]" >
        <AboutSection/>
        <ExperienceSection />
      </main>
    </div>
  );
}
