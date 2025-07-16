# Manic Miners Launcher

🚀 Modern Electron-based launcher for Manic Miners (LEGO Rock Raiders remake) with automated downloads, version management, and beautiful React UI.

## Overview

The **Manic Miners Launcher** is a dedicated desktop application that provides a modern, user-friendly interface for managing and playing Manic Miners. It brings the classic LEGO Rock Raiders experience to modern systems with enhanced features and automated game management.

## Key Features

- 🎯 **Easy Game Management** - Download, install, and manage multiple game versions
- 🚀 **Automatic Updates** - Stay up-to-date with the latest game releases
- 🎨 **Modern Interface** - Beautiful React-based UI with game trailers and news
- 🔧 **Advanced Tools** - Version verification, repair, and system integration
- 📱 **Cross-Platform** - Works on Windows, macOS, and Linux
- 🔗 **Itch.io Integration** - Automated downloads from itch.io

## Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Electron 37 + Node.js
- **Build Tools**: Vite + Webpack + Electron Forge
- **Package Manager**: pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm start

# Build distributables
pnpm make
```

## Testing

### Unit Tests

Run the standard unit tests (mocked downloads):

```bash
npm test
```

### Real Download Integration Tests

These tests actually download files from itch.io and require special setup:

#### Requirements

1. **Electron Environment**: These tests must run inside Electron, not plain Node.js
2. **Network Connection**: Active internet connection to download from itch.io
3. **Disk Space**: At least 1GB free space for downloading and extracting game files

#### Running Real Tests

##### Option 1: Run inside Electron (Recommended)

```bash
# Start the Electron app with test flag
RUN_REAL_DOWNLOAD_TESTS=true npm start -- --run-tests
```

##### Option 2: Use Electron Mocha Runner

```bash
# Install electron-mocha globally
npm install -g electron-mocha

# Run real download tests
RUN_REAL_DOWNLOAD_TESTS=true electron-mocha src/tests/realDownloadIntegration.test.ts --timeout 300000
```

##### Option 3: Create Test Script

Add to your main.ts:

```typescript
if (process.argv.includes('--run-tests')) {
  // Run tests inside Electron
  const { app } = require('electron');
  app.whenReady().then(() => {
    require('mocha/cli/cli').main(['src/tests/realDownloadIntegration.test.ts']);
  });
}
```

### Test Environment Variables

- `RUN_REAL_DOWNLOAD_TESTS=true` - Enable real download tests
- `MANIC_MINERS_INSTALL_PATH=/custom/path` - Override default installation directory

### What the Real Tests Do

1. **Download Test**:
   - Opens itch.io page in headless browser
   - Clicks download button
   - Downloads actual game ZIP file (~500MB)
   - Extracts all files
   - Verifies executable exists

2. **Integrity Test**:
   - Downloads file
   - Verifies ZIP signature
   - Lists contents
   - Checks file count

3. **Interruption Test**:
   - Tests graceful handling of download cancellation
   - Verifies cleanup

### Troubleshooting Tests

#### "This test requires Electron environment"

The tests are skipping because they're running in Node.js instead of Electron. Use one of the Electron-based running methods above.

#### Download fails

- Check internet connection
- Verify itch.io is accessible
- Check if download button selectors have changed on itch.io

#### Extraction fails

- Ensure sufficient disk space
- Check file permissions in test directory

### CI/CD Considerations

Real download tests should NOT run in CI/CD pipelines because:

- They require Electron display server
- They depend on external service (itch.io)
- They download large files (500MB+)
- They take significant time (5+ minutes)

Keep real download tests for:

- Local development verification
- Pre-release manual testing
- Debugging download issues

## Requirements

- Node.js 20 or later
- pnpm package manager
- Currently supports Windows systems (macOS and Linux support in development)

## Upcoming Features

See our [Roadmap](https://github.com/Wal33D/manic-miners-launcher/wiki/Roadmap) for planned features including:

- Level download system with GUI
- Map collection expansion (Hognose + Discord community maps)
- Save editor system
- Map profiler tool
- User feedback integration

## Documentation

📚 **Full documentation available in our [Wiki](https://github.com/Wal33D/manic-miners-launcher/wiki)**

- [Installation Guide](https://github.com/Wal33D/manic-miners-launcher/wiki/Installation-Guide)
- [User Guide](https://github.com/Wal33D/manic-miners-launcher/wiki/User-Guide)
- [Development Setup](https://github.com/Wal33D/manic-miners-launcher/wiki/Development-Setup)
- [Project Architecture](https://github.com/Wal33D/manic-miners-launcher/wiki/Project-Architecture)
- [API Reference](https://github.com/Wal33D/manic-miners-launcher/wiki/API-Reference)
- [Contributing Guidelines](https://github.com/Wal33D/manic-miners-launcher/wiki/Contributing-Guidelines)

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](https://github.com/Wal33D/manic-miners-launcher/wiki/Contributing-Guidelines) to get started.

## Support

- 🐛 **Found a bug?** [Report it here](https://github.com/Wal33D/manic-miners-launcher/issues)
- 💡 **Have a feature request?** [Suggest it here](https://github.com/Wal33D/manic-miners-launcher/issues)
- 💬 **Need help?** Check our [FAQ](https://github.com/Wal33D/manic-miners-launcher/wiki/FAQ) or [Troubleshooting](https://github.com/Wal33D/manic-miners-launcher/wiki/Troubleshooting) guides
