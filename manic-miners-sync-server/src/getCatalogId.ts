interface GetCatalogIdParams {
	title: string;
	author?: string | string[];
	catalog: string;
}

interface CatalogIdResult {
	catalogId: number;
}

export const getCatalogId = ({ title, author, catalog }: GetCatalogIdParams): CatalogIdResult => {
	const camelCaseString = (input: string): string => {
		const words = input
			.replace(/'/g, '')
			.replace(/[^a-zA-Z0-9\s\-]/g, '')
			.split(/[\s\-]+/);
		return words.map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join('');
	};

	const generateId = (input: string): number => {
		let hash1 = 5381;
		let hash2 = 52711;
		for (let i = 0; i < input.length; i++) {
			hash1 = (hash1 * 33) ^ input.charCodeAt(i);
			hash2 = (hash2 * 33) ^ input.charCodeAt(i);
		}
		return (hash1 >>> 0) * 4096 + (hash2 >>> 0);
	};

	const camelCaseTitle = camelCaseString(title);
	const camelCaseAuthor = author ? camelCaseString(Array.isArray(author) ? author.join(' ') : author) : '';
	const camelCaseCatalogType = camelCaseString(catalog);
	const levelIdentifier = camelCaseAuthor
		? `${camelCaseTitle}_${camelCaseAuthor}_${camelCaseCatalogType}`
		: `${camelCaseTitle}_${camelCaseCatalogType}`;
	const catalogId = generateId(levelIdentifier);

	return { catalogId };
};
