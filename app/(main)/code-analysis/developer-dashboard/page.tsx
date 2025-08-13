"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MeetingsTable } from "./components/meetings-table"
import { EmptyState } from "./components/empty-state"
import type { IMeeting } from "@/@types"
import { Loader2, Calendar } from "lucide-react"

interface MeetingsResponse {
  meetings: IMeeting[]
}

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDeveloperMeetings = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/meetings/all-meetings`)

        if (!response.ok) {
          throw new Error("Failed to fetch meetings")
        }

        const data: MeetingsResponse = await response.json()

        const processedMeetings = data.meetings.map((meeting) => ({
          ...meeting,
          scheduledAt: new Date(meeting.scheduledAt),
          requestedAt: meeting.requestedAt ? new Date(meeting.requestedAt) : undefined,
        }))

        setMeetings(processedMeetings)
      } catch (error) {
        console.error("Error fetching meetings:", error)
        setError("Failed to load meetings. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeveloperMeetings()
  }, [])

  return (
    <motion.div
      className="container mx-auto py-8 px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Calendar className="mr-2 h-8 w-8 text-primary" />
            Developer Meetings
          </h1>
          <p className="text-muted-foreground mt-2">Manage and review all scheduled meetings with users</p>
        </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-muted rounded-lg px-4 py-2 border border-accent"
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{meetings.length}</span> meetings assigned
            </p>
          </motion.div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2 text-muted-foreground">Loading meetings...</span>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md">{error}</div>
      ) : meetings.length === 0 ? (
        <EmptyState />
      ) : (
        <MeetingsTable meetings={meetings} />
      )}
    </motion.div>
  )
}

export default MeetingsPage
