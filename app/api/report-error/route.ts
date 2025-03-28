import { sendEmailToDevelopers } from "@/utils/email";
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { email, feedback, errorMessage, errorStack, errorDigest } = data

    if(!email || !feedback || !errorMessage ){
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    // In a production environment, you would:
    // 1. Validate the input data
    // 2. Send an email to developers
    // 3. Log the error to your monitoring system
    // 4. Store the error report in your database

    // Example of sending an email (you would need to set up a service like Nodemailer, SendGrid, etc.)

    const emailBody = `
    Reported by: ${email}
    Feedback: ${feedback || 'No feedback provided'}
    Error Message: ${errorMessage}
    Error Digest: ${errorDigest || 'N/A'}
    Stack Trace: ${errorStack || 'No stack trace available'}
  `

    const emailSent = await sendEmailToDevelopers({
      from: email,
      subject: `Error Report: ${errorDigest || 'Unknown Error'}`,
      body: emailBody,
    });

    if(!emailSent.success){
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    // For now, we'll just log the error and return a success response
    console.log("Error report received:", {
      email,
      feedback,
      errorMessage,
      errorDigest,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to process error report:", error)
    return NextResponse.json({ error: "Failed to process error report" }, { status: 500 })
  }
}

