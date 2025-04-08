"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, Loader2, Video } from "lucide-react"
import { toast } from "@/components/ui/sonner"
import { Status } from "@/@types"
import Link from "next/link"

interface MeetingActionsProps {
  meetingId: string
  status: Status
  onStatusChange: (meetingId: string, newStatus: Status, updatedData?: any) => void
  startUrl?: string
}

export function MeetingActions({ meetingId, status, onStatusChange, startUrl }: MeetingActionsProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [localStartUrl, setLocalStartUrl] = useState<string | undefined>(startUrl)

  if (startUrl !== localStartUrl) {
    setLocalStartUrl(startUrl);
  }

  const handleApprove = async () => {
    try {
      setIsApproving(true);

      const response = await fetch(`/api/meetings/approve-meeting`, {
        method: "POST",
        body: JSON.stringify({ meetingId }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to approve meeting");
      }

      const updatedMeeting = await response.json();
      
      if (updatedMeeting?.zoom?.startUrl) {
        setLocalStartUrl(updatedMeeting.zoom.startUrl)
      }
      
      onStatusChange(meetingId, Status.APPROVED, updatedMeeting)
      toast.success("The meeting has been successfully approved.");
    } catch (error) {
      console.error("Error approving meeting:", error);
      toast.error("Failed to approve the meeting. Please try again.");
    } finally {
      setIsApproving(false);
    }
  }

  const handleReject = async () => {
    try {
      setIsRejecting(true)
      
      const response = await fetch(`/api/meetings/reject-meeting`, {
        method: "POST",
        body: JSON.stringify({ meetingId }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to reject meeting")
      }

      onStatusChange(meetingId, Status.REJECTED)
      toast.success("The meeting has been rejected.");
    } catch (error) {
      console.error("Error rejecting meeting:", error);
      toast.error("Failed to reject the meeting. Please try again.");
    } finally {
      setIsRejecting(false);
    }
  }

  return (
    <div className="flex space-x-2">
      {status === Status.PENDING && (
        <>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700 border-green-500/20 cursor-pointer"
            onClick={handleApprove}
            disabled={isApproving || isRejecting}
          >
            {isApproving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-700 border-red-500/20 cursor-pointer"
            onClick={handleReject}
            disabled={isApproving || isRejecting}
          >
            {isRejecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4 mr-1" />}
            Reject
          </Button>
        </>
      )}
      
      {status === Status.APPROVED && (
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-500 border-blue-500/20 cursor-pointer"
          onClick={() => toast.success("redirecting...", {duration: 1500})}
        >
          <Link
            href={localStartUrl || "#"}
            className="flex items-center justify-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Video className="h-4 w-4 mr-1" />
            Start The Meeting
          </Link>
        </Button>
      )}
    </div>
  )
}