import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { ensureDirectoryExists } from './ensureDirectoryExists';

dotenv.config({ path: '.env.local' });

const CATALOG_DIR: any = process.env.ARCHIVED_MAP_CATALOG_DIR;

const readJsonFile = async (filePath: string): Promise<any> => {
   try {
      const fileData = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(fileData);
   } catch (error) {
      console.error(`Error reading JSON file at ${filePath}:`, error);
      throw error;
   }
};

const downloadFile = async (fileUrl: string, savePath: string) => {
   try {
      await ensureDirectoryExists(path.dirname(savePath));
      const response = await axios({
         url: fileUrl,
         method: 'GET',
         responseType: 'stream',
      });
      await new Promise((resolve, reject) => {
         const writer = fs.createWriteStream(savePath);
         response.data.pipe(writer);
         writer.on('finish', resolve);
         writer.on('error', reject);
      });
      return { fileUrl, savePath, status: 'success' };
   } catch (error: any) {
      console.error(`Error downloading file from ${fileUrl}:`, error);
      return { fileUrl, savePath, status: 'failed', error: error.message };
   }
};

const processCatalogFile = async (catalogPath: string) => {
   const results: any = [];
   try {
      const catalog = await readJsonFile(catalogPath);
      const parentDir = path.dirname(catalogPath);

      // Check if the directory contains more files than just catalog.json
      const filesInDir = await fs.promises.readdir(parentDir);
      if (filesInDir.length > 2) {
         return results;
      }

      for (const file of catalog.files) {
         let savePath = path.join(parentDir, file.fileName);

         if (file.fileUrl.includes('/old/') || file.fileUrl.includes('/old version/')) {
            const ext = path.extname(file.fileName);
            const baseName = path.basename(file.fileName, ext);
            savePath = path.join(parentDir, `${baseName}_old${ext}`);
         } else if (file.fileUrl.includes('/fixed version/')) {
            savePath = path.join(parentDir, file.fileName);
         }

         const result = await downloadFile(file.fileUrl, savePath);
         results.push(result);
      }
      if (catalog.thumbnail) {
         const thumbnailPath = path.join(parentDir, 'thumbnail_original.png');
         const result = await downloadFile(catalog.thumbnail, thumbnailPath);
         results.push(result);
      }
   } catch (error: any) {
      console.error(`Error processing catalog file at ${catalogPath}:`, error);
      results.push({ catalogPath, status: 'failed', error: error.message });
   }
   return results;
};

const traverseAndDownload = async (dir: string) => {
   const results = [];
   const entries = await fs.promises.readdir(dir, { withFileTypes: true });
   for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
         if (entry.name.toLowerCase() === 'old' || entry.name.toLowerCase() === 'old version' || entry.name.toLowerCase() === 'fixed version') {
            continue;
         }
         const catalogPath = path.join(fullPath, 'catalog.json');
         if (fs.existsSync(catalogPath)) {
            const catalogResults = await processCatalogFile(catalogPath);
            results.push(...catalogResults);
         }
         const subDirResults: any = await traverseAndDownload(fullPath);
         results.push(...subDirResults);
      }
   }
   return results;
};

export const downloadArchivedLevelData = async () => {
   await ensureDirectoryExists(CATALOG_DIR);
   const results = await traverseAndDownload(CATALOG_DIR);
   const updateNeeded = results.length > 0;
   return { updateNeeded };
};
