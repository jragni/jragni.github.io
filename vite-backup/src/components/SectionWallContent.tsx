/**
 * Section Wall Content Component
 * Displays portfolio content as 3D text on maze walls
 */

import { Text } from '@react-three/drei';
import { workExperienceList, projectsList } from '../data/constants';
import { cyberpunkTheme } from '../styles/cyberpunk-theme';

interface SectionWallContentProps {
  sectionId: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}

const SectionWallContent = ({ sectionId, position, rotation = [0, 0, 0] }: SectionWallContentProps) => {
  const { colors } = cyberpunkTheme;

  const renderAboutContent = () => (
    <group position={position} rotation={rotation}>
      <Text
        position={[0, 2, 0]}
        fontSize={0.4}
        color={colors.neonTeal}
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        ABOUT ME
      </Text>
      <Text
        position={[0, 1, 0]}
        fontSize={0.2}
        color={colors.textPrimary}
        anchorX="center"
        anchorY="top"
        maxWidth={8}
        lineHeight={1.5}
      >
        Full-stack developer specializing in{'\n'}
        robotics, AI integration, and modern web{'\n'}
        technologies. Passionate about building{'\n'}
        innovative solutions.
      </Text>
    </group>
  );

  const renderSkillsContent = () => (
    <group position={position} rotation={rotation}>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color={colors.neonTeal}
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        SKILLS
      </Text>
      <Text
        position={[-3, 1.5, 0]}
        fontSize={0.25}
        color={colors.neonCyan}
        anchorX="left"
        anchorY="top"
        maxWidth={6}
        lineHeight={1.8}
      >
        LANGUAGES{'\n'}
        {'\u2022'} JavaScript/TypeScript{'\n'}
        {'\u2022'} Python{'\n'}
        {'\u2022'} C++{'\n'}
        {'\u2022'} SQL
      </Text>
      <Text
        position={[1, 1.5, 0]}
        fontSize={0.25}
        color={colors.neonCyan}
        anchorX="left"
        anchorY="top"
        maxWidth={6}
        lineHeight={1.8}
      >
        FRAMEWORKS{'\n'}
        {'\u2022'} React/Next.js{'\n'}
        {'\u2022'} Node.js{'\n'}
        {'\u2022'} Three.js{'\n'}
        {'\u2022'} ROS
      </Text>
    </group>
  );

  const renderExperienceContent = () => {
    const latestJobs = workExperienceList.slice(0, 2);
    return (
      <group position={position} rotation={rotation}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.4}
          color={colors.neonTeal}
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
        >
          EXPERIENCE
        </Text>
        {latestJobs.map((job, index) => (
          <group key={index} position={[0, 1.5 - index * 1.2, 0]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.25}
              color={colors.neonCyan}
              anchorX="center"
              anchorY="top"
              maxWidth={8}
            >
              {job.title}
            </Text>
            <Text
              position={[0, -0.3, 0]}
              fontSize={0.18}
              color={colors.textSecondary}
              anchorX="center"
              anchorY="top"
              maxWidth={8}
            >
              {job.companyName} | {job.date}
            </Text>
          </group>
        ))}
      </group>
    );
  };

  const renderProjectsContent = () => {
    const featuredProjects = projectsList.slice(0, 3);
    return (
      <group position={position} rotation={rotation}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.4}
          color={colors.neonTeal}
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
        >
          PROJECTS
        </Text>
        {featuredProjects.map((project, index) => (
          <group key={index} position={[0, 1.8 - index * 0.8, 0]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.22}
              color={colors.neonCyan}
              anchorX="center"
              anchorY="top"
              maxWidth={8}
            >
              {project.title}
            </Text>
            <Text
              position={[0, -0.25, 0]}
              fontSize={0.15}
              color={colors.textSecondary}
              anchorX="center"
              anchorY="top"
              maxWidth={8}
              lineHeight={1.3}
            >
              {project.description.slice(0, 60)}...
            </Text>
          </group>
        ))}
      </group>
    );
  };

  const renderContactContent = () => (
    <group position={position} rotation={rotation}>
      <Text
        position={[0, 2, 0]}
        fontSize={0.4}
        color={colors.neonTeal}
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        CONTACT
      </Text>
      <Text
        position={[0, 1, 0]}
        fontSize={0.25}
        color={colors.neonCyan}
        anchorX="center"
        anchorY="top"
        maxWidth={8}
        lineHeight={1.8}
      >
        GitHub: @jragni{'\n'}
        LinkedIn: in/jragni{'\n'}
        Email: contact@jragni.com
      </Text>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.18}
        color={colors.textPrimary}
        anchorX="center"
        anchorY="top"
        maxWidth={8}
        lineHeight={1.5}
      >
        Open to opportunities{'\n'}
        Let's build something amazing!
      </Text>
    </group>
  );

  switch (sectionId) {
    case 'about':
      return renderAboutContent();
    case 'skills':
      return renderSkillsContent();
    case 'experience':
      return renderExperienceContent();
    case 'projects':
      return renderProjectsContent();
    case 'contact':
      return renderContactContent();
    default:
      return null;
  }
};

export default SectionWallContent;
