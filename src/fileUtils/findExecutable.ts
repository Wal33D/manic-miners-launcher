import { promises as fsPromises } from 'fs';
import path from 'path';

/**
 * Recursively searches for an executable file within the given directory.
 * @param dirPath The directory path to search within.
 * @param exeFileName The name of the executable file to find.
 * @returns The path to the executable file or null if not found.
 */
export const findExecutable = async (dirPath: string, exeFileName: string): Promise<string | null> => {
  try {
    const files = await fsPromises.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        const foundPath = await findExecutable(filePath, exeFileName);
        if (foundPath) return foundPath;
      } else if (file.name === exeFileName) {
        return path.resolve(filePath); // Convert relative path to absolute path
      }
    }
  } catch (error) {
    console.error('Error searching for executable:', error);
  }
  return null;
};
