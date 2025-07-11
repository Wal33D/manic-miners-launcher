import fs from 'fs';
import path from 'path';
import StreamZip from 'node-stream-zip';

/**
 * Validates a zip entry name against a target base directory to
 * prevent path traversal and absolute path extraction.
 * Returns the resolved extraction path if valid.
 */
export function validateUnpackPath({ basePath, entryName }: { basePath: string; entryName: string }): string {
  const resolvedPath = path.resolve(basePath, entryName);
  if (entryName.includes('..') || path.isAbsolute(entryName) || !resolvedPath.startsWith(path.resolve(basePath))) {
    throw new Error(`Invalid entry path detected: ${entryName}`);
  }
  return path.join(basePath, entryName);
}

/**
 * Extracts all entries from a StreamZip archive into the target path.
 * Progress updates are reported via the optional updateStatus callback.
 */
export async function extractZipEntries({
  zip,
  targetPath,
  updateStatus,
  progressStart = 0,
  progressSpan = 100,
}: {
  zip: StreamZip.StreamZipAsync;
  targetPath: string;
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
  progressStart?: number;
  progressSpan?: number;
}): Promise<void> {
  const entries = (await zip.entries()) as Record<string, StreamZip.ZipEntry>;
  const totalFiles = Object.keys(entries).length || 1;
  let extractedFiles = 0;

  for (const entry of Object.values(entries)) {
    const fullPath = validateUnpackPath({ basePath: targetPath, entryName: entry.name });

    if (entry.isDirectory) {
      await fs.promises.mkdir(fullPath, { recursive: true });
    } else {
      const dirPath = path.dirname(fullPath);
      try {
        await fs.promises.access(dirPath);
      } catch {
        await fs.promises.mkdir(dirPath, { recursive: true });
      }
      await zip.extract(entry.name, fullPath);
    }

    extractedFiles++;
    if (updateStatus) {
      const progress = progressStart + (extractedFiles / totalFiles) * progressSpan;
      updateStatus({ status: 'Extracting files...', progress });
    }
  }
}

/**
 * If the target directory contains a single subdirectory, move its
 * contents up one level and remove the nested directory.
 */
export async function flattenSingleSubdirectory(targetPath: string): Promise<void> {
  const dirEntries = await fs.promises.readdir(targetPath);
  const subdirectories: string[] = [];
  for (const subDir of dirEntries) {
    const stat = await fs.promises.stat(path.join(targetPath, subDir));
    if (stat.isDirectory()) {
      subdirectories.push(subDir);
    }
  }

  if (subdirectories.length === 1) {
    const nestedDir = path.join(targetPath, subdirectories[0]);
    const nestedFiles = await fs.promises.readdir(nestedDir);
    for (const file of nestedFiles) {
      await fs.promises.rename(path.join(nestedDir, file), path.join(targetPath, file));
    }
    await fs.promises.rmdir(nestedDir);
  }
}

