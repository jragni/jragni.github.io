/**
 * Maze Generation Utility
 * Generates a maze layout for the portfolio sections
 */

export interface Cell {
  x: number;
  z: number;
  walls: {
    north: boolean;
    south: boolean;
    east: boolean;
    west: boolean;
  };
  visited: boolean;
  sectionId?: string; // Maps to portfolio section
}

export class MazeGenerator {
  width: number;
  height: number;
  grid: Cell[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = this.initializeGrid();
  }

  private initializeGrid(): Cell[][] {
    const grid: Cell[][] = [];
    for (let z = 0; z < this.height; z++) {
      grid[z] = [];
      for (let x = 0; x < this.width; x++) {
        grid[z][x] = {
          x,
          z,
          walls: {
            north: true,
            south: true,
            east: true,
            west: true,
          },
          visited: false,
        };
      }
    }
    return grid;
  }

  generate(): Cell[][] {
    // Create hub-and-spoke layout
    this.createHubAndSpoke();

    return this.grid;
  }

  private createHubAndSpoke() {
    // Define the central hub
    const centerX = Math.floor(this.width / 2);
    const centerZ = Math.floor(this.height / 2);
    const hubRadius = 2; // 5x5 hub area

    // Clear walls for hub area (create a large open space)
    for (let z = centerZ - hubRadius; z <= centerZ + hubRadius; z++) {
      for (let x = centerX - hubRadius; x <= centerX + hubRadius; x++) {
        if (x >= 0 && x < this.width && z >= 0 && z < this.height) {
          this.grid[z][x].visited = true;
          this.grid[z][x].sectionId = 'hub';

          // Remove internal walls within the hub
          if (x < centerX + hubRadius) this.grid[z][x].walls.east = false;
          if (x > centerX - hubRadius) this.grid[z][x].walls.west = false;
          if (z < centerZ + hubRadius) this.grid[z][x].walls.south = false;
          if (z > centerZ - hubRadius) this.grid[z][x].walls.north = false;
        }
      }
    }

    // Create 5 corridors radiating from the hub
    const sections = [
      { id: 'about', angle: 0 },          // North
      { id: 'skills', angle: 72 },        // NE
      { id: 'experience', angle: 144 },   // SE
      { id: 'projects', angle: 216 },     // SW
      { id: 'contact', angle: 288 },      // NW
    ];

    sections.forEach((section) => {
      this.createCorridor(centerX, centerZ, section.angle, section.id, hubRadius + 1);
    });
  }

  private createCorridor(startX: number, startZ: number, angle: number, sectionId: string, corridorStart: number) {
    const corridorLength = 6;
    const roomSize = 3;

    // Convert angle to radians
    const rad = (angle * Math.PI) / 180;

    // Calculate direction
    const dirX = Math.round(Math.cos(rad));
    const dirZ = Math.round(Math.sin(rad));

    let currentX = startX + dirX * corridorStart;
    let currentZ = startZ + dirZ * corridorStart;

    // Carve corridor path
    for (let i = 0; i < corridorLength; i++) {
      if (currentX >= 0 && currentX < this.width && currentZ >= 0 && currentZ < this.height) {
        this.grid[currentZ][currentX].visited = true;

        // Remove walls in direction of travel
        if (dirX > 0) {
          this.grid[currentZ][currentX].walls.east = false;
          if (currentX + 1 < this.width) {
            this.grid[currentZ][currentX + 1].walls.west = false;
          }
        } else if (dirX < 0) {
          this.grid[currentZ][currentX].walls.west = false;
          if (currentX - 1 >= 0) {
            this.grid[currentZ][currentX - 1].walls.east = false;
          }
        }

        if (dirZ > 0) {
          this.grid[currentZ][currentX].walls.south = false;
          if (currentZ + 1 < this.height) {
            this.grid[currentZ + 1][currentX].walls.north = false;
          }
        } else if (dirZ < 0) {
          this.grid[currentZ][currentX].walls.north = false;
          if (currentZ - 1 >= 0) {
            this.grid[currentZ - 1][currentX].walls.south = false;
          }
        }

        currentX += dirX;
        currentZ += dirZ;
      }
    }

    // Create section room at end of corridor
    this.createSectionRoom(currentX, currentZ, roomSize, sectionId);
  }

  private createSectionRoom(centerX: number, centerZ: number, size: number, sectionId: string) {
    const halfSize = Math.floor(size / 2);

    for (let z = centerZ - halfSize; z <= centerZ + halfSize; z++) {
      for (let x = centerX - halfSize; x <= centerX + halfSize; x++) {
        if (x >= 0 && x < this.width && z >= 0 && z < this.height) {
          this.grid[z][x].visited = true;
          this.grid[z][x].sectionId = sectionId;

          // Remove internal walls to create open room
          if (x < centerX + halfSize) this.grid[z][x].walls.east = false;
          if (x > centerX - halfSize) this.grid[z][x].walls.west = false;
          if (z < centerZ + halfSize) this.grid[z][x].walls.south = false;
          if (z > centerZ - halfSize) this.grid[z][x].walls.north = false;
        }
      }
    }
  }

}

export const generateMaze = (width: number = 10, height: number = 10): Cell[][] => {
  const generator = new MazeGenerator(width, height);
  return generator.generate();
};