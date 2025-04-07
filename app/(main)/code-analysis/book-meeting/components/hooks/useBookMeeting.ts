"use client"

import { useState, useEffect } from "react"
import { useFormik } from "formik"
import { toast } from "sonner"
import { Status, type IMeeting } from "@/@types"
import { defaultValue } from "../constants"
import { getUserId } from "../../../utils/getUserId"
import { bookMeetingSchema } from "../schema/bookMeetingSchema"

export const useBookMeeting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id || "")
    }

    fetchUserId()
  }, [])

  const formik = useFormik({
    initialValues: {
      title: defaultValue.title || "",
      developerId: defaultValue.developerId || "",
      description: defaultValue.description || "",
      duration: defaultValue.duration || 30,
      date: undefined as Date | undefined,
      time: "",
    },
    validationSchema: bookMeetingSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true)

      try {
        // Calculate scheduledAt from date and time
        const [hourStr, minuteStr, period] = values.time.split(/:|\s/)
        const hour = Number.parseInt(hourStr) + (period === "PM" && Number.parseInt(hourStr) !== 12 ? 12 : 0)
        const minute = Number.parseInt(minuteStr)

        const scheduledAt = new Date(values.date as Date)
        scheduledAt.setHours(hour)
        scheduledAt.setMinutes(minute)

        // Prepare meeting request
        const meetingRequest: IMeeting = {
          title: values.title,
          developerId: values.developerId,
          description: values.description,
          duration: values.duration,
          scheduledAt,
          userId: userId,
          requestedAt: new Date(),
          status: Status.PENDING,
        }

        console.log("Submitting meeting request:", meetingRequest)

        const response = await fetch("/api/meetings/request-meeting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(meetingRequest),
        })

        if (response.ok) {
          toast.success("Meeting scheduled successfully!")
          formik.resetForm()
        } else {
          const errorData = await response.json()
          toast.error(errorData.message || "Failed to schedule meeting. Please try again later.")
        }
      } catch (error) {
        console.error("Error scheduling meeting:", error)
        toast.error("An unexpected error occurred. Please try again later.")
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  // Handle date and time changes to update formik values
  const handleDateChange = (date: Date | undefined) => {
    formik.setFieldValue("date", date)
  }

  const handleTimeChange = (time: string) => {
    formik.setFieldValue("time", time)
  }

  return {
    formik,
    isSubmitting,
    handleDateChange,
    handleTimeChange,
  }
}
