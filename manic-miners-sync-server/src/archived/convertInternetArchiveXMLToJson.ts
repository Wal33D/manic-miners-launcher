import { parse } from 'node-html-parser';
import { getCatalogId } from '../getCatalogId';
import { parseStringPromise } from 'xml2js';

export async function convertInternetArchiveXMLToJson(xml: string, files: any[], thumbnailUrl: string): Promise<any> {
	try {
		const result = await parseStringPromise(xml, {
			explicitArray: false,
			trim: true,
			mergeAttrs: true,
		});
		const metadata = result.metadata;
		const author = metadata.creator;
		const catalog = 'Archived';
		const title = metadata.title.split('|')[0].trim();
		const catalogId = getCatalogId({ title, author, catalog: 'Archived' }).catalogId;

		const description = parse(metadata.description).innerText.trim();

		const screenshotFile = files.find((file: any) => ['PNG', 'JPG', 'JPEG'].includes(file.fileType.toUpperCase()));
		const screenshot = screenshotFile ? screenshotFile.fileUrl : null;

		const datFile = files.find((file: any) => file.fileName.endsWith('.dat'));
		const primaryMap = datFile ? datFile.fileName : '';

		const archiveFile = files.find((file: any) => ['.zip', '.rar', '.7z', '.tar', '.gz'].some(ext => file.fileName.endsWith(ext)));
		const primaryAssets = archiveFile ? archiveFile.fileName : '';

		const parsedJson = {
			catalog,
			catalogType: 'Level',
			catalogId,
			pre_release: true,
			title,
			author: author,
			postedDate: metadata.date,
			description,
			thumbnail: thumbnailUrl,
			screenshot,
			primaryMap,
			primaryAssets,
			originalIdentifier: metadata.identifier,
			originalContent: metadata.description,
			originalUrl: `https://archive.org/details/${metadata.identifier}`,
			levelDirectory: `\\${catalogId}`,
			files,
		};

		return parsedJson;
	} catch (error) {
		console.error('Error parsing XML to JSON:', error);
		throw error;
	}
}
