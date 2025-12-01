'use client'

import { useEffect, useState } from 'react'

interface TextScrambleProps {
    text: string
    className?: string
    delay?: number
    duration?: number
}

const CHARS = '-_~`!@#$%^&*()+=[]{}|;:,.<>?'

export default function TextScramble({
    text,
    className = '',
    delay = 0,
    duration = 1000,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState('')
    const [isScrambling, setIsScrambling] = useState(false)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        let intervalId: NodeJS.Timeout

        const startScramble = () => {
            setIsScrambling(true)
            let startTime = Date.now()

            intervalId = setInterval(() => {
                const elapsedTime = Date.now() - startTime
                const progress = Math.min(elapsedTime / duration, 1)

                const scrambled = text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' '
                        if (index < text.length * progress) {
                            return char
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)]
                    })
                    .join('')

                setDisplayText(scrambled)

                if (progress >= 1) {
                    clearInterval(intervalId)
                    setIsScrambling(false)
                }
            }, 30)
        }

        timeoutId = setTimeout(startScramble, delay * 1000)

        return () => {
            clearTimeout(timeoutId)
            clearInterval(intervalId)
        }
    }, [text, delay, duration])

    return (
        <span className={className} aria-label={text}>
            {displayText || text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')}
        </span>
    )
}
