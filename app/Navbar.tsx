/**
 * Navbar
 */
"use client"

import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const elementItemList = [
        { id: 'about', anchorId: 'about-anchor'},
        { id: 'experience', anchorId: 'experience-anchor'},
        { id: 'projects', anchorId: 'projects-anchor'},
      ]

      elementItemList.forEach((elementItem) => {
        const element = document.getElementById(elementItem.id);
        const anchorElement = document.getElementById(elementItem.anchorId);
        if (
          element
          && element?.getBoundingClientRect().top <= 0
          && element?.getBoundingClientRect().bottom > 0
          && anchorElement
        ) {
          anchorElement.style.textDecoration = "underline #64FFDA";
          anchorElement.style.color = "#e2e7ff";
        } else {
          if (anchorElement) {
            anchorElement.style.textDecoration = "none";
            anchorElement.style.color = "#8892b0";
          }
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
            className="text-md tracking-widest text-lightest-slate hover:text-teal transition-colors duration-300 underline decoration-teal"
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