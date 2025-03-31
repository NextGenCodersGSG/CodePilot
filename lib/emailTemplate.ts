interface EmailTemplateProps {
  link?: string;
  title: string;
  description: string;
  secondary: string;
  button?: string;
}

export const emailTemplate = ({ link, title, description, secondary, button }: EmailTemplateProps) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.5;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
              text-align: center;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 16px;
              color: #000;
            }
            .description {
              font-size: 16px;
              color: #666;
              margin-bottom: 24px;
              max-width: 400px;
              margin-left: auto;
              margin-right: auto;
            }
            .button {
              display: inline-block;
              background-color: #000;
              color: #fff;
              font-weight: 500;
              text-decoration: none;
              padding: 10px 16px;
              border-radius: 6px;
              margin-bottom: 16px;
            }
            .secondary {
              font-size: 14px;
              color: #666;
            }
            .link {
              color: #666;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="title">${title}</h1>
            <p class="description">
            ${description}
            </p>
            ${link ? `<a href="${link}" class="button">${button}</a>` : ""}
            <p class="secondary">
              ${secondary}
            </p>
          </div>
        </body>
      </html>
    `
  }