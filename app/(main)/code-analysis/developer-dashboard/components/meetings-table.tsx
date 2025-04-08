"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "./status-badge"
import { MeetingActions } from "./meeting-actions"
import { IMeeting, Status } from "@/@types"
import { formatDate } from "./utils/format-date"

interface MeetingsTableProps {
  meetings: IMeeting[]
}

export function MeetingsTable({ meetings: initialMeetings }: MeetingsTableProps) {
  const [meetings, setMeetings] = useState<IMeeting[]>(initialMeetings)

  const handleStatusChange = (meetingId: string, newStatus: Status) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) => (meeting.developerId === meetingId ? { ...meeting, status: newStatus } : meeting)),
    )
  }

  return (
    <div className="rounded-md border border-[#002945] overflow-hidden">
      <Table>
        <TableHeader className="bg-[#001A2C]">
          <TableRow>
            <TableHead className="text-[#F2F2F2] font-medium">Title</TableHead>
            <TableHead className="text-[#F2F2F2] font-medium">User</TableHead>
            <TableHead className="text-[#F2F2F2] font-medium">Date & Time</TableHead>
            <TableHead className="text-[#F2F2F2] font-medium">Duration</TableHead>
            <TableHead className="text-[#F2F2F2] font-medium">Status</TableHead>
            <TableHead className="text-[#F2F2F2] font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {meetings.map((meeting,index) => (
              <motion.tr
                key={`meeting-${meeting.developerId}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-[#001523] hover:bg-[#001A2C] border-b border-[#002945] last:border-0"
              >
                <TableCell className="font-medium text-[#F2F2F2]">{meeting.title}</TableCell>
                <TableCell className="text-[#B3B3B3]">{meeting.userId || "Unknown User"}</TableCell>
                <TableCell className="text-[#B3B3B3]">{formatDate(meeting.scheduledAt)}</TableCell>
                <TableCell className="text-[#B3B3B3]">{meeting.duration} min</TableCell>
                <TableCell>
                  <StatusBadge status={meeting.status} />
                </TableCell>
                <TableCell>
                  <MeetingActions
                    meetingId={meeting.id || ""}
                    status={meeting.status}
                    onStatusChange={handleStatusChange}
                    startUrl={meeting.status == Status.APPROVED? meeting.zoom.startUrl : ""}
                  />
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  )
}
