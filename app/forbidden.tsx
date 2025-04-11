"use client"

import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock, LayoutDashboard, Home, Code, X, LogIn } from "lucide-react"
import { useState, useEffect } from "react"
import Logo from "@/components/logo/Logo"

export default function Forbidden() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  const pulseVariants : Variants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  const lockVariants : Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  const lockShakeVariants : Variants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -3, 0, 3, 0],
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        repeatDelay: 5,
      },
    },
  }

  // For client-side only animations
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#00111C] p-4 relative overflow-hidden">
      {/* Background animated elements */}
      {isClient && (
        <>
          <motion.div
            className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#003A61]/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </>
      )}

      <motion.div
        className="relative z-10 w-full max-w-md text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Lock Icon with Animations */}
        <motion.div className="relative mx-auto mb-8 flex justify-center">
          <motion.div
            className="absolute -inset-10 rounded-full bg-gradient-to-r from-amber-500/20 to-[#00406C]/20 blur-xl"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div className="relative" variants={lockVariants} initial="initial" animate="animate">
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500/30 to-[#00406C]/30 opacity-20 blur-md"
              variants={lockShakeVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#00406C]">
              <Lock className="h-10 w-10 text-[#F2F2F2]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <X className="h-5 w-5 text-amber-400" />
            <h1 className="text-4xl font-bold tracking-tight text-[#F2F2F2]">Access Forbidden</h1>
          </div>
        </motion.div>

        {/* <motion.div variants={itemVariants}>
          <p className="text-[#B3B3B3] max-w-md mb-8">
            You don't have sufficient permissions to access this resource. Please contact your administrator for access.
          </p>
        </motion.div> */}
<motion.div variants={itemVariants}>
  <p className="text-[#B3B3B3] max-w-md mb-8">
    You must be logged in to access this resource. Please sign in to continue.
  </p>
</motion.div>

        {/* <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                asChild
                className="border-[#002945] hover:bg-[#001A2C] text-[#B3B3B3] hover:text-[#F2F2F2] cursor-pointer w-full sm:w-auto"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2] cursor-pointer w-full sm:w-auto"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </motion.div> 
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                asChild
                className="border-[#002945] hover:bg-[#001A2C] text-[#B3B3B3] hover:text-[#F2F2F2] cursor-pointer w-full sm:w-auto"
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            </motion.div> 
            </div>
        <Logo/>
      </motion.div>

      {/* Animated fence/barrier lines */}
      {isClient && (
        <AnimatePresence>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed h-px"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${i % 2 === 0 ? "rgba(245, 158, 11, 0.2)" : "rgba(0, 64, 108, 0.2)"} 50%, transparent 100%)`,
                top: `${15 + i * 10}%`,
                width: "100%",
                opacity: 0.3,
                rotate: i % 2 === 0 ? "5deg" : "-5deg",
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Floating lock symbols */}
      {isClient && (
        <AnimatePresence>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`symbol-${i}`}
              className="fixed text-xs font-mono opacity-20"
              style={{
                color: i % 2 === 0 ? "#f59e0b" : "#00406C",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, Math.random() > 0.5 ? -50 : 50],
                x: [0, Math.random() > 0.5 ? -50 : 50],
                opacity: [0, 0.2, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: Math.random() * 2,
              }}
            >
              {i % 3 === 0 ? "🔒" : i % 3 === 1 ? "🚫" : "⛔"}
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}

