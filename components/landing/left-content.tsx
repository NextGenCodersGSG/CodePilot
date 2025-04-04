"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'

export default function LeftContent() {
  return (
    <div className='absolute top-1/2 left-10 max-w-[420px] -translate-y-1/2 z-10'>
      <motion.h2 
        className='text-3xl font-bold mb-4 bg-gradient-to-r from-[#F2F2F2] to-[#00BFFF] bg-clip-text text-transparent'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        AI-Powered Code Analysis
      </motion.h2>
      
      <motion.p 
        className='text-[#E0E0E0] mb-6 text-lg'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7}}
      >
        Our advanced AI system analyzes your code in real-time, detecting errors, suggesting optimizations, 
        and helping you write better code faster than ever before.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          href="/features" 
          className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00406C] to-[#0077CC] text-[#F2F2F2] rounded-md font-medium transition-colors shadow-lg shadow-[#00406C]/30'
        >
          Learn More
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  )
}