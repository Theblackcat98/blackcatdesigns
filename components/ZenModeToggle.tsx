'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ZenModeToggle() {
    const [isZen, setIsZen] = useState(false)

    useEffect(() => {
        const header = document.querySelector('header')
        const footer = document.querySelector('footer')
        const sidebar = document.querySelector('aside') // If we have one

        if (isZen) {
            header?.classList.add('hidden')
            footer?.classList.add('hidden')
            sidebar?.classList.add('hidden')
        } else {
            header?.classList.remove('hidden')
            footer?.classList.remove('hidden')
            sidebar?.classList.remove('hidden')
        }

        return () => {
            header?.classList.remove('hidden')
            footer?.classList.remove('hidden')
            sidebar?.classList.remove('hidden')
        }
    }, [isZen])

    return (
        <motion.button
            onClick={() => setIsZen(!isZen)}
            className="fixed bottom-8 right-8 z-[100] p-3 rounded-full bg-gray-900 border border-white/10 text-white shadow-lg hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isZen ? "Exit Zen Mode" : "Enter Zen Mode"}
        >
            {isZen ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </motion.button>
    )
}
