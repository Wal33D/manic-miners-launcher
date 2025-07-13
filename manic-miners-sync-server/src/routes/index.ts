import { Router } from 'express';
import { checkLatestVersion } from '../checkLatestVersion';
import { streamFileFromGoogleDrive } from 'gdrive-node-uploader';
import path from 'path';
import fs from 'fs';

const router = Router();
const BASE_DIRECTORY = path.resolve(__dirname, '..', '..', 'latestVersion');
const FILE_NAME = 'manic-miners-latest.zip';
const FILE_PATH = path.join(BASE_DIRECTORY, FILE_NAME);

router.get('/', async (req, res) => {
	try {
		const { message, catalogData } = await checkLatestVersion();
		if (!res.headersSent) {
			res.status(200).json({
				message,
				catalogData,
			});
		}
	} catch (error: any) {
		if (error.code !== 'ECONNABORTED') {
			console.error('[SERVER ERROR]', error);
		}
		if (!res.headersSent) {
			res.status(500).send('Failed to check latest version file existence and metadata consistency.');
		}
	}
});

// New route to handle the streaming download
router.get('/download-stream', async (req, res) => {
	try {
		const { catalogData } = await checkLatestVersion();
		if (catalogData && catalogData.downloadUrl) {
			const onAborted = () => {
				res.end();
			};
			req.on('aborted', onAborted);
			await streamFileFromGoogleDrive({ fileUrl: catalogData.publicFileUrl }, res);
			req.off('aborted', onAborted); // Clean up the aborted event listener
		} else {
			if (!res.headersSent) {
				res.status(404).send('Download URL not found.');
			}
		}
	} catch (error: any) {
		if (error.code !== 'ECONNABORTED') {
			console.error(`[SERVER ERROR]`, error);
		}
		if (!res.headersSent) {
			res.status(500).send('An error occurred while processing your request.');
		}
	}
});

// New route to serve the local file
router.get('/download-direct', (req, res) => {
	try {
		if (fs.existsSync(FILE_PATH)) {
			const onAborted = () => {
				res.end();
			};
			req.on('aborted', onAborted);
			res.download(FILE_PATH, FILE_NAME, (err: any) => {
				if (err && err.code !== 'ECONNABORTED') {
					console.error('[SERVER ERROR]', err);
					if (!res.headersSent) {
						res.status(500).send('Error downloading the file.');
					}
				}
			});
			req.off('aborted', onAborted); // Clean up the aborted event listener
		} else {
			if (!res.headersSent) {
				res.status(404).send('File not found.');
			}
		}
	} catch (error: any) {
		if (error.code !== 'ECONNABORTED') {
			console.error(`[SERVER ERROR]`, error);
		}
		if (!res.headersSent) {
			res.status(500).send('An error occurred while processing your request.');
		}
	}
});

export default router;
