
/**
 * ProjectCard
 */
import Image from "next/image";

export interface ProjectCardProps {
  className?: string;
  description: string,
  href?: string;
  skills: string[];
  src: string;
  title: string;
}

export default function ProjectCard({
  className = "",
  description,
  href,
  skills,
  src,
  title,
}: ProjectCardProps) {
  return (
    <div className={`group opacity-90 hover:opacity-100 hover:text-lightest-slate w-full flex md:flex-nowrap flex-wrap gap-4 ${className}`}>
      <div className="min-w-[200px] pt-2">
        <Image alt={`${title} project image`} height="48" src={src} width="200" />
      </div>
      <div>
        <h3 className="text-lg text-lightest-slate">
          <a
            className="group-hover:text-teal transition-colors inline-flex items-center"
            href={href}
          >
            {title}
            <svg
              className="ml-1 min-w-4 min-h-4 h-4 w-4 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </a>
        </h3>
        <p>{description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill: string, idx: number) => (
            <span
              key={`${skill}-${idx}`}
              className="text-teal text-xs px-2 py-1 rounded-full border border-teal border-opacity-20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
