"use client";

import { useEffect, useState } from "react"
import { getUserId } from "../utils/getUserId"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, Loader2, LayoutGrid, LayoutList, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { MeetingsTable } from "@/components/scheduled-meetings/meetings-table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Meeting {
  id: string
  description: string
  duration: number
  scheduledAt: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED"
  title: string
}

const ScheduledMeetingsPage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")

  useEffect(() => {
    const fetchUserMeetings = async () => {
      try {
        setIsLoading(true)
        const userId = await getUserId()

        const response = await fetch(`/api/all-user-meetings?userId=${userId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch meetings")
        }

        const data = await response.json()
        console.log(data)

        setMeetings(data)
      } catch (err) {
        console.error("Error fetching meetings:", err)
        setError("Failed to load your scheduled meetings. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserMeetings()
  }, [])

  const handleCancelMeeting = async (meetingId: string) => {
    try {
      setCancellingId(meetingId)
      const response = await fetch(`/api/meetings/cancel-meeting`, {
        method: 'POST',
        body: JSON.stringify({ meetingId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to cancel meeting');
      }

      setMeetings(meetings.map((meeting) => (meeting.id === meetingId ? { ...meeting, status: "CANCELLED" } : meeting)))

    } catch (err) {
      console.error("Error cancelling meeting:", err)
    } finally {
      setCancellingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#00111C] text-[#F2F2F2]">
        <Loader2 className="h-12 w-12 animate-spin text-[#00406C] mb-4" />
        <p className="text-lg text-[#B3B3B3]">Loading your scheduled meetings...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#00111C] text-[#F2F2F2]">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg text-red-400">{error}</p>
        <Button
          variant="outline"
          className="mt-4 border-[#002945] text-[#F2F2F2] hover:bg-[#001A2C]"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (meetings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 bg-[#00111C] text-[#F2F2F2]">
        <h1 className="text-3xl font-bold mb-8">Scheduled Meetings</h1>
        <Card className="w-full bg-[#001523] border-[#002945]">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-16 w-16 text-[#00406C] mb-4" />
            <p className="text-xl font-medium mb-2 text-[#F2F2F2]">No meetings scheduled</p>
            <p className="text-[#B3B3B3]">You don't have any meetings scheduled at the moment.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#00111C] text-[#F2F2F2]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Scheduled Meetings</h1>

        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "cards" | "table")}
          className="bg-[#001A2C] rounded-lg p-1"
        >
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="cards"
              className={cn(
                "flex items-center gap-2 text-[#B3B3B3]",
                viewMode === "cards" ? "bg-[#00406C] text-[#F2F2F2]" : "hover:text-[#F2F2F2]",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Card View</span>
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className={cn(
                "flex items-center gap-2 text-[#B3B3B3]",
                viewMode === "table" ? "bg-[#00406C] text-[#F2F2F2]" : "hover:text-[#F2F2F2]",
              )}
            >
              <LayoutList className="h-4 w-4" />
              <span>Table View</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard
              key={`meeting-${meeting.id}`}
              meeting={meeting}
              onCancel={handleCancelMeeting}
              isCancelling={cancellingId === meeting.id}
            />
          ))}
        </div>
      ) : (
        <MeetingsTable meetings={meetings} onCancel={handleCancelMeeting} cancellingId={cancellingId} />
      )}
    </div>
  )
}

interface MeetingCardProps {
  meeting: Meeting
  onCancel: (id: string) => void
  isCancelling: boolean
}

const MeetingCard = ({ meeting, onCancel, isCancelling }: MeetingCardProps) => {
  const scheduledDate = new Date(meeting.scheduledAt)
  const isPast = scheduledDate < new Date()
  const isActive = meeting.status !== "CANCELLED" && meeting.status !== "REJECTED" && meeting.status !== "COMPLETED"

  const getStatusDetails = (status: Meeting["status"]) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Awaiting Confirmation",
          color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        }
      case "APPROVED":
        return {
          label: "Confirmed",
          color: "bg-green-500/20 text-green-400 border-green-500/30",
        }
      case "COMPLETED":
        return {
          label: "Completed",
          color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        }
      case "REJECTED":
        return {
          label: "Declined",
          color: "bg-red-500/20 text-red-400 border-red-500/30",
        }
      case "CANCELLED":
        return {
          label: "Cancelled",
          color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        }
      default:
        return {
          label: status,
          color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        }
    }
  }

  const statusDetails = getStatusDetails(meeting.status)

  return (
    <Card className="bg-[#001523] border-[#002945] overflow-hidden relative">
      {/* Status badge positioned at top right */}
      <Badge variant="outline" className={cn("absolute top-3 right-3 border z-10", statusDetails.color)}>
        {statusDetails.label}
      </Badge>

      <CardHeader className="pb-1 pt-3 px-4 border-b border-[#002945]">
        <CardTitle className="text-2xl text-[#F2F2F2]">{meeting.title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-3 pb-2 px-4">
        <div className="space-y-3">
          <p className="text-sm text-[#B3B3B3] line-clamp-2">{meeting.description}</p>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-sm text-[#F2F2F2]">
              <Calendar className="h-4 w-4 text-[#00406C]" />
              <span>{format(scheduledDate, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#F2F2F2]">
              <Clock className="h-4 w-4 text-[#00406C]" />
              <span>
                {format(scheduledDate, "h:mm a")} • {meeting.duration} minutes
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-3 px-4 border-t border-[#002945] bg-[#001A2C] flex justify-center">
        {isActive && !isPast ? (
          <Button
            variant="outline"
            className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
            onClick={() => onCancel(meeting.id)}
            disabled={isCancelling}
          >
            {isCancelling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Cancel Meeting"
            )}
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full opacity-50 border-[#002945] text-[#B3B3B3]">
            {isPast ? "Past Meeting" : meeting.status}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ScheduledMeetingsPage

