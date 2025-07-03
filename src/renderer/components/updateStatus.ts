let messageLog = ''; // This will store all status updates persistently

export function updateStatus(progress: number, status: string | undefined) {
  const progressBar = document.getElementById('downloadProgress');
  const progressText = document.getElementById('progressText');

  if (progressBar && progressText) {
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress.toString());

    if (status !== undefined) {
      messageLog = status; // Append new status to the log
    }
    progressText.textContent = `${progress}% - ${messageLog}`;
  }
}
