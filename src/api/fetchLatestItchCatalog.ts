import fs from 'fs';
import path from 'path';
import { fetchItchGameData } from 'itchio-metadata';
import { downloadGame, DownloadGameParams, DownloadGameResponse } from 'itchio-downloader';
import { getDirectories } from '../functions/fetchDirectories';

export interface ItchCatalog {
  title: string;
  description: string;
  versionDisplayName: string;
  versionFilename: string;
  fileSize: number;
  versionMd5: string;
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
    android: boolean;
  };
  author: string;
  authorUrl: string;
  coverImg: string;
  gamePage: string;
  commentsUrl: string;
  localFilePath: string;
  versionReleaseDate: string;
}

const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours

export async function fetchLatestItchCatalog({
  author = 'baraklava',
  gameName = 'manic-miners',
  cacheDuration = CACHE_DURATION,
}: {
  author?: string;
  gameName?: string;
  cacheDuration?: number;
} = {}): Promise<{ status: boolean; message: string; catalog?: ItchCatalog }> {
  try {
    const { status: dirStatus, directories } = await getDirectories();
    if (!dirStatus || !directories) {
      throw new Error('Failed to resolve launcher directories');
    }

    const latestDir = path.join(directories.launcherCachePath, 'latestVersion');
    const cacheFile = path.join(latestDir, 'catalog.json');
    const zipPath = path.join(latestDir, `${gameName}-latest.zip`);

    await fs.promises.mkdir(latestDir, { recursive: true });

    let cache: any = null;
    if (fs.existsSync(cacheFile)) {
      cache = JSON.parse(await fs.promises.readFile(cacheFile, 'utf8'));
      if (Date.now() - cache.timestamp < cacheDuration) {
        return { status: true, message: 'Loaded metadata from cache.', catalog: cache.data };
      }
    }

    const metaRes: any = await fetchItchGameData({ author, gameTitle: gameName });
    if (!metaRes.status) {
      throw new Error('Failed to fetch game metadata');
    }
    const info = metaRes.data;
    const latest = info.latestVersion;

    let needDownload = true;
    if (fs.existsSync(zipPath)) {
      const stats = await fs.promises.stat(zipPath);
      needDownload = stats.size !== latest.sizeBytes;
    }

    if (needDownload) {
      const params: DownloadGameParams = {
        author,
        name: gameName,
        desiredFileName: `${gameName}-latest`,
        downloadDirectory: latestDir,
        writeMetaData: false,
      };
      const res = await downloadGame(params);
      const response: DownloadGameResponse = Array.isArray(res) ? res[0] : res;
      if (!response.status) {
        throw new Error('Failed to download game');
      }
    }

    const catalog: ItchCatalog = {
      title: info.title,
      description: 'Manic Miners is an exciting fan-made remake of the classic 90s LEGO Rock Raiders game.',
      versionDisplayName: latest.displayName,
      versionFilename: latest.filename,
      fileSize: latest.sizeBytes,
      versionMd5: latest.md5Hash,
      platforms: latest.platforms,
      author: info.authors[0].name,
      authorUrl: info.authors[0].url,
      coverImg: info.coverImage,
      gamePage: info.gamePage,
      commentsUrl: info.comments,
      localFilePath: zipPath,
      versionReleaseDate: latest.releaseDate,
    };

    await fs.promises.writeFile(cacheFile, JSON.stringify({ timestamp: Date.now(), data: catalog }));
    return { status: true, message: 'Fetched latest version information.', catalog };
  } catch (err: any) {
    return { status: false, message: `Failed to fetch latest version: ${err.message}` };
  }
}
