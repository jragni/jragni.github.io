import { OrbitControls, Text, Html, useTexture, PointerLockControls } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Simple Room with Maze
 * A high-walled room containing a maze layout
 */
export default function IndustrialMaze() {
  return (
    <>
      {/* WASD Controls - Click to enable, ESC to disable */}
      <WASDControls />

      {/* OrbitControls for navigation - Commented out while using WASD */}
      {/* <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.1}
      /> */}

      {/* Lighting */}
      <ambientLight intensity={1.0} />
      <directionalLight
        position={[20, 40, 20]}
        intensity={2.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <directionalLight position={[-20, 30, -20]} intensity={1.5} />
      <pointLight position={[0, 30, 0]} intensity={1.0} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#6b7280" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Room and Maze */}
      <RoomWithMaze />
    </>
  )
}

/**
 * Room with Maze Inside
 */
function RoomWithMaze() {
  const roomSize = 90;
  const wallHeight = 20;
  const wallThickness = 0.5;
  const wallColor = '#8892b0';

  const mazeWallHeight = 10;
  const mazeWallColor = '#64748b';

  return (
    <group>
      {/* OUTER ROOM WALLS (High walls) */}
      {/* North wall */}
      <Wall
        position={[0, wallHeight / 2, -roomSize / 2]}
        width={roomSize}
        height={wallHeight}
        depth={wallThickness}
        color={wallColor}
      />

      {/* South wall */}
      <Wall
        position={[0, wallHeight / 2, roomSize / 2]}
        width={roomSize}
        height={wallHeight}
        depth={wallThickness}
        color={wallColor}
      />

      {/* East wall */}
      <Wall
        position={[roomSize / 2, wallHeight / 2, 0]}
        width={wallThickness}
        height={wallHeight}
        depth={roomSize}
        color={wallColor}
      />

      {/* West wall */}
      <Wall
        position={[-roomSize / 2, wallHeight / 2, 0]}
        width={wallThickness}
        height={wallHeight}
        depth={roomSize}
        color={wallColor}
      />

      {/* GALLERY MAZE with Section Pockets */}
      <GalleryMaze wallHeight={mazeWallHeight} color={mazeWallColor} />
    </group>
  )
}

/**
 * Gallery Maze - Art gallery layout with pockets for each section
 * Layout: Central corridor with alcoves/pockets branching off
 */
function GalleryMaze({ wallHeight, color }: { wallHeight: number; color: string }) {
  const wallThickness = 0.3
  const accentColor = '#64FFDA'

  return (
    <group>
      {/* HERO SECTION on North Wall */}
      <HeroSection wallHeight={wallHeight} />

      {/* ABOUT SECTION - Alcove on the left (North) */}
      <AboutSection
        position={[-18, 0, -20]}
        wallHeight={wallHeight}
        color={color}
        labelColor={accentColor}
        entrance="right"
      />

      {/* SKILLS SECTION - Alcove on the right (North) */}
      <SkillsSection
        position={[18, 0, -20]}
        wallHeight={wallHeight}
        color={color}
        labelColor={accentColor}
        entrance="left"
      />

      {/* EXPERIENCE SECTION - Alcove on the left (Center) */}
      <ExperienceSection
        position={[-18, 0, 0]}
        wallHeight={wallHeight}
        color={color}
        labelColor={accentColor}
        entrance="right"
      />

      {/* PROJECTS SECTION - Alcove on the right (Center) */}
      <ProjectsSection
        position={[18, 0, 0]}
        wallHeight={wallHeight}
        color={color}
        labelColor={accentColor}
        entrance="left"
      />

      {/* CONTACT SECTION - Alcove on the left (South) */}
      <ContactSection
        position={[-18, 0, 20]}
        wallHeight={wallHeight}
        color={color}
        labelColor={accentColor}
        entrance="right"
      />

      {/* RESUME SECTION - Alcove on the right (South) */}
      <ResumeSection
        position={[18, 0, 20]}
        wallHeight={wallHeight}
        color={color}
        labelColor={accentColor}
        entrance="left"
      />
    </group>
  )
}

/**
 * About Section - Biography and background
 */
function AboutSection({
  position,
  wallHeight,
  color,
  labelColor,
  entrance,
}: {
  position: [number, number, number]
  wallHeight: number
  color: string
  labelColor: string
  entrance: 'left' | 'right'
}) {
  const pocketWidth = 24
  const pocketDepth = 16
  const wallThickness = 0.3

  return (
    <group position={position}>
      {/* Back wall */}
      <Wall
        position={[0, wallHeight / 2, -pocketDepth / 2]}
        width={pocketWidth}
        height={wallHeight}
        depth={wallThickness}
        color={color}
      />

      {/* Side walls */}
      {entrance === 'right' ? (
        <>
          <Wall
            position={[-pocketWidth / 2, wallHeight / 2, 0]}
            width={wallThickness}
            height={wallHeight}
            depth={pocketDepth}
            color={color}
          />
          <Wall
            position={[pocketWidth / 2, wallHeight / 2, 0]}
            width={wallThickness}
            height={wallHeight}
            depth={pocketDepth}
            color={color}
          />
        </>
      ) : (
        <>
          <Wall
            position={[-pocketWidth / 2, wallHeight / 2, 0]}
            width={wallThickness}
            height={wallHeight}
            depth={pocketDepth}
            color={color}
          />
          <Wall
            position={[pocketWidth / 2, wallHeight / 2, 0]}
            width={wallThickness}
            height={wallHeight}
            depth={pocketDepth}
            color={color}
          />
        </>
      )}

      {/* Content Panel on Back Wall */}
      <group position={[0, wallHeight / 2, -pocketDepth / 2 + 0.1]}>
        {/* Background panel */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[pocketWidth - 2, wallHeight - 2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Section Title */}
        <Text
          position={[0, (wallHeight - 2) / 2 - 1, 0.2]}
          fontSize={1.2}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
        >
          ABOUT ME
        </Text>

        {/* Content */}
        <Text
          position={[0, 2, 0.2]}
          fontSize={0.35}
          color="#ccd6f6"
          anchorX="center"
          anchorY="top"
          maxWidth={18}
          textAlign="left"
          lineHeight={1.5}
          fontWeight={600}
        >
          I'm Jhensen Ray Agni. Mechanical Engineer turned Software Engineer.
        </Text>

        <Text
          position={[0, 0.5, 0.2]}
          fontSize={0.28}
          color="#8892b0"
          anchorX="center"
          anchorY="top"
          maxWidth={18}
          textAlign="left"
          lineHeight={1.5}
        >
          I am currently building and testing full stack web applications at Dovenmuehle Mortgage Inc. Prior to Dovenmuehle, I worked as Software Engineering Intern at Rithm School.
        </Text>

        <Text
          position={[0, -1.5, 0.2]}
          fontSize={0.28}
          color="#8892b0"
          anchorX="center"
          anchorY="top"
          maxWidth={18}
          textAlign="left"
          lineHeight={1.5}
        >
          I received a B.S. in Mechanical Engineering at UC Riverside. I previously worked at Honeywell Aero and Naval Surface Warfare Center.
        </Text>

        <Text
          position={[0, -3.5, 0.2]}
          fontSize={0.28}
          color="#8892b0"
          anchorX="center"
          anchorY="top"
          maxWidth={18}
          textAlign="left"
          lineHeight={1.5}
        >
          In my free time you can find me powerlifting at the gym or building robots in my backyard.
        </Text>
      </group>
    </group>
  )
}

/**
 * Skills Section - Technical skills organized by category
 */
function SkillsSection({
  position,
  wallHeight,
  color,
  labelColor,
  entrance,
}: {
  position: [number, number, number]
  wallHeight: number
  color: string
  labelColor: string
  entrance: 'left' | 'right'
}) {
  const pocketWidth = 24
  const pocketDepth = 16
  const wallThickness = 0.3

  const skillsData = [
    { category: "Frontend", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS"] },
    { category: "Backend", skills: ["Node.js", "Express", "Python", "Flask", "Django", "tRPC"] },
    { category: "Database & Cloud", skills: ["MySQL", "PostgreSQL", "Redis", "AWS S3", "Docker"] },
    { category: "Robotics & AI", skills: ["ROS/ROS2", "OpenCV", "SLAM", "Machine Learning", "C++", "YOLO"] }
  ]

  return (
    <group position={position}>
      <Wall position={[0, wallHeight / 2, -pocketDepth / 2]} width={pocketWidth} height={wallHeight} depth={wallThickness} color={color} />
      {entrance === 'right' ? (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      ) : (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      )}

      <group position={[0, wallHeight / 2, -pocketDepth / 2 + 0.1]}>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[pocketWidth - 2, wallHeight - 2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>

        <Text position={[0, (wallHeight - 2) / 2 - 1, 0.2]} fontSize={1.2} color={labelColor} anchorX="center" anchorY="middle" fontWeight={700}>
          TECHNICAL SKILLS
        </Text>

        {/* Frontend */}
        <Text position={[0, 2.5, 0.2]} fontSize={0.4} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Frontend
        </Text>
        <Text position={[0, 1.8, 0.2]} fontSize={0.3} color={labelColor} anchorX="center" anchorY="top" maxWidth={18} textAlign="center">
          React • TypeScript • Next.js • Tailwind CSS • JavaScript • HTML/CSS
        </Text>

        {/* Backend */}
        <Text position={[0, 0.7, 0.2]} fontSize={0.4} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Backend
        </Text>
        <Text position={[0, 0, 0.2]} fontSize={0.3} color={labelColor} anchorX="center" anchorY="top" maxWidth={18} textAlign="center">
          Node.js • Express • Python • Flask • Django • tRPC
        </Text>

        {/* Database & Cloud */}
        <Text position={[0, -1.1, 0.2]} fontSize={0.4} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Database & Cloud
        </Text>
        <Text position={[0, -1.8, 0.2]} fontSize={0.3} color={labelColor} anchorX="center" anchorY="top" maxWidth={18} textAlign="center">
          MySQL • PostgreSQL • Redis • AWS S3 • Docker
        </Text>

        {/* Robotics & AI */}
        <Text position={[0, -2.9, 0.2]} fontSize={0.4} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Robotics & AI
        </Text>
        <Text position={[0, -3.6, 0.2]} fontSize={0.3} color={labelColor} anchorX="center" anchorY="top" maxWidth={18} textAlign="center">
          ROS/ROS2 • OpenCV • SLAM • Machine Learning • C++ • YOLO
        </Text>
      </group>
    </group>
  )
}

/**
 * Experience Section - Work history
 */
function ExperienceSection({
  position,
  wallHeight,
  color,
  labelColor,
  entrance,
}: {
  position: [number, number, number]
  wallHeight: number
  color: string
  labelColor: string
  entrance: 'left' | 'right'
}) {
  const pocketWidth = 24
  const pocketDepth = 16
  const wallThickness = 0.3

  return (
    <group position={position}>
      <Wall position={[0, wallHeight / 2, -pocketDepth / 2]} width={pocketWidth} height={wallHeight} depth={wallThickness} color={color} />
      {entrance === 'right' ? (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      ) : (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      )}

      <group position={[0, wallHeight / 2, -pocketDepth / 2 + 0.1]}>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[pocketWidth - 2, wallHeight - 2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>

        <Text position={[0, (wallHeight - 2) / 2 - 1, 0.2]} fontSize={1.2} color={labelColor} anchorX="center" anchorY="middle" fontWeight={700}>
          EXPERIENCE
        </Text>

        {/* Dovenmuehle */}
        <Text position={[0, 2.5, 0.2]} fontSize={0.4} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Software Engineer
        </Text>
        <Text position={[0, 2, 0.2]} fontSize={0.3} color={labelColor} anchorX="center" anchorY="top">
          Dovenmuehle Mortgage Inc • 2022 - PRESENT
        </Text>
        <Text position={[0, 1.2, 0.2]} fontSize={0.28} color="#8892b0" anchorX="center" anchorY="top" maxWidth={18} textAlign="left" lineHeight={1.4}>
          Develop and maintain web, mobile-web, and native mortgage applications. Build internal tooling to eliminate third-party API costs.
        </Text>

        {/* Rithm School */}
        <Text position={[0, -0.5, 0.2]} fontSize={0.4} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Software Engineer
        </Text>
        <Text position={[0, -1, 0.2]} fontSize={0.3} color={labelColor} anchorX="center" anchorY="top">
          Rithm School Inc • 2021 - 2022
        </Text>
        <Text position={[0, -1.8, 0.2]} fontSize={0.28} color="#8892b0" anchorX="center" anchorY="top" maxWidth={18} textAlign="left" lineHeight={1.4}>
          Streamlined staff UX with Django features. Migrated backend caching to Redis. Maintained 100% test coverage.
        </Text>

        {/* Honeywell */}
        <Text position={[0, -3.2, 0.2]} fontSize={0.4} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Test Engineer
        </Text>
        <Text position={[0, -3.7, 0.2]} fontSize={0.3} color={labelColor} anchorX="center" anchorY="top">
          Honeywell • 2020 - 2021
        </Text>
      </group>
    </group>
  )
}

/**
 * Projects Section - Portfolio projects
 */
function ProjectsSection({
  position,
  wallHeight,
  color,
  labelColor,
  entrance,
}: {
  position: [number, number, number]
  wallHeight: number
  color: string
  labelColor: string
  entrance: 'left' | 'right'
}) {
  const pocketWidth = 24
  const pocketDepth = 16
  const wallThickness = 0.3

  return (
    <group position={position}>
      <Wall position={[0, wallHeight / 2, -pocketDepth / 2]} width={pocketWidth} height={wallHeight} depth={wallThickness} color={color} />
      {entrance === 'right' ? (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      ) : (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      )}

      <group position={[0, wallHeight / 2, -pocketDepth / 2 + 0.1]}>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[pocketWidth - 2, wallHeight - 2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>

        <Text position={[0, (wallHeight - 2) / 2 - 1, 0.2]} fontSize={1.2} color={labelColor} anchorX="center" anchorY="middle" fontWeight={700}>
          PROJECTS
        </Text>

        {/* Robot Telemetry */}
        <Text position={[0, 2.5, 0.2]} fontSize={0.38} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Robot Telemetry Dashboard
        </Text>
        <Text position={[0, 1.8, 0.2]} fontSize={0.28} color="#8892b0" anchorX="center" anchorY="top" maxWidth={18} textAlign="left" lineHeight={1.4}>
          Real-time visualization of sensor data and control of ROS2-enabled robots through web sockets.
        </Text>

        {/* Search & Rescue */}
        <Text position={[0, 0.4, 0.2]} fontSize={0.38} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Autonomous Search & Rescue Robot
        </Text>
        <Text position={[0, -0.3, 0.2]} fontSize={0.28} color="#8892b0" anchorX="center" anchorY="top" maxWidth={18} textAlign="left" lineHeight={1.4}>
          ROS2, Nav2, OpenCV, and YOLOv11 for SLAM-based localization and autonomous navigation.
        </Text>

        {/* Pixie Rover */}
        <Text position={[0, -1.7, 0.2]} fontSize={0.38} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Pixie Rover
        </Text>
        <Text position={[0, -2.4, 0.2]} fontSize={0.28} color="#8892b0" anchorX="center" anchorY="top" maxWidth={18} textAlign="left" lineHeight={1.4}>
          AI-powered IoT robot monitoring patient safety with 92% accuracy in PPE detection.
        </Text>

        {/* Tempo Codestart */}
        <Text position={[0, -3.5, 0.2]} fontSize={0.38} color="#ccd6f6" anchorX="center" anchorY="top" fontWeight={600}>
          Tempo Codestart
        </Text>
      </group>
    </group>
  )
}

/**
 * Contact Section
 */
function ContactSection({
  position,
  wallHeight,
  color,
  labelColor,
  entrance,
}: {
  position: [number, number, number]
  wallHeight: number
  color: string
  labelColor: string
  entrance: 'left' | 'right'
}) {
  const pocketWidth = 24
  const pocketDepth = 16
  const wallThickness = 0.3

  return (
    <group position={position}>
      <Wall position={[0, wallHeight / 2, -pocketDepth / 2]} width={pocketWidth} height={wallHeight} depth={wallThickness} color={color} />
      {entrance === 'right' ? (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      ) : (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      )}

      <group position={[0, wallHeight / 2, -pocketDepth / 2 + 0.1]}>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[pocketWidth - 2, wallHeight - 2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>

        <Text position={[0, (wallHeight - 2) / 2 - 1, 0.2]} fontSize={1.2} color={labelColor} anchorX="center" anchorY="middle" fontWeight={700}>
          CONTACT
        </Text>

        <Text position={[0, 1.5, 0.2]} fontSize={0.45} color="#ccd6f6" anchorX="center" anchorY="middle" textAlign="center">
          Let's build something amazing together
        </Text>

        <Text position={[0, 0.3, 0.2]} fontSize={0.4} color={labelColor} anchorX="center" anchorY="middle" textAlign="center">
          jragni@gmail.com
        </Text>

        <Text position={[0, -0.8, 0.2]} fontSize={0.35} color={labelColor} anchorX="center" anchorY="middle" textAlign="center">
          GitHub • LinkedIn
        </Text>

        <Text position={[0, -2, 0.2]} fontSize={0.28} color="#8892b0" anchorX="center" anchorY="middle" maxWidth={18} textAlign="center" lineHeight={1.5}>
          github.com/jragni
          {'\n'}
          linkedin.com/in/jhensen-agni
        </Text>
      </group>
    </group>
  )
}

/**
 * Resume Section
 */
function ResumeSection({
  position,
  wallHeight,
  color,
  labelColor,
  entrance,
}: {
  position: [number, number, number]
  wallHeight: number
  color: string
  labelColor: string
  entrance: 'left' | 'right'
}) {
  const pocketWidth = 24
  const pocketDepth = 16
  const wallThickness = 0.3

  return (
    <group position={position}>
      <Wall position={[0, wallHeight / 2, -pocketDepth / 2]} width={pocketWidth} height={wallHeight} depth={wallThickness} color={color} />
      {entrance === 'right' ? (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      ) : (
        <>
          <Wall position={[-pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
          <Wall position={[pocketWidth / 2, wallHeight / 2, 0]} width={wallThickness} height={wallHeight} depth={pocketDepth} color={color} />
        </>
      )}

      <group position={[0, wallHeight / 2, -pocketDepth / 2 + 0.1]}>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[pocketWidth - 2, wallHeight - 2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>

        <Text position={[0, (wallHeight - 2) / 2 - 1, 0.2]} fontSize={1.2} color={labelColor} anchorX="center" anchorY="middle" fontWeight={700}>
          RESUME
        </Text>

        <Text position={[0, 1, 0.2]} fontSize={0.4} color="#ccd6f6" anchorX="center" anchorY="middle" maxWidth={18} textAlign="center" lineHeight={1.5}>
          Download my full resume to learn more about my experience and qualifications.
        </Text>

        <Text position={[0, -0.5, 0.2]} fontSize={0.45} color={labelColor} anchorX="center" anchorY="middle" textAlign="center">
          VIEW FULL RESUME
        </Text>

        <Text position={[0, -1.5, 0.2]} fontSize={0.3} color="#8892b0" anchorX="center" anchorY="middle" maxWidth={18} textAlign="center" lineHeight={1.5}>
          FINAL-june-24-resume.pdf
          {'\n\n'}
          (Open in browser to download)
        </Text>
      </group>
    </group>
  )
}

/**
 * Hero Section - Name, titles, and photo on north wall
 */
function HeroSection({ wallHeight }: { wallHeight: number }) {
  // Load the profile photo texture
  const photoTexture = useTexture('/surf.png')

  // Cycling titles
  const titles = [
    'Software Engineer',
    'Robotics Engineer',
    'Mechanical Engineer'
  ]
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [titles.length])

  // Configure texture for sharper rendering
  useEffect(() => {
    if (photoTexture) {
      photoTexture.minFilter = THREE.LinearFilter
      photoTexture.magFilter = THREE.LinearFilter
      photoTexture.needsUpdate = true
    }
  }, [photoTexture])

  return (
    <group position={[0, wallHeight / 2 + 3, -44]}>
      {/* Background panel for hero content - larger */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Photo frame - larger */}
      <mesh position={[0, 5, 0.2]}>
        <circleGeometry args={[3.5, 64]} />
        <meshStandardMaterial color="#64FFDA" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Actual photo - larger and sharper */}
      <mesh position={[0, 5, 0.25]}>
        <circleGeometry args={[3.3, 64]} />
        <meshBasicMaterial map={photoTexture} />
      </mesh>

      {/* 3D Text - Name */}
      <Text
        position={[0, 0.5, 0.3]}
        fontSize={1.5}
        color="#ccd6f6"
        anchorX="center"
        anchorY="middle"
      >
        Jhensen Ray Agni
      </Text>

      {/* 3D Text - Animated Title */}
      <Text
        key={currentTitleIndex}
        position={[0, -1.5, 0.3]}
        fontSize={0.8}
        color="#64FFDA"
        anchorX="center"
        anchorY="middle"
        maxWidth={25}
        textAlign="center"
      >
        {titles[currentTitleIndex]}
      </Text>

      {/* 3D Text - Bio */}
      <Text
        position={[0, -3.5, 0.3]}
        fontSize={0.5}
        color="#8892b0"
        anchorX="center"
        anchorY="middle"
        maxWidth={22}
        textAlign="center"
        lineHeight={1.5}
      >
        Los Angeles native, with a passion for leading highly effective engineering teams and changing the world one line of code at a time.
      </Text>
    </group>
  )
}

/**
 * WASD Controls - First-person movement
 */
function WASDControls() {
  const { camera } = useThree()
  const moveSpeed = 0.2
  const keysPressed = useRef<{ [key: string]: boolean }>({})

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    const direction = new THREE.Vector3()
    const right = new THREE.Vector3()

    // Get camera's forward direction (on XZ plane)
    camera.getWorldDirection(direction)
    direction.y = 0
    direction.normalize()

    // Get right direction
    right.crossVectors(camera.up, direction).normalize()

    // WASD movement
    if (keysPressed.current['w']) {
      camera.position.addScaledVector(direction, moveSpeed)
    }
    if (keysPressed.current['s']) {
      camera.position.addScaledVector(direction, -moveSpeed)
    }
    if (keysPressed.current['a']) {
      camera.position.addScaledVector(right, moveSpeed)
    }
    if (keysPressed.current['d']) {
      camera.position.addScaledVector(right, -moveSpeed)
    }

    // Q/E vertical movement
    if (keysPressed.current['q']) {
      camera.position.y += moveSpeed
    }
    if (keysPressed.current['e']) {
      camera.position.y -= moveSpeed
    }

    // Constrain camera height to reasonable bounds
    camera.position.y = Math.max(0.5, Math.min(camera.position.y, 18))
  })

  return <PointerLockControls />
}

/**
 * Wall Component
 */
function Wall({
  position,
  width,
  height,
  depth,
  color,
}: {
  position: [number, number, number]
  width: number
  height: number
  depth: number
  color: string
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
    </mesh>
  )
}
