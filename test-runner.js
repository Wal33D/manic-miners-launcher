#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧪 Running Manic Miners Launcher Test Suite');
console.log('============================================\n');

// Print test information
console.log('📋 Test Files:');
console.log('  1. src/tests/installDetection.test.ts');
console.log('  2. src/tests/latestVersionOperations.test.ts');
console.log('  3. src/tests/ipcHandlers.test.ts');
console.log('  4. src/tests/guiFlowTests.test.ts');
console.log('');

console.log('🔧 Test Coverage:');
console.log('  ✅ Install Detection');
console.log('  ✅ Latest Version Operations');
console.log('  ✅ IPC Handlers Integration');
console.log('  ✅ GUI Flow Tests');
console.log('  ✅ Error Handling');
console.log('  ✅ Logging Integration');
console.log('');

// Actually run the tests
try {
  console.log('🏃 Executing test suite...\n');
  execSync('npm test', { stdio: 'inherit' });
  console.log('\n✅ All tests passed successfully!');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Tests failed!');
  process.exit(1);
}
