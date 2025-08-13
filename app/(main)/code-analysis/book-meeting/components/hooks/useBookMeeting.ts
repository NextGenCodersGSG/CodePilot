"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Status, type IMeeting } from "@/@types";
import { defaultValue } from "../constants";
import { getUserId } from "../../../utils/getUserId";
import { bookMeetingSchema } from "../schema/bookMeetingSchema";

export const useBookMeeting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id || "");
    };

    fetchUserId();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: defaultValue.title || "",
      developerId: defaultValue.developerId || "",
      description: defaultValue.description || "",
      duration: defaultValue.duration || 30,
      date: undefined as Date | undefined,
      time: ""
    },
    validationSchema: bookMeetingSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        // Calculate scheduledAt from date and time
        const [hourStr, minuteStr, period] = values.time.split(/:|\s/);
        const hour =
          Number.parseInt(hourStr) +
          (period === "PM" && Number.parseInt(hourStr) !== 12 ? 12 : 0);
        const minute = Number.parseInt(minuteStr);

        const scheduledAt = new Date(values.date as Date);
        scheduledAt.setHours(hour);
        scheduledAt.setMinutes(minute);

        const localDate = new Date(scheduledAt);

        // Convert to UTC Date (no timezone offset)
        const utcDate = new Date(
          Date.UTC(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            localDate.getHours(),
            localDate.getMinutes(),
            localDate.getSeconds()
          )
        );

        // Prepare meeting request
        const meetingRequest: IMeeting = {
          title: values.title,
          developerId: values.developerId,
          description: values.description,
          duration: values.duration,
          scheduledAt: utcDate,
          userId: userId,
          requestedAt: new Date(),
          status: Status.PENDING
        };

        const response = await fetch("/api/meetings/request-meeting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(meetingRequest)
        });

        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error);
          return;
        }
        toast.success("Meeting scheduled successfully!");
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  // Handle date and time changes to update formik values
  const handleDateChange = (date: Date | undefined) => {
    formik.setFieldValue("date", date);
  };

  const handleTimeChange = (time: string) => {
    formik.setFieldValue("time", time);
  };

  return {
    formik,
    isSubmitting,
    handleDateChange,
    handleTimeChange
  };
};
