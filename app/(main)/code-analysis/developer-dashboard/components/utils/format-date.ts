export function formatDate(date: Date | string): string {
    // Convert to Date object if it's a string
    const dateObj = typeof date === "string" ? new Date(date) : date
  
    // Format date
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  
    // Format time
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  
    return `${formattedDate} at ${formattedTime}`
  }
  