"use client"

import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShieldAlert, Home, LogIn, Code, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import Logo from "@/components/logo/Logo"

export default function Unauthorized() {
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

  const shieldVariants : Variants = {
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

  const warningVariants : Variants= {
    initial: { opacity: 0.7, scale: 1 },
    animate: {
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.03, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  // For client-side only animations
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background animated elements */}
      {isClient && (
        <>
          <motion.div
            className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-red-500/5 blur-3xl"
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
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
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
        {/* Warning Icon with Animations */}
        <motion.div className="relative mx-auto mb-8 flex justify-center">
          <motion.div
            className="absolute -inset-10 rounded-full bg-gradient-to-r from-red-500/20 to-primary/20 blur-xl"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div className="relative" variants={shieldVariants} initial="initial" animate="animate">
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500/30 to-primary/30 opacity-20 blur-md"
              variants={warningVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <ShieldAlert className="h-10 w-10 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Unauthorized Access</h1>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-muted-foreground max-w-md mb-8">
            You don't have permission to access this page. Please contact your administrator if you believe this is an
            error.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div variants={itemVariants}>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            asChild
                            className="border-accent hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer w-full sm:w-auto"
                          >
                            <Link href="/" className="flex items-center gap-2">
                              <Home className="h-4 w-4" />
                              Go Home
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
            
          </div>
        </motion.div>

        <Logo/>
      </motion.div>

      {/* Animated warning lines */}
      {isClient && (
        <AnimatePresence>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed h-px w-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${i % 2 === 0 ? "rgba(239, 68, 68, 0.2)" : "rgba(0, 64, 108, 0.2)"} 50%, transparent 100%)`,
                top: `${20 + i * 15}%`,
                opacity: 0.3,
              }}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Floating warning symbols */}
      {isClient && (
        <AnimatePresence>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`symbol-${i}`}
              className="fixed text-xs font-mono opacity-20"
              style={{
                color: i % 2 === 0 ? "#ef4444" : "primary",
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
              {i % 3 === 0 ? "⚠️" : i % 3 === 1 ? "⛔" : "🔒"}
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}

