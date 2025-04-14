"use client"

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
import { Status } from "@/@types"
import { motion, AnimatePresence } from "framer-motion"

interface Meeting {
  id: string
  description: string
  duration: number
  scheduledAt: string
  status: Status
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
        method: "POST",
        body: JSON.stringify({ meetingId }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to cancel meeting")
      }

      setMeetings(
        meetings.map((meeting) => (meeting.id === meetingId ? { ...meeting, status: Status.CANCELED } : meeting)),
      )
    } catch (err) {
      console.error("Error cancelling meeting:", err)
    } finally {
      setCancellingId(null)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  if (isLoading) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] bg-background text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading your scheduled meetings...</p>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] bg-background text-foreground"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg text-red-400">{error}</p>
        <Button
          variant="outline"
          className="mt-4 border-accent text-foreground hover:bg-muted"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </motion.div>
    )
  }

  if (meetings.length === 0) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8 bg-background text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Scheduled Meetings</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full bg-card border-accent">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Calendar className="h-16 w-16 text-primary mb-4" />
              </motion.div>
              <motion.p
                className="text-xl font-medium mb-2 text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                No meetings scheduled
              </motion.p>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                You don't have any meetings scheduled at the moment.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Scheduled Meetings</h1>

        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "cards" | "table")}
          className="bg-muted rounded-lg p-1"
        >
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="cards"
              className={cn(
                "flex items-center gap-2 text-muted-foreground cursor-pointer",
                viewMode === "cards" ? "bg-primary text-foreground" : "hover:text-foreground",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Card View</span>
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className={cn(
                "flex items-center gap-2 text-muted-foreground cursor-pointer",
                viewMode === "table" ? "bg-primary text-foreground" : "hover:text-foreground",
              )}
            >
              <LayoutList className="h-4 w-4" />
              <span>Table View</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === "cards" ? (
          <motion.div
            key="cards-view"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {meetings.map((meeting, index) => (
              <MeetingCard
                key={`meeting-${meeting.id}`}
                meeting={meeting}
                onCancel={handleCancelMeeting}
                isCancelling={cancellingId === meeting.id}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div key="table-view" variants={tableVariants} initial="hidden" animate="visible" exit="exit">
            <MeetingsTable meetings={meetings} onCancel={handleCancelMeeting} cancellingId={cancellingId} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface MeetingCardProps {
  meeting: Meeting
  onCancel: (id: string) => void
  isCancelling: boolean
  index: number
}

const MeetingCard = ({ meeting, onCancel, isCancelling, index }: MeetingCardProps) => {
  const scheduledDate = new Date(meeting.scheduledAt)
  const isPast = scheduledDate < new Date()
  const isActive =
    meeting.status !== Status.CANCELED && meeting.status !== Status.REJECTED && meeting.status !== Status.APPROVED

  const getStatusDetails = (status: Meeting["status"]) => {
    switch (status) {
      case Status.PENDING:
        return {
          label: "Awaiting Confirmation",
          color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        }
      case Status.APPROVED:
        return {
          label: "Confirmed",
          color: "bg-green-500/20 text-green-400 border-green-500/30",
        }

      case Status.REJECTED:
        return {
          label: "Declined",
          color: "bg-red-500/20 text-red-400 border-red-500/30",
        }
      case Status.CANCELED:
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

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 64, 108, 0.1), 0 4px 6px -2px rgba(0, 64, 108, 0.05)",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div variants={cardVariants} whileHover="hover" layout>
      <Card className="bg-card border-accent overflow-hidden relative h-full">
        {/* Status badge positioned at top right */}
        <Badge variant="outline" className={cn("absolute top-2 right-2 border z-10", statusDetails.color)}>
          {statusDetails.label}
        </Badge>
        <CardHeader className="pb-1 pt-3 px-4 border-b border-accent">
          <CardTitle className="text-2xl text-foreground">{meeting.title}</CardTitle>
        </CardHeader>

        <CardContent className="pt-3 pb-2 px-4">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">{meeting.description}</p>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{format(scheduledDate, "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>
                  {format(scheduledDate, "h:mm a")} • {meeting.duration} minutes
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 pb-3 px-4 border-t border-accent bg-muted flex justify-center mt-auto">
          {isActive && !isPast ? (
            <Button
              variant="outline"
              className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
              onClick={() => onCancel(meeting.id)}
              disabled={meeting.status === Status.CANCELED || isCancelling}
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
            <Button variant="outline" disabled className="w-full opacity-50 border-accent text-muted-foreground">
              {isPast ? "Past Meeting" : meeting.status}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ScheduledMeetingsPage
