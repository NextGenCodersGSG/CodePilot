import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  interface LogoProps {
    width?: number,
    height?: number,
    className?: string,
    textDirection?: "Row" | "Column",
  }

const Logo = ({width = 0, height = 0, className= "", textDirection = "Column"} : LogoProps) => {
  return (
    <motion.div variants={itemVariants} className={` flex ${textDirection == "Column"? "flex-col": "flex-row"} items-center justify-center text-[#B3B3B3] ${className}`}>
        <Image src="/CodePilotLogo.png" alt="CodePilot Logo" width={width || 100} height={height || 100} />
        <span className={`${textDirection === "Column"? "-mt-5 mb-5": "mt-0"} font-semibold text-xl bg-gradient-to-r from-blue-600 to-[#B3B3B3] bg-clip-text text-transparent animate-pulse`}>CodePilot</span>
    </motion.div>
  )
}

export default Logo
