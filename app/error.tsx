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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your API
      // For example:
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
    <div className="min-h-screen bg-[#00111C] flex flex-col items-center justify-center p-4">
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

          <motion.h1 className="text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-4" variants={itemVariants}>
            Something Went Wrong
          </motion.h1>

          <motion.p className="text-xl text-[#B3B3B3] mb-4" variants={itemVariants}>
            We've encountered an unexpected error
          </motion.p>

          <motion.div
            className="inline-block bg-[#001523] border border-[#002945] rounded-md px-4 py-2 text-[#B3B3B3] mb-8"
            variants={errorCodeVariants}
          >
            <code className="text-sm font-mono">
              {error.digest ? `Error ID: ${error.digest}` : error.message || "Unknown error"}
            </code>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" variants={itemVariants}>
            <Button
              onClick={() => reset()}
              className="bg-[#001A2C] border border-[#002945] hover:bg-[#002945] text-[#F2F2F2] cursor-pointer"
              size="lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button asChild className="bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2] cursor-pointer" size="lg">
              <Link href="/" className="cursor-pointer" >
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="bg-[#001523] border border-[#002945] rounded-lg p-6 relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#00406C]/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#00406C]/10 blur-3xl"></div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold text-[#F2F2F2] mb-4">Report This Issue</h2>
                <p className="text-[#B3B3B3] mb-6">
                  Help us improve by sending details about this error to our development team.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#F2F2F2]">
                      Your Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback" className="text-[#F2F2F2]">
                      What happened?
                    </Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Please describe what you were doing when the error occurred..."
                      required
                      className="min-h-[120px] bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2] cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2 h-4 w-4 border-2 border-[#F2F2F2] border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Report
                      </>
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
                <h2 className="text-2xl font-bold text-[#F2F2F2] mb-4">Thank You!</h2>
                <p className="text-[#B3B3B3] mb-8">
                  Your report has been sent to our development team. We'll work on fixing this issue as soon as
                  possible.
                </p>
                <Button onClick={() => router.push("/")} className="bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2] cursor-pointer">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className="mt-12 flex items-center justify-center gap-2 text-[#B3B3B3]" variants={itemVariants}>
          <Code className="h-5 w-5 text-[#00406C]" />
          <span className="text-lg font-medium">CodePilot</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

