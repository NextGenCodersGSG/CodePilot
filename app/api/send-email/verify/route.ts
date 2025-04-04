import { NextResponse } from "next/server";
import EmailService from "@/module/services/email.service";
import { emailTemplate } from "@/lib/emailTemplate";

enum VerifyEmail {
  title = "Verify Your Email",
  description = "Thank you for signing up. Please click the button below to verify your email address and activate your account.",
  secondary = "If you didn't create an account, you can safely ignore this email.",
  button = "Verify Email",
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailHtml = emailTemplate({title: VerifyEmail.title,description: VerifyEmail.description,secondary:VerifyEmail.secondary});

    await EmailService.sendEmail(email, VerifyEmail.title, emailHtml);

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}
