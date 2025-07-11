import { fetchServerData } from './fetchServerData';
import { Version, Versions, VersionSelectionType } from './versionTypes';

export async function fetchVersions({ versionType = 'archived' }: { versionType?: VersionSelectionType }): Promise<Versions> {
  const formattedVersionType = `versions.${versionType}`;

  const { data, status, message } = await fetchServerData({
    routeName: formattedVersionType,
  });

  if (!status) {
    throw new Error(message);
  }

  return { versions: data.versions as Version[] };
}
