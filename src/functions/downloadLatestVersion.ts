import { BrowserWindow, net, DownloadItem, WebContents, Event } from 'electron';
import path from 'path';
import fs from 'fs/promises';
import { logger } from '../utils/logger';

interface DownloadOptions {
  targetDirectory: string;
  onProgress?: (data: { status: string; progress: number }) => void;
}

// Local type for this specific function's result
interface ItchDownloadResult {
  success: boolean;
  message: string;
  filePath?: string;
}

export async function downloadLatestVersion(options: DownloadOptions): Promise<ItchDownloadResult> {
  const { targetDirectory, onProgress } = options;

  let browserWindow: BrowserWindow | null = null;

  try {
    onProgress?.({ status: 'Opening itch.io page...', progress: 8 });

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

    onProgress?.({ status: 'Looking for download button...', progress: 20 });

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
            logger.debug('DOWNLOAD', 'Found download button with selector', { selector });
            btn.click();
            return true;
          }
        }

        // If no specific download button found, look for any button with "download" text
        const allButtons = document.querySelectorAll('button, a, .button');
        for (const btn of allButtons) {
          if (btn.textContent && btn.textContent.toLowerCase().includes('download')) {
            logger.debug('DOWNLOAD', 'Found download button by text', { text: btn.textContent });
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

    logger.downloadLog('Download button clicked successfully');
    onProgress?.({ status: 'Download button clicked, waiting for download to start...', progress: 30 });

    // Set up download handling
    const fileName = 'ManicMiners-latest.zip';
    const filePath = path.join(targetDirectory, fileName);
    let downloadCompleted = false;
    let downloadStarted = false;
    let downloadError: string | null = null;

    return new Promise((resolve, reject) => {
      // Create a unique download handler for this instance
      const downloadHandler = (event: Event, item: DownloadItem, webContents: WebContents) => {
        downloadStarted = true;
        onProgress?.({ status: 'Download started...', progress: 35 });

        // Set the save path
        item.setSavePath(filePath);

        // Track download progress
        item.on('updated', (event: Event, state: string) => {
          if (state === 'progressing') {
            const progress = Math.round((item.getReceivedBytes() / item.getTotalBytes()) * 35) + 35; // 35-70%
            onProgress?.({
              status: `Downloading... ${Math.round(item.getReceivedBytes() / 1024 / 1024)}MB / ${Math.round(item.getTotalBytes() / 1024 / 1024)}MB`,
              progress,
            });
          }
        });

        item.once('done', (event: any, state: string) => {
          // Clean up the download handler
          browserWindow.webContents.session.removeListener('will-download', downloadHandler);

          if (state === 'completed') {
            onProgress?.({ status: 'Download completed', progress: 70 });
            downloadCompleted = true;
            if (!browserWindow.isDestroyed()) {
              browserWindow.close();
            }
            resolve({
              success: true,
              message: 'Download completed successfully',
              filePath,
            });
          } else {
            downloadError = `Download failed with state: ${state}`;
            if (!browserWindow.isDestroyed()) {
              browserWindow.close();
            }
            reject(new Error(downloadError));
          }
        });
      };

      // Set up download handler
      browserWindow.webContents.session.on('will-download', downloadHandler);

      // Set a timeout only for download start - once download starts, let it complete
      const timeoutId = setTimeout(() => {
        if (!downloadStarted && !downloadError) {
          browserWindow.webContents.session.removeListener('will-download', downloadHandler);
          if (!browserWindow.isDestroyed()) {
            browserWindow.close();
          }
          reject(new Error('Download did not start within expected time'));
        }
      }, 30000); // 30 second timeout only for download start

      // Clean up timeout if download completes
      const originalResolve = resolve;
      const originalReject = reject;

      resolve = (...args) => {
        clearTimeout(timeoutId);
        originalResolve(...args);
      };

      reject = (...args) => {
        clearTimeout(timeoutId);
        originalReject(...args);
      };
    });
  } catch (error) {
    if (browserWindow && !browserWindow.isDestroyed()) {
      browserWindow.close();
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
