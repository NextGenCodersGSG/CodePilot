import nodemailer from 'nodemailer'

export async function sendEmailToDevelopers({
  from,
  subject,
  body,
}: {
  from: string
  subject: string
  body: string
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const info = await transporter.sendMail({
      from:  process.env.SMTP_FROM, // Must match SMTP_USER for Gmail
      to: process.env.DEV_EMAIL, // Developer's email
      replyTo: from, // User's email (so dev can reply)
      subject,
      text: body, // Plain text email
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: 'Failed to send email'}
  }
}
