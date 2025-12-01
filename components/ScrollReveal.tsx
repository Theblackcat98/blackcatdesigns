'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
}

export default function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
