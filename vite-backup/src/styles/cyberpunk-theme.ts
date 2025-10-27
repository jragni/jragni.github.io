/**
 * Cyberpunk Theme Configuration
 */

export const cyberpunkTheme = {
  colors: {
    // Primary accent colors (from previous design)
    neonTeal: '#64FFDA',        // Primary accent - teal/cyan
    neonCyan: '#00F5FF',         // Links and highlights
    neonPurple: '#A78BFA',       // Secondary accent

    // Dark backgrounds (navy theme)
    darkBg: '#0a192f',           // Main dark navy
    darkerBg: '#020c1b',         // Deeper navy
    gridLines: '#112240',        // Grid and borders

    // Text colors
    textPrimary: '#CCD6F6',      // Light slate
    textSecondary: '#8892B0',    // Medium slate
    textAccent: '#64FFDA',       // Teal accent text

    // UI elements
    borderGlow: '#64FFDA',
    shadowGlow: 'rgba(100, 255, 218, 0.3)',
    warningRed: '#FF0040',

    // Additional colors for variety
    highlightBlue: '#5EEAD4',
    subtleGray: '#495670',
  },

  effects: {
    // Glow intensities
    glowIntensity: {
      low: 0.3,
      medium: 0.6,
      high: 1.0,
    },

    // Animation speeds (in seconds)
    animationSpeed: {
      slow: 2,
      medium: 1,
      fast: 0.5,
    },

    // Bloom settings for post-processing
    bloom: {
      intensity: 1.5,
      luminanceThreshold: 0.2,
      luminanceSmoothing: 0.9,
      radius: 0.8,
    },

    // Glitch effect parameters
    glitch: {
      delay: [0, 2],
      duration: 0.6,
      strength: [0.3, 1.0],
    },
  },

  materials: {
    // Wall materials
    wallEmissive: 0.2,
    wallMetalness: 0.8,
    wallRoughness: 0.2,

    // Floor materials
    floorMetalness: 0.95,
    floorRoughness: 0.05,
    floorReflectivity: 0.9,

    // Text materials
    textEmissive: 0.8,
  },

  maze: {
    // Maze dimensions
    cellSize: 10,
    wallHeight: 8,
    wallThickness: 0.5,

    // Grid settings
    gridSize: 20,
    gridOpacity: 0.3,

    // Fog settings
    fogNear: 10,
    fogFar: 100,
    fogColor: '#0A0A0F',
  },

  lighting: {
    // Ambient light
    ambientIntensity: 0.1,
    ambientColor: '#1a1a2e',

    // Point lights for neon effects
    neonIntensity: 2,
    neonDistance: 20,
    neonDecay: 2,

    // Spotlight for character
    spotlightIntensity: 1,
    spotlightAngle: Math.PI / 6,
    spotlightPenumbra: 0.5,
  },

  camera: {
    // First-person camera settings
    fov: 75,
    near: 0.1,
    far: 1000,
    height: 1.6, // Eye level height

    // Movement speeds
    walkSpeed: 5,
    runSpeed: 10,
    lookSpeed: 0.002,
  },
};

export type CyberpunkTheme = typeof cyberpunkTheme;