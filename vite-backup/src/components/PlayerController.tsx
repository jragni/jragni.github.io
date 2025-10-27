/**
 * Player Controller Component
 * Handles first-person movement and collision detection in the maze
 */

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Raycaster } from 'three';
import { PointerLockControls } from '@react-three/drei';
import type { Cell } from '../utils/mazeGenerator';
import { cyberpunkTheme } from '../styles/cyberpunk-theme';

interface PlayerControllerProps {
  mazeGrid: Cell[][];
  startPosition?: [number, number, number];
  onSectionEnter?: (sectionId: string) => void;
}

const PlayerController = ({ mazeGrid, startPosition = [5, 1.6, 5], onSectionEnter }: PlayerControllerProps) => {
  const controlsRef = useRef<any>(null);
  const { camera, gl } = useThree();
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    running: false,
  });

  const raycaster = useRef(new Raycaster());
  const { maze } = cyberpunkTheme;

  useEffect(() => {
    // Set initial camera position
    camera.position.set(...startPosition);

    // Keyboard event handlers
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          moveState.current.running = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          moveState.current.running = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [camera, startPosition]);

  // TODO(human): Implement the calculateMovement function
  // This function should determine the player's movement based on input and collision detection
  const calculateMovement = (_delta: number): Vector3 => {
    // Your implementation here
    return new Vector3(0, 0, 0);
  };

  // Check for wall collisions
  const checkCollisions = (position: Vector3, direction: Vector3): boolean => {
    raycaster.current.set(position, direction.normalize());

    // Cast rays to check for walls
    // For now, return false (no collision) - enhance this based on maze structure
    return false;
  };

  // Detect which section the player is in
  const getCurrentSection = (position: Vector3): string | undefined => {
    const cellX = Math.floor((position.x + maze.cellSize / 2) / maze.cellSize);
    const cellZ = Math.floor((position.z + maze.cellSize / 2) / maze.cellSize);

    if (cellX >= 0 && cellX < mazeGrid[0].length && cellZ >= 0 && cellZ < mazeGrid.length) {
      return mazeGrid[cellZ][cellX].sectionId;
    }

    return undefined;
  };

  useFrame((_state, delta) => {
    if (controlsRef.current && controlsRef.current.isLocked) {
      // Calculate movement
      const movement = calculateMovement(delta);

      // Apply movement if no collision
      if (!checkCollisions(camera.position, movement)) {
        camera.position.add(movement);
      }

      // Check if we entered a new section
      const currentSection = getCurrentSection(camera.position);
      if (currentSection && onSectionEnter) {
        onSectionEnter(currentSection);
      }
    }
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      camera={camera}
      domElement={gl.domElement}
      maxPolarAngle={Math.PI * 0.9}
      minPolarAngle={Math.PI * 0.1}
    />
  );
};

export default PlayerController;