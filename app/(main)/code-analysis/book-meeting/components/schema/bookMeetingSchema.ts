import * as Yup from "yup"

export const bookMeetingSchema = Yup.object().shape({
  title: Yup.string()
    .required("Meeting title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),

  developerId: Yup.string().required("Please select a developer"),

  description: Yup.string()
    .required("Please describe what you would like to discuss")
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),

  duration: Yup.number()
    .required("Please select a meeting duration")
    .oneOf([15, 30, 45, 60], "Invalid duration selected"),

  date: Yup.date().required("Please select a date").min(new Date(), "Meeting date cannot be in the past"),

  time: Yup.string().required("Please select a time slot"),
})
