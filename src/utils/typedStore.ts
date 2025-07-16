import ElectronStore from 'electron-store';
import { LauncherSettings } from '../types/launcherSettings';
import { Version } from '../api/versionTypes';

// Define the structure of the store
export interface StoreSchema {
  // Version management - store full Version objects
  'current-selected-version': Version | null;
  'last-selected-archived-version': Version | null;
  'last-known-version': string | null;

  // Settings
  settings: LauncherSettings;

  // Application state
  'window-bounds'?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  // Add other store keys as discovered
  [key: string]: any;
}

// Create a typed interface for our store
interface TypedElectronStore extends ElectronStore<StoreSchema> {
  get<K extends keyof StoreSchema>(key: K): StoreSchema[K] | undefined;
  get<K extends keyof StoreSchema>(key: K, defaultValue: StoreSchema[K]): StoreSchema[K];
  set<K extends keyof StoreSchema>(key: K, value: StoreSchema[K]): void;
  has(key: keyof StoreSchema): boolean;
  delete(key: keyof StoreSchema): void;
  clear(): void;
  readonly size: number;
  readonly path: string;
}

// Export a singleton instance of the store with proper typing
export const typedStore = new ElectronStore<StoreSchema>() as TypedElectronStore;
