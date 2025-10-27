/**
 * Skills Section Content
 */

import { SkillTag } from '../SidePanel';

const SkillsSection = () => {
  const skillCategories = {
    'Frontend': ['React', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Redux'],
    'Backend': ['Node.js', 'Express', 'Python', 'Django', 'Flask', 'tRPC'],
    'Database': ['PostgreSQL', 'MySQL', 'Redis'],
    'DevOps': ['Docker', 'AWS S3', 'Git'],
    'Robotics': ['ROS2', 'OpenCV', 'YOLO', 'SLAM', 'Gazebo'],
    'Other': ['C++', 'MATLAB', 'LabVIEW', 'SolidWorks'],
  };

  return (
    <div>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        A diverse technical skillset spanning web development, robotics, and systems engineering.
      </p>

      {Object.entries(skillCategories).map(([category, skills]) => (
        <div key={category} style={{ marginBottom: '1.5rem' }}>
          <h3
            className="cyber-text"
            style={{
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: 'var(--neon-teal)',
              borderLeft: '3px solid var(--neon-teal)',
              paddingLeft: '0.75rem',
            }}
          >
            {category}
          </h3>
          <div>
            {skills.map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;