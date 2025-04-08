import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatusLegend() {
  const statuses = [
    {
      status: "PENDING",
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      icon: <AlertCircle className="h-3 w-3" />,
      description: "Awaiting confirmation",
    },
    {
      status: "APPROVED",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      icon: <CheckCircle className="h-3 w-3" />,
      description: "Meeting confirmed",
    },
    {
      status: "COMPLETED",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: <CheckCircle className="h-3 w-3" />,
      description: "Meeting has occurred",
    },
    {
      status: "REJECTED",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      icon: <XCircle className="h-3 w-3" />,
      description: "Meeting declined",
    },
    {
      status: "CANCELLED",
      color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      icon: <XCircle className="h-3 w-3" />,
      description: "Meeting cancelled",
    },
  ]

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <span className="text-sm font-medium mr-1 text-[#F2F2F2]">Status:</span>
      {statuses.map((item) => (
        <div key={item.status} className="flex items-center gap-1.5">
          <Badge variant="outline" className={cn("flex items-center gap-1 px-2 py-1 border", item.color)}>
            {item.icon}
            {item.status}
          </Badge>
          <span className="text-xs text-[#B3B3B3]">{item.description}</span>
        </div>
      ))}
    </div>
  )
}

