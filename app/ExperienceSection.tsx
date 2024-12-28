/**
 * Experience Section
 */
import ExperienceCard from "./ExperienceCard";
import { workExperienceList } from "./constants";

export default function ExperienceSection() {
  return (
    <section className="pt-8 px-6" id="experience">
      <h2 className="md:hidden opacity-95 text-2xl py-6 text-lightest-slate font-bold sticky top-0 bg-navy">
        Experience
      </h2>
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