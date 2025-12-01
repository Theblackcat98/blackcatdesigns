'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
    duration?: number
}

export default function TextReveal({
    text,
    className = '',
    delay = 0,
    duration = 0.5
}: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

    const characters = Array.from(text)

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                damping: 12,
                stiffness: 100,
                duration: duration
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                damping: 12,
                stiffness: 100,
                duration: duration
            },
        },
    }

    return (
        <motion.span
            ref={ref}
            style={{ display: 'inline-block', overflow: 'hidden' }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {characters.map((char, index) => (
                <motion.span variants={child} key={index} style={{ display: 'inline-block' }}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    )
}
