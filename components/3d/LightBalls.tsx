'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'

interface LightBallData {
  group: THREE.Group
  light: THREE.PointLight
  mesh: THREE.Mesh
  timeline?: gsap.core.Timeline
}

export const LightBalls = () => {
  const groupRef = useRef<THREE.Group>(null)
  const [lightBalls, setLightBalls] = useState<LightBallData[]>([])

  // Initialize light balls
  useEffect(() => {
    const newLightBalls: LightBallData[] = []

    for (let i = 0; i < 3; i++) {
      const group = new THREE.Group()
      const light = new THREE.PointLight(0xf82c91, 4.0, 6, 1.0)

      const geometry = new THREE.SphereGeometry(2, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: 0xf82c91
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true
      mesh.position.set(0, -5, 0)

      group.add(mesh)
      group.add(light)

      newLightBalls.push({
        group: group,
        light: light,
        mesh: mesh
      })
    }

    setLightBalls(newLightBalls)
  }, [])

  // Create GSAP animations for each light ball
  useEffect(() => {
    if (lightBalls.length === 0) return

    const radius = 12.4

    lightBalls.forEach((lightBall, index) => {
      const { group, light, mesh } = lightBall

      // Set initial random position
      const randomX = THREE.MathUtils.randInt(-2, 2) * radius + radius * 0.5
      const randomZ = THREE.MathUtils.randInt(-2, 2) * radius + radius * 0.5
      group.position.set(randomX, -5, randomZ)

      // Create continuous jumping animation with random delay
      const delay = THREE.MathUtils.randFloat(0, 0.8)

      gsap.to(group.position, {
        y: 18,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: delay
      })

      gsap.to(light, {
        intensity: 8.0,
        distance: 18,
        duration: 1.2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: delay
      })

      // Periodically change position
      const changePosition = () => {
        const newX = THREE.MathUtils.randInt(-2, 2) * radius + radius * 0.5
        const newZ = THREE.MathUtils.randInt(-2, 2) * radius + radius * 0.5
        gsap.to(group.position, {
          x: newX,
          z: newZ,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: changePosition
        })
      }

      setTimeout(changePosition, delay * 1000)
    })

    return () => {
      // Cleanup animations
      lightBalls.forEach((lightBall) => {
        gsap.killTweensOf(lightBall.group.position)
        gsap.killTweensOf(lightBall.light)
      })
    }
  }, [lightBalls])

  // Add subtle rotation to entire group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {lightBalls.map((lightBall, index) => (
        <primitive key={index} object={lightBall.group} />
      ))}
    </group>
  )
}