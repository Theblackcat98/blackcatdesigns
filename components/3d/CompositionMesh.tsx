'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Helper functions from original code
function createShape({ innerRadius = 4, outerRadius = 6, fineness = 30 }) {
  const outer = getPath(outerRadius, fineness, false)
  const baseShape = new THREE.Shape(outer)
  const inner = getPath(innerRadius, fineness, true)
  const baseHole = new THREE.Path(inner)
  baseShape.holes.push(baseHole)
  return baseShape
}

const getPath = (radius: number, fineness: number, reverse: boolean) => {
  const c = radius * 0.55191502449
  const points: THREE.Vector2[] = []

  // Create a circle path manually using bezier curves
  const segments = 8
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const nextAngle = ((i + 1) / segments) * Math.PI * 2

    const p0 = new THREE.Vector2(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius
    )
    const p1 = new THREE.Vector2(
      Math.cos(angle) * radius + Math.cos(angle + Math.PI/2) * c,
      Math.sin(angle) * radius + Math.sin(angle + Math.PI/2) * c
    )
    const p2 = new THREE.Vector2(
      Math.cos(nextAngle) * radius + Math.cos(nextAngle - Math.PI/2) * c,
      Math.sin(nextAngle) * radius + Math.sin(nextAngle - Math.PI/2) * c
    )
    const p3 = new THREE.Vector2(
      Math.cos(nextAngle) * radius,
      Math.sin(nextAngle) * radius
    )

    const curve = new THREE.CubicBezierCurve(p0, p1, p2, p3)
    const curvePoints = curve.getPoints(fineness / segments)
    points.push(...curvePoints)
  }

  if (reverse) points.reverse()
  return points
}

function createTube({ amount = 4, radius = 6, thickness = 2 }) {
  const shape = createShape({
    innerRadius: radius - thickness,
    outerRadius: radius,
    fineness: 14
  })

  const props = {
    steps: amount,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.3,
    bevelSize: 0.2,
    bevelSegments: 1
  }

  const geometry = new THREE.ExtrudeGeometry(shape, props)
  geometry.center()
  geometry.computeVertexNormals()

  // Convert to BufferGeometry directly
  const bufferGeometry = new THREE.BufferGeometry().copy(geometry)

  // Apply transformations
  bufferGeometry.rotateX(Math.PI * 0.5)
  bufferGeometry.rotateZ(Math.PI)

  return bufferGeometry
}

export const CompositionMesh = () => {
  const meshRef = useRef<THREE.Group>(null)

  const { geometry, materials } = useMemo(() => {
    const sideLength = 10
    const amount = 15
    const radius = 6
    const thickness = 2
    const offset = 0.3

    // Create the tube geometry
    const tube = createTube({
      amount: amount,
      radius: radius,
      thickness: thickness
    })

    // Create materials
    const materials = [
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

    return { geometry: tube, materials }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Create optimized grid instances
  const instances = useMemo(() => {
    const gridSize = 5
    const radius = 6 + 0.3
    const instances = []

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        instances.push({
          key: `${x}-${z}`,
          position: [
            x * radius * 2 - (gridSize - 1) * radius,
            0,
            z * radius * 2 - (gridSize - 1) * radius
          ] as [number, number, number]
        })
      }
    }
    return instances
  }, [])

  return (
    <group ref={meshRef}>
      {instances.map((instance) => (
        <mesh
          key={instance.key}
          geometry={geometry}
          material={materials}
          position={instance.position}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  )
}