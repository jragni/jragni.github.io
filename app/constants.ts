/**
 * Portfolio constants
 */

import { ExperienceCardProps } from "./ExperienceCard";

// Experience Section Constants

export const workExperienceList: ExperienceCardProps[] = [
  {
    companyName: "Dovenmuehle Mortgage Inc",
    date: "2022 - PRESENT",
    href: 'https://www.dovenmuehle.com',
    jobDescription: [
      "Develop and maintain the web, mobile-web, and native yourmortgageonline application that allows mortgage lenders to pay their mortgage and view details about their loans.",
      "Collaborate with the development team and stakeholders to integrate features that allow for seamless transactions and mortgage actions.",
      "Build internal tooling and reverse engineer microservices to eliminate subscription costs for third party API's.",
    ],
    skills: ["Typescript", "Javascript", "React", "Express", "Node.js", "Redux", "tRPC", "MySql", "Docker", "AWS S3", "HTML", "css", "Python"],
    title: "Software Engineer",
  },
  {
    companyName: "Rithm School Inc",
    date: "2021 - 2022",
    href: "https://www.rithmschool.com",
    jobDescription: [
      "Streamlined staff user experience by designing a Django feature that provides a centralized view of responsible individuals for exercises, lectures, and events on the Student Information System (SIS) application.",
      "Migrated the backend caching system from local memory caching to Redis to improve scalability and performance.",
      "Maintained 100% test coverage with unit tests and integration tests for newly built features.",
    ],
    skills: ["Python", "Django", "Redis", "HTML", "css", "Flask"],
    title: "Software Engineer",
  },
  {
    companyName: "Honeywell",
    date: "2020 - 2021",
    href: "https://www.honeywell.com",
    jobDescription: [],
    skills: ["MatLab", "LabView", "SolidWorks"],
    title: "Test Engineer",
   },
   {
    companyName: "Naval Surface Warfare Center",
    date: "2019 - 2020",
    href: "https://www.navsea.navy.mil/Home/Warfare-Centers/NSWC-Corona/",
    jobDescription: [
      'Overhauled Material Readiness Database (MRDB) system reliability models for electrical power systems to accurately assess the single system, multi-system, and system of system readiness.',
      'Developed criteria and methodologies for evaluating material readiness assessment of non-expendable equipment for electrical power systems to investigate readiness problems, trends, and drivers.',
      'Coordinated System Readiness Reviews with stakeholders, fleet command, and the program office in order to determine key areas of concern and provide data-driven decisions',
    ],
    skills: ["SQL", "Tableau", "Excel", "Numpy", "ScikitLearn"],
    title: "Systems Engineer",
   },
   {
    companyName: "Eotron LLC",
    date: "2018 - 2019",
    href: "https://www.eotron.com",
    jobDescription: [
      "Designed and programmed a semi autonomous robot that spot cleans surfaces using UV-C LEDs.",
      "Increased production rate of components by designing a coolant filtration system for a CNC machine.",
      "Ensured faculty work-safety by programming a microcontroller to shut off a UVC LED array when a motion sensor is triggered."
    ],
    skills: ["C", "C++", "Robotic Operating System (ROS)", "Python", "EaglePCB", "SolidWorks"],
    title: "Product Engineering Intern",
  },
]