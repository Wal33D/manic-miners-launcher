import { fetchLevelsData } from './fetchLevelsData';
import { downloadArchivedLevelData } from './downloadArchivedLevelData';

export const initArchivedCatalog = async (): Promise<any> => {
   const indexResults = await fetchLevelsData();
   const downloadResults = await downloadArchivedLevelData();

   let message = 'The catalog is up-to-date. No updates were performed.';
   if (indexResults.updateNeeded) {
      message = `${indexResults.processedCount} entries were updated successfully and files were downloaded.`;
   } else if (indexResults.updateNeeded) {
      message = `${indexResults.processedCount} entries were updated successfully.`;
   }

   return {
      ...indexResults,
      ...downloadResults,
      message,
   };
};
