/**
 * Projects Section Content
 */

import { projectsList } from '../../data/constants';
import { SkillTag, LinkButton } from '../SidePanel';

const ProjectsSection = () => {
  return (
    <div>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Featured projects showcasing expertise in web development, robotics, and AI integration.
      </p>

      {projectsList.map((project, index) => (
        <div
          key={index}
          style={{
            marginBottom: '2.5rem',
            paddingBottom: '2rem',
            borderBottom: index < projectsList.length - 1 ? '1px solid var(--grid-lines)' : 'none',
          }}
        >
          {/* Project Image */}
          {project.src && (
            <div
              style={{
                width: '100%',
                height: '150px',
                marginBottom: '1rem',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '2px solid var(--neon-teal)',
              }}
            >
              <img
                src={project.src}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          <h3
            className="cyber-text"
            style={{
              fontSize: '1.15rem',
              color: 'var(--neon-teal)',
              marginBottom: '0.75rem',
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '1rem',
            }}
          >
            {project.description}
          </p>

          <div style={{ marginBottom: '1rem' }}>
            {project.skills.map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>

          <LinkButton href={project.href}>View Project</LinkButton>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;