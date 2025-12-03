# Crystal Cat Eye Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the generic 3D blob with a sophisticated crystal structure that embodies the "cat's eye" concept and enhances the BlackCatDesigns brand identity.

**Architecture:** Multi-faceted 3D crystal using React Three Fiber with custom GLSL shaders, particle systems, and responsive mouse interactions, integrated with existing glass-morphism design system.

**Tech Stack:** React Three Fiber, Three.js, GLSL Shaders, GSAP, TypeScript, Tailwind CSS

---
## Phase 1: Foundation Setup

### Task 1: Install Required Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Add Three.js and React Three Fiber dependencies**

```json
{
  "dependencies": {
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "three": "^0.158.0",
    "gsap": "^3.12.0"
  }
}
```

**Step 2: Install packages**

Run: `npm install @react-three/fiber @react-three/drei three gsap`
Expected: Dependencies installed successfully

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install Three.js and animation dependencies for crystal hero"
```

### Task 2: Create Directory Structure

**Files:**
- Create: `components/3d/`
- Create: `hooks/3d/`
- Create: `materials/`
- Create: `shaders/`

**Step 1: Create component directories**

Run: `mkdir -p components/3d hooks/3d materials shaders`
Expected: Directories created successfully

**Step 2: Add placeholder files**

Run: `touch components/3d/.gitkeep hooks/3d/.gitkeep materials/.gitkeep shaders/.gitkeep`
Expected: Placeholder files created

**Step 3: Commit**

```bash
git add components/ hooks/ materials/ shaders/
git commit -m "feat: create directory structure for 3D crystal components"
```

### Task 3: Create Crystal Geometry Hook

**Files:**
- Create: `hooks/3d/useCrystalGeometry.ts`
- Test: N/A (visual component)

**Step 1: Write the geometry generation hook**

```typescript
import { useMemo } from 'react'
import * as THREE from 'three'

export const useCrystalGeometry = () => {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()

    // Crystal vertices - 12 main facets
    const vertices = new Float32Array([
      // Top apex
      0, 2, 0,
      // Base vertices (hexagonal)
      1, -1, 0,
      0.5, -1, 0.866,
      -0.5, -1, 0.866,
      -1, -1, 0,
      -0.5, -1, -0.866,
      0.5, -1, -0.866,
      // Additional detail vertices
      0.3, 0.5, 0.3,
      -0.3, 0.5, 0.3,
      0, 0.5, -0.4
    ])

    // Crystal faces indices
    const indices = [
      // Top faces
      0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 1,
      // Side faces
      1, 7, 2, 2, 7, 8, 2, 8, 3, 3, 8, 9,
      // Bottom detail
      7, 1, 6, 8, 7, 9, 9, 8, 6
    ]

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()

    return geo
  }, [])

  return geometry
}
```

**Step 2: Commit**

```bash
git add hooks/3d/useCrystalGeometry.ts
git commit -m "feat: create crystal geometry generation hook"
```

### Task 4: Create Basic Crystal Material

**Files:**
- Create: `materials/CrystalMaterial.ts`

**Step 1: Write the basic crystal material**

```typescript
import * as THREE from 'three'

export const createCrystalMaterial = () => {
  return new THREE.MeshPhysicalMaterial({
    color: 0x1a1a1a, // Dark charcoal
    metalness: 0.15,
    roughness: 0.85,
    transmission: 0.25,
    thickness: 0.5,
    transparent: true,
    opacity: 0.9,
    envMapIntensity: 1.0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
  })
}
```

**Step 2: Commit**

```bash
git add materials/CrystalMaterial.ts
git commit -m "feat: create basic crystal PBR material"
```

### Task 5: Create Basic Crystal Component

**Files:**
- Create: `components/3d/CrystalCatEye.tsx`

**Step 1: Write the basic crystal component**

```typescript
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCrystalGeometry } from '@/hooks/3d/useCrystalGeometry'
import { createCrystalMaterial } from '@/materials/CrystalMaterial'

export const CrystalCatEye = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useCrystalGeometry()
  const material = createCrystalMaterial()

  // Basic rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
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
```

**Step 2: Commit**

```bash
git add components/3d/CrystalCatEye.tsx
git commit -m "feat: create basic crystal component with rotation animation"
```

### Task 6: Create 3D Scene Container

**Files:**
- Create: `components/3d/CrystalScene.tsx`

**Step 1: Write the scene container**

```typescript
'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CrystalCatEye } from './CrystalCatEye'
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
```

**Step 2: Commit**

```bash
git add components/3d/CrystalScene.tsx
git commit -m "feat: create 3D scene container with lighting setup"
```

### Task 7: Update Homepage to Use Crystal

**Files:**
- Modify: `app/page.tsx` (lines 19-30 where Hero3D is imported)

**Step 1: Update homepage imports and usage**

```typescript
// Replace this import:
import { Hero3D } from '@/components/Hero3D'
// With this:
import { CrystalScene } from '@/components/3d/CrystalScene'
```

**Step 2: Replace Hero3D with CrystalScene in JSX**

```typescript
// Replace this JSX:
<Hero3D />
// With this:
<CrystalScene />
```

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace Hero3D with CrystalCatEye on homepage"
```

## Phase 2: Advanced Materials and Shaders

### Task 8: Create Custom Crystal Shaders

**Files:**
- Create: `shaders/crystalVertex.glsl`
- Create: `shaders/crystalFragment.glsl`

**Step 1: Write vertex shader**

```glsl
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;

  gl_Position = projectionMatrix * mvPosition;
}
```

**Step 2: Write fragment shader**

```glsl
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uAccentColor;
uniform vec3 uSecondaryColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);

  // Fresnel effect for "eye glow"
  float fresnel = pow(1.0 - dot(viewDir, normal), 2.0);

  // Subtle internal animation
  float pulse = sin(uTime * 2.0) * 0.1 + 0.9;

  // Mix colors based on fresnel and pulse
  vec3 color = mix(vec3(0.1, 0.1, 0.1), uAccentColor, fresnel * 0.3);
  color = mix(color, uSecondaryColor, pulse * 0.1);

  // Edge enhancement
  float edge = pow(fresnel, 1.5) * 0.5;
  color += uAccentColor * edge;

  gl_FragColor = vec4(color, 0.9);
}
```

**Step 3: Commit**

```bash
git add shaders/
git commit -m "feat: create custom GLSL shaders for crystal material"
```

### Task 9: Create Advanced Crystal Material with Shaders

**Files:**
- Modify: `materials/CrystalMaterial.ts`

**Step 1: Update material to use custom shaders**

```typescript
import * as THREE from 'three'
import crystalVertexShader from '../shaders/crystalVertex.glsl'
import crystalFragmentShader from '../shaders/crystalFragment.glsl'

export const createCrystalMaterial = (mousePosition = [0, 0]) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(...mousePosition) },
      uAccentColor: { value: new THREE.Color('#FFA89C') }, // Peach accent
      uSecondaryColor: { value: new THREE.Color('#C4A7E7') } // Lavender
    },
    vertexShader: crystalVertexShader,
    fragmentShader: crystalFragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
  })
}

export const updateCrystalUniforms = (material: THREE.ShaderMaterial, time: number, mousePosition: [number, number]) => {
  material.uniforms.uTime.value = time
  material.uniforms.uMouse.value.set(...mousePosition)
}
```

**Step 2: Commit**

```bash
git add materials/CrystalMaterial.ts
git commit -m "feat: update crystal material to use custom shaders"
```

### Task 10: Add Mouse Interaction Hook

**Files:**
- Create: `hooks/3d/useMouseTracking.ts`

**Step 1: Write mouse tracking hook**

```typescript
import { useState, useEffect } from 'react'

export const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState([0, 0])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1

      setMousePosition([x, y])
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return mousePosition
}
```

**Step 2: Commit**

```bash
git add hooks/3d/useMouseTracking.ts
git commit -m "feat: add mouse tracking hook for crystal interactions"
```

### Task 11: Update Crystal Component with Interactions

**Files:**
- Modify: `components/3d/CrystalCatEye.tsx`

**Step 1: Update component to use mouse tracking and custom material**

```typescript
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCrystalGeometry } from '@/hooks/3d/useCrystalGeometry'
import { useMouseTracking } from '@/hooks/3d/useMouseTracking'
import { createCrystalMaterial, updateCrystalUniforms } from '@/materials/CrystalMaterial'

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
```

**Step 2: Commit**

```bash
git add components/3d/CrystalCatEye.tsx
git commit -m "feat: enhance crystal component with mouse tracking and shader uniforms"
```

## Phase 3: Particle System

### Task 12: Create Particle Component

**Files:**
- Create: `components/3d/LightParticles.tsx`

**Step 1: Write particle system component**

```typescript
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleProps {
  count?: number
}

export const LightParticles = ({ count = 40 }: ParticleProps) => {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Generate random positions around crystal
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8

      // Mix of peach and lavender colors
      const colorChoice = Math.random()
      if (colorChoice < 0.5) {
        // Peach accent
        colors[i * 3] = 1.0     // R
        colors[i * 3 + 1] = 0.658 // G
        colors[i * 3 + 2] = 0.612 // B
      } else {
        // Lavender secondary
        colors[i * 3] = 0.769   // R
        colors[i * 3 + 1] = 0.655 // G
        colors[i * 3 + 2] = 0.906 // B
      }
    }

    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle particle drift
      pointsRef.current.rotation.y += 0.0005
      pointsRef.current.rotation.x += 0.0002

      // Subtle pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.05
      pointsRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
```

**Step 2: Commit**

```bash
git add components/3d/LightParticles.tsx
git commit -m "feat: create floating particle system with brand colors"
```

### Task 13: Add Particles to Crystal Scene

**Files:**
- Modify: `components/3d/CrystalScene.tsx`

**Step 1: Import and add particles to scene**

```typescript
// Add import:
import { LightParticles } from './LightParticles'

// Add to Canvas children, before Suspense:
<LightParticles count={40} />
```

**Step 2: Commit**

```bash
git add components/3d/CrystalScene.tsx
git commit -m "feat: add particle system to crystal scene"
```

## Phase 4: Performance and Polish

### Task 14: Add Performance Monitoring

**Files:**
- Modify: `components/3d/CrystalScene.tsx`

**Step 1: Add performance controls**

```typescript
// Update Canvas props:
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
  performance={{
    min: 0.3,  // Reduced for better performance
    max: 1,
    debounce: 200
  }}
  dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio
  shadows={false} // Disable shadows for performance
>
```

**Step 2: Commit**

```bash
git add components/3d/CrystalScene.tsx
git commit -m "feat: add performance optimization to crystal scene"
```

### Task 15: Add Responsive Scaling

**Files:**
- Modify: `components/3d/CrystalScene.tsx`

**Step 1: Add responsive container sizing**

```typescript
'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CrystalCatEye } from './CrystalCatEye'
import { LightParticles } from './LightParticles'
import { Loader } from '@react-three/drei'

export const CrystalScene = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: isMobile ? 50 : 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'high-performance'
        }}
        performance={{
          min: 0.3,
          max: 1,
          debounce: 200
        }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        shadows={false}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#FFA89C"
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.3}
          color="#C4A7E7"
        />

        <Suspense fallback={null}>
          <CrystalCatEye />
          {!isMobile && <LightParticles count={40} />}
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/3d/CrystalScene.tsx
git commit -m "feat: add responsive scaling and mobile optimization"
```

### Task 16: Add Reduced Motion Support

**Files:**
- Modify: `hooks/3d/useMouseTracking.ts`

**Step 1: Update hook to respect reduced motion preferences**

```typescript
import { useState, useEffect } from 'react'

export const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState([0, 0])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    motionQuery.addEventListener('change', handleMotionChange)

    const handleMouseMove = (event: MouseEvent) => {
      if (prefersReducedMotion) return // Skip if reduced motion

      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1

      setMousePosition([x, y])
    }

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [prefersReducedMotion])

  return { mousePosition, prefersReducedMotion }
}
```

**Step 2: Commit**

```bash
git add hooks/3d/useMouseTracking.ts
git commit -m "feat: add reduced motion support to mouse tracking"
```

### Task 17: Update Crystal Component for Accessibility

**Files:**
- Modify: `components/3d/CrystalCatEye.tsx`

**Step 1: Update component with reduced motion handling**

```typescript
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCrystalGeometry } from '@/hooks/3d/useCrystalGeometry'
import { useMouseTracking } from '@/hooks/3d/useMouseTracking'
import { createCrystalMaterial, updateCrystalUniforms } from '@/materials/CrystalMaterial'

export const CrystalCatEye = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useCrystalGeometry()
  const { mousePosition, prefersReducedMotion } = useMouseTracking()

  const material = useMemo(() => createCrystalMaterial(mousePosition), [mousePosition])

  useFrame((state) => {
    if (meshRef.current) {
      if (!prefersReducedMotion) {
        // Enhanced rotation
        meshRef.current.rotation.y += 0.002
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

        // Update shader uniforms
        updateCrystalUniforms(
          meshRef.current.material as THREE.ShaderMaterial,
          state.clock.elapsedTime,
          mousePosition
        )
      } else {
        // Minimal rotation for reduced motion
        meshRef.current.rotation.y = Math.PI * 0.25
        meshRef.current.rotation.x = 0
      }
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
```

**Step 2: Commit**

```bash
git add components/3d/CrystalCatEye.tsx
git commit -m "feat: update crystal component for reduced motion accessibility"
```

## Phase 5: Testing and Validation

### Task 18: Add Performance Testing

**Files:**
- Test: Manual testing in browser
- Tools: Chrome DevTools Performance tab

**Step 1: Performance testing checklist**

Run: `npm run dev` and test:
- [ ] Initial load time < 3 seconds
- [ ] 60fps on desktop Chrome
- [ ] 30fps+ on mobile devices
- [ ] Memory usage < 100MB
- [ ] No memory leaks on page navigation
- [ ] Responsive scaling works correctly

**Step 2: Cross-browser testing**

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome/Safari

**Step 3: Document results**

Expected: Performance metrics within acceptable ranges

### Task 19: Update CSS for Better Integration

**Files:**
- Modify: `app/globals.css`

**Step 1: Add crystal-specific CSS variables**

```css
:root {
  /* Add to existing variables */

  /* Crystal-specific theming */
  --crystal-accent: #FFA89C;
  --crystal-secondary: #C4A7E7;
  --crystal-base: #1a1a1a;
  --crystal-glow: rgba(255, 168, 156, 0.3);
}
```

**Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add crystal-specific CSS theming variables"
```

### Task 20: Clean Up Old Components

**Files:**
- Modify: `components/Hero3D.tsx` (mark for removal)
- Check: No other files import Hero3D

**Step 1: Verify no other imports**

Run: `grep -r "Hero3D" app/ components/ lib/ --exclude-dir=node_modules`
Expected: Only import in app/page.tsx (which we already replaced)

**Step 2: Remove old component**

Run: `rm components/Hero3D.tsx`

**Step 3: Commit**

```bash
git add components/Hero3D.tsx
git commit -m "feat: remove old Hero3D blob component"
```

### Task 21: Final Integration Test

**Files:**
- Test: Full homepage integration
- Verify: All interactions work properly

**Step 1: Complete functionality checklist**

Run: `npm run build` and verify:
- [ ] Build completes successfully
- [ ] Crystal renders on homepage
- [ ] Mouse tracking works
- [ ] Particles animate properly
- [ ] Responsive scaling works
- [ ] Reduced motion preference respected
- [ ] Performance remains excellent

**Step 2: Visual quality verification**

Check:
- [ ] Crystal material looks professional
- [ ] Lighting creates good depth
- [ ] Colors match brand palette
- [ ] Animations feel smooth and natural
- [ ] Integration with glass morphism works

**Step 3: Final commit if needed**

```bash
git add .
git commit -m "feat: complete Crystal Cat Eye implementation"
```

## Testing Strategy

### Performance Testing
- Use Chrome DevTools Performance tab
- Monitor memory usage in Timeline
- Test on various device capabilities
- Validate reduced motion compliance

### Cross-browser Testing
- Test WebGL support in each browser
- Verify Three.js compatibility
- Check fallback behaviors
- Validate responsive design

### Accessibility Testing
- Test with screen readers
- Verify reduced motion preferences
- Check keyboard navigation
- Validate color contrast

### Visual Regression Testing
- Compare with design specifications
- Verify brand consistency
- Test responsive breakpoints
- Validate animation quality

## Rollback Plan

If issues arise, rollback by:
1. Reverting app/page.tsx to use Hero3D
2. Restoring components/Hero3D.tsx from git
3. Removing new 3D components and dependencies
4. Reverting package.json changes

## Success Criteria

- [ ] Crystal renders with professional appearance
- [ ] Mouse tracking provides subtle, elegant interaction
- [ ] Performance maintains 60fps on desktop, 30fps+ on mobile
- [ ] Responsive design works across all viewport sizes
- [ ] Reduced motion preferences are respected
- [ ] Integration with existing design system is seamless
- [ ] Build process completes without errors
- [ ] Cross-browser compatibility confirmed

---

**This implementation plan creates a sophisticated, brand-aligned 3D crystal hero that enhances the BlackCatDesigns portfolio while maintaining excellent performance and accessibility standards.**