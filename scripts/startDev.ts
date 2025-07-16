#!/usr/bin/env ts-node
import { config } from 'dotenv';
import { spawn } from 'child_process';
import { join } from 'path';

// Load environment variables
config();

// Set NODE_ENV to development
process.env.NODE_ENV = 'development';

// Path to the main package.json
const rootDir = join(__dirname, '..');

// Start the launcher with dev settings
const launcher = spawn('pnpm', ['run', 'generate:assets'], {
  cwd: rootDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
  },
});

launcher.on('close', code => {
  if (code === 0) {
    // After assets are generated, start electron-forge
    const electron = spawn('pnpm', ['electron-forge', 'start', '--', '--no-sandbox'], {
      cwd: rootDir,
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'development',
      },
    });

    electron.on('close', electronCode => {
      process.exit(electronCode || 0);
    });
  } else {
    process.exit(code || 1);
  }
});
