import fs from 'fs';

export const readCatalogIndex = async (filePath: string): Promise<any> => {
   try {
      const cacheFile = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(cacheFile);
   } catch {
      return { catalog: 'Archived', catalogType: 'Level', entries: [] };
   }
};

export const writeCatalogIndex = async (filePath: string, data: any) => {
   await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};
