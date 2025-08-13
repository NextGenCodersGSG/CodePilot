"use client"

import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, FileCode } from "lucide-react"
import { useState, useEffect } from "react"
import Logo from "@/components/logo/Logo"

export default function AlreadySignedIn() {
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
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  }

  const pulseVariants = {
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

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  const spinVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: ["linear"],
      },
    },
  }

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {isClient && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
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
        {/* Success Icon with Animations */}
        <motion.div className="relative mx-auto mb-8 flex justify-center">
          <motion.div
            className="absolute -inset-10 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl"
            variants={pulseVariants as Variants}
            initial="initial"
            animate="animate"
          />
          <motion.div className="relative" variants={floatVariants as Variants} initial="initial" animate="animate">
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-md"
              variants={spinVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <CheckCircle className="h-10 w-10 text-foreground" />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Already Signed In</h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-muted-foreground max-w-md mb-8">
            You are already signed in to your account. You don&apos;t need to sign in again.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-primary hover:bg-secondary text-white cursor-pointer w-full sm:w-auto"
              >
                <Link href="/code-analysis" className="flex items-center gap-2">
                  <FileCode className="h-4 w-4" />
                  Go to Code Analysis
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                asChild
                className="border-accent hover:bg-muted text-foreground hover:text-foreground cursor-pointer w-full sm:w-auto"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <Logo/>
      </motion.div>

      {/* Floating particles */}
      {isClient && (
        <AnimatePresence>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed h-2 w-2 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "primary" : "secondary",
                opacity: 0.3,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() > 0.5 ? -40 : 40],
                x: [0, Math.random() > 0.5 ? -30 : 30],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}

