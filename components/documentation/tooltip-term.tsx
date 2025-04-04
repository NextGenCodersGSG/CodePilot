"use client"

import type { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TooltipTermProps {
  term: string
  definition: string
  children: ReactNode
}

export function TooltipTerm({ term, definition, children }: TooltipTermProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="border-b border-dotted border-primary cursor-help text-primary">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-sm p-4">
          <div>
            <h4 className="font-medium mb-1">{term}</h4>
            <p className="text-sm text-muted-foreground">{definition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}