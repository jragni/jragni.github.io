/**
 * Experience Section
 */
import ExperienceCard from "./ExperienceCard";
import SectionHeader from "./SectionHeader";
import { workExperienceList } from "./constants";

export default function ExperienceSection() {
  return (
    <section className="pt-8 px-6" id="experience">
      <SectionHeader label="Experience"/>
      {workExperienceList.map(({companyName, date, href, jobDescription, skills, title}) => (
        <ExperienceCard
          className="mb-14"
          key={`${title}-${companyName}`}
          companyName={companyName}
          date={date}
          href={href}
          jobDescription={jobDescription}
          skills={skills}
          title={title}
        />
      ))}
    </section>
  );
}