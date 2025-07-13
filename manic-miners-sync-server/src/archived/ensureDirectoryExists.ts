import fs from 'fs';

export const ensureDirectoryExists = async (dir: fs.PathLike) => {
   try {
      await fs.promises.stat(dir);
   } catch {
      await fs.promises.mkdir(dir, { recursive: true });
   }
};
