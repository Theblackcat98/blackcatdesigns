'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeInProps {
    children: React.ReactNode
    delay?: number
    className?: string
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    fullWidth?: boolean
}

export default function FadeIn({
    children,
    delay = 0,
    className = '',
    direction = 'up',
    fullWidth = false
}: FadeInProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        none: { x: 0, y: 0 }
    }

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                x: directionOffset[direction].x,
                y: directionOffset[direction].y
            }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
            style={{ width: fullWidth ? '100%' : 'auto' }}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
