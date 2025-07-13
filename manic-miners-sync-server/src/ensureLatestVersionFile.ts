import fs from 'fs';
import path from 'path';
import { downloadFileFromGoogleDrive } from 'gdrive-node-uploader';
import { fileExists } from 'gdrive-node-uploader';

const BASE_DIRECTORY = path.resolve(__dirname, '..', 'latestVersion');
const FILE_NAME = 'manic-miners-latest.zip';
const FILE_PATH = path.join(BASE_DIRECTORY, FILE_NAME);

export const ensureLatestVersionFile = async () => {
	// Ensure the directory exists, creating it recursively if necessary
	if (!fs.existsSync(BASE_DIRECTORY)) {
		fs.mkdirSync(BASE_DIRECTORY, { recursive: true });
		console.log(`[APP] Created directory ${BASE_DIRECTORY}`);
	}

	// Check if the file exists locally
	if (!fs.existsSync(FILE_PATH)) {
		console.log(`[APP] ${FILE_NAME} does not exist locally. Downloading from Google Drive...`);
		const fileCheckResult = await fileExists({ fileName: FILE_NAME });

		if (fileCheckResult.exists) {
			await downloadFileFromGoogleDrive({ fileId: fileCheckResult.fileId, downloadPath: FILE_PATH });
			console.log(`[APP] ${FILE_NAME} downloaded successfully to ${FILE_PATH}.`);
		} else {
			throw new Error(`[APP] ${FILE_NAME} does not exist on Google Drive.`);
		}
	} else {
		console.log(`[APP] ${FILE_NAME} already exists locally.`);
	}
};
