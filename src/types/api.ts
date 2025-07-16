// API Response Types for Manic Miners Launcher - Backend

// Re-export shared types
export { Version, VersionsResponse } from '../../shared-types';

// Endpoint Routes Types (Used by fetchServerEndpoints.ts)
// This maps API endpoint names to their URLs
export interface EndpointRoutes {
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

export type EndpointRoutesResponse = EndpointRoutes;
