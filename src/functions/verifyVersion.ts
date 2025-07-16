import path from 'path';
import { isVersionInstalled } from './isVersionInstalled';
import { getDirectories } from './fetchDirectories';
import { fetchVersions } from '../api/fetchVersions';
import { verifyFile } from '../fileUtils/fileOps';

export const verifyVersion = async ({
  versionIdentifier,
}: {
  versionIdentifier: string;
}): Promise<{ verified: boolean; message: string }> => {
  try {
    const directoriesResult = await getDirectories();
    if (!directoriesResult.status || !directoriesResult.directories) {
      throw new Error(directoriesResult.message);
    }
    const { launcherCachePath } = directoriesResult.directories;

    const { versions } = await fetchVersions({ versionType: 'archived' });
    const versionInfo = versions.find(v => v.identifier === versionIdentifier);
    if (!versionInfo) {
      throw new Error(`Version info not found for ${versionIdentifier}`);
    }

    const zipFilePath = path.join(launcherCachePath, versionInfo.filename);
    const zipDetails = await verifyFile({ filePath: zipFilePath, expectedSize: versionInfo.sizeInBytes });

    const installed = await isVersionInstalled(versionIdentifier);

    const installMessage = installed ? 'Installation found.' : 'Installation not found.';
    const zipMessage = zipDetails.exists ? (zipDetails.sizeMatches ? 'Zip verified.' : 'Zip size mismatch.') : 'Zip missing.';

    const verified = installed && zipDetails.exists && (zipDetails.sizeMatches ?? false);
    return { verified, message: `${installMessage} ${zipMessage}` };
  } catch (error: unknown) {
    const err = error as Error;
    return { verified: false, message: `Verification failed: ${err.message}` };
  }
};
