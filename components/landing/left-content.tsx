"use client"

import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"

export default function LeftContent() {
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
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.4,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 64, 108, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 5px 15px -5px rgba(0, 64, 108, 0.3)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="absolute top-1/2 left-10 max-w-[420px] -translate-y-1/2 z-10"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-lighted bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Hi there, I&apos;m Code Pilot
      </motion.h2>

      <motion.p className="text-[#E0E0E0] mb-6 text-lg" variants={itemVariants}>
      I&apos;m your intelligent coding companion, here to make your development journey smoother and smarter.
      With real-time analysis, I guide you through writing cleaner, faster, and bug-free code.
      Whether you're just starting or deep into production, I&apos;ve got your back—every line of the way.
      </motion.p>

      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="w-fit">
        <Link
          href="/code-analysis"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-lighted text-foreground rounded-md font-medium transition-all duration-300 shadow-lg shadow-primary/30 group"
        >
          Start Chatting
          <motion.span
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-flex ml-2 group-hover:translate-x-2 transition-transform duration-300"
          >
            <ArrowRight className="h-5 w-5" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  )
}
