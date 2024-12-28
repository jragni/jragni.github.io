/**
 * Navbar
 */
"use client"

import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const aboutSectionElement = document.getElementById('about');
      const experienceSectionElement = document.getElementById('experience');
      const projectsSectionElement = document.getElementById('projects');
      const elementList = [aboutSectionElement, experienceSectionElement, projectsSectionElement];

      const aboutAnchor = document.getElementById('about-anchor');
      const experienceAnchor = document.getElementById('experience-anchor');
      const projectsAnchor = document.getElementById('projects-anchor');
      const anchorList = [aboutAnchor, experienceAnchor, projectsAnchor];

      elementList.forEach((element, idx) => {
        if (
          element
          && element?.getBoundingClientRect().top <= 0
          && element?.getBoundingClientRect().bottom > 0
          && anchorList[idx]
        ) {
          anchorList[idx].style.textDecoration = "underline #64FFDA";
        } else {
          if (anchorList[idx]) anchorList[idx].style.textDecoration = "none";
        }
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll)}
  }, [])

  return (
    <nav>
      <ul>
        <li>
          <a
            className="text-md tracking-widest text-slate hover:text-teal transition-colors duration-300"
            id="about-anchor"
            href="#about"
          >
            ABOUT
          </a>
        </li>
        <li>
          <a
            className="text-md tracking-widest text-slate hover:text-teal transition-colors"
            id="experience-anchor"
            href="#experience"
          >
            EXPERIENCE
          </a>

        </li>
        <li>
          <a
            id="projects-anchor"
            className="text-md tracking-widest text-slate hover:text-teal transition-colors"
            href="#projects"
          >
            PROJECTS
          </a>
        </li>
      </ul>
    </nav>
  );
}