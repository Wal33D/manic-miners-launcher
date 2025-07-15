import { execSync } from 'child_process';
import { readdirSync, copyFileSync } from 'fs';
import { join } from 'path';

function run(cmd: string) {
  execSync(cmd, { stdio: 'inherit' });
}

const guiDir = join(__dirname, '..', 'launcher-gui');
run(`pnpm --prefix "${guiDir}" install`);
run(`pnpm --prefix "${guiDir}" run build`);

const distDir = join(guiDir, 'dist', 'assets');
const targetDir = join(__dirname, '..', 'src', 'renderer', 'assets');

for (const file of readdirSync(distDir)) {
  const sourcePath = join(distDir, file);
  const targetPath = join(targetDir, file);
  
  // Copy all files from dist/assets to maintain lazy loading chunks
  copyFileSync(sourcePath, targetPath);
  
  // Additionally create renamed main files for backward compatibility
  if (file.startsWith('index-') && file.endsWith('.css')) {
    copyFileSync(sourcePath, join(targetDir, 'index.css'));
  }
  if (file.startsWith('index-') && file.endsWith('.js')) {
    copyFileSync(sourcePath, join(targetDir, 'index.js'));
  }
}

// Note: Images are now served from the assets endpoint
// No need to copy image files locally
