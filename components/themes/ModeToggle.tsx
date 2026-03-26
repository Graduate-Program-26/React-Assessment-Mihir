"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

const themes = ["light", "dark", "system"] as const
type Theme = typeof themes[number]

const themeConfig: Record<Theme, { label: string; icon: React.ReactNode }> = {
    light: { label: "Light", icon: <Sun className="w-4 h-4 shrink-0" /> },
    dark: { label: "Dark", icon: <Moon className="w-4 h-4 shrink-0" /> },
    system: { label: "System", icon: <Monitor className="w-4 h-4 shrink-0" /> },
}

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md">
                <Monitor className="w-4 h-4 shrink-0" />
                <span>Theme</span>
            </button>
        )
    }

    const current = (theme as Theme) ?? "system"
    const next = themes[(themes.indexOf(current) + 1) % themes.length]
    const { label, icon } = themeConfig[current]

    return (
        <button
            onClick={() => setTheme(next)}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}