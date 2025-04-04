"use client"

import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/sonner"

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({ code, language, filename, showLineNumbers = true, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast("Copied to clipboard", {
      description: "The code has been copied to your clipboard.",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000)
  }

  // Split code into lines for rendering
  const codeLines = code.split("\n")

  return (
    <motion.div
      className={cn("relative my-6 overflow-hidden rounded-lg border bg-[var(--code-background)]", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {filename && (
        <div className="flex items-center justify-between border-b px-4 py-2 text-sm text-muted-foreground">
          <span className="font-medium">{filename}</span>
          <span className="text-xs uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className={cn("p-4 overflow-x-auto font-mono text-sm", showLineNumbers && "pl-12")}>
          <code className={`language-${language}`}>
            {codeLines.map((line, index) => (
              <div key={index} className="leading-relaxed">
                {line || "\u00A0"}
              </div>
            ))}
          </code>
        </pre>
        {showLineNumbers && (
          <div className="absolute left-0 top-0 h-full w-10 border-r bg-[var(--code-background)] flex flex-col py-4">
            {codeLines.map((_, i) => (
              <div key={i} className="px-2 text-xs text-muted-foreground text-right leading-relaxed">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={copyToClipboard}
          className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </motion.div>
  )
}