"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion,Variants } from "framer-motion"
import { Code, Home, ArrowLeft, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const codeBlockVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
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

  return (
    <div className="min-h-screen bg-[#00111C] flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-3xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-center mb-8"
          variants={floatingVariants as Variants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 rounded-full bg-[#00406C]/20 blur-xl"
              variants={pulseVariants as Variants}
              initial="initial"
              animate="animate"
            ></motion.div>
            <FileQuestion className="h-24 w-24 text-[#00406C]" />
          </div>
        </motion.div>

        <motion.h1 className="text-4xl md:text-6xl font-bold text-[#F2F2F2] mb-4" variants={itemVariants}>
          404 - Page Not Found
        </motion.h1>

        <motion.p className="text-xl text-[#B3B3B3] mb-8" variants={itemVariants}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div className="mb-12 mx-auto max-w-lg text-center" variants={codeBlockVariants}>
          <div className="bg-[#001523] border border-[#002945] rounded-lg p-6 relative overflow-hidden">
            <h2 className="text-2xl text-[#F2F2F2] font-bold"> Not all those who wander are lost.  </h2>
            <p className="text-[#B3B3B3] mt-1">J.R.R. Tolkien</p>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#00406C]/10 blur-xl"></div>
          </div>
        </motion.div>


        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
          <Button
            onClick={() => router.back()}
            className="bg-[#001A2C] border border-[#002945] hover:bg-[#002945] text-[#F2F2F2]"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button asChild className="bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]" size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </motion.div>

        <motion.div className="mt-12 flex items-center justify-center gap-2 text-[#B3B3B3]" variants={itemVariants}>
          <Code className="h-5 w-5 text-[#00406C]" />
          <span className="text-lg font-medium">CodePilot</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

