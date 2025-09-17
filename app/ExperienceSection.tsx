/**
 * Experience Section
 */
import Link from "next/link";
import { FileUser } from "lucide-react";

import ExperienceCard from "./ExperienceCard";
import SectionHeader from "./SectionHeader";
import { workExperienceList } from "./constants";

export default function ExperienceSection() {
  return (
    <section className="pt-8 md:pt-8 pb-8 md:px-0 px-6" id="experience">
      <SectionHeader label="Experience"/>
      {workExperienceList.map(({companyName, date, href, jobDescription, skills, title}) => (
        <ExperienceCard
          className="mb-12 sm:mb-14"
          key={`${title}-${companyName}`}
          companyName={companyName}
          date={date}
          href={href}
          jobDescription={jobDescription}
          skills={skills}
          title={title}
        />
      ))}
      <div>
        <Link
          className="text-teal border border-teal rounded-full p-2 hover:bg-teal hover:text-navy inline-flex"
          href="FINAL-june-24-resume.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="mr-2">View Full Resume</span>
          <FileUser />
        </Link>
      </div>
    </section>
  );
}