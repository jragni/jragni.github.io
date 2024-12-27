/**
 * Experience Section
 */
import Card from "./Card";
import { workExperienceList } from "./constants";

export default function ExperienceSection() {
  return (
    <section className="lg:py-24" id="experience">
      {workExperienceList.map(({companyName, date, href, jobDescription, skills, title}) => (
        <Card
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