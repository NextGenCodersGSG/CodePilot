"use client"

import { motion } from "framer-motion"
import { FileCode, Clock, Shield, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock activity data
const activityData = [
  {
    id: 1,
    type: "code-review",
    title: "Code Review Completed",
    description: "Authentication service review completed with 3 issues found",
    timestamp: "2 hours ago",
    icon: <FileCode className="h-5 w-5 text-primary" />,
  },
  {
    id: 2,
    type: "security",
    title: "Security Vulnerability Detected",
    description: "Potential SQL injection vulnerability found in user search function",
    timestamp: "Yesterday",
    icon: <Shield className="h-5 w-5 text-red-500" />,
    severity: "high",
  },
  {
    id: 3,
    type: "performance",
    title: "Performance Analysis",
    description: "Dashboard rendering optimized, 40% performance improvement",
    timestamp: "2 days ago",
    icon: <Zap className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: 4,
    type: "code-review",
    title: "Code Review Completed",
    description: "API endpoints review completed with no issues found",
    timestamp: "3 days ago",
    icon: <FileCode className="h-5 w-5 text-primary" />,
  },
  {
    id: 5,
    type: "login",
    title: "New Login",
    description: "New login from Chrome on Windows",
    timestamp: "4 days ago",
    icon: <Clock className="h-5 w-5 text-muted-foreground" />,
  },
]

export function UserActivityList() {
  return (
    <div className="space-y-4">
      {activityData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      ) : (
        <div>
          {activityData.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-muted border border-accent rounded-lg p-4 mb-4 last:mb-0"
            >
              <div className="flex items-start gap-4">
                <div className="bg-card p-2 rounded-full">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>

                  {activity.severity && (
                    <div className="mt-2">
                      <Badge
                        className={
                          activity.severity === "high"
                            ? "bg-red-500/20 text-red-500"
                            : activity.severity === "medium"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-green-500/20 text-green-500"
                        }
                      >
                        {activity.severity.charAt(0).toUpperCase() + activity.severity.slice(1)} Severity
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
