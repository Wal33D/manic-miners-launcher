let messageLog = ''; // This will store all status updates persistently

export function updateStatus(progress: string, status: any) {
  const progressBar = document.getElementById('downloadProgress');
  const progressText = document.getElementById('progressText');

  if (progressBar && progressText) {
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);

    if (status) {
      messageLog = `${status}`; // Append new status to the log
    }
    progressText.textContent = `${progress}% - ${messageLog}`;
  }
}
