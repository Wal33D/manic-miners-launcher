import fs from 'fs/promises';
import path from 'path';
import { IFileDetails, IVerifyFileParams } from './fileUtilsTypes';
import { logger } from '../utils/logger';

export async function ensureDirectory({ directory }: { directory: string }): Promise<{ created: boolean; existed: boolean }> {
  let existed = false;
  try {
    const temporaryDirectory = directory.endsWith('.0') ? `${directory}_` : directory;

    try {
      await fs.access(temporaryDirectory);
      existed = true;
    } catch {
      await fs.mkdir(temporaryDirectory, { recursive: true });
    }

    if (temporaryDirectory !== directory && !existed) {
      await fs.rename(temporaryDirectory, directory);
    }

    return { created: !existed, existed };
  } catch (error) {
    logger.error('FILE_OPS', 'Failed to create/detect directory', { directory, error: error.message }, error);
    return { created: false, existed };
  }
}

export const verifyFile = async (params: IVerifyFileParams): Promise<IFileDetails> => {
  const { filePath, expectedSize } = params;

  let exists = false;
  let sizeMatches = false;
  let isFile = false;
  let isDirectory = false;
  let isSymbolicLink = false;
  let size = 0;
  let createdAt = 0;
  let updatedAt = 0;
  let accessedAt = 0;
  const name = path.basename(filePath);
  const extension = path.extname(filePath);
  const pathFull = path.resolve(filePath);
  const pathRelative = path.relative(process.cwd(), pathFull);
  let permissions = '';

  try {
    const stats = await fs.lstat(pathFull);
    exists = true;
    size = stats.size;
    isFile = stats.isFile();
    isDirectory = stats.isDirectory();
    isSymbolicLink = stats.isSymbolicLink();
    permissions = `0${(stats.mode & parseInt('777', 8)).toString(8)}`;
    sizeMatches = expectedSize !== undefined ? size === expectedSize : false;
    accessedAt = stats.atimeMs;
    updatedAt = stats.ctimeMs;
    createdAt = stats.birthtimeMs;
  } catch {
    exists = false;
  }

  return {
    exists,
    size,
    sizeMatches,
    name,
    extension,
    pathRelative,
    pathFull,
    isFile,
    isDirectory,
    isSymbolicLink,
    permissions,
    accessedAt,
    updatedAt,
    createdAt,
  };
};
