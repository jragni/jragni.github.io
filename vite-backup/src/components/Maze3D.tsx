/**
 * 3D Maze Component
 * Renders the cyberpunk maze with portfolio sections as walls
 */

import { useRef, useMemo } from 'react';
import { Box, Text } from '@react-three/drei';
import { Mesh } from 'three';
import type { Cell } from '../utils/mazeGenerator';
import { cyberpunkTheme } from '../styles/cyberpunk-theme';
import SectionWallContent from './SectionWallContent';

interface MazeWallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  dimensions: [number, number, number];
  isSection?: boolean;
  sectionId?: string;
}

const MazeWall = ({ position, rotation = [0, 0, 0], dimensions, isSection, sectionId }: MazeWallProps) => {
  const meshRef = useRef<Mesh>(null);
  const { colors, materials } = cyberpunkTheme;

  return (
    <group position={position} rotation={rotation}>
      <Box args={dimensions} ref={meshRef}>
        <meshStandardMaterial
          color={isSection ? colors.darkBg : colors.gridLines}
          emissive={isSection ? colors.neonTeal : colors.gridLines}
          emissiveIntensity={isSection ? materials.wallEmissive * 2 : materials.wallEmissive}
          metalness={materials.wallMetalness}
          roughness={materials.wallRoughness}
        />
      </Box>

      {/* Add glowing edges */}
      <Box args={[dimensions[0] * 1.02, dimensions[1] * 1.02, dimensions[2] * 1.02]}>
        <meshBasicMaterial
          color={colors.neonTeal}
          transparent
          opacity={0.1}
          wireframe
        />
      </Box>

      {isSection && sectionId && (
        <Text
          position={[0, dimensions[1] / 2 + 0.5, 0]}
          fontSize={0.5}
          color={colors.neonTeal}
          anchorX="center"
          anchorY="middle"
        >
          {sectionId.toUpperCase()}
        </Text>
      )}
    </group>
  );
};

interface Maze3DProps {
  mazeGrid: Cell[][];
}

const Maze3D = ({ mazeGrid }: Maze3DProps) => {
  const { maze } = cyberpunkTheme;
  const walls = useMemo(() => {
    const wallList: React.JSX.Element[] = [];
    const cellSize = maze.cellSize;
    const wallHeight = maze.wallHeight;
    const wallThickness = maze.wallThickness;

    mazeGrid.forEach((row, z) => {
      row.forEach((cell, x) => {
        const centerX = x * cellSize;
        const centerZ = z * cellSize;

        // North wall
        if (cell.walls.north) {
          wallList.push(
            <MazeWall
              key={`wall-${x}-${z}-north`}
              position={[centerX, wallHeight / 2, centerZ - cellSize / 2]}
              dimensions={[cellSize, wallHeight, wallThickness]}
              isSection={!!cell.sectionId}
              sectionId={cell.sectionId}
            />
          );
        }

        // South wall
        if (cell.walls.south && z === mazeGrid.length - 1) {
          wallList.push(
            <MazeWall
              key={`wall-${x}-${z}-south`}
              position={[centerX, wallHeight / 2, centerZ + cellSize / 2]}
              dimensions={[cellSize, wallHeight, wallThickness]}
            />
          );
        }

        // East wall
        if (cell.walls.east && x === row.length - 1) {
          wallList.push(
            <MazeWall
              key={`wall-${x}-${z}-east`}
              position={[centerX + cellSize / 2, wallHeight / 2, centerZ]}
              dimensions={[wallThickness, wallHeight, cellSize]}
            />
          );
        }

        // West wall
        if (cell.walls.west) {
          wallList.push(
            <MazeWall
              key={`wall-${x}-${z}-west`}
              position={[centerX - cellSize / 2, wallHeight / 2, centerZ]}
              dimensions={[wallThickness, wallHeight, cellSize]}
              isSection={!!cell.sectionId}
              sectionId={cell.sectionId}
            />
          );
        }

        // Add content displays for section cells
        if (cell.sectionId) {
          const contentPosition: [number, number, number] = [centerX, wallHeight / 2, centerZ];
          wallList.push(
            <SectionWallContent
              key={`content-${x}-${z}`}
              sectionId={cell.sectionId}
              position={contentPosition}
              rotation={[0, 0, 0]}
            />
          );
        }
      });
    });

    return wallList;
  }, [mazeGrid, maze]);

  // Create the floor
  const floorSize = [
    mazeGrid[0].length * maze.cellSize,
    mazeGrid.length * maze.cellSize,
  ];

  return (
    <group>
      {/* Maze floor */}
      <Box
        args={[floorSize[0], 0.1, floorSize[1]]}
        position={[floorSize[0] / 2 - maze.cellSize / 2, -0.05, floorSize[1] / 2 - maze.cellSize / 2]}
      >
        <meshStandardMaterial
          color={cyberpunkTheme.colors.darkBg}
          metalness={cyberpunkTheme.materials.floorMetalness}
          roughness={cyberpunkTheme.materials.floorRoughness}
        />
      </Box>

      {/* Grid lines on floor */}
      <gridHelper
        args={[Math.max(floorSize[0], floorSize[1]), maze.gridSize, cyberpunkTheme.colors.neonTeal, cyberpunkTheme.colors.gridLines]}
        position={[floorSize[0] / 2 - maze.cellSize / 2, 0, floorSize[1] / 2 - maze.cellSize / 2]}
        rotation={[0, 0, 0]}
      />

      {/* Maze walls */}
      {walls}
    </group>
  );
};

export default Maze3D;