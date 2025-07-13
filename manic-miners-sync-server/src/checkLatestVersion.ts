import fs from 'fs';
import path from 'path';
import { fetchItchGameData } from 'itchio-metadata';
import { getTimeRemaining, formatDateString } from './utils';
import { CatalogData, CheckLatestVersionResult } from './types/types';
import { fileExists, uploadFileToGoogleDrive, UploadFileParams } from 'gdrive-node-uploader';
import { downloadGame, DownloadGameParams, DownloadGameResponse } from 'itchio-downloader';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const CACHE_DURATION = 12 * 60 * 60 * 1000;
const BASE_DIRECTORY = path.resolve(__dirname, '..', 'latestVersion');
const CACHE_FILE_PATH = path.join(BASE_DIRECTORY, 'catalog.json');

let uploadInProgress = false;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const readCache = (): any => (fs.existsSync(CACHE_FILE_PATH) ? JSON.parse(fs.readFileSync(CACHE_FILE_PATH, 'utf-8')) : null);
const writeCache = (data: any): void => fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(data), 'utf-8');

export const checkLatestVersion = async (
	author: string = 'baraklava',
	gameName: string = 'manic-miners',
	cacheDuration: number = CACHE_DURATION,
	downloadDir: string = BASE_DIRECTORY
): Promise<CheckLatestVersionResult> => {
	let status = true;
	let message = '';
	let catalogData: CatalogData | null = null;
	let updateOccurred = false;

	const cache = readCache();
	const now = Date.now();

	let fileCheckResult: any = await fileExists({ fileName: `${gameName}-latest.zip` });

	if (cache && now - cache.timestamp < cacheDuration && fileCheckResult.exists) {
		return {
			status: true,
			message: `Data is up to date. ${getTimeRemaining({ timestamp: cache.timestamp, cacheDuration })}`,
			catalogData: cache.data,
			updateOccurred,
		};
	}

	if (uploadInProgress) {
		return {
			status: false,
			message: 'An update is in progress, Please try again in a moment.',
			catalogData,
			updateOccurred,
		};
	}

	uploadInProgress = true;

	try {
		const latestVersionInfoResponse: any = await fetchItchGameData({ author, gameTitle: gameName });

		if (!latestVersionInfoResponse.status) throw new Error(`Failed to fetch game metadata.`);

		const { data: latestVersionInfo } = latestVersionInfoResponse;
		const latestVersion = latestVersionInfo.latestVersion;

		let matches = fileCheckResult.exists && fileCheckResult.fileSize === latestVersion.sizeBytes;
		message = matches ? 'File matches the latest version.' : 'File does not match the latest version.';

		if (!matches || !fileCheckResult.exists) {
			if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

			fs.readdirSync(downloadDir).forEach(file => fs.unlinkSync(path.join(downloadDir, file)));

			console.log(`[APP] Downloading the latest version of the game...`);
			const downloadParams: DownloadGameParams = {
				author,
				name: gameName,
				desiredFileName: `${gameName}-latest`,
				downloadDirectory: downloadDir,
				writeMetaData: false,
			};
			const downloadResult = await downloadGame(downloadParams);
			const downloadResponse: DownloadGameResponse = Array.isArray(downloadResult) ? downloadResult[0] : downloadResult;

			if (!downloadResponse.status) throw new Error(`Failed to download the game.`);

			console.log(`[APP] Download completed. File saved.`);

			console.log(`[APP] Uploading the file...`);
			const uploadParams: UploadFileParams = {
				filePath: downloadResponse.filePath!,
			};
			const uploadResult = await uploadFileToGoogleDrive(uploadParams);

			if (!uploadResult.status) throw new Error(`Failed to upload the file.`);

			console.log(`[APP] File uploaded successfully.`);

			await delay(5000);

			fileCheckResult = await fileExists({ fileName: `${gameName}-latest.zip` });
			if (!fileCheckResult.exists) throw new Error(`File does not exist after upload.`);
			message = 'Latest version downloaded and uploaded successfully.';
			updateOccurred = true;
		}

		const downloadStreamUrl = `${process.env.SERVER_URL}/download-stream`;
		const downloadUrl = `${process.env.SERVER_URL}/download-direct`;

		catalogData = {
			title: latestVersionInfo.title,
			description:
				'Manic Miners is an exciting fan-made remake of the classic 90s LEGO Rock Raiders game. This project, created by Baraklava, aims to revive the nostalgia of the original game while adding new features and improvements. It is in no way endorsed, sponsored, supported by, or related to the LEGO Company.',
			versionDisplayName: latestVersion.displayName,
			versionFilename: latestVersion.filename,
			fileId: fileCheckResult.fileId,
			fileName: fileCheckResult.fileName,
			gameId: latestVersionInfo.gameId,
			versionId: latestVersion.versionId,
			fileSize: fileCheckResult.fileSize,
			versionMd5: latestVersion.md5Hash,
			platforms: latestVersion.platforms,
			author: latestVersionInfo.authors[0].name,
			authorUrl: latestVersionInfo.authors[0].url,
			coverImg: latestVersionInfo.coverImage,
			thumbnail: 'https://res.cloudinary.com/dkfrhzkaf/image/upload/c_thumb,w_200,g_face/v1714996523/manic/ManicMiners_alt.png',
			gamePage: latestVersionInfo.gamePage,
			commentsUrl: latestVersionInfo.comments,
			downloadUrl,
			downloadStreamUrl,
			publicFileUrl: fileCheckResult.fileUrl,
			versionReleaseDate: formatDateString(latestVersion.releaseDate),
			fileModTime: formatDateString(fileCheckResult.modifiedTime),
			date: formatDateString(new Date().toISOString()),
		};

		writeCache({ timestamp: now, data: catalogData });
		message = `Data is up to date. ${getTimeRemaining({ timestamp: now, cacheDuration })}`;
	} catch (error: any) {
		console.error(`[ERROR]`, error);
		status = false;
		message = `An error occurred: ${error.message}`;

		if (cache) {
			console.warn('Falling back to cached data due to error.');
			catalogData = cache.data;
		}
	} finally {
		uploadInProgress = false;
	}

	if (!catalogData) {
		status = false;
		message = 'Unable to retrieve catalog data.';
		catalogData = cache ? cache.data : ({} as CatalogData);
	}

	return { status, message, catalogData, updateOccurred };
};
