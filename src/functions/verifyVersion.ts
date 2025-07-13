import { isVersionInstalled } from './isVersionInstalled';

export const verifyVersion = async ({
  versionIdentifier,
  updateStatus,
}: {
  versionIdentifier: string;
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
}): Promise<{ verified: boolean; message: string }> => {
  try {
    updateStatus?.({ status: 'Verifying installation...', progress: 5 });
    const installed = await isVersionInstalled(versionIdentifier);
    const message = installed ? 'Version verified' : 'Version not installed';
    updateStatus?.({ status: message, progress: 10 });
    return { verified: installed, message };
  } catch (error: unknown) {
    const err = error as Error;
    updateStatus?.({ status: err.message, progress: 10 });
    return { verified: false, message: `Verification failed: ${err.message}` };
  }
};
