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