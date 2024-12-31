/**
 * Portfolio constants
 */

import { ExperienceCardProps } from "./ExperienceCard";
import { ProjectCardProps } from "./ProjectCard";

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
    skills: ["Python", "Django", "Redis", "HTML", "css", "scss", "Flask", "PostgresQL"],
    title: "Software Engineer",
  },
  {
    companyName: "Honeywell",
    date: "2020 - 2021",
    href: "https://www.honeywell.com",
    jobDescription: [
      "Coordinated a team of technicians, stress analysts, and mechanical design engineers resulting in the successful execution of Acceptance and Qualification Tests with aggressive schedules and milestones.",
      "Facilitated Test Readiness Reviews with customers, stakeholders, and the engineering team to validate project scope and optimize project cost with testing timelines.",
      "Decreased project cost by $15000 per test and reduced project completion time by 2 weeks by reviewing project discrepancies in costs for tests equipment, recommissioning processes, and program structure."
    ],
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
];

export const projectsList: ProjectCardProps[] = [
  {
    description: `An AI-powered IoT robot that monitors for patient's safety and well-being. The device will identify PPE worn by medical personnel to ensure compliance with patient safety protocols.`,
    href: "https://devpost.com/software/pixie-rover",
    skills: ["Python", "Flask", "OpenCV", "C++", "SolidWorks", "Machine Learning", "AI"],
    src: "/pixierover.png",
    title: "Pixie Rover, AI integrated robot",
  },
  {
    description: `An application that helps users go from no experience to competitive, confident, and actualized software engineering bootcamp candidates.`,
    href: "https://tempo-codestart.vercel.app",
    skills: ["Next.js", "Typescript", "Tailwind", "Daisy UI", "Auth.js"],
    src: "/Tempo.png",
    title: "Tempo Codestart",
  },
  {
    description: `A Full Stack web application for users to browse and apply to jobs by company name, job title, and more. username: visitor password: password`,
    href: "https://ragglesoft-jobly.surge.sh",
    skills: ["React", "Express", "PostgresQL", "Bootstrap"],
    src: "/Jobly.png",
    title: "Jobly",
  },
  {
    description: `Warbler is a mock Twitter clone that allows users to signup, follow other users, make warbles, and comment on other warbles. username: tuckerdiane password: password`,
    href: "https://warbler-ragglesoft.onrender.com/",
    skills: ['flask', 'postgresql', 'HTML', 'css'],
    src: "/warbler.png",
    title: "Warbler",
  },
];