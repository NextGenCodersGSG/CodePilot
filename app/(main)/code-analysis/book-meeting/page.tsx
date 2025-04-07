"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, Users, Video, CalendarPlus2Icon as CalendarIcon2, ClockIcon, MessageSquare, CheckCircle2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { getUserId } from "../utils/getUserId"
import { toast } from "sonner"
import { defaultValue, durationOptions, timeSlots } from "./components/constants"
import { IMeeting } from "@/@types"
import { IDeveloper } from "./components/type"

const BookMeetingPage = () => {
  const [developers, setDevelopers] = useState<IDeveloper[]>([])
  const [meetingData, setMeetingData] = useState<Partial<IMeeting>>(defaultValue);
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch("/api/all-developers");
        const data = await response.json();

        const filteredDevelopers = data.map((dev: any) => ({
          name: dev.name,
          id: dev._id,
        }));
        setDevelopers(filteredDevelopers);
        setUserId(await getUserId() || "");
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

  useEffect(() => {
    if (date && time) {
      const [hourStr, minuteStr, period] = time.split(/:|\s/);
      const hour = parseInt(hourStr) + (period === "PM" && parseInt(hourStr) !== 12 ? 12 : 0);
      const minute = parseInt(minuteStr);
      
      const scheduledAt = new Date(date);
      scheduledAt.setHours(hour);
      scheduledAt.setMinutes(minute);
      
      setMeetingData(prev => ({
        ...prev,
        scheduledAt
      }));
    }
  }, [date, time]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeetingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setMeetingData(prev => ({
      ...prev,
      [name]: name === "duration" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const meetingRequest: IMeeting = {
      ...meetingData as IMeeting,
      userId: userId,
      requestedAt: new Date()
    };

    setIsSubmitting(true);
    console.log(meetingRequest);
    
    const response = await fetch("/api/meetings/request-meeting", {
      body: JSON.stringify(meetingRequest),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

  if(response.ok){
    toast.success("Meeting scheduled successfully!");
    setMeetingData(defaultValue);
  }
  else
    toast.error("Failed to schedule meeting. Please try again later.");
  setIsSubmitting(false);
  }

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
    <div className="min-h-screen bg-[#00111C] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#00406C]/10 blur-3xl"
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
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#00406C]/10 blur-3xl"
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
      <motion.div className="absolute top-1/4 right-1/4 text-[#00406C]/20" variants={floatingBubbles} animate="animate">
        <Video size={80} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 text-[#00406C]/20"
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
              className="text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Book a Developer Consultation
            </motion.h1>
            <motion.p
              className="text-xl text-[#B3B3B3] max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Schedule a Zoom meeting with one of our expert developers to discuss your project needs and get
              personalized guidance.
            </motion.p>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            variants={itemVariants}
            className="bg-[#001523] border border-[#002945] rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#00406C]/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#00406C]/10 blur-3xl"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Meeting Title */}
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#00406C]" />
                  <label htmlFor="title" className="text-[#F2F2F2] font-medium">Meeting Title</label>
                </div>
                <Input
                  id="title"
                  name="title"
                  value={meetingData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Website Development Consultation"
                  className="bg-[#001A2C] border-[#002945] text-[#F2F2F2]"
                  required
                />
              </motion.div>

              {/* Developer Selection */}
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#00406C]" />
                  <label className="text-[#F2F2F2] font-medium">Select a Developer</label>
                </div>
                <Select 
                  onValueChange={(value) => handleSelectChange("developerId", value)} 
                  value={meetingData.developerId}
                  required
                >
                  <SelectTrigger className="bg-[#001A2C] border-[#002945] text-[#F2F2F2]">
                    <SelectValue placeholder="Choose a developer" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#001A2C] border-[#002945] text-[#F2F2F2]">
                    {developers.map((developer) => (
                      <SelectItem key={developer.id} value={developer.id}>
                        {developer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Date Selection */}
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-[#00406C]" />
                  <label className="text-[#F2F2F2] font-medium">Select a Date</label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-[#001A2C] border-[#002945] text-[#F2F2F2]",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#001A2C] border-[#002945]">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="bg-[#001A2C] text-[#F2F2F2]"
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>

              {/* Time Selection */}
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#00406C]" />
                  <label className="text-[#F2F2F2] font-medium">Select a Time</label>
                </div>
                <Select onValueChange={setTime} value={time} required>
                  <SelectTrigger className="bg-[#001A2C] border-[#002945] text-[#F2F2F2]">
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] max-h-[300px]">
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Duration Selection */}
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-[#00406C]" />
                  <label className="text-[#F2F2F2] font-medium">Meeting Duration</label>
                </div>
                <Select 
                  onValueChange={(value) => handleSelectChange("duration", value)} 
                  value={meetingData.duration?.toString()}
                  required
                >
                  <SelectTrigger className="bg-[#001A2C] border-[#002945] text-[#F2F2F2]">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#001A2C] border-[#002945] text-[#F2F2F2]">
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Meeting Purpose */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="description" className="text-[#F2F2F2] font-medium">What would you like to discuss?</label>
                <Textarea
                  id="description"
                  name="description"
                  value={meetingData.description}
                  onChange={handleInputChange}
                  placeholder="Briefly describe what you'd like to get out of this meeting..."
                  className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] min-h-[120px]"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2] cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="mr-2 h-4 w-4 border-2 border-[#F2F2F2] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      Scheduling Meeting...
                    </>
                  ) : (
                    "Schedule Consultation"
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Meeting Process Steps */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-[#001523] border border-[#002945] rounded-lg p-5 relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#00406C]/5 blur-xl"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#00406C]/20 p-2 rounded-full">
                  <CalendarIcon className="h-5 w-5 text-[#00406C]" />
                </div>
                <h3 className="font-medium text-[#F2F2F2]">1. Schedule</h3>
              </div>
              <p className="text-sm text-[#B3B3B3]">
                Book a time that works for you with your preferred developer.
              </p>
            </motion.div>

            <motion.div 
              className="bg-[#001523] border border-[#002945] rounded-lg p-5 relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#00406C]/5 blur-xl"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#00406C]/20 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-[#00406C]" />
                </div>
                <h3 className="font-medium text-[#F2F2F2]">2. Confirm</h3>
              </div>
              <p className="text-sm text-[#B3B3B3]">
                Receive confirmation and a Zoom link via email once approved.
              </p>
            </motion.div>

            <motion.div 
              className="bg-[#001523] border border-[#002945] rounded-lg p-5 relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#00406C]/5 blur-xl"></div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#00406C]/20 p-2 rounded-full">
                  <Video className="h-5 w-5 text-[#00406C]" />
                </div>
                <h3 className="font-medium text-[#F2F2F2]">3. Connect</h3>
              </div>
              <p className="text-sm text-[#B3B3B3]">
                Join the Zoom meeting at the scheduled time to discuss your project.
              </p>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="text-center text-[#B3B3B3] text-sm">
            <p>All meetings are conducted via Zoom and require approval from the selected developer.</p>
            <p>You'll receive a confirmation email with the Zoom link once your request is approved.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default BookMeetingPage;

