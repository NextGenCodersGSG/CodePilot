"use client";

import type React from "react";
import { Form, FormikProvider } from "formik";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Users,
  ClockIcon,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { durationOptions, timeSlots } from "./constants";
import type { IDeveloper } from "./type";
import MotionTextField from "@/components/motion-text-field";

interface BookMeetingFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  isSubmitting: boolean;
  handleDateChange: (date: Date | undefined) => void;
  handleTimeChange: (time: string) => void;
  developers: IDeveloper[];
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: i * 0.1
    }
  })
};

export const BookMeetingForm: React.FC<BookMeetingFormProps> = ({
  formik,
  isSubmitting,
  handleDateChange,
  handleTimeChange,
  developers
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-card border border-accent rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"></div>
      <FormikProvider value={formik}>
        <Form
          onSubmit={formik.handleSubmit}
          className="space-y-6 relative z-10"
        >
          {/* Meeting Title */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <label htmlFor="title" className="text-foreground font-medium">
                Meeting Title
              </label>
            </div>
            <MotionTextField
              name="title"
              placeholder="e.g., Website Development Consultation"
              label=""
            />
          </motion.div>

          {/* Developer Selection */}
          <motion.div
            custom={2}
            variants={itemVariants}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <label className="text-foreground font-medium">
                Select a Developer
              </label>
            </div>
            <Select
              onValueChange={(value) =>
                formik.setFieldValue("developerId", value)
              }
              value={formik.values.developerId}
            >
              <SelectTrigger className="bg-muted border-accent text-foreground">
                <SelectValue placeholder="Choose a developer" />
              </SelectTrigger>
              <SelectContent className="bg-background border-accent text-foreground">
                {developers.map((developer) => (
                  <SelectItem key={developer.id} value={developer.id}>
                    {developer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.developerId && formik.errors.developerId && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.developerId}
              </p>
            )}
          </motion.div>

          {/* Date Selection */}
          <motion.div custom={3} variants={itemVariants} className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <label className="text-foreground font-medium">
                Select a Date
              </label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-muted border-accent text-foreground",
                    !formik.values.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formik.values.date ? (
                    format(formik.values.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-background border-accent">
                <Calendar
                  mode="single"
                  selected={formik.values.date}
                  onSelect={handleDateChange}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="bg-muted text-foreground"
                />
              </PopoverContent>
            </Popover>
            {formik.touched.date && formik.errors.date && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.date}</p>
            )}
          </motion.div>

          {/* Time Selection */}
          <motion.div custom={4} variants={itemVariants} className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <label className="text-foreground font-medium">
                Select a Time
              </label>
            </div>
            <Select onValueChange={handleTimeChange} value={formik.values.time}>
              <SelectTrigger className="bg-muted border-accent text-foreground">
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent className="bg-background border-accent text-foreground max-h-[300px]">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.time && formik.errors.time && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.time}</p>
            )}
          </motion.div>

          {/* Duration Selection */}
          <motion.div custom={5} variants={itemVariants} className="space-y-2">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-primary" />
              <label className="text-foreground font-medium">
                Meeting Duration
              </label>
            </div>
            <Select
              onValueChange={(value) =>
                formik.setFieldValue("duration", Number.parseInt(value))
              }
              value={formik.values.duration?.toString()}
            >
              <SelectTrigger className="bg-muted border-accent text-foreground">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-background border-accent text-foreground">
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.duration && formik.errors.duration && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.duration}
              </p>
            )}
          </motion.div>

          {/* Meeting Purpose */}
          <motion.div custom={6} variants={itemVariants} className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <label
                htmlFor="description"
                className="text-foreground font-medium"
              >
                What would you like to discuss?
              </label>
            </div>
            <Textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Briefly describe what you'd like to get out of this meeting..."
              className="bg-muted border-accent text-foreground min-h-[120px]"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.description}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div custom={7} variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-secondary text-foreground cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="mr-2 h-4 w-4 border-2 border-t-transparent rounded-full border-white"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    }}
                  />
                  <span className="text-white">Scheduling Meeting...</span>
                </>
              ) : (
                <span className="text-white">Schedule Consultation</span>
              )}
            </Button>
          </motion.div>
        </Form>
      </FormikProvider>
    </motion.div>
  );
};
