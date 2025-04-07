<<<<<<< HEAD
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Access Forbidden</h1>
        <p className="text-muted-foreground max-w-md">
          You don't have sufficient permissions to access this resource. Please contact your administrator for access.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

=======
import React from 'react'
import Forbidden from '../forbidden'

const page = () => {
  return (
    <Forbidden/>
  )
}

export default page
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
