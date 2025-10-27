/**
 * ExperienceCard
 */

export interface ExperienceCardProps {
  companyName: string;
  className?: string;
  date: string;
  href?: string;
  jobDescription: string[];
  skills: string[];
  title: string;
}

export default function ExperienceCard({
  className = "",
  companyName,
  date,
  href,
  jobDescription,
  skills,
  title,
}: ExperienceCardProps) {
  return (
    <div className={`group ${className} opacity-90 hover:opacity-100 hover:text-lightest-slate w-full transition-all duration-300`}>
      <div className="md:flex items-baseline mb-2">
        <span className="text-xs sm:text-sm md:text-base text-slate md:w-24 flex-shrink-0 group-hover:text-lightest-slate block md:inline">
          {date}
        </span>
        <h3 className="text-base sm:text-lg md:text-xl text-lightest-slate mt-1 md:mt-0">
          <a
            className="group-hover:text-teal transition-colors inline-flex items-center"
            href={href}
          >
            {title} @ {companyName}
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
      </div>
      <div className="md:ml-24 mt-3 md:mt-0">
        <ul>
          {jobDescription.map((description) => <li className="mb-4 text-sm sm:text-base md:text-lg leading-relaxed" key={description}>{description}</li>)}
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill: string, idx: number) => (
            <span
              key={`${skill}-${idx}`}
              className="text-teal text-xs sm:text-sm md:text-base px-2 py-1 rounded-full border border-teal border-opacity-20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
