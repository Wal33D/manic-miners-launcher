let messageLog = ''; // This will store all status updates persistently

export function updateStatus(progress: number, status: string | undefined) {
  const progressBar = document.getElementById('downloadProgress') as HTMLProgressElement | null;
  const progressText = document.getElementById('progressText');

  if (progressBar && progressText) {
    progressBar.value = progress;
    progressBar.max = 100;

    if (status !== undefined) {
      messageLog = status; // Append new status to the log
    }
    progressText.textContent = `${progress}% - ${messageLog}`;
  }
}
