"use client";
/**
 * Projects Section
 */

import { useState } from "react";
import Image from "next/image"
import { projectsList } from "./constants";
import ProjectCard, { ProjectCardDetails } from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function ProjectsSection() {
  const [ zoomedImageSrc, setZoomedImageSrc ] = useState<string>("");

  const handleZoomClick = (src: string): void => {
    const srcToUse: string = !!zoomedImageSrc ? "" : src;
     setZoomedImageSrc(srcToUse);

  }

  return (
    <>
      {zoomedImageSrc && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setZoomedImageSrc("")}
        >
          <Image
            alt="zoomed-image"
            src={zoomedImageSrc}
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
      <section className="min-h-screen py-8 px-6 md:px-0 md:py-20" id="projects">
        <SectionHeader label="Projects" />
      {projectsList.map(({
        description,
        href,
        skills,
        src,
        title,
      }: ProjectCardDetails) => (
        <ProjectCard
          key={`${title}`}
          className="mb-12 sm:mb-14"
          description={description}
          handleZoomClick={handleZoomClick}
          href={href}
          skills={skills}
          src={src}
          title={title}
        />
      ))}
      </section>
    </>
  );
}