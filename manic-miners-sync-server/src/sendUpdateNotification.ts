import { CatalogData } from './types/types';
import { ISendEmailParams, ISendEmailResponse } from 'gmail-node-mailer';

export async function sendUpdateNotification(catalogData: CatalogData | null, errorMessage: string | null = null): Promise<ISendEmailResponse> {
	const recipientEmail = 'waleed@glitchgaming.us';
	const senderName = 'Manic Miners Sync Server';

	let subject: string;
	let messageContent: string;
	//
	if (catalogData) {
		subject = `New Update: ${catalogData.versionDisplayName}`;
		messageContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              font-family: Arial, sans-serif;
              background-color: #f2f4f8;
              color: #333;
            }
            .header {
              background-color: #34495e;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content img {
              width: 100%;
              height: auto;
              border-radius: 8px;
            }
            .content {
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .footer {
              background-color: #34495e;
              color: white;
              padding: 10px;
              text-align: center;
              border-radius: 0 0 8px 8px;
            }
            .footer p {
              font-size: 14px;
            }
            .footer a {
              color: #5dade2;
              text-decoration: none;
            }
            .thumbnails {
              display: flex;
              justify-content: center;
              gap: 10px;
              margin: 10px 0;
            }
            .thumbnails img {
              width: 32px;
              height: auto;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${catalogData.title}</h1>
            </div>
            <div class="content">
              <img src="${catalogData.coverImg}" alt="Cover Image">
              <p>${catalogData.description}</p>
              <p><strong>Version:</strong> ${catalogData.versionDisplayName}</p>
              <p><strong>Author:</strong> <a href="${catalogData.authorUrl}" style="color: #5dade2; text-decoration: none;">${
			catalogData.author
		}</a></p>
              <p><strong>Release Date:</strong> ${catalogData.versionReleaseDate}</p>
              <p><strong>Download:</strong> <a href="${
					catalogData.publicFileUrl
				}" style="color: #5dade2; text-decoration: none;">Click here to download</a></p>
              <p><strong>File Size:</strong> ${(catalogData.fileSize / (1024 * 1024)).toFixed(2)} MB (${catalogData.fileSize} bytes)</p>
              <p><strong>MD5 Checksum:</strong> ${catalogData.versionMd5}</p>
              <p><strong>Platforms:</strong> ${catalogData.platforms.windows ? 'Windows' : ''} ${catalogData.platforms.mac ? 'Mac' : ''} ${
			catalogData.platforms.linux ? 'Linux' : ''
		} ${catalogData.platforms.android ? 'Android' : ''}</p>
              <p><strong>Game Page:</strong> <a href="${catalogData.gamePage}" style="color: #5dade2; text-decoration: none;">Visit Game Page</a></p>
              <p><strong>Comments:</strong> <a href="${catalogData.commentsUrl}" style="color: #5dade2; text-decoration: none;">View Comments</a></p>
              <p><strong>File Modification Time:</strong> ${catalogData.fileModTime}</p>
              <p><strong>Date Updated:</strong> ${catalogData.date}</p>
            </div>
            <div class="footer">
              <p style="font-size: 14px;">Powered by <a href="https://github.com/gmail-node-mailer" style="color: #5dade2;">gmail-node-mailer</a></p>
              <p style="font-size: 12px; color: white;">Special thanks to Wal33D for his software, the game launcher, level index, site, and all the supporting work.</p>
              <p style="font-size: 12px; color: white;">Special thanks to <a href="${catalogData.authorUrl}" style="color: #5dade2;">${
			catalogData.author
		}</a> for creating Manic Miners.</p>
              <div class="thumbnails">
                <a href="${catalogData.gamePage}">
                  <img src="${catalogData.thumbnail}" alt="Thumbnail">
                </a>
                <a href="https://github.com/gmail-node-mailer">
                  <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub">
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
	} else {
		subject = 'Error Notification';
		messageContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f2f4f8; color: #333;">
            <h1 style="background-color: #E74C3C; color: white; padding: 20px; text-align: center;">Error</h1>
            <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <p>${errorMessage}</p>
            </div>
            <p style="text-align: center; padding: 10px; background-color: #E74C3C; color: white; font-size: 14px;">Powered by <a href="https://github.com/gmail-node-mailer" style="color: white; text-decoration: none;">gmail-node-mailer</a></p>
            <p style="text-align: center; font-size: 12px; color: #333;">Special thanks to Wal33D for his software, the game launcher, level index, site, and all the supporting work.</p>
          </div>
        </body>
      </html>
    `;
	}

	//@ts-ignore
	return (await global.gmailClient.sendEmail({
		recipientEmail,
		senderName,
		message: messageContent,
		subject,
	} as ISendEmailParams)) as ISendEmailResponse;
}
