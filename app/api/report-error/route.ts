import { EmailTemplateProps } from "@/@types";
import { emailTemplate } from "@/lib/emailTemplate";
import EmailService from "@/module/services/email.service";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { email, feedback, errorMessage, errorStack, errorDigest } = data

    if(!email || !feedback || !errorMessage ){
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const description = `An Error was discovered on the website by ${email} with the following details:
      Error Message: ${errorMessage}
      Stack Trace: ${errorStack}
      Error Digest: ${errorDigest}
      `;
    const templateMessage : EmailTemplateProps = { link: "/localhost:3000",title: "Error Feedback", description: description, button: "View Error", secondary: "Happy Debugging!" };
    const emailHtml = emailTemplate(templateMessage);

    await EmailService.sendEmail(process.env.DEV_EMAIL || "", "Error Feedback", emailHtml);

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to process error report:", error)
    return NextResponse.json({ error: "Failed to process error report" }, { status: 500 })
  }
}

