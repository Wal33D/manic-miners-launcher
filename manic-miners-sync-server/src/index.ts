import routes from './routes';
import dotenv from 'dotenv';
import express from 'express';
import { GmailMailer } from 'gmail-node-mailer';
import { checkLatestVersion } from './checkLatestVersion';
import { sendUpdateNotification } from './sendUpdateNotification';
import { CheckLatestVersionResult } from './types/types';
import { ensureLatestVersionFile } from './ensureLatestVersionFile';
dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3256;

app.use(express.json());
app.use('/', routes);

// Initial logging
console.log(`[SERVER] Starting Manic Miners Sync Server...`);

async function updateLatestVersion() {
	try {
		const latestResult: CheckLatestVersionResult = await checkLatestVersion();
		console.log(latestResult.catalogData);
		if (latestResult.status && latestResult.updateOccurred) {
			console.log(`[SERVER] Latest version info up to date.`);
			await sendUpdateNotification(latestResult.catalogData);
		}
	} catch (error: any) {
		console.error(`[SERVER ERROR]`, error);
		await sendUpdateNotification(null, `An error occurred: ${error.message}`);
	}
}

// Schedule the function to run periodically
const intervalHours = 12; // Set the interval to 12 hours
setInterval(() => {
	(async () => {
		await updateLatestVersion();
	})();
}, intervalHours * 60 * 60 * 1000);

// Run the first update without blocking server startup
(async () => {
	try {
		await initializeMailer();
		await updateLatestVersion();
		await ensureLatestVersionFile();
	} catch (err) {
		console.error(`[SERVER ERROR] Failed to start the update process:`, err);
	}
})();

app.listen(port, () => {
	console.log(`[SERVER] Running at http://localhost:${port}`);
});

// Initialize GmailMailer
async function initializeMailer() {
	const mailer = new GmailMailer();
	await mailer.initializeClient({});
	//@ts-ignore
	global.gmailClient = mailer;
}
