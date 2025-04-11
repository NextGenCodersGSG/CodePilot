"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "Smart Suggestions",
    description: "Receive intelligent code recommendations based on industry best practices",
    delay: 0.3
  },
  {
    title: "Error Detection",
    description: "Identify bugs and issues before they make it to production",
    delay: 0.5
  },
  {
    title: "Performance Insights",
    description: "Optimize your code for better speed and efficiency",
    delay: 0.7
  }
]

export default function RightContent() {
  return (
    <div className='absolute top-1/2 right-10 max-w-[380px] -translate-y-1/2 text-right z-10'>
      {features.map((feature, index) => (
        <motion.div 
          key={index} 
          className='mb-8 bg-[#001A2C]/80 p-4 rounded-lg border-r-4 border-[#00BFFF] backdrop-blur-sm'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: feature.delay }}
        >
          <h3 className='text-xl font-semibold text-[#00BFFF] mb-2'>{feature.title}</h3>
          <p className='text-[#E0E0E0] text-sm'>{feature.description}</p>
        </motion.div>
      ))}
    </div>
  )
}