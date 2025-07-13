export interface Platforms {
	windows: boolean;
	mac: boolean;
	linux: boolean;
	android: boolean;
}

export interface CatalogData {
	title: string;
	description: string;
	versionDisplayName: string;
	versionFilename: string;
	fileId: string;
	fileName: string;
	gameId: string;
	versionId: string;
	fileSize: number;
	versionMd5: string;
	platforms: Platforms;
	author: string;
	authorUrl: string;
	coverImg: string;
	thumbnail: string;
	gamePage: string;
	commentsUrl: string;
	publicFileUrl: string;
	downloadUrl: string;
	downloadStreamUrl: string;
	versionReleaseDate: string;
	fileModTime: string;
	date: string;
}

export interface CheckLatestVersionResult {
	status: boolean;
	updateOccurred: boolean;
	message: string;
	catalogData: CatalogData | null;
}
