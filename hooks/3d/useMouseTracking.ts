import { useState, useEffect } from 'react'

export const useMouseTracking = (): [number, number] => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0])

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