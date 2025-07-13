import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { getCatalogId } from '../getCatalogId';
import { parseXmlToJson } from '../parseXmlToJson';
import { fetchWithRetries } from './fetchWithRetries';
import { ensureDirectoryExists } from './ensureDirectoryExists';
import { writeCatalogIndex, readCatalogIndex } from './catalogIndexUtils';
import { convertInternetArchiveXMLToJson } from './convertInternetArchiveXMLToJson';

dotenv.config({ path: '.env.local' });

const baseUrl = 'https://archive.org/advancedsearch.php';
const queryString = 'manic miners';
const REQUEST_DELAY = 500;
const CATALOG_DIR: any = process.env.ARCHIVED_MAP_CATALOG_DIR;
const CATALOG_FILENAME = 'catalog_index.json';

const downloadThumbnail = async (thumbnailUrl: string, thumbnailPath: string) => {
	const response = await axios({
		url: thumbnailUrl,
		method: 'GET',
		responseType: 'stream',
	});

	await new Promise((resolve, reject) => {
		const writer = fs.createWriteStream(thumbnailPath);
		response.data.pipe(writer);
		let error: Error | null = null;
		writer.on('error', err => {
			error = err;
			writer.close();
			reject(err);
		});
		writer.on('close', () => {
			if (!error) {
				resolve(true);
			}
		});
	});
};

const saveCatalog = async (catalogId: number, metadataXml: string, files: any[], thumbnailUrl: string, lastModified: string) => {
	const dirPath = path.join(CATALOG_DIR, `${catalogId}`);
	await ensureDirectoryExists(dirPath);
	const filePath = path.join(dirPath, 'catalog.json');

	const metadataJson = await convertInternetArchiveXMLToJson(metadataXml, files, thumbnailUrl);
	metadataJson.lastModified = lastModified;
	await fs.promises.writeFile(filePath, JSON.stringify(metadataJson, null, 2), 'utf8');

	if (thumbnailUrl) {
		const thumbnailPath = path.join(dirPath, 'thumbnail_original.png');
		if (!fs.existsSync(thumbnailPath)) {
			await downloadThumbnail(thumbnailUrl, thumbnailPath);
		}
	}
};
export const fetchLevelsData = async (): Promise<{ updateNeeded: boolean; processedCount: number; totalCount: number; errors: boolean }> => {
	await ensureDirectoryExists(CATALOG_DIR);
	const catalogIndexPath = path.join(CATALOG_DIR, CATALOG_FILENAME);
	const catalogIndexData = await readCatalogIndex(catalogIndexPath);
	const catalogIdentifiers = new Set(catalogIndexData.entries.map((entry: any) => entry.catalogId));

	const query = encodeURIComponent(queryString);
	const fields = ['title', 'identifier', 'creator', 'date', 'description', 'downloads'].join('&fl[]=');
	const fullUrl = `${baseUrl}?q=${query}&fl[]=${fields}&mediatype='software'&rows=99999999&page=1&output=json&callback=callback`;

	let errors = false;
	let updateNeeded = false;
	let processedCount = 0;

	try {
		const { data: text } = (await fetchWithRetries(fullUrl)) as any;
		const jsonp = text.substring(text.indexOf('(') + 1, text.lastIndexOf(')'));
		const data = JSON.parse(jsonp);

		const filteredResults = data.response.docs.filter(
			(doc: { title: string; identifier: string }) =>
				doc.title.toLowerCase().includes('manic') || doc.identifier.toLowerCase().includes('manic')
		);

		for (const doc of filteredResults.filter((doc: { identifier: string }) => doc.identifier.startsWith('ManicMiners-level-'))) {
			if (catalogIdentifiers.has(doc.identifier)) continue;

			const catalogId = getCatalogId({ title: doc.title, author: doc.creator, catalog: 'Archived' }).catalogId;
			if (catalogIndexData.entries.some((entry: any) => entry.catalogId === catalogId)) continue;

			updateNeeded = true;
			processedCount += 1;
			//  console.log(doc.title, doc.creator);

			const levelData = {
				catalog: 'Archived',
				catalogType: 'Level',
				catalogId,
				title: doc.title.split('|')[0].trim() || 'No title',
				postedDate: doc.date || 'No date',
				thumbnail: '',
				screenshot: '',
				downloadUrl: '',
				metadataUrl: `https://archive.org/download/${doc.identifier}/${doc.identifier}_meta.xml`,
				fileListUrl: `https://archive.org/download/${doc.identifier}/${doc.identifier}_files.xml`,
				lastModified: new Date().toISOString(),
			};

			try {
				const { data: xmlText } = (await fetchWithRetries(levelData.fileListUrl)) as any;
				const xmlData = parseXmlToJson(xmlText);

				const datFile: any = xmlData.find((file: any) => file.format === 'DAT');
				if (datFile) levelData.downloadUrl = `https://archive.org/download/${doc.identifier}/${datFile.name}`;

				const thumbnails: any = [];
				const files = xmlData
					.filter((file: any) => {
						if (file.format === 'Item Tile' || file.format === 'JPEG Thumb') {
							thumbnails.push(file);
							return false;
						}
						return (
							!file.name.endsWith('.torrent') &&
							!file.name.endsWith('.sqlite') &&
							!file.name.endsWith('_meta.xml') &&
							!file.name.endsWith('_files.xml')
						);
					})
					.map((file: any) => ({
						fileName: file.name,
						fileType: file.format,
						fileSize: parseInt(file.size, 10),
						filePath: `\\${file.name}`,
						fileUrl: `https://archive.org/download/${doc.identifier}/${file.name}`,
					}));

				const hasAssets = files.some((file: any) => ['.zip', '.rar', '.7z', '.tar', '.gz'].some(ext => file.fileName.endsWith(ext)));
				const hasScreenshot = files.some((file: any) => ['.png', '.jpeg', '.jpg', '.webp'].some(ext => file.fileName.endsWith(ext)));

				if (thumbnails.length) {
					const largestThumbnail = thumbnails.reduce((prev: { size: string }, current: { size: string }) =>
						parseInt(current.size, 10) > parseInt(prev.size, 10) ? current : prev
					);
					levelData.thumbnail = `https://archive.org/download/${doc.identifier}/${largestThumbnail.name}`;
				}

				const { data: metadataXml } = (await fetchWithRetries(levelData.metadataUrl)) as any;
				await saveCatalog(levelData.catalogId, metadataXml, files, levelData.thumbnail, levelData.lastModified);

				catalogIndexData.entries.push({
					catalogId: levelData.catalogId,
					title: levelData.title,
					hasCatalogJson: true,
					hasAssets,
					hasScreenshot,
					hasThumbnail: !!levelData.thumbnail,
					hasDatFile: !!levelData.downloadUrl,
					postedDate: levelData.postedDate,
					lastModified: levelData.lastModified,
				});

				await writeCatalogIndex(catalogIndexPath, catalogIndexData);
				await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
			} catch (error) {
				console.error(`Error processing ${doc.identifier}:`, error);
			}
		}
	} catch (error) {
		console.error('Error fetching data from the internet archive:', error);
		errors = true;
	}

	return { updateNeeded, processedCount, totalCount: catalogIndexData.entries.length, errors };
};
