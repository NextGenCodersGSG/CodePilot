"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Code, RefreshCw, AlertTriangle, Send, CheckCircle, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo/Logo"
import LoadingSpinner from "@/components/spinner/LoadingSpinner"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const errorCodeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  }

  const pulseVariants = {
    initial: { opacity: 0.7, scale: 1 },
    animate: {
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  }

  const glitchVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        repeatDelay: 5,
      },
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          feedback,
          errorMessage: error.message,
          errorStack: error.stack,
          errorDigest: error.digest,
        }),
      })
        setIsSubmitted(true)
        setEmail("")
        setFeedback("")

      
    } catch (err) {
      console.error("Failed to submit error report:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div className="max-w-3xl w-full" variants={containerVariants} initial="hidden" animate="visible">
        <div className="text-center mb-8">
          <motion.div
            className="flex justify-center mb-6"
            variants={glitchVariants as Variants}
            initial="initial"
            animate="animate"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-full bg-red-500/20 blur-xl"
                variants={pulseVariants as Variants}
                initial="initial"
                animate="animate"
              ></motion.div>
              <AlertTriangle className="h-20 w-20 text-red-500" />
            </div>
          </motion.div>

          <motion.h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" variants={itemVariants}>
            Something Went Wrong
          </motion.h1>

          <motion.p className="text-xl text-muted-foreground mb-4" variants={itemVariants}>
            We've encountered an unexpected error
          </motion.p>

          <motion.div
            className="inline-block bg-card border border-accent rounded-md px-4 py-2 text-muted-foreground mb-8"
            variants={errorCodeVariants}
          >
            <code className="text-sm font-mono">
              {error.digest ? `Error ID: ${error.digest}` : error.message || "Unknown error"}
            </code>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" variants={itemVariants}>
            <Button
              onClick={() => reset()}
              className="bg-muted border border-accent hover:bg-background text-foreground cursor-pointer"
              size="lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button asChild className="bg-primary hover:bg-secondary text-white cursor-pointer" size="lg">
              <Link href="/" className="cursor-pointer" >
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="bg-card border border-accent rounded-lg p-6 relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"></div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold text-foreground mb-4">Report This Issue</h2>
                <p className="text-muted-foreground mb-6">
                  Help us improve by sending details about this error to our development team.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Your Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="bg-muted border-accent text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback" className="text-foreground">
                      What happened?
                    </Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Please describe what you were doing when the error occurred..."
                      required
                      className="min-h-[120px] bg-muted border-accent text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary/30"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary text-foreground cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div>
                          <LoadingSpinner className="h-4 w-4 text-white mr-3" />
                          <span className="text-white">Sending...</span>
                        </motion.div>
                      </>
                    ) : (
                      <span className="text-white flex gap-1">
                        <Send className="mr-2 h-4 w-4" />
                        Send Report
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="flex justify-center mb-6"
                >
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Thank You!</h2>
                <p className="text-muted-foreground mb-8">
                  Your report has been sent to our development team. We'll work on fixing this issue as soon as
                  possible.
                </p>
                <Button onClick={() => router.push("/")} className="bg-primary hover:bg-secondary text-white cursor-pointer">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Logo/>
      </motion.div>
    </div>
  )
}

