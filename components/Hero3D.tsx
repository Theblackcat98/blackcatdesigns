'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={2.4} ref={meshRef}>
                <MeshDistortMaterial
                    color="#ff4d4d" // Using a red/accent color base
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    )
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#ff0000" />
                <AnimatedSphere />
            </Canvas>
        </div>
    )
}
