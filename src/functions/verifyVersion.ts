import { isVersionInstalled } from './isVersionInstalled';

export const verifyVersion = async ({
  versionIdentifier,
}: {
  versionIdentifier: string;
}): Promise<{ verified: boolean; message: string }> => {
  try {
    const installed = await isVersionInstalled(versionIdentifier);
    return { verified: installed, message: installed ? 'Version verified' : 'Version not installed' };
  } catch (error: unknown) {
    const err = error as Error;
    return { verified: false, message: `Verification failed: ${err.message}` };
  }
};
