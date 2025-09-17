/**
 * Projects Section
 */

import { projectsList } from "./constants";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function ProjectsSection() {
  return (
    <section className="min-h-screen py-8 px-6 md:px-0 md:py-20" id="projects">
      <SectionHeader label="Projects" />
      {projectsList.map(({
        description,
        href,
        skills,
        src,
        title,
      }: ProjectCardProps) => (
        <ProjectCard
          key={`${title}`}
          className="mb-12 sm:mb-14"
          description={description}
          href={href}
          skills={skills}
          src={src}
          title={title}
        />
      ))}
    </section>
  );
}