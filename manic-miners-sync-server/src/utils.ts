export const formatDateString = (dateStr: string) =>
	new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short',
	});

export const getTimeRemaining = ({ timestamp, cacheDuration = 12 * 60 * 60 * 1000 }: { timestamp: number; cacheDuration?: number }): string => {
	const now = Date.now();
	const timeLeft = cacheDuration - (now - timestamp);
	const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
	const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
	return `Next cache refresh in ${hoursLeft} hours and ${minutesLeft} minutes.`;
};

export function convertToDirectDownloadLink(driveLink: string): string {
	const fileId = driveLink.match(/\/d\/(.*?)\//)?.[1];
	if (!fileId) {
		throw new Error('Invalid Google Drive link');
	}
	return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
