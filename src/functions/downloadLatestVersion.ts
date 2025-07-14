import { BrowserWindow, net } from 'electron';
import path from 'path';
import fs from 'fs/promises';

interface DownloadOptions {
  targetDirectory: string;
  onProgress?: (data: { status: string; progress: number }) => void;
}

interface DownloadResult {
  success: boolean;
  message: string;
  filePath?: string;
}

export async function downloadLatestVersion(options: DownloadOptions): Promise<DownloadResult> {
  const { targetDirectory, onProgress } = options;

  let browserWindow: BrowserWindow | null = null;

  try {
    onProgress?.({ status: 'Opening itch.io page...', progress: 10 });

    // Create a hidden browser window
    browserWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      show: false, // Keep hidden for now
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    // Navigate to the itch.io page
    await browserWindow.loadURL('https://baraklava.itch.io/manic-miners');

    onProgress?.({ status: 'Looking for download button...', progress: 30 });

    // Wait a moment for page to fully load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Find and click the download button
    const clickResult = await browserWindow.webContents.executeJavaScript(`
      (function() {
        // Look for various download button selectors
        const selectors = [
          '.download_btn',
          '.button.download_btn',
          'a[href*="download"]',
          '.game_download_btn',
          '.download_game',
          'a.button[href*="download"]',
          'button[class*="download"]',
          '.download-button'
        ];

        for (const selector of selectors) {
          const btn = document.querySelector(selector);
          if (btn) {
            console.log('Found download button with selector:', selector);
            btn.click();
            return true;
          }
        }

        // If no specific download button found, look for any button with "download" text
        const allButtons = document.querySelectorAll('button, a, .button');
        for (const btn of allButtons) {
          if (btn.textContent && btn.textContent.toLowerCase().includes('download')) {
            console.log('Found download button by text:', btn.textContent);
            btn.click();
            return true;
          }
        }

        return false;
      })();
    `);

    if (!clickResult) {
      throw new Error('Could not find or click download button on itch.io page');
    }

    onProgress?.({ status: 'Download button clicked, waiting for download to start...', progress: 40 });

    // Set up download handling
    const fileName = 'ManicMiners-latest.zip';
    const filePath = path.join(targetDirectory, fileName);
    let downloadCompleted = false;
    let downloadError: string | null = null;

    return new Promise((resolve, reject) => {
      // Set up download handler
      browserWindow.webContents.session.on('will-download', (event, item, webContents) => {
        onProgress?.({ status: 'Download started...', progress: 50 });

        // Set the save path
        item.setSavePath(filePath);

        // Track download progress
        item.on('updated', (event, state) => {
          if (state === 'progressing') {
            const progress = Math.round((item.getReceivedBytes() / item.getTotalBytes()) * 40) + 50; // 50-90%
            onProgress?.({
              status: `Downloading... ${Math.round(item.getReceivedBytes() / 1024 / 1024)}MB / ${Math.round(item.getTotalBytes() / 1024 / 1024)}MB`,
              progress,
            });
          }
        });

        item.once('done', (event, state) => {
          if (state === 'completed') {
            onProgress?.({ status: 'Download completed', progress: 95 });
            downloadCompleted = true;
            browserWindow.close();
            resolve({
              success: true,
              message: 'Download completed successfully',
              filePath,
            });
          } else {
            downloadError = `Download failed with state: ${state}`;
            browserWindow.close();
            reject(new Error(downloadError));
          }
        });
      });

      // Set a timeout in case download doesn't start
      setTimeout(() => {
        if (!downloadCompleted && !downloadError) {
          browserWindow.close();
          reject(new Error('Download did not start within expected time'));
        }
      }, 30000); // 30 second timeout
    });
  } catch (error) {
    if (browserWindow) {
      browserWindow.close();
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
