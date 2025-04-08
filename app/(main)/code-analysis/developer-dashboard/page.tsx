"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MeetingsTable } from "./components/meetings-table"
import { EmptyState } from "./components/empty-state"
import type { IMeeting } from "@/@types"
import { Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getUserId } from "../utils/getUserId"

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
        const userId = await getUserId()
        console.log("userId: ", userId)

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

        console.log(processedMeetings)
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
      className="container mx-auto py-8 px-4"
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
          <h1 className="text-3xl font-bold text-[#F2F2F2] flex items-center">
            <Calendar className="mr-2 h-8 w-8 text-[#00406C]" />
            Developer Meetings
          </h1>
          <p className="text-[#B3B3B3] mt-2">Manage and review all scheduled meetings with users</p>
        </motion.div>

        <div className="flex gap-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#001A2C] rounded-lg px-4 py-2 border border-[#002945]"
          >
            <p className="text-sm text-[#B3B3B3]">
              <span className="font-medium text-[#F2F2F2]">{meetings.length}</span> meetings assigned
            </p>
          </motion.div>
          <Button
            className="cursor-pointer"
            onClick={()=> {toast.info("Logging Out...", {duration: 1000})}}
          >
            Logout
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-[#00406C] animate-spin" />
          <span className="ml-2 text-[#B3B3B3]">Loading meetings...</span>
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
