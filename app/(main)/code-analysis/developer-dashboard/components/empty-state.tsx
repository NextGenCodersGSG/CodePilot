"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="rounded-full bg-[#001A2C] p-4 mb-4">
        <Calendar className="h-8 w-8 text-[#00406C]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No meetings found</h3>
      <p className="text-muted-foreground max-w-md">
        There are no meetings assigned to you at the moment. Check back later or refresh the page.
      </p>
    </motion.div>
  )
}
