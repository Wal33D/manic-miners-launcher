# GitHub Actions Workflows

This directory contains comprehensive GitHub Actions workflows for the Manic Miners Launcher project, ensuring quality, compatibility, and reliability across multiple platforms.

## 🚀 Workflows Overview

### 1. **CI/CD Pipeline** (`ci.yml`)

**Triggers:** Push to master/main/develop, Pull Requests

- **Multi-platform testing** on Ubuntu, Windows, and macOS
- **TypeScript compilation** validation
- **ESLint** code quality checks
- **Asset generation** testing
- **Test suite execution** with comprehensive coverage
- **Electron packaging** verification
- **Security auditing** with dependency analysis
- **Performance monitoring** and bundle analysis
- **Artifact generation** for distributables

### 2. **Release Builds** (`release.yml`)

**Triggers:** Git tags (v\*), GitHub releases

- **Production builds** for all platforms
- **Signed installers** (where applicable)
- **Release artifact** generation and upload
- **GitHub Release** attachment automation
- **Platform-specific** packaging:
  - **Linux**: .deb and .rpm packages
  - **Windows**: .exe installers and .zip archives
  - **macOS**: .dmg images and .zip archives

### 3. **Pull Request Validation** (`pr.yml`)

**Triggers:** Pull request events

- **Comprehensive validation** on all platforms
- **Code quality analysis** with security scanning
- **Compatibility testing** across Node.js versions
- **Build verification** before merge
- **Automatic PR summary** generation
- **License compliance** checking
- **Bundle size analysis** for performance impact

### 4. **Nightly Builds** (`nightly.yml`)

**Triggers:** Daily at 2 AM UTC, Manual dispatch

- **Extended testing** across multiple Node.js versions
- **Deep security auditing** with vulnerability scanning
- **Performance analysis** and optimization insights
- **Code quality metrics** and complexity analysis
- **Dependency freshness** monitoring
- **Regression testing** for stability assurance

## 🎯 Platform Support

### Operating Systems

- **Ubuntu Latest** (Linux)
- **Windows Latest**
- **macOS Latest**

### Node.js Versions

- **Node.js 18.x** (LTS)
- **Node.js 20.x** (Current LTS) - Primary
- **Node.js 22.x** (Latest)

## 🔧 Workflow Features

### **Quality Assurance**

- ✅ TypeScript compilation validation
- ✅ ESLint code quality checks
- ✅ Prettier formatting verification
- ✅ Comprehensive test suite execution
- ✅ Security vulnerability scanning
- ✅ License compliance checking

### **Build Verification**

- ✅ Asset generation testing
- ✅ Electron packaging validation
- ✅ Cross-platform build testing
- ✅ Performance impact analysis
- ✅ Bundle size monitoring

### **Security & Compliance**

- ✅ Dependency audit (moderate+ severity)
- ✅ License compatibility checking
- ✅ Vulnerability scanning
- ✅ Outdated dependency monitoring
- ✅ Code security analysis

### **Performance Monitoring**

- ✅ Bundle size analysis
- ✅ Build performance tracking
- ✅ Asset optimization verification
- ✅ Startup performance checks

## 📦 Artifacts & Outputs

### **CI/CD Pipeline**

- Test coverage reports
- Lint and compilation results
- Platform-specific packages
- Performance metrics

### **Release Builds**

- Production-ready installers
- Cross-platform distributables
- Signed applications (where applicable)
- Release notes and changelogs

### **Pull Request Validation**

- Validation summary reports
- Code quality metrics
- Compatibility test results
- Performance impact analysis

### **Nightly Builds**

- Extended test reports
- Security audit results
- Performance benchmarks
- Code quality trends

## 🛠️ Local Development

### **Running Tests Locally**

```bash
# Install dependencies
pnpm install

# Run linting
pnpm run lint

# Run TypeScript compilation check
npx tsc --noEmit

# Generate assets
pnpm run generate:assets

# Run test suite
node test-runner.js

# Test packaging
pnpm run package

# Full build (Linux only)
pnpm run make
```

### **Simulating CI Environment**

```bash
# Set CI environment variable
export CI=true

# Run with frozen lockfile (like CI)
pnpm install --frozen-lockfile

# Test with production-like settings
pnpm run package
```

## 🔄 Workflow Dependencies

### **Required GitHub Secrets**

- `GITHUB_TOKEN` - Automatically provided by GitHub

### **Required System Dependencies**

**Ubuntu:**

```bash
sudo apt-get install -y libnss3-dev libatk-bridge2.0-dev libxss1 libgtk-3-dev libxrandr2 libasound2-dev rpm fakeroot
```

**Windows:**

- No additional system dependencies required

**macOS:**

- Xcode Command Line Tools (automatically available)

## 📊 Status Badges

Add these badges to your main README.md:

```markdown
[![CI/CD Pipeline](https://github.com/username/manic-miners-launcher/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/username/manic-miners-launcher/actions/workflows/ci.yml)
[![Release](https://github.com/username/manic-miners-launcher/workflows/Release/badge.svg)](https://github.com/username/manic-miners-launcher/actions/workflows/release.yml)
[![Nightly Build](https://github.com/username/manic-miners-launcher/workflows/Nightly%20Build%20%26%20Test/badge.svg)](https://github.com/username/manic-miners-launcher/actions/workflows/nightly.yml)
```

## 🐛 Troubleshooting

### **Common Issues**

1. **TypeScript Compilation Errors**
   - Check `tsconfig.json` configuration
   - Verify all TypeScript files are properly typed
   - Run `npx tsc --noEmit` locally

2. **Package Installation Failures**
   - Ensure `pnpm-lock.yaml` is committed
   - Check Node.js version compatibility
   - Verify system dependencies on Linux

3. **Build Failures**
   - Check Electron Forge configuration
   - Verify asset generation completes successfully
   - Ensure all required dependencies are installed

4. **Test Failures**
   - Run tests locally with `node test-runner.js`
   - Check test environment setup
   - Verify mock configurations are correct

### **Getting Help**

- Check the **Actions** tab in your GitHub repository
- Review workflow run logs for detailed error information
- Ensure all required files are committed and up to date
- Verify configuration files are properly formatted

## 🚀 Continuous Improvement

The workflows are designed to:

- **Catch issues early** in the development process
- **Ensure quality** across all supported platforms
- **Maintain security** through regular audits
- **Monitor performance** and prevent regressions
- **Automate releases** for consistent distribution

Regular updates and improvements to these workflows help maintain a robust development and deployment pipeline.
