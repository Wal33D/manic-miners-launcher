import { execSync } from 'child_process';
import { readdirSync, copyFileSync } from 'fs';
import { join } from 'path';

function run(cmd: string) {
  execSync(cmd, { stdio: 'inherit' });
}

const guiDir = join(__dirname, '..', 'launcher-gui');
run(`pnpm --prefix ${guiDir} install`);
run(`pnpm --prefix ${guiDir} run build`);

const distDir = join(guiDir, 'dist', 'assets');
const targetDir = join(__dirname, '..', 'src', 'renderer', 'assets');

for (const file of readdirSync(distDir)) {
  if (file.startsWith('index-') && file.endsWith('.css')) {
    copyFileSync(join(distDir, file), join(targetDir, 'index.css'));
  }
  if (file.startsWith('index-') && file.endsWith('.js')) {
    copyFileSync(join(distDir, file), join(targetDir, 'index.js'));
  }
}

// Copy images from GUI public folder to renderer assets
const guiPublicDir = join(guiDir, 'public');
const imageFiles = readdirSync(guiPublicDir).filter(file => 
  file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
);

for (const imageFile of imageFiles) {
  copyFileSync(join(guiPublicDir, imageFile), join(targetDir, imageFile));
}
