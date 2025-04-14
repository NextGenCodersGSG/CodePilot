"use client"

import { motion } from "framer-motion"
import { Code, Zap } from 'lucide-react'

export default function BadgeCover() {
  return (
    <motion.div 
      className="absolute bottom-4 right-4 bg-gradient-to-r from-primary to-lighted px-4 py-3 rounded-full flex items-center shadow-lg z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3}}
      whileHover={{ scale: 1.05 }}
    >
      <Code className="h-4 w-4 text-foreground mr-2" />
      <span className="text-sm font-medium text-foreground">Powered by</span>
      <Zap className="h-4 w-4 text-foreground mx-1" />
      <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-[#00BFFF]">
        CodePilot
      </span>
    </motion.div>
  )
}