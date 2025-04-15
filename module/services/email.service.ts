import nodemailer from "nodemailer";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as nodemailer.TransportOptions);
  }

  async sendEmail(userEmail: string, subject: string, message: string, devEmail?: string) {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: userEmail,
        subject,
        html: message,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}

export default new EmailService();
