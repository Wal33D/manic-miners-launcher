// API Response Types for Manic Miners Launcher - Backend

// Re-export shared types
export { Version, VersionsResponse } from '../../shared-types';

// Routes Types (Used by fetchServerEndpoints.ts)
// This is different from the shared Routes type - it's for endpoint mapping
export interface Routes {
  comments: string;
  images: string;
  levels: string;
  news: string;
  routes: string;
  sounds: string;
  urls: string;
  'versions.archived': string;
  videos: string;
  weights: string;
  [key: string]: string;
}

export type RoutesResponse = Routes;
