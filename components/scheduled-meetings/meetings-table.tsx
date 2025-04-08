"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { AnimatedTooltip } from "./animated-tooltip"
import { Status } from "@/@types"

// Updated Meeting interface to match the new data structure
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
      case  Status.REJECTED:
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

  return (
    <div className="rounded-md border border-[#002945] overflow-hidden">
      <Table>
        <TableHeader className="bg-[#001A2C]">
          <TableRow className="border-b-[#002945] hover:bg-transparent">
            <TableHead className="text-[#F2F2F2] font-medium">Meeting Details</TableHead>
            <TableHead className="text-[#F2F2F2] font-medium">Schedule</TableHead>
            <TableHead className="text-[#F2F2F2] font-medium">Status</TableHead>
            <TableHead className="text-[#F2F2F2] font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting) => {
            const scheduledDate = new Date(meeting.scheduledAt)
            const isPast = scheduledDate < new Date()
            const isActive =
              meeting.status !== Status.CANCELED && meeting.status !== Status.REJECTED && meeting.status !== Status.APPROVED
            const statusDetails = getStatusDetails(meeting.status)

            return (
              <TableRow
                key={`tabular-meeting-${meeting.id}`}
                className={cn("border-b-[#002945] bg-[#001523] hover:bg-[#001A2C]", !isActive && "opacity-70")}
              >
                <TableCell className="font-medium text-[#F2F2F2]">
                  <div className="font-semibold">{meeting.title}</div>
                  <AnimatedTooltip
                    content={<p className="text-sm p-1">{meeting.description}</p>}
                    side="bottom"
                    className="bg-[#00111C] border-[#002945]" // Darker background for better contrast
                  >
                    <div className="text-sm text-[#B3B3B3] max-w-[300px] truncate">{meeting.description}</div>
                  </AnimatedTooltip>
                </TableCell>
                <TableCell className="text-[#F2F2F2]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#00406C]" />
                    <span className="text-sm">{format(scheduledDate, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-[#00406C]" />
                    <span className="text-sm">
                      {format(scheduledDate, "h:mm a")} ({meeting.duration} min)
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("border", statusDetails.color)}>
                    {statusDetails.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {isActive && !isPast ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-400 border-red-500/30 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
                      onClick={() => onCancel(meeting.id)}
                      disabled={cancellingId === meeting.id}
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
                    <Button variant="outline" size="sm" disabled className="opacity-50 border-[#002945] text-[#B3B3B3]">
                      {isPast ? "Past meeting" : meeting.status.toLowerCase()}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

