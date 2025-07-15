// API Response Types for Manic Miners Launcher

// Comment Types
export interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
  avatarUrl: string;
  upvotes: number;
  downvotes: number;
}

export interface CommentsResponse {
  count: number;
  comments: Comment[];
}

// Video Types
export interface Video {
  id: string;
  url: string;
  name: string;
  description: string;
  internalUrl: string;
  cloudinaryUrl: string;
}

export type VideosResponse = Video[];

// News Types
export interface NewsItem {
  id: number;
  date: string;
  title: string;
  content: string;
  media?: string;
}

export type NewsResponse = NewsItem[];

// Version Types
export interface Version {
  gameId: number;
  title: string;
  displayName: string;
  identifier: string;
  experimental: boolean;
  version: string;
  releaseDate: string;
  filename: string;
  type: string;
  md5Hash: string;
  size: string;
  sizeInBytes: number;
  downloadUrl: string;
  coverImage: string;
  thumbnailUrl: string;
  detailsUrl: string;
  description: string;
  screenshots?: string[];
  changelog?: string;
}

export interface VersionsResponse {
  versions: Version[];
}

// Level Types
export interface Level {
  id: string;
  name: string;
  author: string;
  description: string;
  difficulty: string;
  downloadUrl: string;
  thumbnailUrl?: string;
  createdDate: string;
  downloads: number;
  rating: number;
}

export interface LevelsResponse {
  count: number;
  levels: Level[];
}

// URL Types
export interface Urls {
  discord?: string;
  github?: string;
  reddit?: string;
  youtube?: string;
  website?: string;
  [key: string]: string | undefined;
}

export type UrlsResponse = Urls;

// Routes Types
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

// Image Types
export interface Image {
  id: string;
  url: string;
  name: string;
  category: string;
}

export interface ImagesResponse {
  images: Image[];
}

// Sound Types
export interface Sound {
  id: string;
  url: string;
  name: string;
  category: string;
  duration?: number;
}

export interface SoundsResponse {
  sounds: Sound[];
}

// Weight Types
export interface Weight {
  id: string;
  value: number;
  category: string;
  description?: string;
}

export interface WeightsResponse {
  weights: Weight[];
}
