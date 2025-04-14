"use client"

import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { CheckCircle2, Video, CalendarPlus2Icon as CalendarIcon2, CalendarIcon } from "lucide-react"
import type { IDeveloper } from "./components/type"
import { BookMeetingForm } from "./components/BookMeetingForm"
import { useBookMeeting } from "./components/hooks/useBookMeeting"

const BookMeetingPage = () => {
  const [developers, setDevelopers] = useState<IDeveloper[]>([])
  const { formik, isSubmitting, handleDateChange, handleTimeChange } = useBookMeeting();

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch("/api/all-developers")
        const data = await response.json()

        const filteredDevelopers = data.map((dev: any) => ({
          name: dev.name,
          id: dev._id,
        }))
        setDevelopers(filteredDevelopers)
      } catch (error) {
        console.error("Error fetching developers:", error)
        // Fallback data in case the API fails
        setDevelopers([
          { name: "Lara Samara", id: "67effcbd81b2cf563470c432" },
          { name: "Alex Johnson", id: "67f0169468793d80b5b4847d" },
          { name: "Michael Chen", id: "67f0172368793d80b5b4848" },
        ])
      }
    }

    fetchDevelopers()
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const floatingBubbles: Variants = {
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

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
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
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* Floating icons */}
      <motion.div className="absolute top-1/4 right-1/4 text-primary/20" variants={floatingBubbles} animate="animate">
        <Video size={80} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 text-primary/20"
        variants={floatingBubbles}
        animate="animate"
        transition={{ delay: 1 }}
      >
        <CalendarIcon2 size={60} />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Book a Developer Consultation
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Schedule a Zoom meeting with one of our expert developers to discuss your project needs and get
              personalized guidance.
            </motion.p>
          </motion.div>

          {/* Booking Form */}
          <BookMeetingForm
            formik={formik}
            isSubmitting={isSubmitting}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            developers={developers}
          />

          {/* Meeting Process Steps */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-card border border-accent rounded-lg p-5 relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/5 blur-xl"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">1. Schedule</h3>
              </div>
              <p className="text-sm text-muted-foreground">Book a time that works for you with your preferred developer.</p>
            </motion.div>

            <motion.div
              className="bg-card border border-accent rounded-lg p-5 relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/5 blur-xl"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">2. Confirm</h3>
              </div>
              <p className="text-sm text-muted-foreground">Receive confirmation and a Zoom link via email once approved.</p>
            </motion.div>

            <motion.div
              className="bg-card border border-accent rounded-lg p-5 relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/5 blur-xl"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">3. Connect</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Join the Zoom meeting at the scheduled time to discuss your project.
              </p>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="text-center text-muted-foreground text-sm">
            <p>All meetings are conducted via Zoom and require approval from the selected developer.</p>
            <p>You'll receive a confirmation email with the Zoom link once your request is approved.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default BookMeetingPage
