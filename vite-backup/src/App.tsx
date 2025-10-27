/**
 * Main Application Component
 * Industrial Portfolio with Static 3D Maze Background
 */

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import IndustrialMaze from './components/IndustrialMaze'
import './index.css'

function App() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Fixed 3D Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 5, 15],
          }}
          style={{
            background: '#0a0a0a',
            width: '100%',
            height: '100%'
          }}
        >
          <Suspense fallback={null}>
            <IndustrialMaze />
          </Suspense>
        </Canvas>
      </div>

    </div>
  )
}

export default App
