'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Search, FileText, Briefcase, User, Mail, Home } from 'lucide-react'

export default function CommandMenu() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const runCommand = (command: () => void) => {
        setOpen(false)
        command()
    }

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
            <div className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center border-b border-white/10 px-4">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <Command.Input
                        placeholder="Type a command or search..."
                        className="w-full bg-transparent py-4 text-lg outline-none text-white placeholder:text-gray-500"
                    />
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto p-2">
                    <Command.Empty className="py-6 text-center text-gray-500">No results found.</Command.Empty>

                    <Command.Group heading="Navigation" className="text-xs font-medium text-gray-500 mb-2 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/'))}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/blog'))}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <FileText className="w-4 h-4" />
                            Blog
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/projects'))}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <Briefcase className="w-4 h-4" />
                            Projects
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/about'))}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <User className="w-4 h-4" />
                            About
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/contact'))}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <Mail className="w-4 h-4" />
                            Contact
                        </Command.Item>
                    </Command.Group>

                    <Command.Group heading="Social" className="text-xs font-medium text-gray-500 mt-4 mb-2 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => window.open('https://github.com/theblackcat98', '_blank'))}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <Home className="w-4 h-4" />
                            GitHub
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => window.open('https://instagram.com/theblackcat98', '_blank'))}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <Home className="w-4 h-4" />
                            Instagram
                        </Command.Item>
                    </Command.Group>
                </Command.List>
            </div>
        </Command.Dialog>
    )
}
