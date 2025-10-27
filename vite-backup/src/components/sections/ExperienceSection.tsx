/**
 * Experience Section Content
 */

import { workExperienceList } from '../../data/constants';
import { SkillTag, LinkButton } from '../SidePanel';

const ExperienceSection = () => {
  return (
    <div>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Professional experience spanning software engineering, robotics, and systems engineering.
      </p>

      {workExperienceList.map((job, index) => (
        <div
          key={index}
          style={{
            marginBottom: '2.5rem',
            paddingBottom: '2rem',
            borderBottom: index < workExperienceList.length - 1 ? '1px solid var(--grid-lines)' : 'none',
          }}
        >
          <h3
            className="cyber-text"
            style={{
              fontSize: '1.15rem',
              color: 'var(--neon-teal)',
              marginBottom: '0.25rem',
            }}
          >
            {job.title}
          </h3>

          <div
            style={{
              fontSize: '0.95rem',
              color: 'var(--neon-cyan)',
              marginBottom: '0.5rem',
            }}
          >
            {job.companyName} • {job.date}
          </div>

          <ul style={{ marginLeft: '1.25rem', marginBottom: '1rem' }}>
            {job.jobDescription.map((desc, i) => (
              <li
                key={i}
                style={{
                  marginBottom: '0.5rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                {desc}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '1rem' }}>
            {job.skills.slice(0, 8).map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
            {job.skills.length > 8 && (
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                +{job.skills.length - 8} more
              </span>
            )}
          </div>

          <LinkButton href={job.href}>View Company</LinkButton>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;