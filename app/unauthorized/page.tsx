<<<<<<< HEAD
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Unauthorized Access</h1>
        <p className="text-muted-foreground max-w-md">
          You don't have permission to access this page. Please contact your administrator if you believe this is an
          error.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
=======
import React from 'react'
import Unauthorized from '../unauthorized'

const page = () => {
  return (
    <Unauthorized/>
  )
}

export default page
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
