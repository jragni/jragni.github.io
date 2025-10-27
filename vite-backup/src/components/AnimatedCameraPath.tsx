/**
 * Animated Camera Path Component
 * Creates smooth camera movements through the maze sections
 */

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';
import type { Cell } from '../utils/mazeGenerator';
import { cyberpunkTheme } from '../styles/cyberpunk-theme';

interface CameraPathPoint {
  position: Vector3;
  lookAt: Vector3;
  section: string;
  duration: number; // Time to reach this point in seconds
}

interface AnimatedCameraPathProps {
  mazeGrid: Cell[][];
  isPlaying: boolean;
  speed: number; // 0.5 = slow, 1 = normal, 2 = fast
  targetSection?: string | null; // Section to jump to
  onSectionChange?: (sectionId: string) => void;
  onPathComplete?: () => void;
}

const AnimatedCameraPath = ({
  mazeGrid,
  isPlaying,
  speed = 1,
  targetSection,
  onSectionChange,
  onPathComplete,
}: AnimatedCameraPathProps) => {
  const { camera } = useThree();
  const pathRef = useRef<CatmullRomCurve3 | null>(null);
  const lookAtPathRef = useRef<CatmullRomCurve3 | null>(null);
  const progressRef = useRef(0);
  const currentSectionRef = useRef<string>('hub');
  const [pathPoints, setPathPoints] = useState<CameraPathPoint[]>([]);

  const { maze } = cyberpunkTheme;
  const cellSize = maze.cellSize;

  // Generate camera path points based on maze layout
  useEffect(() => {
    const centerX = Math.floor(mazeGrid[0].length / 2);
    const centerZ = Math.floor(mazeGrid.length / 2);

    const points: CameraPathPoint[] = [];

    // Start at hub center, looking around
    const hubPos = new Vector3(centerX * cellSize, maze.wallHeight * 0.6, centerZ * cellSize);
    points.push({
      position: hubPos.clone(),
      lookAt: new Vector3(centerX * cellSize, maze.wallHeight * 0.5, (centerZ - 3) * cellSize),
      section: 'hub',
      duration: 0,
    });

    // Slow pan around the hub
    for (let angle = 0; angle <= 360; angle += 90) {
      const rad = (angle * Math.PI) / 180;
      const lookX = centerX * cellSize + Math.cos(rad) * cellSize * 3;
      const lookZ = centerZ * cellSize + Math.sin(rad) * cellSize * 3;
      points.push({
        position: hubPos.clone(),
        lookAt: new Vector3(lookX, maze.wallHeight * 0.5, lookZ),
        section: 'hub',
        duration: 3 * (angle / 360),
      });
    }

    // Visit each section in order
    const sectionOrder = ['about', 'skills', 'experience', 'projects', 'contact'];
    let totalDuration = 3; // Hub duration

    sectionOrder.forEach((sectionId) => {
      // Find section location in maze
      let sectionX = 0;
      let sectionZ = 0;
      let found = false;

      for (let z = 0; z < mazeGrid.length && !found; z++) {
        for (let x = 0; x < mazeGrid[z].length && !found; x++) {
          if (mazeGrid[z][x].sectionId === sectionId) {
            sectionX = x;
            sectionZ = z;
            found = true;
          }
        }
      }

      if (found) {
        const sectionPos = new Vector3(
          sectionX * cellSize,
          maze.wallHeight * 0.6,
          sectionZ * cellSize
        );

        // Path from hub/previous section to this section
        const prevPoint = points[points.length - 1];
        const midPoint = new Vector3(
          (prevPoint.position.x + sectionPos.x) / 2,
          maze.wallHeight * 0.8,
          (prevPoint.position.z + sectionPos.z) / 2
        );

        // Add transition point
        points.push({
          position: midPoint,
          lookAt: sectionPos.clone(),
          section: sectionId,
          duration: totalDuration + 2,
        });

        totalDuration += 2;

        // Arrive at section
        points.push({
          position: sectionPos.clone(),
          lookAt: new Vector3(sectionPos.x, maze.wallHeight * 0.5, sectionPos.z - cellSize),
          section: sectionId,
          duration: totalDuration + 1,
        });

        totalDuration += 1;

        // Linger at section (looking around)
        const lingerAngles = [0, 90, 180, 270];
        lingerAngles.forEach((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const lookX = sectionPos.x + Math.cos(rad) * cellSize * 2;
          const lookZ = sectionPos.z + Math.sin(rad) * cellSize * 2;
          points.push({
            position: sectionPos.clone(),
            lookAt: new Vector3(lookX, maze.wallHeight * 0.4, lookZ),
            section: sectionId,
            duration: totalDuration + (i + 1) * 1.5,
          });
        });

        totalDuration += lingerAngles.length * 1.5;
      }
    });

    // Return to hub at end
    points.push({
      position: hubPos.clone(),
      lookAt: new Vector3(centerX * cellSize, maze.wallHeight * 0.5, centerZ * cellSize),
      section: 'hub',
      duration: totalDuration + 3,
    });

    setPathPoints(points);

    // Create camera path
    const positions = points.map((p) => p.position);
    const lookAts = points.map((p) => p.lookAt);

    pathRef.current = new CatmullRomCurve3(positions);
    lookAtPathRef.current = new CatmullRomCurve3(lookAts);

    // Set initial camera position
    camera.position.copy(positions[0]);
    camera.lookAt(lookAts[0]);
  }, [mazeGrid, camera, cellSize, maze.wallHeight]);

  // Handle target section jumps
  useEffect(() => {
    if (targetSection && pathPoints.length > 0) {
      // Find the first point for the target section
      const targetPoint = pathPoints.find(p => p.section === targetSection);
      if (targetPoint) {
        const maxDuration = pathPoints[pathPoints.length - 1].duration;
        progressRef.current = targetPoint.duration / maxDuration;
      }
    }
  }, [targetSection, pathPoints]);

  // Animate camera along path
  useFrame((_state, delta) => {
    if (!isPlaying || !pathRef.current || !lookAtPathRef.current || pathPoints.length === 0) {
      return;
    }

    // Update progress
    const maxDuration = pathPoints[pathPoints.length - 1].duration;
    progressRef.current += (delta * speed) / maxDuration;

    if (progressRef.current >= 1) {
      progressRef.current = 1;
      if (onPathComplete) {
        onPathComplete();
      }
    }

    // Get current position and lookAt from curves
    const position = pathRef.current.getPoint(progressRef.current);
    const lookAt = lookAtPathRef.current.getPoint(progressRef.current);

    // Update camera
    camera.position.copy(position);
    camera.lookAt(lookAt);

    // Determine current section and notify if changed
    const currentTime = progressRef.current * maxDuration;
    let currentSection = 'hub';

    for (let i = pathPoints.length - 1; i >= 0; i--) {
      if (currentTime >= pathPoints[i].duration) {
        currentSection = pathPoints[i].section;
        break;
      }
    }

    if (currentSection !== currentSectionRef.current) {
      currentSectionRef.current = currentSection;
      if (onSectionChange) {
        onSectionChange(currentSection);
      }
    }
  });

  return null; // This component doesn't render anything visible
};

export default AnimatedCameraPath;