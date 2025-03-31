"use client"

import type React from "react"
import { motion} from "framer-motion"


export function DocsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex min-h-screen flex-col">
        {/* Main Content */}
        <main className="relative p-6 lg:gap-10 lg:py-8">
          <motion.div
            className="mx-auto w-full min-w-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>

    </div>
  )
}

