'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CompositionMesh } from './CompositionMesh'
import { LightBalls } from './LightBalls'
import { OrbitControls } from '@react-three/drei'
import { Loader } from '@react-three/drei'

export const DynamicScene = () => {
  const [dpr, setDpr] = useState(1)

  useEffect(() => {
    setDpr(Math.min((typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1, 2))
  }, [])

  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{
          position: [150, 200, 400],
          fov: 6,
          near: 0.1,
          far: 800
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        performance={{
          min: 0.3,
          max: 1,
          debounce: 200
        }}
        shadows
        dpr={dpr}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.03} />
        <spotLight
          position={[0, 50, 0]}
          intensity={0.4}
          distance={100}
          angle={Math.PI}
          penumbra={2}
          decay={1}
          color="#ffffff"
          castShadow
        />

        <Suspense fallback={null}>
          {/* Main composition tubes/cylinders */}
          <CompositionMesh />

          {/* Light balls/tubes system */}
          <LightBalls />

          {/* Camera controls for interactivity */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={200}
            maxDistance={600}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  )
}