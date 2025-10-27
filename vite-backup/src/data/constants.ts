/**
 * Portfolio constants
 */

import type { ExperienceCardProps, ProjectCardDetails } from "../types/portfolio";

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
    skills: ["MatLab", "LabView", "SolidWorks", "Vibration Testing"],
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

export const projectsList: ProjectCardDetails[] = [
  {
    description: `A web-based dashboard that provides real-time visualization of sensor data and control of ROS2-enabled robots through web sockets.`,
    href: "https://jragni.github.io/robot-telemetry-dashboard/",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "D3.js", "ROS2", "WebSocket"],
    src: "/robot-telemetry-image.png",
    title: "Robot Telemetry Dashboard",
  },
  {
    description: `Developed an autonomous search and rescue system using ROS2, Nav2, OpenCV, and YOLOv11 for real time sensor processing, SLAM-based localization, and motion planning. The Robot autonomously navigates to user specified locations and identifies/tags human positions for rescue.`,
    href: "https://github.com/jragni/search-and-rescue-robot",
    skills: ["ROS2", "Python", "SLAM", "OpenCV", "YOLO", "AI", "Gazebo", "Raspberry Pi"],
    src: "/transbot.jpeg",
    title: "Autonomous Search & Rescue Robot",
  },
  {
    description: `AI-powered IoT robot that monitors patient safety and PPE compliance. Achieved 92% accuracy in PPE detection using computer vision, potentially preventing healthcare safety violations.`,
    href: "https://devpost.com/software/pixie-rover",
    skills: ["Python", "Flask", "OpenCV", "C++", "SolidWorks", "Machine Learning", "AI"],
    src: "/pixierover.png",
    title: "Pixie Rover, AI integrated robot",
  },
  {
    description: `Comprehensive bootcamp preparation platform helping aspiring developers transition to tech careers. Features personalized learning paths, coding challenges, and career guidance for competitive programming interviews.`,
    href: "https://tempo-codestart.vercel.app",
    skills: ["Next.js", "Typescript", "Tailwind", "Daisy UI", "Auth.js"],
    src: "/Tempo.png",
    title: "Tempo Codestart",
  },
  {
    description: `Full-stack job application platform with advanced filtering and search capabilities. Built scalable architecture handling 500+ job listings with optimized database queries and responsive design.`,
    href: "https://ragglesoft-jobly.surge.sh",
    skills: ["React", "Express", "PostgresQL", "Bootstrap"],
    src: "/Jobly.png",
    title: "Jobly",
  },
  {
    description: `Twitter-inspired social platform with real-time messaging and user engagement features. Implemented secure authentication, optimized database relationships, and responsive UI for seamless user experience.`,
    href: "https://warbler-ragglesoft.onrender.com/",
    skills: ['flask', 'postgresql', 'HTML', 'css'],
    src: "/warbler.png",
    title: "Warbler",
  },
];