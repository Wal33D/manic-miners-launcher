import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fetchLatestItchCatalog } from '../src/api/fetchLatestItchCatalog';
import { deleteLatestVersion } from '../src/functions/deleteLatestVersion';
import { repairLatestVersion } from '../src/functions/repairLatestVersion';
import { getDirectories } from '../src/functions/fetchDirectories';

(async () => {
  // Download
  let res = await fetchLatestItchCatalog();
  assert.ok(res.status, 'download should succeed');
  const { directories } = await getDirectories();
  const zip = path.join(directories.launcherCachePath, 'latestVersion', 'manic-miners-latest.zip');
  assert.ok(fs.existsSync(zip), 'zip file exists after download');

  // Delete
  const del = await deleteLatestVersion();
  assert.ok(del.deleted, 'delete should succeed');
  assert.ok(!fs.existsSync(zip), 'zip removed');

  // Repair
  const rep = await repairLatestVersion();
  assert.ok(rep.repaired, 'repair should succeed');
  assert.ok(fs.existsSync(zip), 'zip exists after repair');

  console.log('all tests passed');
})();
