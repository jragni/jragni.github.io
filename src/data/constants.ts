/**
 * Portfolio constants
 */

import type { ExperienceCardProps, ProjectCardDetails } from "@/types/portfolio";

// Experience Section Constants

export const workExperienceList: ExperienceCardProps[] = [
  {
    companyName: "Dovenmuehle Mortgage Inc",
    date: "2022 - PRESENT",
    href: 'https://www.dovenmuehle.com',
    jobDescription: [
      "Own the full-stack development of the YourMortgageOnline platform (web, mobile-web, and native), serving 72+ private-label clients where thousands of mortgage customers make payments and manage their loans every day.",
      "Work closely with product and stakeholders to ship features end-to-end, from API design through UI, contributing to a 4.9-star App Store rating and 4.8 stars on Google Play.",
      "Build internal tooling and reverse-engineer third-party microservices to bring capabilities in-house, cutting external API costs and giving the team more control over the stack.",
      "Drive architectural decisions across the frontend, advocating for patterns that keep the codebase maintainable as the product grows and new developers onboard.",
    ],
    skills: ["Typescript", "Javascript", "React", "Express", "Node.js", "Redux", "tRPC", "MySql", "Docker", "AWS S3", "HTML", "css", "Python"],
    title: "Full-Stack Software Engineer",
  },
  {
    companyName: "Rithm School Inc",
    date: "2021 - 2022",
    href: "https://www.rithmschool.com",
    jobDescription: [
      "Joined as a resident engineer and immediately started shipping. Designed a Django feature for the Student Information System that gave staff a single view into who was responsible for every exercise, lecture, and event.",
      "Migrated the backend caching layer from local memory to Redis, setting the groundwork for the app to scale without performance bottlenecks.",
      "Held the line on code quality by maintaining full test coverage on every feature shipped, writing both unit and integration tests as a standard part of the workflow.",
      "Contributed across the full stack (Flask APIs, Django templates, PostgreSQL queries), picking up whatever the team needed to keep features moving forward.",
    ],
    skills: ["Python", "Django", "Redis", "HTML", "css", "scss", "Flask", "PostgresQL"],
    title: "Software Engineer, Resident",
  },
  {
    companyName: "Honeywell",
    date: "2020 - 2021",
    href: "https://www.honeywell.com",
    jobDescription: [
      "Led cross-functional test campaigns coordinating technicians, stress analysts, and design engineers to execute Acceptance and Qualification Tests under aggressive timelines.",
      "Ran Test Readiness Reviews with customers and the engineering team, aligning everyone on scope, cost, and schedule before a single test fired.",
      "Dug into project cost discrepancies and found savings in equipment, recommissioning, and program structure. Saved $15K per test and cut 2 weeks off each cycle.",
      "Served as the bridge between mechanical design and test execution, translating engineering requirements into practical test plans that the floor team could run confidently.",
    ],
    skills: ["MatLab", "LabView", "SolidWorks", "Vibration Testing"],
    title: "Test Engineer",
   },
   {
    companyName: "Naval Surface Warfare Center",
    date: "2019 - 2020",
    href: "https://www.navsea.navy.mil/Home/Warfare-Centers/NSWC-Corona/",
    jobDescription: [
      "Rebuilt the reliability models inside the Material Readiness Database for naval electrical power systems, giving analysts a clearer picture of readiness at the single-system and system-of-systems level.",
      "Developed the criteria and methodology for assessing non-expendable equipment readiness, creating a framework the team used to identify trends and root-cause drivers.",
      "Coordinated System Readiness Reviews between stakeholders, fleet command, and the program office. Translated raw data into decisions that mattered.",
      "Ran root cause failure analysis on naval lighting systems, tracing failures back to modernization issues and improper replacement parts across the fleet.",
    ],
    skills: ["SQL", "Excel", "Numpy", "ScikitLearn"],
    title: "Systems Engineer",
   },
   {
    companyName: "Eotron LLC",
    date: "2018 - 2019",
    href: "https://www.eotron.com",
    jobDescription: [
      "Designed and programmed a semi-autonomous UV-C surface cleaning robot from scratch: mechanical design, embedded firmware, and control logic.",
      "Improved CNC machine throughput by engineering a coolant filtration system that kept the machine running longer between maintenance cycles.",
      "Built a safety interlock system using a microcontroller and motion sensor to automatically kill a UV-C LED array whenever someone entered the workspace.",
      "Got hands-on with PCB layout in EaglePCB and 3D modeling in SolidWorks, owning the hardware side just as much as the software to bring each project from concept to working prototype.",
    ],
    skills: ["C", "C++", "Robotic Operating System (ROS)", "Python", "EaglePCB", "SolidWorks"],
    title: "Product Engineering Intern",
  },
];

export const projectsList: ProjectCardDetails[] = [
  {
    description: `Grand Champion at Jewel City Hacks 4.0. Wearable assistive system for the vision-impaired, built in 24 hours. An ESP32 haptic belt with ultrasonic proximity sensing, paired with AI glasses that answer spoken questions in real time. Integrated YOLO World, GPT-4o vision, MediaPipe, and Whisper into a real-time inference pipeline, with GPT-4o mini handling intent routing across all inputs.`,
    href: "https://devpost.com/software/araveil#updates",
    skills: ["C++", "Python", "Claude AI", "GPT-4o", "YOLO", "MediaPipe", "Whisper", "ESP32", "Computer Vision", "Embedded Systems"],
    src: "/araveil.jpeg",
    title: "Araveil",
  },
  {
    description: `Operator interface that streams live sensor data from autonomous systems. D3.js renders telemetry under 200ms, WebSocket handles the pipe, and you can control multiple devices from one React dashboard.`,
    href: "https://jragni.github.io/robot-telemetry-dashboard/",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "D3.js", "ROS2", "WebSocket"],
    src: "/robot-telemetry-image.png",
    title: "Real-Time Telemetry Dashboard",
  },
  {
    description: `Web app I built to coach people through bootcamp prep. 100% of the users I mentored through it graduated. Covers coding challenges, interview prep, and progress tracking with Auth.js-based accounts.`,
    href: "https://tempo-codestart.vercel.app",
    skills: ["Next.js", "Typescript", "Tailwind", "Daisy UI", "Auth.js"],
    src: "/Tempo.png",
    title: "Tempo Codestart",
  },
  {
    description: `Developed an autonomous search and rescue system using ROS2, Nav2, OpenCV, and YOLOv11 for real time sensor processing, SLAM-based localization, and motion planning. The Robot autonomously navigates to user specified locations and identifies/tags human positions for rescue.`,
    href: "https://github.com/jragni/search-and-rescue-robot",
    skills: ["ROS2", "Python", "SLAM", "OpenCV", "YOLO", "AI", "Gazebo", "Raspberry Pi"],
    src: "/transbot.jpeg",
    title: "Autonomous Search & Rescue Robot",
  },
  {
    description: `IoT robot that watches for PPE compliance in healthcare settings. Hits 92% detection accuracy with OpenCV. Built the firmware, the vision pipeline, and the Flask reporting layer.`,
    href: "https://devpost.com/software/pixie-rover",
    skills: ["Python", "Flask", "OpenCV", "C++", "SolidWorks", "Machine Learning", "AI"],
    src: "/pixierover.png",
    title: "Pixie Rover, AI integrated robot",
  },
  {
    description: `Job board app with filtering, search, and pagination across 500+ listings. React frontend talks to an Express API backed by PostgreSQL. Wrote the SQL queries by hand, no ORM.`,
    href: "https://ragglesoft-jobly.surge.sh",
    skills: ["React", "Express", "PostgresQL", "Bootstrap"],
    src: "/Jobly.png",
    title: "Jobly",
  },
  {
    description: `Twitter-style microblogging app built with Flask and PostgreSQL. Handles auth, follows, likes, and a feed algorithm. One of my earlier projects but still clean code I'm proud of.`,
    href: "https://warbler-ragglesoft.onrender.com/",
    skills: ['flask', 'postgresql', 'HTML', 'css'],
    src: "/warbler.png",
    title: "Warbler",
  },
];
