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

  // Window state
  'window-maximized'?: boolean;

  // Installation paths
  'selected-install-path'?: string;

  // Download state
  'download-progress'?: {
    version: string;
    progress: number;
    status: string;
  };
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

// Create the store instance with default values
const storeDefaults: Partial<StoreSchema> = {
  'current-selected-version': null,
  'last-selected-archived-version': null,
  'last-known-version': null,
  settings: {
    // UI Settings
    playSoundOnInstall: true,
    autoLaunchAfterInstall: false,
    darkMode: true,

    // Game Launch Settings
    launchMode: 'steam' as const,
    skipLauncher: false,
    modsEnabled: false,

    // Path Settings
    installPath: '',
    steamPath: '',
    winePrefix: '',

    // Steam Settings
    runThroughSteam: false,

    // Update Settings
    alwaysUpdate: false,

    // Graphics Settings
    dgVoodooEnabled: false,
  },
};

// Export a properly typed store instance without type casting
export const typedStore: TypedElectronStore = new ElectronStore<StoreSchema>({
  defaults: storeDefaults,
}) as TypedElectronStore;
