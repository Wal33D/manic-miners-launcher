import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import fs from 'fs/promises';
import path from 'path';
import { fetchInstalledVersions } from '../functions/fetchInstalledVersions';
import { logger } from '../utils/logger';

describe('Install Detection Tests', () => {
  let testDir: string;
  let originalEnv: string | undefined;

  beforeEach(async () => {
    // Create a temporary test directory
    testDir = path.join(process.cwd(), 'test-install-dir');
    await fs.mkdir(testDir, { recursive: true });

    // Set environment variable to use test directory
    originalEnv = process.env.MANIC_MINERS_INSTALL_PATH;
    process.env.MANIC_MINERS_INSTALL_PATH = testDir;

    await logger.clearLogs();
  });

  afterEach(async () => {
    // Clean up test directory
    try {
      await fs.rm(testDir, { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }

    // Restore environment
    if (originalEnv) {
      process.env.MANIC_MINERS_INSTALL_PATH = originalEnv;
    } else {
      delete process.env.MANIC_MINERS_INSTALL_PATH;
    }
  });

  it('should detect latest version correctly', async () => {
    // Create a 'latest' directory with an executable
    const latestDir = path.join(testDir, 'latest');
    await fs.mkdir(latestDir, { recursive: true });
    await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'fake exe content');
    await fs.writeFile(path.join(latestDir, 'config.ini'), 'fake config');

    const result = await fetchInstalledVersions();

    expect(result.status).to.be.true;
    expect(result.installedVersions).to.have.length(1);

    const latestVersion = result.installedVersions![0];
    expect(latestVersion.identifier).to.equal('latest');
    expect(latestVersion.version).to.equal('latest');
    expect(latestVersion.displayName).to.equal('Manic Miners (Latest)');
    expect(latestVersion.directory).to.equal(latestDir);
    // Note: executablePath is added by fetchInstalledVersions, not in base Version type

    // Check that the version was properly detected by checking the actual result
    expect(result.installedVersions[0].identifier).to.equal('latest');
    expect(result.installedVersions[0].version).to.equal('latest');
    expect(result.installedVersions[0].executablePath).to.include('ManicMiners.exe');
  });

  it('should not detect latest version without executable', async () => {
    // Create a 'latest' directory without an executable
    const latestDir = path.join(testDir, 'latest');
    await fs.mkdir(latestDir, { recursive: true });
    await fs.writeFile(path.join(latestDir, 'config.ini'), 'fake config');

    const result = await fetchInstalledVersions();

    expect(result.status).to.be.true;
    expect(result.installedVersions).to.have.length(0);

    // Verify that no versions were detected since there's no executable
    expect(result.installedVersions).to.have.length(0);
  });

  it('should detect old-style ManicMiners installations', async () => {
    // Create an old-style directory
    const oldDir = path.join(testDir, 'ManicMiners-Baraklava-V1.0.3');
    await fs.mkdir(oldDir, { recursive: true });
    await fs.writeFile(path.join(oldDir, 'ManicMiners.exe'), 'fake exe content');

    const result = await fetchInstalledVersions();

    expect(result.status).to.be.true;
    expect(result.installedVersions).to.have.length(1);

    const oldVersion = result.installedVersions![0];
    expect(oldVersion.identifier).to.equal('ManicMiners-Baraklava-V1.0.3');
    expect(oldVersion.version).to.equal('1.0.3');
    expect(oldVersion.displayName).to.equal('ManicMiners v1.0.3');
    expect(oldVersion.directory).to.equal(oldDir);
  });

  it('should detect multiple versions correctly', async () => {
    // Create multiple version directories
    const latestDir = path.join(testDir, 'latest');
    await fs.mkdir(latestDir, { recursive: true });
    await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'fake exe content');

    const oldDir = path.join(testDir, 'ManicMiners-Baraklava-V1.0.2');
    await fs.mkdir(oldDir, { recursive: true });
    await fs.writeFile(path.join(oldDir, 'ManicMiners.exe'), 'fake exe content');

    const result = await fetchInstalledVersions();

    expect(result.status).to.be.true;
    expect(result.installedVersions).to.have.length(2);

    const identifiers = result.installedVersions!.map(v => v.identifier);
    expect(identifiers).to.include('latest');
    expect(identifiers).to.include('ManicMiners-Baraklava-V1.0.2');
  });

  it('should calculate directory sizes correctly', async () => {
    const latestDir = path.join(testDir, 'latest');
    await fs.mkdir(latestDir, { recursive: true });

    // Create files with known sizes
    await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'a'.repeat(1000)); // 1KB
    await fs.writeFile(path.join(latestDir, 'data.dat'), 'b'.repeat(2000)); // 2KB

    const result = await fetchInstalledVersions();

    expect(result.status).to.be.true;
    expect(result.installedVersions).to.have.length(1);

    const latestVersion = result.installedVersions![0];
    // Note: installationSize is added by fetchInstalledVersions for local tracking
    expect(latestVersion.size).to.equal('0 MB'); // Rounded down to MB
  });

  it('should handle errors gracefully', async () => {
    // Try to access a non-existent directory by deleting the test directory
    await fs.rm(testDir, { recursive: true });

    const result = await fetchInstalledVersions();

    // Should still return a result but with empty installations
    expect(result.status).to.be.true;
    expect(result.installedVersions).to.have.length(0);
  });
});
