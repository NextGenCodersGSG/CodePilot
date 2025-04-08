import { cn } from "@/lib/utils"
import { Status } from "@/@types"

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === Status.PENDING && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
        status === Status.APPROVED && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
        status === Status.REJECTED && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
        status === Status.CANCELED && "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500",
      )}
    >
      {status}
    </span>
  )
}
