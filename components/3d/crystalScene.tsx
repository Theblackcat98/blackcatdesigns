'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CrystalCatEye } from './crystalCatEye'
import { Loader } from '@react-three/drei'

export const CrystalScene = () => {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        performance={{ min: 0.5, max: 1 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#FFA89C" // Peach accent
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.3}
          color="#C4A7E7" // Lavender secondary
        />

        <Suspense fallback={null}>
          <CrystalCatEye />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  )
}