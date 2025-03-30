"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CodeBlock } from "@/components/documentation/code-block"

interface ExpandableCodeProps {
  title: string
  description?: string
  code: string
  language: string
  filename?: string
  defaultExpanded?: boolean
}

export function ExpandableCode({
  title,
  description,
  code,
  language,
  filename,
  defaultExpanded = false,
}: ExpandableCodeProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="my-8 rounded-lg border shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between rounded-t-lg bg-accent/80 p-4 text-left font-medium transition-colors hover:bg-accent"
        aria-expanded={isExpanded}
      >
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {isExpanded ? 
          <ChevronUp className="h-5 w-5 text-muted-foreground transition-transform" /> : 
          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform" />
        }
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t">
              <CodeBlock 
                code={code} 
                language={language} 
                filename={filename} 
                className="m-0 rounded-none border-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}