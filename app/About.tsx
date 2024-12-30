/**
 * About Section
 */
import SectionHeader from "./SectionHeader"

export default function AboutSection() {
  return (
    <section id="about" className="pt-6 md:pt-24 pb-4 px-6 md:px-0">
      <SectionHeader label="About Me"/>
      <p className="mb-2 text-light-slate font-bold">
        I&apos;m Jhensen Ray Agni. Mechanical Engineer turned Software Engineer.
      </p>
      <p className="mb-2">
        I am currently building and testing full stack web application that provide an intuitive
        staff and customer experience at Dovenmuehle Mortgage Inc. Prior to Dovenmuehle,
        I worked as Software Engineering Intern at Rithm School,
        where I was also a graduate of their Full Stack Software Engineering Bootcamp.
      </p>
      <p className="mb-2">
        I received a B.S. in Mechanical Engineering with a concentration in Manufacturing and Design
        at the University of California, Riverside.
      </p>
      <p className="mb-2">
        I previously worked as a Test Engineer for Honeywell Aero and as a Systems Engineer for the
        Naval Surface Warfare Center, Corona Division. Through both experiences, I learned that
        effective communication, data driven decisions, and total ownership/accountability has
        allowed me to lead successful teams, regardless of the milestone, mission or technical
        skill level required.
      </p>
      <p className="mb-2">
        As for my future, I hope to work as a full stack software engineer for a diverse and
        inclusive company that specializes in robotics.
      </p>
      <p className="mb-2">
        In my free time you can find me Powerlifting at the gym or building robots in my backyard.
      </p>
    </section>
  )
}