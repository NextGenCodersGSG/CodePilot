"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ToggleSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [resolvedTheme])

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark"
    setTheme(nextTheme)
    setIsDark(!isDark)
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full bg-muted p-1 transition-colors",
        isDark ? "justify-end" : "justify-start"
      )}
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full bg-background text-foreground shadow-md transition-all"
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" />
        ) : (
          <Sun className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  )
}
