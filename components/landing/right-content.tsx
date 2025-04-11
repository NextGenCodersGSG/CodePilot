"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    title: "Smart Suggestions",
    description: "I learn from best practices and offer real-time code improvements, helping you write cleaner, more efficient code.",
    delay: 0.2,
  },
  {
    title: "Error Detection",
    description: "I scan your code on the fly and highlight issues before they become real problems—no more surprise bugs in production.",
    delay: 0.4,
  },
  {
    title: "Performance Insights",
    description: "I help you squeeze out more performance from your code, optimizing for speed, memory usage, and overall efficiency.",
    delay: 0.6,
  },
]

export default function RightContent() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px",
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,

      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i : number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: i * 0.1,
      },
    }),
  }

  return (
    <motion.div
      ref={ref}
      className="absolute top-1/2 right-10 max-w-[380px] -translate-y-1/2 text-right z-10"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="mb-8 bg-[#001A2C]/50 p-4 rounded-lg border-r-4 border-[#00BFFF] backdrop-blur-sm hover:bg-[#001A2C] transition-all duration-300 hover:shadow-lg hover:shadow-[#00BFFF]/20"
          variants={itemVariants}
          custom={index}
          whileHover={{

            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
        >
          <h3 className="text-xl font-semibold text-[#00BFFF] mb-2">{feature.title}</h3>
          <p className="text-[#E0E0E0] text-sm">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
