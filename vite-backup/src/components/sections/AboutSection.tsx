/**
 * About Section Content
 */

import { SkillTag } from '../SidePanel';

const AboutSection = () => {
  return (
    <div style={{ lineHeight: '1.8' }}>
      <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
        Software Engineer specializing in full-stack development with a unique background in
        mechanical engineering and robotics. Passionate about building scalable web applications
        and autonomous systems.
      </p>

      <h3
        className="cyber-text"
        style={{
          fontSize: '1.1rem',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: 'var(--neon-teal)',
        }}
      >
        Core Expertise
      </h3>

      <div style={{ marginBottom: '1rem' }}>
        <SkillTag skill="TypeScript" />
        <SkillTag skill="React" />
        <SkillTag skill="Node.js" />
        <SkillTag skill="Python" />
        <SkillTag skill="ROS2" />
        <SkillTag skill="Three.js" />
      </div>

      <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-accent)' }}>
        "Bridging the gap between software and physical systems to create intelligent,
        interactive experiences."
      </p>
    </div>
  );
};

export default AboutSection;