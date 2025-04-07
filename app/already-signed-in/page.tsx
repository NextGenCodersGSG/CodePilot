<<<<<<< HEAD
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AlreadySignedIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Already Signed In</h1>
        <p className="text-muted-foreground max-w-md">
          You are already signed in to your account. You don't need to sign in again.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button asChild>
            <Link href="/code-analysis">Go to Code Analysis</Link>
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
import AlreadySignedIn from '../already-signed-in'

const page = () => {
  return (
    <AlreadySignedIn/>
  )
}

export default page
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
