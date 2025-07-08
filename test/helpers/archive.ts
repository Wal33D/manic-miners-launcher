import archiver from 'archiver';
import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';
import { once } from 'events';

export async function createArchive({
  outputPath,
  files,
}: {
  outputPath: string;
  files: { filePath: string; name?: string }[];
}): Promise<void> {
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);
  for (const { filePath, name } of files) {
    archive.file(filePath, { name: name ?? path.basename(filePath) });
  }
  await archive.finalize();
  await once(output, 'close');
}

export async function createZipFromContent(dir: string, filename: string, content: string): Promise<void> {
  const file = path.join(dir, 'file.txt');
  await fs.promises.writeFile(file, content);
  const outputPath = path.join(dir, filename);
  await createArchive({ outputPath, files: [{ filePath: file, name: 'file.txt' }] });
}

export async function createTraversalZip(dir: string, filename: string): Promise<void> {
  const outside = path.join(dir, 'evil.txt');
  await fs.promises.writeFile(outside, 'evil');
  const data = await fs.promises.readFile(outside);
  const zip = new JSZip();
  zip.file('../evil.txt', data);
  const content = await zip.generateAsync({ type: 'nodebuffer' });
  const outputPath = path.join(dir, filename);
  await fs.promises.writeFile(outputPath, content);
}
