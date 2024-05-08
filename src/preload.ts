import { contextBridge } from 'electron';
import { fetchVersions } from './fetchVersions'; // Assuming fetchVersions is exported from another file

contextBridge.exposeInMainWorld('api', {
  getVersions: async () => {
    return await fetchVersions();
  },
});
