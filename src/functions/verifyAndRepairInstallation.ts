import fs from 'fs/promises';
import path from 'path';
import StreamZip from 'node-stream-zip';
import crypto from 'crypto';
import { downloadLatestVersion } from './downloadLatestVersion';

interface FileVerificationResult {
  path: string;
  exists: boolean;
  sizeCorrect: boolean;
  expectedSize: number;
  actualSize: number;
  needsRepair: boolean;
}

interface VerificationProgress {
  status: string;
  progress: number;
  filesChecked?: number;
  totalFiles?: number;
  repairsNeeded?: number;
  currentFile?: string;
}

export async function verifyAndRepairInstallation({
  installPath,
  tempDir,
  version,
  onProgress,
}: {
  installPath: string;
  tempDir: string;
  version: string;
  onProgress: (progress: VerificationProgress) => void;
}): Promise<{ success: boolean; message: string }> {
  try {
    const identifier = `ManicMiners-Baraklava-V${version}`;
    const zipPath = path.join(tempDir, `${identifier}.zip`);

    onProgress({ status: 'Starting verification...', progress: 5 });

    // Step 1: Download fresh copy to temp directory
    onProgress({ status: 'Downloading fresh copy for verification...', progress: 10 });

    // Remove old temp files
    try {
      await fs.unlink(zipPath);
    } catch {
      // Ignore if doesn't exist
    }

    // Download fresh copy using new download function
    const downloadResult = await downloadLatestVersion({
      targetDirectory: tempDir,
      onProgress: progressData => {
        // Map progress to 10-40% range
        const mappedProgress = Math.floor((progressData.progress / 100) * 30) + 10;
        onProgress({
          status: progressData.status,
          progress: mappedProgress,
        });
      },
    });

    if (!downloadResult.success) {
      throw new Error(`Failed to download verification copy: ${downloadResult.message}`);
    }

    if (!downloadResult.filePath) {
      throw new Error('Download completed but file path not available');
    }

    // Use the file path returned by the download function
    const actualZipPath = downloadResult.filePath;

    // Verify the file exists
    try {
      await fs.access(actualZipPath);
    } catch {
      throw new Error(`Downloaded zip file not found at: ${actualZipPath}`);
    }

    onProgress({ status: 'Analyzing reference files...', progress: 45 });

    // Step 2: Extract and analyze the fresh copy
    const referenceDir = path.join(tempDir, 'reference');
    await fs.mkdir(referenceDir, { recursive: true });

    const zip = new StreamZip.async({ file: actualZipPath });
    
    // Extract with detailed progress
    const entries = await zip.entries();
    const entryArray = Object.values(entries);
    const totalExtractFiles = entryArray.length;
    let extractedFiles = 0;

    onProgress({ status: `Extracting ${totalExtractFiles} reference files...`, progress: 45 });

    for (const entry of entryArray) {
      const progress = 45 + Math.floor((extractedFiles / totalExtractFiles) * 3); // 45-48% range
      
      if (entry.isDirectory) {
        await zip.extract(entry.name, referenceDir);
        onProgress({ 
          status: `Created reference directory: ${path.basename(entry.name)}`, 
          progress 
        });
      } else {
        await zip.extract(entry.name, referenceDir);
        onProgress({ 
          status: `Extracted reference: ${path.basename(entry.name)}`, 
          progress 
        });
      }
      
      extractedFiles++;
      
      // Small delay to make progress visible
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    await zip.close();

    // Flatten single subdirectory if needed
    const referenceContents = await fs.readdir(referenceDir);
    if (referenceContents.length === 1) {
      const subDir = path.join(referenceDir, referenceContents[0]);
      const stat = await fs.stat(subDir);
      if (stat.isDirectory()) {
        const subContents = await fs.readdir(subDir);
        for (const item of subContents) {
          await fs.rename(path.join(subDir, item), path.join(referenceDir, item));
        }
        await fs.rmdir(subDir);
      }
    }

    // Step 3: Get file list from reference
    const referenceFiles = await getFileList(referenceDir);
    onProgress({
      status: 'Verifying installation files...',
      progress: 50,
      totalFiles: referenceFiles.length,
    });

    // Step 4: Verify each file
    const verificationResults: FileVerificationResult[] = [];
    let filesChecked = 0;
    let repairsNeeded = 0;

    for (const relativeFilePath of referenceFiles) {
      const referencePath = path.join(referenceDir, relativeFilePath);
      const installedPath = path.join(installPath, relativeFilePath);

      onProgress({
        status: `Checking: ${relativeFilePath}`,
        progress: 50 + Math.floor((filesChecked / referenceFiles.length) * 30),
        filesChecked,
        totalFiles: referenceFiles.length,
        currentFile: relativeFilePath,
      });

      const referenceStats = await fs.stat(referencePath);
      const result: FileVerificationResult = {
        path: relativeFilePath,
        exists: false,
        sizeCorrect: false,
        expectedSize: referenceStats.size,
        actualSize: 0,
        needsRepair: false,
      };

      try {
        const installedStats = await fs.stat(installedPath);
        result.exists = true;
        result.actualSize = installedStats.size;
        result.sizeCorrect = installedStats.size === referenceStats.size;
        result.needsRepair = !result.sizeCorrect;
      } catch {
        result.needsRepair = true;
      }

      if (result.needsRepair) {
        repairsNeeded++;
      }

      verificationResults.push(result);
      filesChecked++;
    }

    onProgress({
      status: `Verification complete. ${repairsNeeded} files need repair.`,
      progress: 80,
      filesChecked,
      totalFiles: referenceFiles.length,
      repairsNeeded,
    });

    // Step 5: Repair files if needed
    if (repairsNeeded > 0) {
      let filesRepaired = 0;
      
      onProgress({
        status: `Starting repair of ${repairsNeeded} files...`,
        progress: 80,
        repairsNeeded,
      });
      
      for (const result of verificationResults) {
        if (result.needsRepair) {
          const sourceFile = path.join(referenceDir, result.path);
          const targetFile = path.join(installPath, result.path);

          onProgress({
            status: `Repairing: ${path.basename(result.path)}`,
            progress: 80 + Math.floor((filesRepaired / repairsNeeded) * 15),
            repairsNeeded,
            currentFile: result.path,
          });

          // Ensure target directory exists
          await fs.mkdir(path.dirname(targetFile), { recursive: true });

          // Copy the correct file
          await fs.copyFile(sourceFile, targetFile);
          filesRepaired++;
          
          // Small delay to make progress visible
          await new Promise(resolve => setTimeout(resolve, 20));
        }
      }
      
      onProgress({
        status: `Completed repair of ${repairsNeeded} files`,
        progress: 95,
        repairsNeeded,
      });
    }

    // Step 6: Cleanup
    onProgress({ status: 'Cleaning up temporary files...', progress: 95 });
    try {
      await fs.rmdir(referenceDir, { recursive: true });
      await fs.unlink(actualZipPath);
    } catch {
      // Ignore cleanup errors
    }

    onProgress({
      status:
        repairsNeeded > 0 ? `Verification complete. Repaired ${repairsNeeded} files.` : 'Verification complete. All files are correct.',
      progress: 100,
    });

    return {
      success: true,
      message:
        repairsNeeded > 0
          ? `Installation verified and repaired. ${repairsNeeded} files were fixed.`
          : 'Installation verified successfully. All files are correct.',
    };
  } catch (error) {
    console.error('Verification/repair error:', error);
    onProgress({
      status: `Verification failed: ${error.message}`,
      progress: 0,
    });
    return {
      success: false,
      message: `Verification failed: ${error.message}`,
    };
  }
}

async function getFileList(directory: string, basePath = ''): Promise<string[]> {
  const files: string[] = [];
  const items = await fs.readdir(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    const relativePath = path.join(basePath, item);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      const subFiles = await getFileList(fullPath, relativePath);
      files.push(...subFiles);
    } else {
      files.push(relativePath);
    }
  }

  return files;
}
