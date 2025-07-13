import { fetchLatestItchCatalog } from '../api/fetchLatestItchCatalog';

export async function repairLatestVersion(): Promise<{ repaired: boolean; message: string }> {
  const res = await fetchLatestItchCatalog();
  return { repaired: res.status, message: res.message };
}
