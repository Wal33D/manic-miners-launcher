import { checkCompatLauncher } from '../src/functions/checkCompatLauncher';

(async () => {
  const result = await checkCompatLauncher();
  if (result.status) {
    console.log(`Compatibility layer available at: ${result.compatPath || 'system default'}`);
  } else {
    console.error(`Failed to set up Proton: ${result.message}`);
    process.exit(1);
  }
})();
