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
    <div className={`group ${className} hover:opacity-90 w-full`}>
      <div className="flex items-baseline mb-2">
        <span className="text-sm text-slate w-24 flex-shrink-0">{date}</span>
        <h3 className="text-lg text-light-slate">
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
      <div className="ml-24">
				<ul>
				{jobDescription.map((description) => <li className="mb-4" key={description}>{description}</li>)}
				</ul>
        <div className="flex flex-wrap gap-2">
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
