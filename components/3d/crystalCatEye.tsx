'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCrystalGeometry } from '@/hooks/3d/useCrystalGeometry'
import { useMouseTracking } from '@/hooks/3d/useMouseTracking'
import { createCrystalMaterial, updateCrystalUniforms } from '@/materials/crystalMaterial'

export const CrystalCatEye = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useCrystalGeometry()
  const mousePosition = useMouseTracking()

  const material = useMemo(() => createCrystalMaterial(mousePosition), [mousePosition])

  useFrame((state) => {
    if (meshRef.current) {
      // Enhanced rotation
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      // Update shader uniforms
      updateCrystalUniforms(
        meshRef.current.material as THREE.ShaderMaterial,
        state.clock.elapsedTime,
        mousePosition
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      scale={[1, 1, 1]}
    />
  )
}