"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
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

interface MeetingsTableProps {
  meetings: Meeting[]
  onCancel: (id: string) => void
  cancellingId: string | null
}

export function MeetingsTable({ meetings, onCancel, cancellingId }: MeetingsTableProps) {
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

  // Animation variants
  const tableContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      backgroundColor: "rgba(0, 26, 44, 0.5)",
      transition: {
        duration: 0.2,
      },
    },
  }

  // Mobile card variants
  const mobileCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <>
      {/* Desktop Table View (hidden on small screens) */}
      <motion.div
        className="hidden md:block overflow-x-auto rounded-lg border border-[#002945]"
        variants={tableContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="w-full">
          <thead className="bg-[#001A2C] border-b border-[#002945]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#B3B3B3]">Meeting</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#B3B3B3]">Date & Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#B3B3B3]">Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#B3B3B3]">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-[#B3B3B3]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#001523] divide-y divide-[#002945]">
            <AnimatePresence>
              {meetings.map((meeting, index) => {
                const scheduledDate = new Date(meeting.scheduledAt)
                const isPast = scheduledDate < new Date()
                const isActive =
                  meeting.status !== Status.CANCELED &&
                  meeting.status !== Status.REJECTED &&
                  meeting.status !== Status.APPROVED
                const statusDetails = getStatusDetails(meeting.status)

                return (
                  <motion.tr
                    key={meeting.id}
                    custom={index}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    className="hover:bg-[#001A2C]/50"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-[#F2F2F2]">{meeting.title}</p>
                        <p className="text-sm text-[#B3B3B3] line-clamp-1">{meeting.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-sm text-[#F2F2F2]">
                          <Calendar className="h-4 w-4 text-[#00406C]" />
                          <span>{format(scheduledDate, "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#B3B3B3] mt-1">
                          <Clock className="h-4 w-4 text-[#00406C]" />
                          <span>{format(scheduledDate, "h:mm a")}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#F2F2F2]">{meeting.duration} minutes</td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={cn("border", statusDetails.color)}>
                        {statusDetails.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      {isActive && !isPast ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-400 border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                          onClick={() => onCancel(meeting.id)}
                          disabled={meeting.status === Status.CANCELED || cancellingId === meeting.id}
                        >
                          {cancellingId === meeting.id ? (
                            <>
                              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            "Cancel"
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="opacity-50 border-[#002945] text-[#B3B3B3]"
                        >
                          {isPast ? "Past Meeting" : meeting.status}
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

      {/* Mobile Card View (visible only on small screens) */}
      <motion.div className="md:hidden space-y-4" variants={tableContainerVariants} initial="hidden" animate="visible">
        <AnimatePresence>
          {meetings.map((meeting, index) => {
            const scheduledDate = new Date(meeting.scheduledAt)
            const isPast = scheduledDate < new Date()
            const isActive =
              meeting.status !== Status.CANCELED &&
              meeting.status !== Status.REJECTED &&
              meeting.status !== Status.APPROVED
            const statusDetails = getStatusDetails(meeting.status)

            return (
              <motion.div
                key={meeting.id}
                custom={index}
                variants={mobileCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-[#001523] border border-[#002945] rounded-lg overflow-hidden"
              >
                <div className="p-4 border-b border-[#002945]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#F2F2F2]">{meeting.title}</h3>
                    <Badge variant="outline" className={cn("border ml-2", statusDetails.color)}>
                      {statusDetails.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#B3B3B3] mb-3">{meeting.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#F2F2F2]">
                      <Calendar className="h-4 w-4 text-[#00406C]" />
                      <span>{format(scheduledDate, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#F2F2F2]">
                      <Clock className="h-4 w-4 text-[#00406C]" />
                      <span>{format(scheduledDate, "h:mm a")}</span>
                    </div>
                    <div className="text-sm text-[#F2F2F2]">Duration: {meeting.duration} minutes</div>
                  </div>
                </div>

                <div className="p-3 bg-[#001A2C] flex justify-end">
                  {isActive && !isPast ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-400 border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                      onClick={() => onCancel(meeting.id)}
                      disabled={meeting.status === Status.CANCELED || cancellingId === meeting.id}
                    >
                      {cancellingId === meeting.id ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        "Cancel Meeting"
                      )}
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled className="opacity-50 border-[#002945] text-[#B3B3B3]">
                      {isPast ? "Past Meeting" : meeting.status}
                    </Button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
