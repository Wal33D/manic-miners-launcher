import { z } from 'zod';

/**
 * URL validation for external links
 */
const urlSchema = z
  .string()
  .url()
  .refine(
    url => {
      try {
        const parsed = new URL(url);
        // Only allow safe protocols
        return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    },
    { message: 'Invalid or unsafe URL protocol' }
  );

/**
 * File path validation (basic checks to prevent path traversal)
 */
const filePathSchema = z.string().refine(
  path => {
    // Prevent path traversal attacks
    return !path.includes('..') && !path.includes('~') && path.length < 500;
  },
  { message: 'Invalid file path' }
);

/**
 * Version identifier validation
 */
const versionSchema = z.string().regex(/^[a-zA-Z0-9.-]+$/, 'Version must contain only alphanumeric characters, dots, and hyphens');

/**
 * Settings validation schema
 */
const settingsSchema = z
  .object({
    // UI Settings
    playSoundOnInstall: z.boolean(),
    autoLaunchAfterInstall: z.boolean(),
    darkMode: z.boolean(),

    // Game Launch Settings
    launchMode: z.enum(['steam', 'direct', 'wine']),
    skipLauncher: z.boolean(),
    modsEnabled: z.boolean(),

    // Path Settings
    installPath: z.string(),
    steamPath: z.string(),
    winePrefix: z.string(),

    // Steam Settings
    runThroughSteam: z.boolean(),

    // Update Settings
    alwaysUpdate: z.boolean(),

    // Graphics Settings
    dgVoodooEnabled: z.boolean(),
  })
  .strict();

/**
 * Version selection validation schema
 */
const versionSelectionSchema = z
  .object({
    identifier: versionSchema,
    name: z.string().optional(),
    directory: filePathSchema.optional(),
    size: z.number().optional(),
    lastModified: z.date().optional(),
  })
  .strict();

/**
 * IPC data validation schemas
 */
export const ipcSchemas = {
  // Download version data
  downloadVersion: z.object({
    version: versionSchema,
    downloadPath: filePathSchema,
  }),

  // Launch game data
  launchGame: z
    .object({
      identifier: versionSchema,
    })
    .or(versionSchema), // Allow string or object

  // Delete version data
  deleteVersion: z
    .object({
      identifier: versionSchema,
    })
    .or(versionSchema),

  // Update version data
  updateVersion: z.object({
    version: versionSchema,
  }),

  // Create shortcuts data
  createShortcuts: z.object({
    version: versionSchema.optional(),
    options: z
      .object({
        createExeShortcut: z.boolean().optional(),
        createDirShortcut: z.boolean().optional(),
      })
      .optional(),
  }),

  // External URL
  openExternal: urlSchema,

  // Settings data
  setSettings: settingsSchema,

  // Version selection data
  setSelectedVersion: versionSelectionSchema,

  // Progress data (from main to renderer)
  progressData: z.object({
    progress: z.number().min(0).max(100).optional(),
    status: z.string().optional(),
    fileName: z.string().optional(),
    totalSize: z.number().optional(),
    speedBytesPerSec: z.number().optional(),
    etaSeconds: z.number().optional(),
  }),
};

export interface ValidationResult<T = unknown> {
  isValid: boolean;
  data?: T;
  error?: string;
}

/**
 * Validates IPC data based on channel type
 */
export function validateIpcData(channel: string, data: unknown): ValidationResult {
  // Map channels to schemas
  const channelToSchema: Record<string, keyof typeof ipcSchemas> = {
    'download-version': 'downloadVersion',
    'launch-game': 'launchGame',
    'delete-version': 'deleteVersion',
    'update-latest-version': 'updateVersion',
    'create-shortcuts': 'createShortcuts',
    'open-external-url': 'openExternal',
    'set-settings': 'setSettings',
    'set-selected-archived-version': 'setSelectedVersion',
  };

  const schemaKey = channelToSchema[channel];
  if (!schemaKey) {
    // Allow channels without validation (for now)
    return { isValid: true };
  }

  const schema = ipcSchemas[schemaKey];
  try {
    const validatedData = schema.parse(data);
    return { isValid: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.issues.map(e => e.message).join(', '),
      };
    }
    return { isValid: false, error: 'Unknown validation error' };
  }
}

/**
 * Safe URL validation for external links
 */
export function isValidExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
