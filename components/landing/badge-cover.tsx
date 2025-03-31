"use client"

import { motion } from "framer-motion"
import { Code, Zap } from 'lucide-react'

export default function BadgeCover() {
  return (
    <motion.div 
      className="absolute bottom-4 right-4 bg-gradient-to-r from-[#00406C] to-[#0077CC] px-4 py-2 rounded-full flex items-center shadow-lg z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3}}
      whileHover={{ scale: 1.05 }}
    >
      <Code className="h-4 w-4 text-[#F2F2F2] mr-2" />
      <span className="text-sm font-medium text-[#F2F2F2]">Powered by</span>
      <Zap className="h-4 w-4 text-[#F2F2F2] mx-1" />
      <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F2F2F2] to-[#00BFFF]">
        CodePilot
      </span>
    </motion.div>
  )
}