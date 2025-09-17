/**
 * Skills Section
 */
import SectionHeader from "./SectionHeader";

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "HTML/CSS",
    ]
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "Flask",
      "Django",
      "tRPC",
    ]
  },
  {
    category: "Database & Cloud",
    skills: [
      "MySQL",
      "PostgreSQL",
      "Redis",
      "AWS S3",
      "Docker",
    ]
  },
  {
    category: "Robotics & AI",
    skills: [
      "ROS/ROS2",
      "OpenCV",
      "SLAM",
      "Machine Learning",
      "C++",
      "YOLO",
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="pt-8 md:pt-24 pb-8 px-6 md:px-0">
      <SectionHeader label="Technical Skills" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
        {skillsData.map((category) => (
          <div key={category.category} className="space-y-4">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-lightest-slate">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-teal text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 rounded-full border border-teal border-opacity-20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}