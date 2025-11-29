'use client'

import { useRef, useState, MouseEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface HoverImageLinkProps {
    href: string
    children: React.ReactNode
    imageSrc: string
    className?: string
}

export default function HoverImageLink({
    href,
    children,
    imageSrc,
    className = '',
}: HoverImageLinkProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
    }

    return (
        <>
            <Link
                href={href}
                className={`relative block ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
            >
                {children}
            </Link>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: mousePosition.x + 20,
                            y: mousePosition.y - 100,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
                        className="fixed z-50 pointer-events-none w-64 h-40 rounded-lg overflow-hidden border border-white/10 shadow-2xl"
                        style={{
                            top: 0,
                            left: 0,
                        }}
                    >
                        <img
                            src={imageSrc}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
