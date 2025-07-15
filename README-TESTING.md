# Testing Guide for Manic Miners Launcher

## Running Tests

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

### Troubleshooting

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
