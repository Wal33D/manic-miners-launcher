// Re-export Version from shared types
export { Version, VersionsResponse as Versions } from '../../shared-types';

// Keep version selection type here as it's specific to the API
export type VersionSelectionType = 'all' | 'latest' | 'past' | 'experimental' | 'archived';
