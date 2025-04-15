import { EmailTemplateProps } from "@/@types"

export const emailTemplate = ({ link, title, description, secondary, button }: EmailTemplateProps) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.5; color: foreground; margin: 0; padding: 0; background-color: background;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table style="max-width: 600px; width: 100%; background-color: card; border-radius: 8px; border: 1px solid accent;">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center;">
                      <!-- Logo -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="padding-bottom: 30px;">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: primary;">
                              <path d="M16 18L18 18L18 6L16 6L16 18ZM8 18L16 18L16 16L8 16L8 18ZM8 13L14 13L14 11L8 11L8 13ZM8 8L14 8L14 6L8 6L8 8ZM6 18L8 18L8 6L6 6L6 18Z" fill="primary"/>
                            </svg>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Content -->
                      <h1 style="font-size: 48px; font-weight: bold; margin-bottom: 16px; color: foreground;">${title}</h1>
                      <p style="font-size: 16px; color: muted-foreground; margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">
                        ${description}
                      </p>
                      
                      <!-- Button -->
                      ${link ? `<a href="${link}" style="display: inline-block; background-color: primary; color: foreground; font-weight: 500; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin-bottom: 24px; cursor: pointer; border: none; transition: background-color 0.2s ease;">${button}</a>` : ""}
                      
                      <!-- Secondary Text -->
                      <p style="font-size: 14px; color: muted-foreground; margin-top: 8px;">
                        ${secondary}
                      </p>
                      
                      <!-- Footer -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-top: 40px; border-top: 1px solid accent; text-align: center;">
                            <p style="font-size: 12px; color: muted-foreground; margin: 0;">
                              &copy; ${new Date().getFullYear()} CodePilot. All rights reserved.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `
  }