'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SphereData {
  mesh: THREE.Mesh
  originalX: number
  originalZ: number
  time: number
}

export const DynamicSpheres = () => {
  const groupRef = useRef<THREE.Group>(null)
  const [spheres, setSpheres] = useState<SphereData[]>([])

  // Create cylinder geometry and material (shared)
  const cylinderGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(1, 1, 12, 8)
  }, [])

  const materials = useMemo(() => {
    return [
      new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 1.0,
        metalness: 0.0,
        emissive: 0x000000,
        flatShading: true,
        side: THREE.DoubleSide
      }),
      new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.6,
        metalness: 0.0,
        emissive: 0x000000,
        flatShading: true,
        side: THREE.DoubleSide
      })
    ]
  }, [])

  // Create composition tubes from your script
  const composition = useMemo(() => {
    const sideLength = 10
    const amount = 15
    const radius = 6
    const thickness = 2
    const offset = 0.3

    const createRow = () => {
      const rowRadius = radius + offset
      const geometry = new THREE.BufferGeometry()
      const positions = []

      for (let i = 0; i < sideLength; i++) {
        const t = (i / sideLength) * Math.PI * 2
        positions.push(
          Math.cos(t) * rowRadius + i * 2,
          Math.sin(t) * rowRadius,
          Math.cos(t) * rowRadius + i * 2
        )
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.computeVertexNormals()
      return geometry
    }

    const createTubes = () => {
      const row = createRow()
      const tubeRadius = radius + offset
      const geometry = new THREE.BufferGeometry()
      const positions = []

      for (let i = 0; i < sideLength; i++) {
        const t = (i / sideLength) * Math.PI * 2
        positions.push(
          0,
          0,
          i * tubeRadius * 2
        )
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.computeVertexNormals()
      geometry.center()

      const mesh = new THREE.Mesh(geometry, materials)
      mesh.castShadow = true
      mesh.receiveShadow = true
      return mesh
    }

    return createTubes()
  }, [materials])

  // Initialize spheres
  useMemo(() => {
    const newSpheres: SphereData[] = []
    const sphereGeometry = new THREE.SphereGeometry(2, 16, 16)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFA89C, // Your brand accent color
      emissive: 0xFFA89C,
      emissiveIntensity: 0.6,
      roughness: 0.8,
      metalness: 0.1
    })

    for (let i = 0; i < 3; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.castShadow = true
      sphere.receiveShadow = true

      newSpheres.push({
        mesh: sphere,
        originalX: Math.random() * 10 - 5,
        originalZ: Math.random() * 10 - 5,
        time: Math.random() * Math.PI * 2
      })
    }

    setSpheres(newSpheres)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    // Animate spheres jumping in and out
    spheres.forEach((sphereData, index) => {
      const mesh = sphereData.mesh
      const time = state.clock.elapsedTime + sphereData.time

      // Jumping motion: sine wave for Y position
      const jumpHeight = Math.abs(Math.sin(time * 2)) * 8 + 4
      mesh.position.y = jumpHeight

      // Slight X/Z movement for organic feel
      mesh.position.x = sphereData.originalX + Math.sin(time) * 0.5
      mesh.position.z = sphereData.originalZ + Math.cos(time * 0.7) * 0.5

      // Rotation
      mesh.rotation.x = time
      mesh.rotation.y = time * 1.3

      // Scale pulsing
      const scale = 1 + Math.sin(time * 3) * 0.1
      mesh.scale.setScalar(scale)
    })

    // Rotate the entire composition
    if (composition) {
      composition.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Composition tubes/cylinders */}
      {composition && <primitive object={composition} />}

      {/* Dynamic spheres */}
      {spheres.map((sphereData, index) => (
        <primitive key={index} object={sphereData.mesh} />
      ))}
    </group>
  )
}